import './contextMenu'
import { onMessage } from 'webext-bridge'
import qs from 'qs'
import { storage } from 'webextension-polyfill'
import { VARIABLES } from '~/variables'

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

onMessage('signInWithGithub', async () => {
  const redirectUrl = browser.identity.getRedirectURL('github')

  const options = {
    provider: 'github',
    redirect_to: redirectUrl,
  }
  const url = `${VARIABLES.SUPABASE_API_URL}/auth/v1/authorize?${qs.stringify(options)}`
  try {
    const authUrl = await browser.identity.launchWebAuthFlow({ url, interactive: true })
    const params = new URLSearchParams(new URL(authUrl).hash.slice(1))
    const accessToken = params.get('access_token')
    const refreshToken = params.get('refresh_token')
    const expiresAt = params.get('expires_in')

    if (accessToken && refreshToken && expiresAt) {
      await storage.local.set({
        accessToken,
        refreshToken,
        expiresAt,
      })

      return { accessToken, refreshToken, expiresAt }
    }
    else {
      console.warn('No access token or refresh token or expires at')
      return null
    }
  }
  catch (error) {
    console.log('error', error)
    return null
  }
})

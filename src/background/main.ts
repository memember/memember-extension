import './contextMenu'
import { onMessage } from 'webext-bridge'
import qs from 'qs'
import { VARIABLES } from '~/variables'

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

onMessage('signInWithGithub', async () => {
  const redirectUrl = browser.identity.getRedirectURL()
  const options = {
    provider: 'github',
    redirect_to: redirectUrl,
  }
  const url = `${VARIABLES.SUPABASE_API_URL}/auth/v1/authorize?${qs.stringify(options)}`
  console.log('url', url)
  const authUrl = await browser.identity.launchWebAuthFlow({ url, interactive: true })

  console.log('authUrl', authUrl)

/*  const { data, error } = await SupabaseClient.auth.signInWithOAuth({ provider: 'github' })
  console.log({ data, error })
  return { data, error } */
})

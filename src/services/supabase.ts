import { createClient } from '@supabase/supabase-js'
import { storage } from 'webextension-polyfill'
import { VARIABLES } from '~/variables'

export const SupabaseClient = createClient(VARIABLES.SUPABASE_API_URL, VARIABLES.SUPABASE_KEY)

export async function getMemes() {
  const { data, error } = await SupabaseClient.from('memes').select('*')

  console.log({ data, error })
}

export async function checkAuth() {
  const data = await storage.local.get(['accessToken', 'refreshToken', 'expiresAt'])
  const { accessToken, refreshToken, expiresAt } = data

  if (accessToken && refreshToken && expiresAt) {
    await SupabaseClient.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
    return { accessToken, refreshToken, expiresAt }
  }
  else { return null }
}

export async function logOut() {
  await SupabaseClient.auth.signOut()
  await storage.local.remove(['accessToken', 'refreshToken', 'expiresAt'])
}

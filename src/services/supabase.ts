import { createClient } from '@supabase/supabase-js'
import { VARIABLES } from '~/variables'

export const SupabaseClient = createClient(VARIABLES.SUPABASE_API_URL, VARIABLES.SUPABASE_KEY)

export async function getMemes() {
  const { data, error } = await SupabaseClient.from('memes').select('*')

  console.log({ data, error })
}

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAsyncState } from '@vueuse/core'
import { SupabaseClient logOut } from '~/services/supabase'

const router = useRouter()

const queryParams = new URLSearchParams(location.search)
const isSaveMeme = queryParams.get('saveMeme') === 'true'
if (isSaveMeme)
  router.push({ name: 'SaveMeme' })

const { state: user } = useAsyncState(async () => {
  const { data: { user } } = await SupabaseClient.auth.getUser()
  return user
}, null)

const onLogOut = async () => {
  await logOut()
  await router.push({ name: 'Login' })
}
</script>

<template>
  <h1>default</h1>
  <code>
    {{ JSON.stringify(user, null, 2) }}
  </code>
  <button @click="onLogOut()">
    Logout
  </button>
</template>

<script setup lang="ts">
import { sendMessage } from 'webext-bridge'
import { useRouter } from 'vue-router'
import { useSaveMemeParams } from '~/composables/useSaveMemeParams'

const router = useRouter()
const { isComingFromMenu, imageUrl } = useSaveMemeParams()

const signInWithGithub = async () => {
  const response = await sendMessage('signInWithGithub', undefined, 'background')

  if (response && isComingFromMenu)
    await router.push({ name: 'SaveMeme', query: { imageUrl, saveMeme: 'true' } })
}
</script>

<template>
  <div class="h-full flex justify-center flex-col items-center p-3">
    <arcticons-memetastic class="text-white w-40 h-40" />
    <button class="mt-5 bg-white rounded flex justify-center w-full text-black p-3" @click="signInWithGithub">
      <mdi-github class="w-6 h-6 mr-2" />
      <span>Sign in with Github</span>
    </button>
  </div>
</template>

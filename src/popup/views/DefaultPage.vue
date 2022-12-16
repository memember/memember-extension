<script setup lang="ts">
import { useRouter } from 'vue-router'
import { sendMessage } from 'webext-bridge'

const router = useRouter()

const queryParams = new URLSearchParams(location.search)
const isSaveMeme = queryParams.get('saveMeme') === 'true'
if (isSaveMeme)
  router.push({ name: 'SaveMeme' })

const signInWithGithub = async () => {
  const response = await sendMessage('signInWithGithub', null, 'background')
  console.log('response', response)
}
</script>

<template>
  <h1>default</h1>
  <button @click="signInWithGithub">
    Sign in with Github
  </button>
</template>

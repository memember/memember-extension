<script setup lang="ts">
import { sendMessage } from 'webext-bridge'

const signInWithGithub = async () => {
  await sendMessage('signInWithGithub', undefined, 'background')
}
</script>

<template>
  <h1>Login</h1>
  <button @click="signInWithGithub">
    Sign in with Github
  </button>
</template>

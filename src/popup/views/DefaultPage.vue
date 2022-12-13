<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const queryParams = new URLSearchParams(location.search)
const isSaveMeme = queryParams.get('saveMeme') === 'true'
if (isSaveMeme)
  router.push({ name: 'SaveMeme' })
</script>

<template>
  <h1>default</h1>
</template>

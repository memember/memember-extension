<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import TesseractService from '~/services/tesseract'

const queryParams = new URLSearchParams(location.search)
const imageUrl = decodeURIComponent(queryParams.get('imageUrl') || '')

const { state: imageText, isLoading, error } = useAsyncState(async () => {
  const tesseractService = new TesseractService()
  await tesseractService.init()

  const text = await tesseractService.recognize(imageUrl)

  await tesseractService.terminate()
  return text
}, null)
</script>

<template>
  <h1>{{ isLoading || imageText }}</h1>
</template>

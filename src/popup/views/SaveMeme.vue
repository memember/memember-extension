<script setup lang="ts">
import { ref } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { Image } from 'image-js'
import TesseractService from '~/services/tesseract'
import { SupabaseClient, saveMeme } from '~/services/supabase'

const queryParams = new URLSearchParams(location.search)
const imageUrl = decodeURIComponent(queryParams.get('imageUrl') || '')
const finalImageUrl = ref('')

const {
  state: imageText,
  isLoading,
  error,
} = useAsyncState(async () => {
  const image = await Image.load(imageUrl)
  finalImageUrl.value = image.medianFilter().grey().mask().toDataURL()
  const tesseractService = new TesseractService()
  await tesseractService.init()

  const text = await tesseractService.recognize(finalImageUrl.value)

  await tesseractService.terminate()
  return text
}, null)

const onSave = async () => {
  const {
    data: { user },
  } = await SupabaseClient.auth.getUser()
  // TOOD: add hint
  saveMeme(user, imageText.value, '', imageUrl)
}
</script>

<template>
  <h1>{{ isLoading || imageText }}</h1>
  <img :src="finalImageUrl">
  <button @click="onSave()">
    Save
  </button>
</template>

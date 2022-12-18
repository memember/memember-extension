<script setup lang="ts">
import { ref } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { Image } from 'image-js'
import { useNotification } from '@kyvg/vue3-notification'
import TesseractService from '~/services/tesseract'
import { saveMeme } from '~/services/supabase'

const { notify } = useNotification()
const queryParams = new URLSearchParams(location.search)
const imageUrl = decodeURIComponent(queryParams.get('imageUrl') || '')
const finalImageUrl = ref('')
const hintText = ref('')
const isDev = import.meta.env.DEV

const {
  state: imageText,
  isLoading: processLoading,
  error: processError,
} = useAsyncState(async () => {
  const image = await Image.load(imageUrl)
  finalImageUrl.value = image.medianFilter().grey().mask().toDataURL()
  const tesseractService = new TesseractService()
  await tesseractService.init()

  const text = await tesseractService.recognize(finalImageUrl.value)

  await tesseractService.terminate()
  return text
}, null)

const { execute: onSave, isLoading: saveLoading, error: saveError } = useAsyncState(async () => {
  if (imageText.value) {
    await saveMeme({
      hint: hintText.value,
      imageText: imageText.value,
      originalImageSrc: imageUrl,
    })
    window.close()
  }
}, null, { immediate: false })

const isLoading = computed(() => processLoading.value || saveLoading.value)

watch([processError, saveError], () => {
  if (processError.value || saveError.value) {
    notify({
      title: 'Error',
      text: 'Error saving meme',
      type: 'error',
    })
  }
})
</script>

<template>
  <div class="flex flex-col justify-center items-center p-4 w-full h-full">
    <form class="bg-gray-800 p-4 shadow-xl w-full" @submit.prevent="onSave">
      <img class="max-h-64 mx-auto" :src="imageUrl" alt="meme text">

      <div class="flex flex-col mb-4 mt-2">
        <label for="hint" class="text-white font-semibold mb-2">Hint</label>
        <input id="hint" v-model="hintText" placeholder="Optional" :disabled="isLoading" type="text" class="bg-gray-700 p-2  focus:outline-none focus:shadow-outline-purple">
      </div>
      <button :disabled="isLoading" type="submit" class="bg-gradient-to-r from-purple-600 to-purple-700 p-2  text-white font-semibold hover:bg-purple-500 focus:outline-none focus:shadow-outline-purple" v-text="isLoading ? `Loading...` : `Save`" />
    </form>
  </div>
  <template v-if="isDev">
    <span>Masked image (Dev mode only)</span>
    <img class="max-h-64 mx-auto" :src="finalImageUrl" alt="meme text">
    <code class="w-full bg-gray-700 text-white" contenteditable="false" v-text="imageText" />
  </template>
</template>

<script setup lang="ts">
import { useSaveMemeParams } from '~/composables/useSaveMemeParams'

const { isComingFromMenu } = useSaveMemeParams()
</script>

<template>
  <main class="popup" :style="isComingFromMenu && `--popup-height: 500px`">
    <notifications />
    <router-view />
  </main>
</template>

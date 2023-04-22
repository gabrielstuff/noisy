<template>
  <button @click="downloadImage">Télécharger l'image</button>
</template>

<script setup lang="ts">
import { useNoiseStore } from '../stores/noise'

const store = useNoiseStore()

const downloadImage = () => {
  console.log('downloadImage')
  console.log(store.canvas)
  if (!store.canvas) return
  const link = document.createElement('a')
  link.href = store.canvas.toDataURL('image/png')
  link.download = store.filename || 'noise_image.png'
  link.click()
}
</script>

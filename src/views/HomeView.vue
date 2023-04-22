<template>
  <main>
    <div class="container">
      <h1>Générateur de texture de bruit</h1>
      <ImageUploader/>
      <NoiseSettings/>
      <DownloadButton/>
      <PreviewArea/>
    </div>
  </main>
</template>

<script setup lang="ts">
import ImageUploader from '../components/ImageUploader.vue'
import NoiseSettings from '../components/NoiseSettings.vue'
import PreviewArea from '../components/PreviewArea.vue'
import DownloadButton from '../components/DownloadButton.vue'
</script>

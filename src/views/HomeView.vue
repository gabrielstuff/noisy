<template>
  <div class="container">
    <ImageUploader/>
    <NoiseSettings/>
    <DownloadButton/>
    <PreviewArea/>
  </div>
</template>

<script setup lang="ts">
import ImageUploader from '../components/ImageUploader.vue'
import NoiseSettings from '../components/NoiseSettings.vue'
import PreviewArea from '../components/PreviewArea.vue'
import DownloadButton from '../components/DownloadButton.vue'
</script>

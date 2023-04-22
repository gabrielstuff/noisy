<template>
  <div>
    <input
      type="file"
      accept="image/png, image/jpeg, image/webp"
      @change="uploadImage"
    />
  </div>
</template>

<script setup lang="ts">
import { useNoiseStore } from '../stores/noise'

const store = useNoiseStore()
const uploadImage = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0]
    store.setImage(file)
  }
};
</script>
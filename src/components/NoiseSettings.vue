<template>
  <div class="fixed bottom-4 left-1/2 transform-gpu -translate-x-1/2 bg-gray-200 dark:bg-gray-800 p-4 rounded-full min-w-[300px] max-w-1/2 space-x-4 flex justify-center items-center">
    <button class="i-carbon-sun dark:i-carbon-moon text-xl text-red"></button>
    <button class="i-carbon-settings text-xl text-red"></button>
    <button class="i-carbon-paint-brush text-xl text-red" ></button>
    <button class="i-carbon-image text-xl text-red"></button>
    <button class="i-carbon-download text-xl text-red"></button>
  </div>
  <div class="fixed inset-0 pointer-events-none">
      <svg class="w-full h-full" ref="svgContainer"></svg>
  </div>
  <fieldset>
    <legend>Paramètres du bruit</legend>

    <label>
      Quantité de bruit:
      <input type="range" v-model="noiseAmount" min="0" max="1" step="0.01" />
    </label>

    <label>
      Opacité du bruit:
      <input type="range" v-model="noiseOpacity" min="0" max="1" step="0.01" />
    </label>

    <label>
      Type de bruit:
      <select v-model="noiseType">
        <option value="simplex">Simplex</option>
        <option value="perlin">Perlin</option>
      </select>
    </label>

    <label>
      Image transparente:
      <input type="checkbox" v-model="isTransparent" />
    </label>

    <label>
      Couleur de fond:
      <input type="color" v-model="backgroundColor" />
    </label>

    <label>
      Largeur:
      <input type="number" v-model="width" />
    </label>

    <label>
      Hauteur:
      <input type="number" v-model="height" />
    </label>
  </fieldset>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { NoiseSettings } from '../interfaces/noiseSettingsTypes'
import { useNoiseStore } from '../stores/noise'

const store = useNoiseStore()

const noiseAmount = ref(0.5)
const noiseOpacity = ref(0.5)
const noiseType = ref('simplex')
const isTransparent = ref(false)
const backgroundColor = ref('#ffffff')
const width = ref(512)
const height = ref(512)
const svgContainer = ref(null)

watchEffect(() => {
  const settings: NoiseSettings = {
    noiseAmount: noiseAmount.value,
    noiseOpacity: noiseOpacity.value,
    noiseType: noiseType.value,
    isTransparent: isTransparent.value,
    backgroundColor: backgroundColor.value,
    width: width.value,
    height: height.value,
  }
  store.setNoiseSettings(settings)
})
</script>

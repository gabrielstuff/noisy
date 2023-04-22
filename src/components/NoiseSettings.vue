<template>
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
        <!-- Ajoutez d'autres types de bruit de la bibliothèque thi.ng ici -->
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
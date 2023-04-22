<template>
  <div>
    <canvas ref="canvasRef" :width="width" :height="height"></canvas>
  </div>
</template>

<script setup lang="ts">
import {createNoise2D} from 'simplex-noise'
import Perlin from 'perlin.js'
import { ref, watch, onMounted } from 'vue'
import { useNoiseStore } from '../stores/noise'
const noise2D = createNoise2D()

const store = useNoiseStore()

const canvasRef = ref<HTMLCanvasElement | null>(null);
const width = ref(512);
const height = ref(512);

const drawNoise = () => {
  if (!canvasRef.value || !store.noiseSettings) return;

  const ctx = canvasRef.value.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, width.value, height.value);

  if (store.image) {
    const img = new Image();
    img.src = URL.createObjectURL(store.image);
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width.value, height.value);
      applyNoise(ctx);
    };
  } else {
    const { backgroundColor, isTransparent } = store.noiseSettings;
    ctx.fillStyle = isTransparent ? 'rgba(0, 0, 0, 0)' : backgroundColor;
    ctx.fillRect(0, 0, width.value, height.value);
    applyNoise(ctx);
  }
}

const applyNoise = (ctx: CanvasRenderingContext2D) => {
  const { noiseAmount, noiseOpacity, noiseType, backgroundColor } = store.noiseSettings

  ctx.fillStyle = backgroundColor
  ctx.fillRect(0, 0, width.value, height.value)

  const imageData = ctx.getImageData(0, 0, width.value, height.value)
  const data = imageData.data

  const scale = 100 / noiseAmount

  for (let y = 0; y < height.value; y++) {
    for (let x = 0; x < width.value; x++) {
      const i = (y * width.value + x) * 4

      let noiseValue
      if (noiseType === 'perlin') {
        noiseValue = Perlin.perlin2(x * scale, y * scale)
      } else {
        noiseValue = noise2D(x * scale, y * scale)
      }

      const alpha = (noiseValue + 1) * 0.5 * 255
      data[i + 3] = alpha
    }
  }

  const noiseLayer = new ImageData(data, width.value, height.value)
  const offscreenCanvas = new OffscreenCanvas(width.value, height.value)
  const offscreenCtx = offscreenCanvas.getContext('2d')
  offscreenCtx?.putImageData(noiseLayer, 0, 0)

  ctx.globalAlpha = noiseOpacity
  ctx.globalCompositeOperation = 'lighter'
  ctx.drawImage(offscreenCanvas, 0, 0)
  ctx.globalCompositeOperation = 'source-over'
  ctx.globalAlpha = 1
}

watch(store, () => {
  drawNoise()
}, { deep: true })

onMounted(() => {
  width.value = store.noiseSettings?.width
  height.value = store.noiseSettings?.height
  store.canvas = canvasRef.value
  drawNoise()
})
</script>
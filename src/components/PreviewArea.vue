<template>
  <div>
    <canvas ref="canvasRef" :width="width" :height="height"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useNoiseStore } from '../stores/noise'

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
  const { noiseAmount, noiseOpacity } = store.noiseSettings

  const imageData = ctx.getImageData(0, 0, width.value, height.value)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const noiseValue = Math.random()
    const alpha = noiseValue * noiseAmount * 255 * noiseOpacity
    data[i + 3] = alpha
  }

  ctx.putImageData(imageData, 0, 0)
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
// src/store/noiseStore.ts
import { defineStore } from 'pinia';
import { defaultNoiseSettings } from '../defaults/defaultNoiseSettings';
import type { NoiseSettings } from '../interfaces/noiseSettingsTypes';

export const useNoiseStore = defineStore({
  id: 'noise',

  state: () => ({
    image: null as File | null,
    canvas: null as HTMLCanvasElement | null,
    noiseSettings: defaultNoiseSettings,
    filename: 'noise_image.png'
  }),

  actions: {
    setImage(image: File) {
      this.image = image
    },
    setCanvas(canvas: HTMLCanvasElement) {
      this.canvas = canvas
    },
    setNoiseSettings(settings: Partial<NoiseSettings>) {
      this.noiseSettings = { ...this.noiseSettings, ...settings }
    },
    setFilename(filename: string) {
      this.filename = filename
    }
  }
});

import type { NoiseSettings } from '../interfaces/noiseSettingsTypes'

export const defaultNoiseSettings: NoiseSettings = {
  noiseAmount: 0.5,
  noiseOpacity: 0.5,
  noiseType: 'simplex',
  isTransparent: false,
  backgroundColor: '#ffffff',
  width: 512,
  height: 512
}
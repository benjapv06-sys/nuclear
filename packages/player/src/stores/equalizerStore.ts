import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type EqualizerPreset =
  | 'flat'
  | 'pop'
  | 'rock'
  | 'jazz'
  | 'classical'
  | 'bass-boost'
  | 'vocal'
  | 'custom';

export const EQUALIZER_FREQUENCIES = [
  32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000,
];

export const EQUALIZER_PRESETS: Record<
  EqualizerPreset,
  { name: string; data: Record<number, number> }
> = {
  flat: {
    name: 'Plano',
    data: {
      32: 0,
      64: 0,
      125: 0,
      250: 0,
      500: 0,
      1000: 0,
      2000: 0,
      4000: 0,
      8000: 0,
      16000: 0,
    },
  },
  pop: {
    name: 'Pop',
    data: {
      32: -2,
      64: -1,
      125: 0,
      250: 2,
      500: 4,
      1000: 4,
      2000: 3,
      4000: 1,
      8000: -1,
      16000: -2,
    },
  },
  rock: {
    name: 'Rock',
    data: {
      32: 4,
      64: 3,
      125: -1,
      250: -3,
      500: -1,
      1000: 1,
      2000: 3,
      4000: 4,
      8000: 5,
      16000: 5,
    },
  },
  jazz: {
    name: 'Jazz',
    data: {
      32: 3,
      64: 2,
      125: 1,
      250: 1.5,
      500: -1,
      1000: -1.5,
      2000: 0,
      4000: 1.5,
      8000: 2.5,
      16000: 3,
    },
  },
  classical: {
    name: 'Clásica',
    data: {
      32: 4,
      64: 3,
      125: 2.5,
      250: 2,
      500: -1,
      1000: -1,
      2000: 0,
      4000: 1.5,
      8000: 2.5,
      16000: 3,
    },
  },
  'bass-boost': {
    name: 'Bass Boost',
    data: {
      32: 6,
      64: 5,
      125: 4,
      250: 2,
      500: 0,
      1000: 0,
      2000: 0,
      4000: 0,
      8000: 0,
      16000: 0,
    },
  },
  vocal: {
    name: 'Vocal',
    data: {
      32: -2,
      64: -2,
      125: -1,
      250: 1,
      500: 3,
      1000: 4,
      2000: 4,
      4000: 2,
      8000: 0,
      16000: -1,
    },
  },
  custom: {
    name: 'Personalizado',
    data: {
      32: 0,
      64: 0,
      125: 0,
      250: 0,
      500: 0,
      1000: 0,
      2000: 0,
      4000: 0,
      8000: 0,
      16000: 0,
    },
  },
};

type EqualizerState = {
  enabled: boolean;
  preset: EqualizerPreset;
  data: Record<number, number>;
  preAmp: number;
};

type EqualizerActions = {
  setEnabled: (enabled: boolean) => void;
  setPreset: (preset: EqualizerPreset) => void;
  setBand: (frequency: number, gain: number) => void;
  setPreAmp: (gain: number) => void;
};

export const useEqualizerStore = create<EqualizerState & EqualizerActions>()(
  persist(
    (set, get) => ({
      enabled: false,
      preset: 'flat',
      data: { ...EQUALIZER_PRESETS.flat.data },
      preAmp: 0,
      setEnabled: (enabled) => set({ enabled }),
      setPreset: (preset) => {
        if (preset === 'custom') {
          return;
        }
        set({ preset, data: { ...EQUALIZER_PRESETS[preset].data } });
      },
      setBand: (freq, gain) => {
        const currentData = { ...get().data };
        currentData[freq] = Math.max(-12, Math.min(12, gain));
        set({ data: currentData, preset: 'custom' });
      },
      setPreAmp: (preAmp) =>
        set({ preAmp: Math.max(-12, Math.min(12, preAmp)) }),
    }),
    {
      name: 'nuclear-equalizer',
    },
  ),
);

import { FC } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { Button, Dialog } from '@nuclearplayer/ui';

import {
  EQUALIZER_FREQUENCIES,
  EQUALIZER_PRESETS,
  EqualizerPreset,
  useEqualizerStore,
} from '../../stores/equalizerStore';

type EqualizerModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const EqualizerModal: FC<EqualizerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    enabled,
    preset,
    data,
    preAmp,
    setEnabled,
    setPreset,
    setBand,
    setPreAmp,
  } = useEqualizerStore(
    useShallow((state) => ({
      enabled: state.enabled,
      preset: state.preset,
      data: state.data,
      preAmp: state.preAmp,
      setEnabled: state.setEnabled,
      setPreset: state.setPreset,
      setBand: state.setBand,
      setPreAmp: state.setPreAmp,
    })),
  );

  const handleReset = () => {
    setPreset('flat');
    setPreAmp(0);
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Ecualizador de Sonido">
      <div className="flex flex-col gap-6 pt-4">
        {/* Controles de Estado y Presets */}
        <div className="border-border flex flex-wrap items-center justify-between gap-4 border-b pb-4">
          <div className="flex items-center gap-3">
            <label className="relative inline-flex cursor-pointer items-center select-none">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                className="peer sr-only"
              />
              <div className="peer-focus-visible:ring-ring bg-background-input border-border shadow-shadow peer-checked:bg-primary relative h-6 w-11 rounded-full border-(length:--border-width) transition-colors" />
              <div className="bg-foreground absolute top-1 left-1 h-4 w-4 rounded-full transition-transform peer-checked:translate-x-5" />
            </label>
            <span className="text-sm font-bold">
              {enabled ? 'Ecualizador Activado' : 'Ecualizador Desactivado'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-bold">Preset:</span>
            <select
              value={preset}
              onChange={(e) => setPreset(e.target.value as EqualizerPreset)}
              disabled={!enabled}
              className="bg-background-secondary text-foreground border-border shadow-shadow cursor-pointer rounded-md border-(length:--border-width) p-2 text-sm font-bold outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {Object.entries(EQUALIZER_PRESETS).map(([key, value]) => (
                <option key={key} value={key} className="bg-background">
                  {value.name}
                </option>
              ))}
            </select>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleReset}
              disabled={!enabled}
            >
              Restablecer
            </Button>
          </div>
        </div>

        {/* Panel de Sliders de Frecuencias */}
        <div className="flex flex-col gap-4">
          <div
            className={`bg-background-secondary border-border shadow-shadow flex flex-row justify-between gap-2 overflow-x-auto rounded-md border-(length:--border-width) p-4 transition-opacity ${
              enabled ? 'opacity-100' : 'pointer-events-none opacity-40'
            }`}
          >
            {/* Slider de Preamplificación */}
            <div className="border-border/40 flex h-44 flex-col items-center gap-2 border-r pr-3">
              <span className="text-foreground-secondary h-4 font-mono text-[10px]">
                {preAmp > 0 ? `+${preAmp.toFixed(1)}` : preAmp.toFixed(1)} dB
              </span>
              <div className="relative flex h-28 w-8 items-center justify-center">
                <input
                  type="range"
                  min="-12"
                  max="12"
                  step="0.5"
                  value={preAmp}
                  onChange={(e) => setPreAmp(parseFloat(e.target.value))}
                  disabled={!enabled}
                  className="accent-primary absolute h-2 w-24 -rotate-90 cursor-pointer disabled:opacity-40"
                  style={{ transformOrigin: 'center' }}
                />
              </div>
              <span className="text-primary text-[10px] font-extrabold tracking-wider">
                PRE-AMP
              </span>
            </div>

            {/* Sliders de 10 Bandas */}
            {EQUALIZER_FREQUENCIES.map((freq) => {
              const gain = data[freq] ?? 0;
              return (
                <div
                  key={freq}
                  className="flex h-44 min-w-10 flex-col items-center gap-2"
                >
                  <span className="text-foreground-secondary h-4 font-mono text-[10px]">
                    {gain > 0 ? `+${gain.toFixed(1)}` : gain.toFixed(1)} dB
                  </span>
                  <div className="relative flex h-28 w-8 items-center justify-center">
                    <input
                      type="range"
                      min="-12"
                      max="12"
                      step="0.5"
                      value={gain}
                      onChange={(e) =>
                        setBand(freq, parseFloat(e.target.value))
                      }
                      disabled={!enabled}
                      className="accent-primary absolute h-2 w-24 -rotate-90 cursor-pointer disabled:opacity-40"
                      style={{ transformOrigin: 'center' }}
                    />
                  </div>
                  <span className="text-[10px] font-bold tracking-wider">
                    {freq >= 1000 ? `${freq / 1000}k` : freq}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

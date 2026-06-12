import { FC, useState } from 'react';

import { PlayerBar } from '@nuclearplayer/ui';

import { EqualizerModal } from '../EqualizerModal/EqualizerModal';
import { ConnectedControls } from './ConnectedControls';
import { ConnectedNowPlaying } from './ConnectedNowPlaying';
import { ConnectedSeekBar } from './ConnectedSeekBar';
import { ConnectedVolume } from './ConnectedVolume';

export const ConnectedPlayerBar: FC = () => {
  const [isEqualizerOpen, setIsEqualizerOpen] = useState(false);

  return (
    <>
      <ConnectedSeekBar />
      <PlayerBar
        left={<ConnectedNowPlaying />}
        center={
          <ConnectedControls
            onEqualizerClick={() => setIsEqualizerOpen(true)}
          />
        }
        right={<ConnectedVolume />}
      />
      <EqualizerModal
        isOpen={isEqualizerOpen}
        onClose={() => setIsEqualizerOpen(false)}
      />
    </>
  );
};

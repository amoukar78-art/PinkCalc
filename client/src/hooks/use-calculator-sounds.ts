import { useCallback, useEffect, useState } from 'react';
import { 
  audioManager, 
  playNumberSound, 
  playOperatorSound, 
  playEqualsSound, 
  playClearSound, 
  playDeleteSound 
} from '@/lib/audio-utils';

export function useCalculatorSounds() {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('calculator-sound-enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Save sound preference to localStorage
  useEffect(() => {
    localStorage.setItem('calculator-sound-enabled', JSON.stringify(soundEnabled));
    audioManager.setEnabled(soundEnabled);
  }, [soundEnabled]);

  const playButtonSound = useCallback((soundType: 'number' | 'operator' | 'equals' | 'clear' | 'delete') => {
    if (!soundEnabled) return;

    switch (soundType) {
      case 'number':
        playNumberSound();
        break;
      case 'operator':
        playOperatorSound();
        break;
      case 'equals':
        playEqualsSound();
        break;
      case 'clear':
        playClearSound();
        break;
      case 'delete':
        playDeleteSound();
        break;
    }
  }, [soundEnabled]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev: boolean) => !prev);
  }, []);

  return {
    soundEnabled,
    playButtonSound,
    toggleSound
  };
}
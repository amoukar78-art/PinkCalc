// Audio utilities for calculator sounds using Web Audio API

export enum SoundType {
  NUMBER = 'number',
  OPERATOR = 'operator', 
  EQUALS = 'equals',
  CLEAR = 'clear',
  DELETE = 'delete'
}

class AudioManager {
  private audioContext: AudioContext | null = null;
  private isEnabled: boolean = true;

  constructor() {
    // Initialize audio context on first user interaction
    this.initializeAudioContext();
  }

  private initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
      this.isEnabled = false;
    }
  }

  private async ensureAudioContext() {
    if (!this.audioContext || !this.isEnabled) return null;
    
    if (this.audioContext.state === 'suspended') {
      try {
        await this.audioContext.resume();
      } catch (error) {
        console.warn('Could not resume audio context:', error);
        return null;
      }
    }
    
    return this.audioContext;
  }

  private createOscillator(
    context: AudioContext, 
    frequency: number, 
    type: OscillatorType = 'sine'
  ): OscillatorNode {
    const oscillator = context.createOscillator();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    return oscillator;
  }

  private createGainNode(context: AudioContext, initialGain: number = 0.1): GainNode {
    const gainNode = context.createGain();
    gainNode.gain.setValueAtTime(initialGain, context.currentTime);
    return gainNode;
  }

  async playSound(soundType: SoundType) {
    const context = await this.ensureAudioContext();
    if (!context) return;

    try {
      let frequency: number;
      let duration: number;
      let oscillatorType: OscillatorType;
      let gain: number;

      switch (soundType) {
        case SoundType.NUMBER:
          // Soft, pleasant tone for numbers
          frequency = 800;
          duration = 0.1;
          oscillatorType = 'sine';
          gain = 0.05;
          break;
          
        case SoundType.OPERATOR:
          // Slightly higher pitch for operators
          frequency = 1000;
          duration = 0.12;
          oscillatorType = 'triangle';
          gain = 0.06;
          break;
          
        case SoundType.EQUALS:
          // Satisfying completion sound
          frequency = 600;
          duration = 0.2;
          oscillatorType = 'sine';
          gain = 0.08;
          break;
          
        case SoundType.CLEAR:
          // Swift clear sound
          frequency = 1200;
          duration = 0.08;
          oscillatorType = 'square';
          gain = 0.04;
          break;
          
        case SoundType.DELETE:
          // Subtle delete sound
          frequency = 400;
          duration = 0.1;
          oscillatorType = 'sawtooth';
          gain = 0.03;
          break;
          
        default:
          return;
      }

      // Create audio nodes
      const oscillator = this.createOscillator(context, frequency, oscillatorType);
      const gainNode = this.createGainNode(context, gain);
      const filter = context.createBiquadFilter();
      
      // Configure low-pass filter for smoother sound
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2000, context.currentTime);
      filter.Q.setValueAtTime(1, context.currentTime);

      // Connect nodes
      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(context.destination);

      // Create envelope (fade in/out)
      const now = context.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(gain, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

      // Special handling for equals sound (two-tone effect)
      if (soundType === SoundType.EQUALS) {
        // Add a second, lower tone
        const oscillator2 = this.createOscillator(context, frequency * 0.75, 'sine');
        const gainNode2 = this.createGainNode(context, gain * 0.6);
        
        oscillator2.connect(filter);
        gainNode2.gain.setValueAtTime(0, now);
        gainNode2.gain.linearRampToValueAtTime(gain * 0.6, now + 0.02);
        gainNode2.gain.exponentialRampToValueAtTime(0.001, now + duration);
        
        oscillator2.start(now);
        oscillator2.stop(now + duration);
      }

      // Start and stop oscillator
      oscillator.start(now);
      oscillator.stop(now + duration);

    } catch (error) {
      console.warn('Error playing sound:', error);
    }
  }

  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  isAudioEnabled(): boolean {
    return this.isEnabled && this.audioContext !== null;
  }
}

// Create singleton instance
export const audioManager = new AudioManager();

// Convenience functions
export const playNumberSound = () => audioManager.playSound(SoundType.NUMBER);
export const playOperatorSound = () => audioManager.playSound(SoundType.OPERATOR);
export const playEqualsSound = () => audioManager.playSound(SoundType.EQUALS);
export const playClearSound = () => audioManager.playSound(SoundType.CLEAR);
export const playDeleteSound = () => audioManager.playSound(SoundType.DELETE);
// Web Audio API based BIOS beep sound generator
// Used in "Kompyuter Detektivi" to reproduce real motherboard POST speaker sounds!

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playBeep(frequency = 800, durationMs = 150): Promise<void> {
  return new Promise((resolve) => {
    try {
      const ctx = getAudioContext();
      if (!ctx) {
        resolve();
        return;
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square'; // Motherboard piezo speaker tone
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + durationMs / 1000);

      setTimeout(() => {
        resolve();
      }, durationMs);
    } catch {
      resolve();
    }
  });
}

export async function playBeepPattern(pattern: '3-short' | '1-long-2-short' | '1-short' | 'continuous' | '5-short'): Promise<void> {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (pattern === '1-short') {
      // Normal POST OK
      await playBeep(850, 120);
    } else if (pattern === '3-short') {
      // RAM fault
      for (let i = 0; i < 3; i++) {
        await playBeep(850, 160);
        await new Promise((r) => setTimeout(r, 120));
      }
    } else if (pattern === '1-long-2-short') {
      // GPU fault
      await playBeep(850, 500);
      await new Promise((r) => setTimeout(r, 150));
      await playBeep(850, 160);
      await new Promise((r) => setTimeout(r, 120));
      await playBeep(850, 160);
    } else if (pattern === '5-short') {
      // CPU fault
      for (let i = 0; i < 5; i++) {
        await playBeep(900, 140);
        await new Promise((r) => setTimeout(r, 100));
      }
    } else if (pattern === 'continuous') {
      // Power / Motherboard severe
      for (let i = 0; i < 4; i++) {
        await playBeep(800, 400);
        await new Promise((r) => setTimeout(r, 80));
      }
    }
  } catch {
    // Audio context may require user interaction
  }
}

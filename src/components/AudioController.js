import { birthdayConfig } from '../config';

// Web Audio API procedural sound system + Custom Audio file player
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.bgmPlaying = false;
    this.bgmTimer = null;
    this.masterGain = null;
    this.customAudio = null;
    this.usingCustomAudio = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBGM();
    } else {
      this.startBGM();
    }
    return this.isMuted;
  }

  playTone(freq, duration = 0.4, type = 'sine', gainVal = 0.08, delay = 0) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    try {
      const startTime = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      // Smooth attack and soft decay to prevent clicks
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(gainVal, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    } catch (e) {
      // Audio safety
    }
  }

  // Calm star chime
  playStarChime(index = 0) {
    const chords = [
      [523.25, 659.25, 783.99, 1046.50], // C5, E5, G5, C6
      [587.33, 739.99, 880.00, 1174.66], // D5, F#5, A5, D6
      [659.25, 830.61, 987.77, 1318.51]  // E5, G#5, B5, E6
    ];
    const chord = chords[index % chords.length];
    chord.forEach((freq, i) => {
      this.playTone(freq, 0.9, 'sine', 0.07, i * 0.1);
    });
  }

  // Gentle flower bloom sparkle
  playBloomSparkle() {
    const freqs = [659.25, 783.99, 987.77, 1318.51];
    freqs.forEach((f, i) => {
      this.playTone(f, 0.5, 'sine', 0.05, i * 0.08);
    });
  }

  // Soft mushroom pop
  playMushroomBoing() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, startTime);
      osc.frequency.exponentialRampToValueAtTime(440, startTime + 0.15);
      osc.frequency.exponentialRampToValueAtTime(330, startTime + 0.3);

      gain.gain.setValueAtTime(0.08, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + 0.38);
    } catch (e) {}
  }

  playFireflyGlow() {
    const freqs = [880, 1108.73, 1318.51];
    freqs.forEach((f, i) => {
      this.playTone(f, 0.35, 'sine', 0.04, i * 0.07);
    });
  }

  // Soft wind puff when blowing candles
  playBlowWind() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    try {
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.7);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.5;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.7);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.7);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      whiteNoise.start();
      whiteNoise.stop(this.ctx.currentTime + 0.72);

      setTimeout(() => {
        this.playCelebrationFanfare();
      }, 400);
    } catch (e) {}
  }

  // Warm celebration fanfare
  playCelebrationFanfare() {
    const arpeggio = [
      { f: 523.25, d: 0.0 }, // C5
      { f: 659.25, d: 0.12 }, // E5
      { f: 783.99, d: 0.24 }, // G5
      { f: 1046.50, d: 0.36 }, // C6
      { f: 880.00, d: 0.54 }, // A5
      { f: 1046.50, d: 0.7 }, // C6
      { f: 1318.51, d: 0.88 }  // E6
    ];
    arpeggio.forEach(({ f, d }) => {
      this.playTone(f, 0.8, 'sine', 0.09, d);
    });
  }

  // Letter shimmer
  playLetterOpen() {
    const notes = [440, 554.37, 659.25, 830.61, 987.77];
    notes.forEach((f, i) => {
      this.playTone(f, 0.6, 'sine', 0.06, i * 0.08);
    });
  }

  // Authentic festive firework boom & sparkling star crackle
  playFireworkSound() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.45);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.48);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.5);

      [987.77, 1318.51, 1567.98, 1975.53].forEach((freq, idx) => {
        this.playTone(freq, 0.35, 'sine', 0.045, 0.08 + idx * 0.04);
      });
    } catch (e) {}
  }

  // Heavenly ascending chime when sky lantern is released
  playLanternRise() {
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    notes.forEach((f, i) => {
      this.playTone(f, 0.9, 'sine', 0.05, i * 0.09);
    });
  }

  // Background Music: Automatically loads & plays user's MP3 file (e.g. bday.mp3, music.mp3)
  // with multi-path sanitization and seamless fallback to procedural lullaby!
  startBGM() {
    if (this.bgmPlaying || this.isMuted) return;
    this.init();
    this.bgmPlaying = true;

    // Helper to sanitize any path input (removing quotes, backslashes, windows drives)
    const sanitizePath = (p) => {
      if (!p) return null;
      let clean = p.replace(/["']/g, '').trim();
      const match = clean.match(/[\\/]([^\\/]+)$/);
      if (match) {
        clean = match[1];
      }
      if (!clean.startsWith('/')) {
        clean = '/' + clean;
      }
      return clean;
    };

    const targetPath = sanitizePath(birthdayConfig.customMusicPath) || '/bday.mp3';

    // List of candidates to try in order (handles double extensions like .mp3.mp3 or alternate names)
    const candidates = [
      targetPath,
      '/bday.mp3',
      '/bday.mp3.mp3',
      '/music.mp3',
      '/bgm.mp3'
    ].filter((v, i, a) => a.indexOf(v) === i);

    let candidateIdx = 0;

    const tryPlayCandidate = () => {
      if (!this.bgmPlaying || this.isMuted) return;

      if (candidateIdx >= candidates.length) {
        // No custom audio candidate succeeded; smoothly play built-in procedural lullaby
        this.usingCustomAudio = false;
        this.startProceduralLullaby();
        return;
      }

      const currentSrc = candidates[candidateIdx];
      candidateIdx++;

      if (this.customAudio) {
        try {
          this.customAudio.pause();
        } catch (e) {}
      }

      const audio = new Audio(currentSrc);
      audio.loop = true;
      audio.volume = 0.65;

      audio
        .play()
        .then(() => {
          this.customAudio = audio;
          this.usingCustomAudio = true;
        })
        .catch(() => {
          // If playback failed or 404, try next candidate
          tryPlayCandidate();
        });
    };

    tryPlayCandidate();
  }

  startProceduralLullaby() {
    if (!this.bgmPlaying || this.isMuted) return;

    // Peaceful pentatonic lullaby sequence
    const melody = [
      523.25, 659.25, 783.99, 1046.50,
      880.00, 783.99, 659.25, 523.25,
      587.33, 698.46, 880.00, 1046.50,
      987.77, 880.00, 783.99, 659.25
    ];

    const harmony = [
      261.63, 329.63, 392.00, 440.00,
      293.66, 349.23, 440.00, 493.88
    ];

    let noteIdx = 0;
    const playNextNote = () => {
      if (!this.bgmPlaying || this.isMuted || this.usingCustomAudio) return;

      const f = melody[noteIdx % melody.length];
      const h = harmony[Math.floor(noteIdx / 2) % harmony.length];

      // Soft music box chime
      this.playTone(f, 1.2, 'sine', 0.035);

      // Deep gentle harp bass every 4 notes
      if (noteIdx % 4 === 0) {
        this.playTone(h, 2.0, 'sine', 0.03);
      }

      noteIdx++;
      this.bgmTimer = setTimeout(playNextNote, 520);
    };

    playNextNote();
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.customAudio) {
      try {
        this.customAudio.pause();
      } catch (e) {}
    }
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }
}

export const sound = new SoundEffects();

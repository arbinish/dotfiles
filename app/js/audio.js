/**
 * AvanzaMath - Audio Engine
 * Combines Native Web Speech API (bilingual TTS) and Web Audio API synthesized sound FX.
 * Zero external mp3/wav downloads required (100% lightweight & offline).
 */

class AudioEngine {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = localStorage.getItem('avanzamath_sound') !== '0';
    // Auto-read aloud is OFF by default to avoid interrupting the user
    this.autoReadEnabled = localStorage.getItem('avanzamath_autoread') === '1';
    this.speechSynthesis = window.speechSynthesis || null;
    this.voices = [];

    this.initAudioContext();
    this.loadVoices();

    if (this.speechSynthesis && this.speechSynthesis.onvoiceschanged !== undefined) {
      this.speechSynthesis.onvoiceschanged = () => this.loadVoices();
    }
  }

  initAudioContext() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      this.audioCtx = new AudioContext();
    }
  }

  ensureAudioContext() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  loadVoices() {
    if (!this.speechSynthesis) return;
    this.voices = this.speechSynthesis.getVoices();
  }

  getBestVoice(lang) {
    if (!this.voices || this.voices.length === 0) {
      this.loadVoices();
    }

    if (lang === 'es') {
      // Prioritize Latin American / Mexican Spanish voices
      const esVoices = this.voices.filter(v => v.lang.startsWith('es'));
      const preferred = esVoices.find(v => v.lang === 'es-MX' || v.lang === 'es-US' || v.lang === 'es-419');
      return preferred || esVoices[0] || null;
    } else {
      // English (US)
      const enVoices = this.voices.filter(v => v.lang.startsWith('en'));
      const preferred = enVoices.find(v => v.lang === 'en-US');
      return preferred || enVoices[0] || null;
    }
  }

  /**
   * Reads text aloud using native browser speech synthesis
   * @param {string} text - Text to speak
   * @param {string} lang - 'es' or 'en'
   * @param {boolean} isAuto - True if triggered automatically upon quest load
   */
  speakText(text, lang = currentLang, isAuto = false) {
    // If it's an automatic read-aloud and auto-read is disabled, skip speaking
    if (isAuto && !this.autoReadEnabled) {
      return;
    }

    if (!this.speechSynthesis) return;

    // Cancel any ongoing speech
    this.speechSynthesis.cancel();

    const cleanText = text.replace(/[*#_~`$]/g, '').replace(/×/g, ' por ').replace(/÷/g, ' entre ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'es' ? 'es-MX' : 'en-US';
    
    const voice = this.getBestVoice(lang);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.rate = 0.92; // Measured rate for elementary learners
    utterance.pitch = 1.05; // Friendly, warm pitch

    this.speechSynthesis.speak(utterance);
  }

  stopSpeech() {
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    localStorage.setItem('avanzamath_sound', this.soundEnabled ? '1' : '0');
    return this.soundEnabled;
  }

  toggleAutoRead() {
    this.autoReadEnabled = !this.autoReadEnabled;
    localStorage.setItem('avanzamath_autoread', this.autoReadEnabled ? '1' : '0');
    if (!this.autoReadEnabled) {
      this.stopSpeech();
    }
    return this.autoReadEnabled;
  }

  // ---- Web Audio API Synthesized Sound Effects ----

  playPop() {
    if (!this.soundEnabled) return;
    this.ensureAudioContext();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(750, this.audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.08);
  }

  playCoin() {
    if (!this.soundEnabled) return;
    this.ensureAudioContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const osc1 = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(987.77, now);
    osc1.frequency.setValueAtTime(1318.51, now + 0.08);

    osc2.frequency.setValueAtTime(987.77, now);
    osc2.frequency.setValueAtTime(1318.51, now + 0.08);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.35);
    osc2.stop(now + 0.35);
  }

  playSuccess() {
    if (!this.soundEnabled) return;
    this.ensureAudioContext();
    if (!this.audioCtx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    const now = this.audioCtx.currentTime;

    notes.forEach((freq, index) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + index * 0.07);

      gain.gain.setValueAtTime(0.2, now + index * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.01, now + index * 0.07 + 0.3);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + index * 0.07);
      osc.stop(now + index * 0.07 + 0.3);
    });
  }

  playCelebration() {
    if (!this.soundEnabled) return;
    this.ensureAudioContext();
    if (!this.audioCtx) return;

    const fanfare = [
      { f: 523.25, d: 0.12 },
      { f: 659.25, d: 0.12 },
      { f: 783.99, d: 0.12 },
      { f: 1046.50, d: 0.28 },
      { f: 880.00, d: 0.12 },
      { f: 1046.50, d: 0.45 }
    ];

    let timeOffset = 0;
    const now = this.audioCtx.currentTime;

    fanfare.forEach((item) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.f, now + timeOffset);

      gain.gain.setValueAtTime(0.25, now + timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.01, now + timeOffset + item.d);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + timeOffset);
      osc.stop(now + timeOffset + item.d);

      timeOffset += item.d * 0.85;
    });
  }

  playGentleHint() {
    if (!this.soundEnabled) return;
    this.ensureAudioContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.setValueAtTime(392, now + 0.12);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }
}

const audio = new AudioEngine();

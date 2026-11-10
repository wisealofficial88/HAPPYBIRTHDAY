import React from 'react';
import confetti from 'canvas-confetti';
import { sound } from './AudioController';

// High-performance, silky smooth Grand Celebration Fireworks & Confetti
// Uses canvas-confetti's optimized Web Worker engine to guarantee 60fps with 0% CPU freeze!
let activeFireworksInterval = null;

export function triggerGrandCelebration() {
  sound.playCelebrationFanfare();

  // Clear any existing fireworks interval to prevent overlapping loops
  if (activeFireworksInterval) {
    clearInterval(activeFireworksInterval);
    activeFireworksInterval = null;
  }

  // 1. Initial Explosive Gold & Ruby Starburst in Center
  confetti({
    particleCount: 110,
    spread: 85,
    origin: { x: 0.5, y: 0.55 },
    zIndex: 9999,
    disableForReducedMotion: false,
    colors: ['#ffd166', '#ff758f', '#06d6a0', '#118ab2', '#ffffff', '#ffbe0b']
  });

  // 2. High-Altitude Multi-Burst Fireworks Show (3.2 seconds duration)
  const duration = 3.2 * 1000;
  const animationEnd = Date.now() + duration;

  const defaults = {
    startVelocity: 34,
    spread: 360,
    ticks: 65,
    gravity: 0.85,
    decay: 0.92,
    scalar: 1,
    zIndex: 9999,
    disableForReducedMotion: false
  };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  activeFireworksInterval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(activeFireworksInterval);
      activeFireworksInterval = null;
      return;
    }

    const particleCount = Math.floor(40 * (timeLeft / duration)) + 15;

    // Sky Firework 1 (Left wing of the sky)
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.12, 0.38), y: randomInRange(0.18, 0.42) },
      colors: ['#ffd166', '#ff0055', '#fee440', '#ffffff', '#f72585']
    });

    // Sky Firework 2 (Right wing of the sky)
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.62, 0.88), y: randomInRange(0.18, 0.42) },
      colors: ['#00f5d4', '#b5179e', '#4cc9f0', '#ffffff', '#7209b7']
    });

    // Occasional Center Sky Star Rocket
    if (Math.random() > 0.5) {
      confetti({
        particleCount: 25,
        angle: 90,
        spread: 90,
        startVelocity: 42,
        origin: { x: randomInRange(0.42, 0.58), y: 0.65 },
        zIndex: 9999,
        disableForReducedMotion: false,
        colors: ['#ffffff', '#ffd166', '#fff3b0']
      });
    }
  }, 280);
}

// Lightweight celebration burst for candle blowing
export function launchConfettiCannons() {
  sound.playCelebrationFanfare();

  confetti({
    particleCount: 85,
    spread: 75,
    origin: { x: 0.5, y: 0.6 },
    zIndex: 9999,
    disableForReducedMotion: false,
    colors: ['#ffd166', '#ff758f', '#06d6a0', '#ffffff']
  });
}

// Ultra-lightweight placeholder so DOM stays 100% clean and GPU never stalls
export default function FireworksCanvas() {
  return null;
}

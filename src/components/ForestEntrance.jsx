import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { sound } from './AudioController';
import { birthdayConfig } from '../config';

export default function ForestEntrance({ onEnter }) {
  const [transitioning, setTransitioning] = useState(false);
  const cfg = birthdayConfig;

  const handleEnter = () => {
    sound.init();
    sound.startBGM();
    sound.playStarChime(0);
    setTransitioning(true);
    setTimeout(() => {
      onEnter();
    }, 900);
  };

  return (
    <div
      className="forest-entrance-container"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 40%, #173d2b 0%, #0c241a 50%, #04100a 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.9s cubic-bezier(0.7, 0, 0.3, 1)',
        transform: transitioning ? 'scale(1.2)' : 'scale(1)',
        opacity: transitioning ? 0 : 1
      }}
    >
      {/* Background Forest Silhouette */}
      <svg
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '60%',
          pointerEvents: 'none',
          opacity: 0.45
        }}
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 350 Q 200 200 400 320 T 800 280 T 1200 340 T 1440 300 L 1440 600 L 0 600 Z"
          fill="#061a10"
        />
      </svg>

      {/* Canopy Arch */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '40%',
          pointerEvents: 'none',
          opacity: 0.7
        }}
        viewBox="0 0 1440 350"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 0 C 180 160, 360 70, 520 130 C 720 200, 920 50, 1100 110 C 1280 160, 1380 40, 1440 0 Z"
          fill="#082315"
        />
      </svg>

      {/* Drifting Fireflies */}
      {Array.from({ length: 18 }).map((_, i) => {
        const left = `${(i * 19) % 92 + 4}%`;
        const top = `${(i * 23) % 80 + 10}%`;
        const dur = `${3.2 + (i % 3) * 1.2}s`;
        const delay = `${(i * 0.5) % 2.5}s`;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left,
              top,
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#fff75e',
              boxShadow: '0 0 10px #fffa65',
              animation: `firefly-glow ${dur} ease-in-out infinite ${delay}`
            }}
          />
        );
      })}

      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.75)',
          pointerEvents: 'none'
        }}
      />

      {/* Center Title Card */}
      <div
        style={{
          zIndex: 20,
          textAlign: 'center',
          padding: '20px',
          maxWidth: '820px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-cursive)',
            fontSize: 'clamp(30px, 5vw, 52px)',
            color: '#ffd166',
            letterSpacing: '0.04em',
            marginBottom: '-6px'
          }}
        >
          {cfg.adventureSubtitle}
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(34px, 6.5vw, 62px)',
            fontWeight: 900,
            letterSpacing: '0.07em',
            background: 'linear-gradient(180deg, #ffffff 0%, #fff3b0 35%, #ffd166 70%, #f77f00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.85))',
            lineHeight: 1.15
          }}
        >
          {cfg.adventureTitle}
        </h1>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '14px',
            color: '#faedcd',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(15px, 2.6vw, 19px)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}
        >
          <span>For {cfg.recipientTitle}</span>
          <span style={{ color: '#ffd166' }}>✦</span>
          <span>From {cfg.senderName}</span>
        </div>

        <div style={{ marginTop: '36px' }}>
          <button
            onClick={handleEnter}
            className="storybook-btn"
            style={{
              fontSize: '17px',
              padding: '16px 44px'
            }}
          >
            <Sparkles size={20} /> Enter The Enchanted Forest
          </button>
        </div>

        <p
          style={{
            marginTop: '18px',
            color: 'rgba(255, 255, 255, 0.75)',
            fontSize: '13px',
            fontStyle: 'italic',
            letterSpacing: '0.04em'
          }}
        >
          Turn on your sound for a calm fairytale melody ✨
        </p>
      </div>

      <svg
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100px',
          pointerEvents: 'none'
        }}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 55 Q 180 25 360 50 T 720 30 T 1080 45 T 1440 35 L 1440 100 L 0 100 Z"
          fill="#061a10"
        />
      </svg>
    </div>
  );
}

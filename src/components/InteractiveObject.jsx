import React, { useState } from 'react';
import { sound } from './AudioController';

export function MushroomInteractive({ x, y, size = 60, label = 'Magic Mushroom' }) {
  const [bounced, setBounced] = useState(false);
  const [spores, setSpores] = useState([]);

  const handleClick = (e) => {
    e.stopPropagation();
    sound.playMushroomBoing();
    setBounced(true);
    setTimeout(() => setBounced(false), 600);

    // Spawn 5 magical spores
    const newSpores = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      dx: (Math.random() - 0.5) * 60,
      dy: -30 - Math.random() * 50,
      color: ['#ffd166', '#a7c957', '#9d4edd', '#f72585'][i % 4]
    }));
    setSpores((prev) => [...prev, ...newSpores]);
    setTimeout(() => {
      setSpores((prev) => prev.filter((s) => !newSpores.includes(s)));
    }, 1200);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'absolute',
        left: `${x}px`,
        bottom: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        cursor: 'pointer',
        zIndex: 15,
        transform: bounced ? 'scale(1.3, 0.8) translateY(-10px)' : 'scale(1)',
        transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
      title="Click to release fairy spores!"
    >
      {/* Floating spores */}
      {spores.map((spore) => (
        <div
          key={spore.id}
          style={{
            position: 'absolute',
            left: `${size / 2}px`,
            top: '0px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: spore.color,
            boxShadow: `0 0 10px ${spore.color}`,
            transform: `translate(${spore.dx}px, ${spore.dy}px)`,
            opacity: 0,
            transition: 'all 1s ease-out',
            pointerEvents: 'none'
          }}
        />
      ))}

      <svg viewBox="0 0 100 100" width={size} height={size}>
        <defs>
          <radialGradient id={`mushCap-${x}`} cx="40%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#ff4d6d" />
            <stop offset="50%" stopColor="#c9184a" />
            <stop offset="100%" stopColor="#590d22" />
          </radialGradient>
          <linearGradient id={`mushStem-${x}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fffaf0" />
            <stop offset="100%" stopColor="#e9d8a6" />
          </linearGradient>
        </defs>

        {/* Stem */}
        <path d="M 40 50 Q 38 85 34 94 Q 50 96 66 94 Q 62 85 60 50 Z" fill={`url(#mushStem-${x})`} />
        {/* Stem gills */}
        <path d="M 38 52 Q 50 56 62 52" fill="none" stroke="#d4a373" strokeWidth="2" />

        {/* Cap */}
        <path
          d="M 15 54 C 15 22, 85 22, 85 54 C 70 58, 30 58, 15 54 Z"
          fill={`url(#mushCap-${x})`}
          filter={bounced ? 'drop-shadow(0 0 16px #ff758f)' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'}
        />

        {/* Spots */}
        <circle cx="34" cy="38" r="5" fill="#ffffff" opacity="0.9" />
        <circle cx="50" cy="30" r="6" fill="#ffffff" opacity="0.9" />
        <circle cx="68" cy="40" r="4.5" fill="#ffffff" opacity="0.9" />
        <circle cx="48" cy="46" r="3.5" fill="#ffffff" opacity="0.85" />
        <circle cx="25" cy="48" r="3" fill="#ffffff" opacity="0.8" />
        <circle cx="75" cy="48" r="2.8" fill="#ffffff" opacity="0.8" />

        {/* Little Baby Mushroom Beside */}
        <path d="M 68 76 Q 66 94 65 96 Q 74 97 82 96 Q 80 94 78 76 Z" fill={`url(#mushStem-${x})`} />
        <path d="M 60 78 C 60 62, 86 62, 86 78 Z" fill="#9d4edd" />
        <circle cx="73" cy="68" r="2.5" fill="#ffffff" />
      </svg>
    </div>
  );
}

export function FlowerInteractive({ x, y, size = 55 }) {
  const [bloomed, setBloomed] = useState(false);
  const [butterflies, setButterflies] = useState([]);

  const handleClick = (e) => {
    e.stopPropagation();
    sound.playBloomSparkle();
    setBloomed(true);

    // Release fairy butterfly
    const bId = Date.now();
    setButterflies((prev) => [...prev, { id: bId }]);
    setTimeout(() => {
      setButterflies((prev) => prev.filter((b) => b.id !== bId));
    }, 2500);

    setTimeout(() => setBloomed(false), 1800);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'absolute',
        left: `${x}px`,
        bottom: `${y}px`,
        width: `${size}px`,
        height: `${size * 1.3}px`,
        cursor: 'pointer',
        zIndex: 14
      }}
      title="Click to awaken enchanted butterfly!"
    >
      {/* Released Butterfly */}
      {butterflies.map((b) => (
        <div
          key={b.id}
          style={{
            position: 'absolute',
            top: '-20px',
            left: '10px',
            animation: 'butterfly-flight 2.4s ease-out forwards',
            pointerEvents: 'none',
            zIndex: 40
          }}
        >
          <svg viewBox="0 0 50 40" width="36" height="30">
            <style>
              {`
                @keyframes butterfly-flight {
                  0% { transform: translate(0, 0) scale(0.6) rotate(0deg); opacity: 1; }
                  40% { transform: translate(30px, -60px) scale(1) rotate(15deg); opacity: 1; }
                  80% { transform: translate(60px, -120px) scale(0.9) rotate(-10deg); opacity: 0.8; }
                  100% { transform: translate(90px, -180px) scale(0.7) rotate(20deg); opacity: 0; }
                }
                @keyframes flap-left {
                  0%, 100% { transform: scaleX(1); }
                  50% { transform: scaleX(0.1); }
                }
                @keyframes flap-right {
                  0%, 100% { transform: scaleX(1); }
                  50% { transform: scaleX(0.1); }
                }
              `}
            </style>
            {/* Left Wings */}
            <path
              d="M 25 20 C 10 5, 2 12, 4 24 C 6 32, 18 30, 25 24 Z"
              fill="#ff9ff3"
              style={{ transformOrigin: '25px 20px', animation: 'flap-left 0.18s infinite' }}
            />
            {/* Right Wings */}
            <path
              d="M 25 20 C 40 5, 48 12, 46 24 C 44 32, 32 30, 25 24 Z"
              fill="#54a0ff"
              style={{ transformOrigin: '25px 20px', animation: 'flap-right 0.18s infinite' }}
            />
            <circle cx="25" cy="22" r="2" fill="#2d3436" />
          </svg>
        </div>
      ))}

      <svg viewBox="0 0 100 130" width={size} height={size * 1.3}>
        {/* Stem */}
        <path d="M 50 130 Q 45 90 50 55" fill="none" stroke="#2d6a4f" strokeWidth="4" strokeLinecap="round" />
        {/* Leaves */}
        <path d="M 48 95 Q 30 85 24 95 Q 35 105 48 97" fill="#40916c" />
        <path d="M 50 80 Q 68 70 76 80 Q 65 92 50 82" fill="#52b788" />

        {/* Flower Blossom Petals with bloom transform */}
        <g
          style={{
            transformOrigin: '50px 50px',
            transform: bloomed ? 'scale(1.28) rotate(15deg)' : 'scale(1) rotate(0deg)',
            transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        >
          {/* Petals */}
          <circle cx="50" cy="30" r="14" fill="#ff758f" />
          <circle cx="68" cy="42" r="14" fill="#ff4d6d" />
          <circle cx="62" cy="62" r="14" fill="#ff758f" />
          <circle cx="38" cy="62" r="14" fill="#ff4d6d" />
          <circle cx="32" cy="42" r="14" fill="#ff758f" />

          {/* Golden Center */}
          <circle cx="50" cy="48" r="12" fill="#ffd166" />
          <circle cx="50" cy="48" r="7" fill="#e85d04" />
          {/* Sparkle Dots */}
          <circle cx="48" cy="45" r="1.5" fill="#ffffff" />
          <circle cx="53" cy="49" r="1.2" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}

export function GlowingRuneStoneInteractive({ x, y, size = 65 }) {
  const [ignited, setIgnited] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    sound.playBloomSparkle();
    setIgnited(true);
    setTimeout(() => setIgnited(false), 2000);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'absolute',
        left: `${x}px`,
        bottom: `${y}px`,
        width: `${size}px`,
        height: `${size * 1.2}px`,
        cursor: 'pointer',
        zIndex: 14
      }}
      title="Ancient forest guardian stone - tap to awaken runes!"
    >
      <svg viewBox="0 0 100 120" width={size} height={size * 1.2}>
        <defs>
          <linearGradient id={`stoneGrad-${x}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#495057" />
            <stop offset="50%" stopColor="#343a40" />
            <stop offset="100%" stopColor="#212529" />
          </linearGradient>
        </defs>

        {/* Mossy Ancient Stone */}
        <path
          d="M 25 115 L 20 50 Q 22 20 50 16 Q 78 20 80 50 L 75 115 Z"
          fill={`url(#stoneGrad-${x})`}
          filter="drop-shadow(0 6px 10px rgba(0,0,0,0.5))"
        />

        {/* Moss Overgrowth */}
        <path d="M 22 45 Q 35 35 48 42 Q 38 60 22 55 Z" fill="#2d6a4f" opacity="0.8" />
        <path d="M 78 70 Q 65 65 62 80 Q 75 88 77 75 Z" fill="#40916c" opacity="0.8" />

        {/* Magical Runic Symbols */}
        <g
          stroke={ignited ? '#00f5d4' : '#80ed99'}
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: ignited ? 'drop-shadow(0 0 10px #00f5d4) drop-shadow(0 0 20px #70e000)' : 'none',
            transition: 'all 0.3s ease'
          }}
        >
          {/* Heart / Tree Rune */}
          <path d="M 50 35 L 50 85" />
          <path d="M 50 50 L 35 40" />
          <path d="M 50 50 L 65 40" />
          <path d="M 50 68 L 32 58" />
          <path d="M 50 68 L 68 58" />
          <circle cx="50" cy="95" r="4" fill={ignited ? '#00f5d4' : '#80ed99'} />
        </g>
      </svg>
    </div>
  );
}

export function FireflySwarmInteractive({ x, y, onAttractDeer }) {
  const [swirling, setSwirling] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    sound.playFireflyGlow();
    setSwirling(true);
    if (onAttractDeer) onAttractDeer();
    setTimeout(() => setSwirling(false), 2000);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'absolute',
        left: `${x}px`,
        bottom: `${y}px`,
        width: '80px',
        height: '80px',
        cursor: 'pointer',
        zIndex: 22
      }}
      title="Swarm of fairy fireflies - click to call them!"
    >
      {[
        { dx: 15, dy: 25, delay: '0s' },
        { dx: 45, dy: 15, delay: '0.6s' },
        { dx: 30, dy: 55, delay: '1.2s' },
        { dx: 60, dy: 45, delay: '0.9s' }
      ].map((ff, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${ff.dx}px`,
            top: `${ff.dy}px`,
            width: '9px',
            height: '9px',
            borderRadius: '50%',
            backgroundColor: '#fffa65',
            boxShadow: '0 0 12px #fffa65, 0 0 24px #ffd166',
            animation: `firefly-glow 2s ease-in-out infinite ${ff.delay}`,
            transform: swirling ? 'scale(1.8) translateY(-25px)' : 'scale(1)',
            transition: 'transform 0.5s ease'
          }}
        />
      ))}
    </div>
  );
}

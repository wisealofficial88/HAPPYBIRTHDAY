import React, { useState } from 'react';
import { sound } from './AudioController';

export default function StarCollectible({
  x,
  y,
  starIndex,
  isCollected,
  onCollect
}) {
  const [bursting, setBursting] = useState(false);

  if (isCollected && !bursting) return null;

  const handleClick = (e) => {
    e.stopPropagation();
    if (isCollected || bursting) return;

    sound.playStarChime(starIndex);
    setBursting(true);

    if (onCollect) {
      onCollect(starIndex);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="star-collectible-container"
      style={{
        position: 'absolute',
        left: `${x}px`,
        bottom: `${y}px`,
        width: '64px',
        height: '64px',
        cursor: 'pointer',
        zIndex: 25,
        transform: bursting ? 'scale(2.2) translateY(-40px)' : 'scale(1)',
        opacity: bursting ? 0 : 1,
        transition: 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.7s ease',
        pointerEvents: bursting ? 'none' : 'auto'
      }}
      title="Magical Starlight - Click to collect!"
    >
      {/* Floating aura */}
      <div
        style={{
          position: 'absolute',
          top: '-15px',
          left: '-15px',
          right: '-15px',
          bottom: '-15px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 230, 100, 0.45) 0%, rgba(255, 200, 50, 0) 70%)',
          animation: 'star-pulse 2.2s ease-in-out infinite'
        }}
      />

      <svg viewBox="0 0 100 100" width="64" height="64" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id={`starGrad-${starIndex}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff9db" />
            <stop offset="35%" stopColor="#ffd43b" />
            <stop offset="100%" stopColor="#f59f00" />
          </linearGradient>

          <filter id={`starGlowFilter-${starIndex}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Orbiting sparkles */}
        <circle cx="20" cy="20" r="3" fill="#ffffff" style={{ animation: 'magic-sparkle 1.8s infinite' }} />
        <circle cx="80" cy="25" r="2.5" fill="#ffe066" style={{ animation: 'magic-sparkle 2.2s infinite 0.4s' }} />
        <circle cx="75" cy="80" r="3" fill="#ffffff" style={{ animation: 'magic-sparkle 2s infinite 0.8s' }} />
        <circle cx="22" cy="75" r="2.2" fill="#ffd43b" style={{ animation: 'magic-sparkle 1.6s infinite 0.2s' }} />

        {/* Five-point Golden Star */}
        <path
          d="M 50 10 
             L 62 36 
             L 90 38 
             L 68 56 
             L 75 84 
             L 50 69 
             L 25 84 
             L 32 56 
             L 10 38 
             L 38 36 Z"
          fill={`url(#starGrad-${starIndex})`}
          stroke="#fff4e6"
          strokeWidth="2.5"
          filter={`url(#starGlowFilter-${starIndex})`}
          style={{
            transformOrigin: '50px 50px',
            animation: 'star-pulse 3s ease-in-out infinite'
          }}
        />

        {/* Inner Diamond Shimmer */}
        <polygon points="50,28 56,50 50,72 44,50" fill="#ffffff" opacity="0.6" />
        <polygon points="28,50 50,44 72,50 50,56" fill="#ffffff" opacity="0.6" />
        <circle cx="50" cy="50" r="4.5" fill="#ffffff" />
      </svg>
    </div>
  );
}

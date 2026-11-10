import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { launchConfettiCannons } from './FireworksCanvas';
import { sound } from './AudioController';
import { Wind, Sparkles } from 'lucide-react';

export default function CakeInteraction({ onCandlesBlown, isBlown = false }) {
  const [blowing, setBlowing] = useState(false);
  const [blown, setBlown] = useState(isBlown);

  const handleBlow = () => {
    if (blown || blowing) return;
    setBlowing(true);
    sound.playBlowWind();

    setTimeout(() => {
      setBlown(true);
      setBlowing(false);
      launchConfettiCannons();
      if (onCandlesBlown) onCandlesBlown();
    }, 700);
  };

  const candlePositions = [
    { x: 80, y: 70 },
    { x: 110, y: 65 },
    { x: 140, y: 70 }
  ];

  return (
    <div
      className="cake-interaction-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      <div style={{ position: 'relative', width: '220px', height: '220px' }}>
        {/* Wind gust animation overlay */}
        {blowing && (
          <div
            style={{
              position: 'absolute',
              top: '30px',
              left: '-20px',
              width: '260px',
              height: '80px',
              pointerEvents: 'none',
              zIndex: 35,
              animation: 'wind-gust 0.7s ease-out'
            }}
          >
            <svg viewBox="0 0 200 60" width="200" height="60">
              <path
                d="M 10 20 Q 80 10 130 25 T 190 20"
                fill="none"
                stroke="rgba(255,255,255,0.75)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 25 35 Q 90 25 140 40 T 180 32"
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}

        <svg viewBox="0 0 220 220" width="220" height="220" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="cakePlate" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8f9fa" />
              <stop offset="50%" stopColor="#dee2e6" />
              <stop offset="100%" stopColor="#adb5bd" />
            </linearGradient>

            <linearGradient id="tierBottom" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffe5d9" />
              <stop offset="50%" stopColor="#ffd7ba" />
              <stop offset="100%" stopColor="#fec89a" />
            </linearGradient>

            <linearGradient id="tierMid" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffcad4" />
              <stop offset="50%" stopColor="#ffb4a2" />
              <stop offset="100%" stopColor="#e5989b" />
            </linearGradient>

            <linearGradient id="tierTop" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fff1e6" />
              <stop offset="50%" stopColor="#fde2e4" />
              <stop offset="100%" stopColor="#fad2e1" />
            </linearGradient>

            <linearGradient id="cakeFrosting" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fff0f3" />
            </linearGradient>

            <radialGradient id="flameGrad" cx="50%" cy="75%" r="60%">
              <stop offset="0%" stopColor="#fff3b0" />
              <stop offset="40%" stopColor="#ffd166" />
              <stop offset="80%" stopColor="#f77f00" />
              <stop offset="100%" stopColor="#d62828" />
            </radialGradient>
          </defs>

          {/* Pedestal */}
          <ellipse cx="110" cy="208" rx="88" ry="12" fill="url(#cakePlate)" />
          <ellipse cx="110" cy="204" rx="80" ry="10" fill="#ffffff" />

          {/* TIER 1 */}
          <path d="M 45 160 Q 110 170 175 160 L 175 198 Q 110 208 45 198 Z" fill="url(#tierBottom)" />
          <ellipse cx="110" cy="160" rx="65" ry="10" fill="url(#cakeFrosting)" />
          <path
            d="M 45 160 Q 55 174 65 162 Q 75 178 85 162 Q 95 180 110 162 Q 125 178 135 162 Q 145 175 155 162 Q 165 174 175 160"
            fill="none"
            stroke="#ffffff"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* TIER 2 */}
          <path d="M 60 120 Q 110 128 160 120 L 160 155 Q 110 164 60 155 Z" fill="url(#tierMid)" />
          <ellipse cx="110" cy="120" rx="50" ry="8" fill="url(#cakeFrosting)" />
          <circle cx="75" cy="138" r="3.5" fill="#ffd166" />
          <circle cx="92" cy="142" r="3.5" fill="#ffd166" />
          <circle cx="110" cy="143" r="3.5" fill="#ffd166" />
          <circle cx="128" cy="142" r="3.5" fill="#ffd166" />
          <circle cx="145" cy="138" r="3.5" fill="#ffd166" />

          {/* TIER 3 */}
          <path d="M 75 85 Q 110 92 145 85 L 145 116 Q 110 124 75 116 Z" fill="url(#tierTop)" />
          <ellipse cx="110" cy="85" rx="35" ry="7" fill="url(#cakeFrosting)" />

          {/* Piped Rosettes */}
          <circle cx="85" cy="84" r="5" fill="#ff4d6d" />
          <circle cx="110" cy="86" r="6" fill="#ff4d6d" />
          <circle cx="135" cy="84" r="5" fill="#ff4d6d" />

          {/* CANDLES */}
          {candlePositions.map((c, i) => (
            <g key={i}>
              <rect x={c.x - 3.5} y={c.y} width="7" height="18" rx="2" fill={i === 1 ? '#ffd166' : '#ff9ff3'} />
              <line x1={c.x - 3.5} y1={c.y + 6} x2={c.x + 3.5} y2={c.y + 3} stroke="#ffffff" strokeWidth="1.5" />
              <line x1={c.x - 3.5} y1={c.y + 12} x2={c.x + 3.5} y2={c.y + 9} stroke="#ffffff" strokeWidth="1.5" />
              <line x1={c.x} y1={c.y} x2={c.x} y2={c.y - 4} stroke="#2b2d42" strokeWidth="1.2" />

              {!blown && (
                <g
                  style={{
                    transformOrigin: `${c.x}px ${c.y - 6}px`,
                    animation: `flame-flicker 0.6s infinite ${i * 0.15}s`
                  }}
                >
                  <ellipse cx={c.x} cy={c.y - 12} rx="8" ry="12" fill="rgba(255, 230, 100, 0.4)" />
                  <path
                    d={`M ${c.x} ${c.y - 20} 
                        C ${c.x + 6} ${c.y - 12}, ${c.x + 5} ${c.y - 5}, ${c.x} ${c.y - 4} 
                        C ${c.x - 5} ${c.y - 5}, ${c.x - 6} ${c.y - 12}, ${c.x} ${c.y - 20} Z`}
                    fill="url(#flameGrad)"
                  />
                  <ellipse cx={c.x} cy={c.y - 7} rx="2" ry="3.5" fill="#ffffff" />
                </g>
              )}

              {blown && (
                <g style={{ animation: 'float-particle 2.5s ease-out infinite' }}>
                  <circle cx={c.x} cy={c.y - 8} r="3" fill="rgba(220, 220, 220, 0.6)" />
                  <circle cx={c.x + 2} cy={c.y - 14} r="4" fill="rgba(200, 200, 200, 0.4)" />
                  <circle cx={c.x - 2} cy={c.y - 22} r="5" fill="rgba(200, 200, 200, 0.2)" />
                </g>
              )}
            </g>
          ))}
        </svg>
      </div>

      {!blown && (
        <button
          onClick={handleBlow}
          disabled={blowing}
          className="storybook-btn"
          style={{
            marginTop: '16px',
            fontSize: '15.5px'
          }}
        >
          <Wind size={18} className={blowing ? 'animate-spin' : ''} />
          {blowing ? 'Blowing...' : 'Blow The Candles'}
        </button>
      )}

      {blown && (
        <div
          style={{
            marginTop: '14px',
            padding: '7px 20px',
            background: 'rgba(255, 215, 0, 0.18)',
            border: '1.5px solid #ffd166',
            borderRadius: '9999px',
            color: '#fff3b0',
            fontFamily: 'var(--font-heading)',
            fontSize: '16px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Sparkles size={16} /> Candles Extinguished! A Wish Is Made!
        </div>
      )}
    </div>
  );
}

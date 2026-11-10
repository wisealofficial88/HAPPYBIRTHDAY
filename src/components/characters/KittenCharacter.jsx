import React from 'react';

export default function KittenCharacter({
  isDancing = false,
  direction = 'left',
  scale = 1,
  className = '',
  onClick = null
}) {
  const flip = direction === 'left' ? -1 : 1;

  return (
    <div
      onClick={onClick}
      className={`kitten-character-wrapper ${className}`}
      style={{
        display: 'inline-block',
        transform: `scaleX(${flip}) scale(${scale})`,
        transformOrigin: 'bottom center',
        transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.3, 1)',
        cursor: onClick ? 'pointer' : 'default',
        filter: 'drop-shadow(0 14px 18px rgba(0,0,0,0.48)) drop-shadow(0 4px 6px rgba(0,0,0,0.3))',
        willChange: 'transform'
      }}
    >
      <svg
        viewBox="0 0 170 190"
        width="135"
        height="150"
        style={{ overflow: 'visible' }}
        className={isDancing ? 'kitten-dancing' : 'kitten-idle'}
      >
        <defs>
          {/* 3D Volumetric Warm Peach-Ginger Kitten Fur */}
          <radialGradient id="kittenFur3D" cx="38%" cy="32%" r="65%" fx="32%" fy="28%">
            <stop offset="0%" stopColor="#ffd8b8" />
            <stop offset="35%" stopColor="#fca369" />
            <stop offset="75%" stopColor="#e06d29" />
            <stop offset="100%" stopColor="#8d3b0e" />
          </radialGradient>

          {/* 3D Soft White Belly */}
          <radialGradient id="kittenBelly3D" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#fff5eb" />
            <stop offset="100%" stopColor="#fed7b2" />
          </radialGradient>

          {/* 3D Emerald-Aqua Kitten Eye */}
          <radialGradient id="kittenEye3D" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#52b788" />
            <stop offset="45%" stopColor="#2d6a4f" />
            <stop offset="85%" stopColor="#1b4332" />
            <stop offset="100%" stopColor="#081c15" />
          </radialGradient>
        </defs>

        <style>
          {`
            .kitten-idle {
              animation: deer-breathe 3.4s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .kitten-dancing {
              animation: calm-bounce 0.85s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .kitten-tail {
              transform-origin: 35px 140px;
              animation: kitten-tail-curl 3s ease-in-out infinite;
            }
            @keyframes kitten-tail-curl {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-16deg) scale(1.05); }
            }
            .kitten-eye {
              transform-origin: 104px 76px;
              animation: blink 4s infinite;
            }
          `}
        </style>

        {/* 3D Ground Contact Shadow */}
        <ellipse cx="85" cy="174" rx="44" ry="11" fill="rgba(4, 12, 8, 0.65)" />
        <ellipse cx="85" cy="174" rx="26" ry="5.5" fill="rgba(2, 6, 4, 0.85)" />

        {/* 3D Curled Kitten Tail with White Tip */}
        <g className="kitten-tail" id="kitten-tail-3d">
          <path
            d="M 40 145 C 15 140, 5 105, 20 85 C 32 70, 45 80, 38 95 C 28 115, 34 135, 40 145 Z"
            fill="url(#kittenFur3D)"
          />
          <circle cx="24" cy="84" r="7" fill="url(#kittenBelly3D)" />
        </g>

        {/* 3D Chubby Body */}
        <ellipse cx="82" cy="132" rx="34" ry="32" fill="url(#kittenFur3D)" />
        <ellipse cx="80" cy="118" rx="18" ry="10" fill="#ffffff" opacity="0.25" />

        {/* 3D White Puffy Chest */}
        <ellipse cx="96" cy="136" rx="18" ry="20" fill="url(#kittenBelly3D)" />

        {/* 3D Pointy Cat Ears */}
        {/* Left Ear */}
        <polygon points="68,54 78,24 92,50" fill="url(#kittenFur3D)" />
        <polygon points="72,50 78,30 88,48" fill="#ffb8b8" />

        {/* Right Ear */}
        <polygon points="98,48 112,22 122,52" fill="url(#kittenFur3D)" />
        <polygon points="102,46 112,28 118,50" fill="#ffb8b8" />

        {/* 3D Round Kitten Head */}
        <circle cx="95" cy="78" r="26" fill="url(#kittenFur3D)" />
        <circle cx="90" cy="70" r="13" fill="#ffffff" opacity="0.3" />

        {/* 3D Chubby White Cheeks */}
        <ellipse cx="88" cy="86" rx="7" ry="5.5" fill="url(#kittenBelly3D)" />
        <ellipse cx="102" cy="86" rx="7" ry="5.5" fill="url(#kittenBelly3D)" />

        {/* 3D Sweet Pink Nose */}
        <polygon points="92,82 98,82 95,87" fill="#ff758f" />
        <circle cx="94.5" cy="83" r="0.8" fill="#ffffff" />

        {/* Kitty Mouth */}
        <path d="M 91 88 Q 95 91 99 88" fill="none" stroke="#8d3b0e" strokeWidth="1.5" strokeLinecap="round" />

        {/* 3D GLOSSY EMERALD EYE */}
        <g className="kitten-eye">
          <ellipse cx="104" cy="74" rx="6.5" ry="7.5" fill="url(#kittenEye3D)" />
          {/* Slit-oval pupil */}
          <ellipse cx="104" cy="74" rx="2.5" ry="5.5" fill="#000000" />
          <circle cx="106" cy="71" r="2.2" fill="#ffffff" />
          <circle cx="102" cy="76" r="1.1" fill="#ffffff" opacity="0.9" />
        </g>

        {/* Delicate Whiskers */}
        <line x1="102" y1="86" x2="118" y2="83" stroke="#8d3b0e" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="102" y1="89" x2="120" y2="90" stroke="#8d3b0e" strokeWidth="1.2" strokeLinecap="round" />

        {/* 3D Paws */}
        <ellipse cx="72" cy="164" rx="10" ry="7" fill="url(#kittenFur3D)" />
        <ellipse cx="94" cy="164" rx="10" ry="7" fill="url(#kittenFur3D)" />
        <ellipse cx="112" cy="164" rx="10" ry="7" fill="url(#kittenFur3D)" />
      </svg>
    </div>
  );
}

import React from 'react';

export default function FoxCharacter({
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
      className={`fox-character-wrapper ${className}`}
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
        viewBox="0 0 200 220"
        width="155"
        height="170"
        style={{ overflow: 'visible' }}
        className={isDancing ? 'fox-dancing' : 'fox-idle'}
      >
        <defs>
          {/* 3D Volumetric Red Fox Fur */}
          <radialGradient id="foxFur3D" cx="38%" cy="32%" r="65%" fx="32%" fy="28%">
            <stop offset="0%" stopColor="#ff7b25" />
            <stop offset="35%" stopColor="#e65100" />
            <stop offset="75%" stopColor="#b73a00" />
            <stop offset="100%" stopColor="#6e2300" />
          </radialGradient>

          {/* 3D Fluffy White Chest & Snout */}
          <radialGradient id="foxWhite3D" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#fff3e0" />
            <stop offset="100%" stopColor="#f5cd79" />
          </radialGradient>

          {/* 3D Eye */}
          <radialGradient id="foxEye3D" cx="42%" cy="38%" r="55%">
            <stop offset="0%" stopColor="#5c3822" />
            <stop offset="50%" stopColor="#2e1509" />
            <stop offset="100%" stopColor="#080201" />
          </radialGradient>
        </defs>

        <style>
          {`
            .fox-idle {
              animation: deer-breathe 3.4s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .fox-dancing {
              animation: calm-bounce 0.88s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .fox-tail {
              transform-origin: 40px 150px;
              animation: fox-tail-wag 2.8s ease-in-out infinite;
            }
            @keyframes fox-tail-wag {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-10deg) scale(1.05); }
            }
            .fox-eye {
              transform-origin: 125px 82px;
              animation: blink 4s infinite;
            }
          `}
        </style>

        {/* 3D Ground Contact Shadow */}
        <ellipse cx="100" cy="200" rx="55" ry="14" fill="rgba(4, 12, 8, 0.65)" />
        <ellipse cx="100" cy="200" rx="34" ry="7" fill="rgba(2, 6, 4, 0.85)" />

        {/* 3D Bushy Tail with White Tip */}
        <g className="fox-tail" id="fox-tail-3d">
          <path
            d="M 45 155 
               C 10 145, -15 110, 8 75 
               C 22 55, 48 60, 56 85 
               C 62 105, 58 135, 45 155 Z"
            fill="url(#foxFur3D)"
          />
          {/* White Tail Tip */}
          <path
            d="M 8 75 C 22 55, 48 60, 56 85 C 42 75, 25 72, 8 75 Z"
            fill="url(#foxWhite3D)"
          />
          <path d="M 22 70 Q 32 62 42 74" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.4" strokeLinecap="round" />
        </g>

        {/* 3D Body */}
        <ellipse cx="98" cy="148" rx="38" ry="34" fill="url(#foxFur3D)" />
        <ellipse cx="95" cy="132" rx="22" ry="10" fill="#ffffff" opacity="0.25" />

        {/* 3D White Chest Fluff */}
        <path
          d="M 115 130 C 130 145, 125 170, 110 178 C 100 170, 102 145, 115 130 Z"
          fill="url(#foxWhite3D)"
        />

        {/* 3D Pointed Ears */}
        {/* Left Ear */}
        <polygon points="98,40 114,15 125,48" fill="url(#foxFur3D)" />
        <polygon points="104,36 114,19 120,44" fill="#1b120c" />
        <polygon points="106,38 114,24 118,44" fill="url(#foxWhite3D)" />

        {/* Right Ear */}
        <polygon points="128,45 145,18 152,52" fill="url(#foxFur3D)" />
        <polygon points="134,42 145,22 148,48" fill="#1b120c" />
        <polygon points="136,44 145,27 146,48" fill="url(#foxWhite3D)" />

        {/* 3D Fox Head */}
        <circle cx="122" cy="85" r="28" fill="url(#foxFur3D)" />
        <circle cx="116" cy="76" r="14" fill="#ffffff" opacity="0.3" />

        {/* White Cheeks & Snout */}
        <path
          d="M 125 82 C 145 84, 158 98, 148 108 C 132 112, 115 106, 125 82 Z"
          fill="url(#foxWhite3D)"
        />

        {/* 3D Glossy Black Nose */}
        <polygon points="152,95 160,95 156,102" fill="#120703" />
        <circle cx="155" cy="96" r="1" fill="#ffffff" />

        {/* Cute Smug Fox Smile */}
        <path d="M 144 103 Q 150 106 154 102" fill="none" stroke="#6e2300" strokeWidth="1.6" strokeLinecap="round" />

        {/* 3D GLOSSY PIXAR EYE */}
        <g className="fox-eye">
          <ellipse cx="126" cy="78" rx="6" ry="7" fill="url(#foxEye3D)" />
          <circle cx="126" cy="78" r="4" fill="#000000" />
          <circle cx="128" cy="76" r="2.2" fill="#ffffff" />
          <circle cx="124.5" cy="80" r="1.1" fill="#ffffff" />
          {/* Eyelash / Brow */}
          <path d="M 120 72 Q 126 69 132 72" fill="none" stroke="#2b0e00" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* 3D Dark Stocking Legs */}
        {/* Back Leg */}
        <path d="M 76 160 Q 72 185 75 198 L 86 198 Q 88 185 88 165 Z" fill="#24140e" />
        {/* Front Legs */}
        <path d="M 112 165 Q 110 185 112 198 L 122 198 Q 124 185 124 168 Z" fill="#24140e" />
        <path d="M 132 165 Q 130 185 132 198 L 142 198 Q 144 185 144 168 Z" fill="#24140e" />
      </svg>
    </div>
  );
}

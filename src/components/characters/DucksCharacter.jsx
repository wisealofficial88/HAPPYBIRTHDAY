import React from 'react';

export default function DucksCharacter({
  isDancing = false,
  direction = 'right',
  scale = 1,
  className = '',
  onClick = null
}) {
  const flip = direction === 'left' ? -1 : 1;

  return (
    <div
      onClick={onClick}
      className={`ducks-character-wrapper ${className}`}
      style={{
        display: 'inline-block',
        transform: `scaleX(${flip}) scale(${scale})`,
        transformOrigin: 'bottom center',
        transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.3, 1)',
        cursor: onClick ? 'pointer' : 'default',
        filter: 'drop-shadow(0 14px 18px rgba(0,0,0,0.45)) drop-shadow(0 4px 6px rgba(0,0,0,0.3))',
        willChange: 'transform'
      }}
    >
      <svg
        viewBox="0 0 190 170"
        width="145"
        height="130"
        style={{ overflow: 'visible' }}
        className={isDancing ? 'ducks-dancing' : 'ducks-idle'}
      >
        <defs>
          {/* 3D Pearlescent White Duck Feathers */}
          <radialGradient id="duckWhite3D" cx="38%" cy="32%" r="65%" fx="32%" fy="28%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#f8f9fa" />
            <stop offset="85%" stopColor="#dee2e6" />
            <stop offset="100%" stopColor="#adb5bd" />
          </radialGradient>

          {/* 3D Fluffy Yellow Duckling */}
          <radialGradient id="ducklingYellow3D" cx="38%" cy="32%" r="65%" fx="32%" fy="28%">
            <stop offset="0%" stopColor="#fff9db" />
            <stop offset="35%" stopColor="#ffe066" />
            <stop offset="75%" stopColor="#f59f00" />
            <stop offset="100%" stopColor="#d9480f" />
          </radialGradient>

          {/* 3D Glossy Orange Beak */}
          <radialGradient id="duckBeak3D" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffd43b" />
            <stop offset="45%" stopColor="#fd7e14" />
            <stop offset="100%" stopColor="#d9480f" />
          </radialGradient>

          {/* 3D Water Ripples */}
          <radialGradient id="duckWater3D" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#48cae4" />
            <stop offset="65%" stopColor="#0077b6" />
            <stop offset="100%" stopColor="#03045e" />
          </radialGradient>
        </defs>

        <style>
          {`
            .ducks-idle {
              animation: duck-bob 3s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .ducks-dancing {
              animation: calm-bounce 0.85s ease-in-out infinite;
              transform-origin: bottom center;
            }
            @keyframes duck-bob {
              0%, 100% { transform: translate3d(0, 0, 0); }
              50% { transform: translate3d(0, -5px, 0); }
            }
            .duck-eye {
              transform-origin: 104px 52px;
              animation: blink 4s infinite;
            }
            .duckling-eye {
              transform-origin: 145px 82px;
              animation: blink 3.6s infinite 0.5s;
            }
          `}
        </style>

        {/* 3D Water Ripple Rings & Shadow */}
        <ellipse cx="95" cy="148" rx="68" ry="14" fill="rgba(3, 4, 94, 0.45)" />
        <ellipse cx="95" cy="148" rx="55" ry="10" fill="none" stroke="#48cae4" strokeWidth="2" opacity="0.6" />
        <ellipse cx="95" cy="148" rx="35" ry="6" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.75" />

        {/* ================= MOTHER DUCK (3D Volumetric Pearlescent) ================= */}
        <g id="mother-duck-3d">
          {/* 3D Tail Feathers */}
          <path d="M 40 105 Q 30 90 22 88 Q 32 108 45 116 Z" fill="url(#duckWhite3D)" />

          {/* 3D Body Sphere */}
          <ellipse cx="75" cy="115" rx="38" ry="26" fill="url(#duckWhite3D)" />
          <ellipse cx="72" cy="104" rx="20" ry="8" fill="#ffffff" opacity="0.6" />

          {/* 3D Wing (Layered with Feather Shadow) */}
          <path
            d="M 52 110 C 58 100, 85 98, 92 114 C 82 126, 62 126, 52 110 Z"
            fill="url(#duckWhite3D)"
            stroke="#adb5bd"
            strokeWidth="0.8"
          />
          <path d="M 64 108 Q 78 106 84 116" stroke="#ffffff" strokeWidth="1.8" fill="none" opacity="0.7" />

          {/* 3D Curved Neck & Head */}
          <path
            d="M 88 116 C 92 98, 96 82, 102 65 C 108 82, 106 102, 102 118 Z"
            fill="url(#duckWhite3D)"
          />
          <circle cx="102" cy="56" r="16" fill="url(#duckWhite3D)" />
          <circle cx="98" cy="50" r="8" fill="#ffffff" opacity="0.5" />

          {/* 3D Glossy Orange Beak with Specular Gleam */}
          <path
            d="M 112 54 C 124 53, 132 58, 128 64 C 118 66, 110 62, 112 54 Z"
            fill="url(#duckBeak3D)"
          />
          <circle cx="120" cy="57" r="1" fill="#ffffff" />

          {/* 3D GLOSSY EYE */}
          <g className="duck-eye">
            <circle cx="104" cy="52" r="4.2" fill="#1b120c" />
            <circle cx="105" cy="50.5" r="1.6" fill="#ffffff" />
            <circle cx="103" cy="53" r="0.8" fill="#ffffff" />
          </g>
        </g>

        {/* ================= BABY DUCKLING (3D Adorable Fluffy Yellow) ================= */}
        <g id="baby-duckling-3d">
          {/* Tiny Tail */}
          <path d="M 125 125 Q 120 118 116 116 Q 122 126 128 130 Z" fill="url(#ducklingYellow3D)" />

          {/* 3D Round Body */}
          <ellipse cx="140" cy="128" rx="18" ry="14" fill="url(#ducklingYellow3D)" />
          <ellipse cx="138" cy="122" rx="9" ry="4" fill="#ffffff" opacity="0.4" />

          {/* 3D Tiny Wing */}
          <ellipse cx="136" cy="126" rx="9" ry="6" fill="url(#ducklingYellow3D)" transform="rotate(-15 136 126)" />

          {/* 3D Chubby Head Sphere */}
          <circle cx="148" cy="98" r="13" fill="url(#ducklingYellow3D)" />
          <circle cx="144" cy="92" r="6" fill="#ffffff" opacity="0.5" />

          {/* Rosy Cheek */}
          <ellipse cx="145" cy="103" rx="3.5" ry="2" fill="#ff758f" opacity="0.55" />

          {/* 3D Tiny Cute Beak */}
          <path
            d="M 158 98 C 166 97, 172 101, 168 105 C 160 106, 156 103, 158 98 Z"
            fill="url(#duckBeak3D)"
          />
          <circle cx="163" cy="100" r="0.8" fill="#ffffff" />

          {/* 3D Big Glossy Baby Eye */}
          <g className="duckling-eye">
            <circle cx="150" cy="94" r="3.8" fill="#1b120c" />
            <circle cx="151.2" cy="92.5" r="1.5" fill="#ffffff" />
            <circle cx="149" cy="95" r="0.7" fill="#ffffff" />
          </g>
        </g>
      </svg>
    </div>
  );
}

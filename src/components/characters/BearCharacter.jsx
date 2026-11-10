import React from 'react';

export default function BearCharacter({
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
      className={`bear-character-wrapper ${className}`}
      style={{
        display: 'inline-block',
        transform: `scaleX(${flip}) scale(${scale})`,
        transformOrigin: 'bottom center',
        transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.3, 1)',
        cursor: onClick ? 'pointer' : 'default',
        filter: 'drop-shadow(0 16px 20px rgba(0,0,0,0.5)) drop-shadow(0 4px 8px rgba(0,0,0,0.35))',
        willChange: 'transform'
      }}
    >
      <svg
        viewBox="0 0 200 220"
        width="155"
        height="170"
        style={{ overflow: 'visible' }}
        className={isDancing ? 'bear-dancing' : 'bear-idle'}
      >
        <defs>
          {/* 3D Volumetric Chocolate Bear Fur */}
          <radialGradient id="bearFur3D" cx="38%" cy="32%" r="65%" fx="32%" fy="28%">
            <stop offset="0%" stopColor="#a06535" />
            <stop offset="35%" stopColor="#784212" />
            <stop offset="75%" stopColor="#512e0f" />
            <stop offset="100%" stopColor="#2c1606" />
          </radialGradient>

          {/* 3D Soft Tan Muzzle & Belly */}
          <radialGradient id="bearMuzzle3D" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fae5d3" />
            <stop offset="55%" stopColor="#edbb99" />
            <stop offset="100%" stopColor="#ba7948" />
          </radialGradient>

          {/* 3D Glossy Eye */}
          <radialGradient id="bearEye3D" cx="42%" cy="38%" r="55%">
            <stop offset="0%" stopColor="#5c3822" />
            <stop offset="45%" stopColor="#2b1408" />
            <stop offset="100%" stopColor="#040101" />
          </radialGradient>
        </defs>

        <style>
          {`
            .bear-idle {
              animation: deer-breathe 3.6s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .bear-dancing {
              animation: calm-bounce 0.9s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .bear-ear-l {
              transform-origin: 75px 55px;
              animation: ear-twitch 4s ease-in-out infinite;
            }
            .bear-ear-r {
              transform-origin: 115px 55px;
              animation: ear-twitch 4s ease-in-out infinite 0.5s;
            }
            .bear-eye {
              transform-origin: 108px 78px;
              animation: blink 4.2s infinite;
            }
          `}
        </style>

        {/* 3D Ground Contact Shadow */}
        <ellipse cx="100" cy="202" rx="60" ry="15" fill="rgba(4, 12, 8, 0.65)" />
        <ellipse cx="100" cy="202" rx="38" ry="7.5" fill="rgba(2, 6, 4, 0.85)" />

        {/* 3D Big Round Ears */}
        <g className="bear-ear-l">
          <circle cx="74" cy="52" r="14" fill="url(#bearFur3D)" />
          <circle cx="74" cy="52" r="7" fill="url(#bearMuzzle3D)" />
        </g>
        <g className="bear-ear-r">
          <circle cx="118" cy="52" r="14" fill="url(#bearFur3D)" />
          <circle cx="118" cy="52" r="7" fill="url(#bearMuzzle3D)" />
        </g>

        {/* 3D Giant Huggable Body */}
        <ellipse cx="98" cy="148" rx="46" ry="42" fill="url(#bearFur3D)" />
        <ellipse cx="95" cy="130" rx="26" ry="14" fill="#ffffff" opacity="0.22" />

        {/* 3D Tan Belly */}
        <ellipse cx="105" cy="155" rx="28" ry="26" fill="url(#bearMuzzle3D)" />

        {/* 3D Big Friendly Head */}
        <circle cx="96" cy="85" r="34" fill="url(#bearFur3D)" />
        <circle cx="90" cy="74" r="16" fill="#ffffff" opacity="0.28" />

        {/* 3D Chubby Muzzle */}
        <ellipse cx="112" cy="94" rx="18" ry="14" fill="url(#bearMuzzle3D)" />

        {/* 3D Big Black Nose */}
        <ellipse cx="120" cy="88" rx="7.5" ry="5.5" fill="#1b120c" />
        <circle cx="118" cy="86" r="2" fill="#ffffff" />

        {/* Warm Bear Smile */}
        <path d="M 112 98 Q 118 104 125 98" fill="none" stroke="#512e0f" strokeWidth="2.2" strokeLinecap="round" />

        {/* Rosy Cheeks */}
        <ellipse cx="90" cy="98" rx="7" ry="4.5" fill="#ff758f" opacity="0.45" />

        {/* 3D GLOSSY PIXAR EYE */}
        <g className="bear-eye">
          <circle cx="106" cy="78" r="6" fill="url(#bearEye3D)" />
          <circle cx="106" cy="78" r="4" fill="#000000" />
          <circle cx="108" cy="76" r="2.2" fill="#ffffff" />
          <circle cx="104.5" cy="80" r="1.1" fill="#ffffff" />
        </g>

        {/* 3D Big Paws with Paw Pads */}
        {/* Left Paw */}
        <ellipse cx="68" cy="135" rx="14" ry="11" fill="url(#bearFur3D)" transform="rotate(20 68 135)" />
        <ellipse cx="68" cy="135" rx="7" ry="5" fill="url(#bearMuzzle3D)" transform="rotate(20 68 135)" />

        {/* Right Paw */}
        <ellipse cx="128" cy="138" rx="14" ry="11" fill="url(#bearFur3D)" transform="rotate(-15 128 138)" />
        <ellipse cx="128" cy="138" rx="7" ry="5" fill="url(#bearMuzzle3D)" transform="rotate(-15 128 138)" />

        {/* 3D Big Sturdy Feet */}
        <ellipse cx="80" cy="192" rx="18" ry="10" fill="url(#bearFur3D)" />
        <ellipse cx="118" cy="192" rx="18" ry="10" fill="url(#bearFur3D)" />
      </svg>
    </div>
  );
}

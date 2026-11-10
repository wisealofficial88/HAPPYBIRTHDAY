import React from 'react';

export default function SquirrelCharacter({
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
      className={`squirrel-character-wrapper ${className}`}
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
        className={isDancing ? 'squirrel-dancing' : 'squirrel-idle'}
      >
        <defs>
          {/* 3D Volumetric Auburn Squirrel Fur */}
          <radialGradient id="squirrelFur3D" cx="38%" cy="32%" r="65%" fx="32%" fy="28%">
            <stop offset="0%" stopColor="#f39c12" />
            <stop offset="35%" stopColor="#d35400" />
            <stop offset="75%" stopColor="#a04000" />
            <stop offset="100%" stopColor="#6e2c00" />
          </radialGradient>

          {/* 3D Giant Fluffy Tail */}
          <radialGradient id="squirrelTail3D" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#f8c291" />
            <stop offset="35%" stopColor="#e58e52" />
            <stop offset="75%" stopColor="#ba4a00" />
            <stop offset="100%" stopColor="#6e2c00" />
          </radialGradient>

          {/* 3D Acorn */}
          <radialGradient id="acornNut3D" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#d5a060" />
            <stop offset="60%" stopColor="#87582b" />
            <stop offset="100%" stopColor="#4a2e12" />
          </radialGradient>

          {/* 3D Eye */}
          <radialGradient id="squirrelEye3D" cx="42%" cy="38%" r="55%">
            <stop offset="0%" stopColor="#5c3822" />
            <stop offset="50%" stopColor="#30150b" />
            <stop offset="100%" stopColor="#080201" />
          </radialGradient>
        </defs>

        <style>
          {`
            .squirrel-idle {
              animation: deer-breathe 3.2s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .squirrel-dancing {
              animation: calm-bounce 0.85s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .squirrel-tail {
              transform-origin: 40px 140px;
              animation: squirrel-tail-sway 2.5s ease-in-out infinite;
            }
            @keyframes squirrel-tail-sway {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-8deg) scale(1.04); }
            }
            .squirrel-eye {
              transform-origin: 98px 76px;
              animation: blink 3.8s infinite;
            }
          `}
        </style>

        {/* 3D Ground Contact Shadow */}
        <ellipse cx="85" cy="178" rx="46" ry="12" fill="rgba(4, 12, 8, 0.65)" />
        <ellipse cx="85" cy="178" rx="26" ry="6" fill="rgba(2, 6, 4, 0.85)" />

        {/* 3D Giant Fluffy Tail (Volumetric S-Curve Arching Behind) */}
        <g className="squirrel-tail" id="squirrel-tail-3d">
          <path
            d="M 45 140 
               C 10 130, -5 90, 8 50 
               C 20 12, 55 5, 68 28 
               C 80 50, 70 85, 48 105 
               C 35 118, 40 135, 45 140 Z"
            fill="url(#squirrelTail3D)"
          />
          {/* 3D Specular Highlight on Tail Crest */}
          <path d="M 22 45 C 32 18, 55 14, 64 30" fill="none" stroke="#ffffff" strokeWidth="4.5" opacity="0.35" strokeLinecap="round" />
          <path d="M 30 70 C 45 45, 58 45, 52 75" fill="none" stroke="#f8c291" strokeWidth="2.5" opacity="0.4" strokeLinecap="round" />
        </g>

        {/* 3D Chubby Body */}
        <ellipse cx="85" cy="135" rx="32" ry="34" fill="url(#squirrelFur3D)" />
        <ellipse cx="85" cy="120" rx="18" ry="10" fill="#ffffff" opacity="0.25" />

        {/* 3D Fluffy White Chest & Belly */}
        <ellipse cx="94" cy="138" rx="20" ry="22" fill="#ffffff" />
        <ellipse cx="92" cy="134" rx="10" ry="10" fill="#ffffff" opacity="0.8" />

        {/* 3D Cute Ears */}
        <ellipse cx="78" cy="55" rx="7" ry="14" fill="url(#squirrelFur3D)" transform="rotate(-15 78 55)" />
        <ellipse cx="78" cy="55" rx="3.5" ry="8" fill="#ffb8b8" transform="rotate(-15 78 55)" />

        <ellipse cx="96" cy="53" rx="7" ry="14" fill="url(#squirrelFur3D)" transform="rotate(15 96 53)" />
        <ellipse cx="96" cy="53" rx="3.5" ry="8" fill="#ffb8b8" transform="rotate(15 96 53)" />

        {/* 3D Round Head */}
        <circle cx="92" cy="80" r="26" fill="url(#squirrelFur3D)" />
        <circle cx="86" cy="72" r="12" fill="#ffffff" opacity="0.3" />

        {/* 3D Rosy Cheeks */}
        <ellipse cx="82" cy="88" rx="5" ry="3.2" fill="#ff758f" opacity="0.55" />
        <ellipse cx="106" cy="88" rx="5" ry="3.2" fill="#ff758f" opacity="0.55" />

        {/* 3D GLOSSY PIXAR EYE */}
        <g className="squirrel-eye">
          <circle cx="98" cy="74" r="5.5" fill="url(#squirrelEye3D)" />
          <circle cx="98" cy="74" r="3.5" fill="#000000" />
          <circle cx="100" cy="72" r="2" fill="#ffffff" />
          <circle cx="96.5" cy="76" r="1" fill="#ffffff" />
        </g>

        {/* 3D Dark Nose */}
        <circle cx="112" cy="84" r="3.5" fill="#2d1306" />
        <circle cx="111" cy="83" r="1" fill="#ffffff" />

        {/* Mouth */}
        <path d="M 108 90 Q 112 94 116 90" fill="none" stroke="#6e2c00" strokeWidth="1.6" strokeLinecap="round" />

        {/* 3D Paws Holding a Shiny Golden Acorn */}
        <g id="squirrel-acorn-3d">
          {/* Acorn Nut */}
          <ellipse cx="112" cy="125" rx="10" ry="13" fill="url(#acornNut3D)" transform="rotate(15 112 125)" />
          <ellipse cx="110" cy="122" rx="4" ry="7" fill="#ffffff" opacity="0.3" transform="rotate(15 110 122)" />
          {/* Acorn Cap */}
          <path d="M 102 118 Q 114 112 124 120" fill="none" stroke="#4a2e12" strokeWidth="6" strokeLinecap="round" />
          <line x1="113" y1="114" x2="114" y2="108" stroke="#4a2e12" strokeWidth="2.5" strokeLinecap="round" />

          {/* Left Paw */}
          <ellipse cx="102" cy="124" rx="6" ry="5" fill="url(#squirrelFur3D)" />
          {/* Right Paw */}
          <ellipse cx="118" cy="126" rx="6" ry="5" fill="url(#squirrelFur3D)" />
        </g>

        {/* 3D Feet */}
        <ellipse cx="78" cy="170" rx="12" ry="7" fill="url(#squirrelFur3D)" />
        <ellipse cx="102" cy="170" rx="12" ry="7" fill="url(#squirrelFur3D)" />
      </svg>
    </div>
  );
}

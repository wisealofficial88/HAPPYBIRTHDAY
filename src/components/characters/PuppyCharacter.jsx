import React from 'react';

export default function PuppyCharacter({
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
      className={`puppy-character-wrapper ${className}`}
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
        viewBox="0 0 180 200"
        width="140"
        height="155"
        style={{ overflow: 'visible' }}
        className={isDancing ? 'puppy-dancing' : 'puppy-idle'}
      >
        <defs>
          {/* 3D Volumetric Golden Honey Puppy Fur */}
          <radialGradient id="puppyFur3D" cx="38%" cy="32%" r="65%" fx="32%" fy="28%">
            <stop offset="0%" stopColor="#fde3a7" />
            <stop offset="35%" stopColor="#f39c12" />
            <stop offset="75%" stopColor="#d68910" />
            <stop offset="100%" stopColor="#7e5109" />
          </radialGradient>

          {/* 3D Soft Cream Belly */}
          <radialGradient id="puppyBelly3D" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#fff3e0" />
            <stop offset="100%" stopColor="#f8c291" />
          </radialGradient>

          {/* 3D Puppy Eye */}
          <radialGradient id="puppyEye3D" cx="42%" cy="38%" r="55%">
            <stop offset="0%" stopColor="#5c3822" />
            <stop offset="45%" stopColor="#2e1509" />
            <stop offset="100%" stopColor="#080201" />
          </radialGradient>
        </defs>

        <style>
          {`
            .puppy-idle {
              animation: deer-breathe 3.4s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .puppy-dancing {
              animation: calm-bounce 0.8s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .puppy-tail {
              transform-origin: 45px 145px;
              animation: puppy-tail-wag 0.5s ease-in-out infinite;
            }
            @keyframes puppy-tail-wag {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-22deg); }
            }
            .puppy-ear {
              transform-origin: 105px 65px;
              animation: ear-twitch 3.5s ease-in-out infinite;
            }
            .puppy-eye {
              transform-origin: 110px 80px;
              animation: blink 3.8s infinite;
            }
          `}
        </style>

        {/* 3D Contact Shadow */}
        <ellipse cx="95" cy="184" rx="48" ry="12" fill="rgba(4, 12, 8, 0.65)" />
        <ellipse cx="95" cy="184" rx="28" ry="6" fill="rgba(2, 6, 4, 0.85)" />

        {/* 3D Excited Wagging Tail */}
        <g className="puppy-tail" id="puppy-tail-3d">
          <ellipse cx="38" cy="138" rx="8" ry="20" fill="url(#puppyFur3D)" transform="rotate(-40 38 138)" />
          <circle cx="30" cy="126" r="4.5" fill="#ffffff" opacity="0.6" />
        </g>

        {/* 3D Chubby Body */}
        <ellipse cx="90" cy="140" rx="36" ry="32" fill="url(#puppyFur3D)" />
        <ellipse cx="88" cy="126" rx="20" ry="10" fill="#ffffff" opacity="0.25" />

        {/* 3D Fluffy White Chest */}
        <ellipse cx="106" cy="145" rx="18" ry="22" fill="url(#puppyBelly3D)" />

        {/* 3D Cute Floppy Ears */}
        {/* Left Ear */}
        <ellipse cx="90" cy="62" rx="10" ry="24" fill="#a04000" transform="rotate(-25 90 62)" />
        {/* Right Ear (Foreground) */}
        <g className="puppy-ear">
          <ellipse cx="120" cy="72" rx="12" ry="28" fill="#a04000" transform="rotate(20 120 72)" />
          <ellipse cx="118" cy="70" rx="6" ry="18" fill="url(#puppyFur3D)" transform="rotate(20 118 70)" />
        </g>

        {/* 3D Chubby Puppy Head */}
        <circle cx="106" cy="85" r="28" fill="url(#puppyFur3D)" />
        <circle cx="100" cy="76" r="14" fill="#ffffff" opacity="0.3" />

        {/* 3D Snout */}
        <ellipse cx="124" cy="94" rx="15" ry="12" fill="url(#puppyBelly3D)" />

        {/* 3D Glossy Wet Black Nose */}
        <ellipse cx="132" cy="90" rx="5" ry="3.8" fill="#120703" />
        <ellipse cx="131" cy="89" rx="1.8" ry="1.1" fill="#ffffff" />

        {/* Happy Puppy Mouth & Pink Tongue */}
        <path d="M 124 98 Q 130 102 136 98" fill="none" stroke="#7e5109" strokeWidth="1.6" strokeLinecap="round" />
        {/* Tongue */}
        <path d="M 128 100 C 128 108, 134 108, 134 100 Z" fill="#ff758f" />

        {/* 3D Big Glossy Puppy Eye */}
        <g className="puppy-eye">
          <circle cx="112" cy="80" r="7" fill="url(#puppyEye3D)" />
          <circle cx="112" cy="80" r="4.8" fill="#000000" />
          {/* Huge adorable puppy catchlights */}
          <circle cx="114.5" cy="77" r="2.8" fill="#ffffff" />
          <circle cx="109.5" cy="82" r="1.4" fill="#ffffff" opacity="0.9" />
        </g>

        {/* 3D Paws */}
        <ellipse cx="80" cy="174" rx="12" ry="7" fill="url(#puppyFur3D)" />
        <ellipse cx="104" cy="174" rx="12" ry="7" fill="url(#puppyFur3D)" />
        <ellipse cx="125" cy="174" rx="12" ry="7" fill="url(#puppyFur3D)" />
      </svg>
    </div>
  );
}

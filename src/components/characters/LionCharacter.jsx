import React from 'react';

export default function LionCharacter({
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
      className={`lion-character-wrapper ${className}`}
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
        viewBox="0 0 190 210"
        width="145"
        height="160"
        style={{ overflow: 'visible' }}
        className={isDancing ? 'lion-dancing' : 'lion-idle'}
      >
        <defs>
          {/* 3D Volumetric Golden Lion Fur */}
          <radialGradient id="lionFur3D" cx="38%" cy="32%" r="65%" fx="32%" fy="28%">
            <stop offset="0%" stopColor="#f9e79f" />
            <stop offset="35%" stopColor="#f5b041" />
            <stop offset="75%" stopColor="#d35400" />
            <stop offset="100%" stopColor="#7e5109" />
          </radialGradient>

          {/* 3D Fluffy Golden-Caramel Mane */}
          <radialGradient id="lionMane3D" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#e59866" />
            <stop offset="40%" stopColor="#ba4a00" />
            <stop offset="80%" stopColor="#78281f" />
            <stop offset="100%" stopColor="#4d160e" />
          </radialGradient>

          {/* 3D Soft Cream Snout */}
          <radialGradient id="lionSnout3D" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#fef5e7" />
            <stop offset="100%" stopColor="#f8c471" />
          </radialGradient>

          {/* 3D Glossy Amber Eye */}
          <radialGradient id="lionEye3D" cx="42%" cy="38%" r="55%">
            <stop offset="0%" stopColor="#b7950b" />
            <stop offset="45%" stopColor="#7d6608" />
            <stop offset="85%" stopColor="#1a0c06" />
            <stop offset="100%" stopColor="#040101" />
          </radialGradient>
        </defs>

        <style>
          {`
            .lion-idle {
              animation: deer-breathe 3.4s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .lion-dancing {
              animation: calm-bounce 0.85s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .lion-tail {
              transform-origin: 35px 145px;
              animation: lion-tail-flick 2.6s ease-in-out infinite;
            }
            @keyframes lion-tail-flick {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-14deg) scale(1.05); }
            }
            .lion-eye {
              transform-origin: 116px 78px;
              animation: blink 4s infinite;
            }
          `}
        </style>

        {/* 3D Ground Contact Shadow */}
        <ellipse cx="95" cy="190" rx="52" ry="13" fill="rgba(4, 12, 8, 0.65)" />
        <ellipse cx="95" cy="190" rx="32" ry="6.5" fill="rgba(2, 6, 4, 0.85)" />

        {/* 3D Tail with Fluffy Tuft */}
        <g className="lion-tail" id="lion-tail-3d">
          <path d="M 42 145 C 18 140, 10 110, 24 95" fill="none" stroke="url(#lionFur3D)" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="24" cy="94" rx="9" ry="12" fill="url(#lionMane3D)" transform="rotate(25 24 94)" />
        </g>

        {/* 3D Chubby Body */}
        <ellipse cx="88" cy="142" rx="38" ry="34" fill="url(#lionFur3D)" />
        <ellipse cx="85" cy="128" rx="20" ry="10" fill="#ffffff" opacity="0.25" />

        {/* 3D Cream Belly */}
        <ellipse cx="98" cy="148" rx="22" ry="24" fill="url(#lionSnout3D)" />

        {/* 3D VOLUMETRIC FLUFFY MANE RING (Layered Behind Head) */}
        <g id="lion-mane-3d">
          <circle cx="112" cy="85" r="38" fill="url(#lionMane3D)" />
          {/* 3D Mane Petals / Tufts */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
            <circle
              key={i}
              cx={112 + Math.cos((deg * Math.PI) / 180) * 32}
              cy={85 + Math.sin((deg * Math.PI) / 180) * 32}
              r="12"
              fill="url(#lionMane3D)"
            />
          ))}
          <circle cx="108" cy="72" r="18" fill="#ffffff" opacity="0.22" />
        </g>

        {/* 3D Round Ears */}
        <circle cx="86" cy="56" r="11" fill="url(#lionFur3D)" />
        <circle cx="86" cy="56" r="5.5" fill="#f8c471" />
        <circle cx="128" cy="56" r="11" fill="url(#lionFur3D)" />
        <circle cx="128" cy="56" r="5.5" fill="#f8c471" />

        {/* 3D Cute Cub Head Sphere */}
        <circle cx="110" cy="86" r="28" fill="url(#lionFur3D)" />
        <circle cx="104" cy="76" r="14" fill="#ffffff" opacity="0.32" />

        {/* 3D Chubby Snout */}
        <ellipse cx="124" cy="94" rx="14" ry="11" fill="url(#lionSnout3D)" />

        {/* 3D Soft Pink Nose */}
        <polygon points="126,88 134,88 130,94" fill="#ff758f" />
        <circle cx="129" cy="89" r="1" fill="#ffffff" />

        {/* Sweet Cub Mouth */}
        <path d="M 122 98 Q 127 101 132 98" fill="none" stroke="#7e5109" strokeWidth="1.6" strokeLinecap="round" />

        {/* Rosy Cheeks */}
        <ellipse cx="102" cy="96" rx="5.5" ry="3.5" fill="#ff758f" opacity="0.5" />

        {/* 3D GLOSSY AMBER EYE */}
        <g className="lion-eye">
          <circle cx="116" cy="78" r="6" fill="url(#lionEye3D)" />
          <circle cx="116" cy="78" r="4" fill="#000000" />
          <circle cx="118.5" cy="76" r="2.2" fill="#ffffff" />
          <circle cx="114" cy="80" r="1.1" fill="#ffffff" />
        </g>

        {/* 3D Cute Whiskers */}
        <circle cx="120" cy="94" r="1" fill="#7e5109" />
        <circle cx="122" cy="96" r="1" fill="#7e5109" />

        {/* 3D Paws */}
        <ellipse cx="78" cy="180" rx="13" ry="8" fill="url(#lionFur3D)" />
        <ellipse cx="102" cy="180" rx="13" ry="8" fill="url(#lionFur3D)" />
        <ellipse cx="124" cy="180" rx="13" ry="8" fill="url(#lionFur3D)" />
      </svg>
    </div>
  );
}

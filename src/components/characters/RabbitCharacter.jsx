import React from 'react';

export default function RabbitCharacter({
  isHopping = false,
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
      className={`rabbit-character-wrapper ${className}`}
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
        className={isDancing ? 'rabbit-dancing' : isHopping ? 'rabbit-hopping' : 'rabbit-idle'}
      >
        <defs>
          {/* 3D Volumetric Warm Cream Rabbit Fur */}
          <radialGradient id="rabbitFur3D" cx="38%" cy="32%" r="65%" fx="32%" fy="28%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#f7ede2" />
            <stop offset="75%" stopColor="#dfcbba" />
            <stop offset="100%" stopColor="#bfa38f" />
          </radialGradient>

          {/* 3D Soft Pink Inner Ear */}
          <radialGradient id="rabbitEar3D" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffd8d8" />
            <stop offset="55%" stopColor="#ffb3ba" />
            <stop offset="100%" stopColor="#d97d88" />
          </radialGradient>

          {/* 3D Glossy Eye */}
          <radialGradient id="rabbitEye3D" cx="42%" cy="38%" r="55%">
            <stop offset="0%" stopColor="#5a2d1d" />
            <stop offset="50%" stopColor="#30150b" />
            <stop offset="100%" stopColor="#080201" />
          </radialGradient>
        </defs>

        <style>
          {`
            .rabbit-idle {
              animation: deer-breathe 3.4s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .rabbit-hopping {
              animation: rabbit-hop 0.8s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .rabbit-dancing {
              animation: calm-bounce 0.8s ease-in-out infinite;
              transform-origin: bottom center;
            }
            @keyframes rabbit-hop {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-14px); }
            }
            .rabbit-ear-l {
              transform-origin: 75px 55px;
              animation: ear-twitch 4s ease-in-out infinite 0.2s;
            }
            .rabbit-ear-r {
              transform-origin: 95px 55px;
              animation: ear-twitch 4s ease-in-out infinite 0.8s;
            }
            .rabbit-eye {
              transform-origin: 100px 75px;
              animation: blink 4s infinite;
            }
          `}
        </style>

        {/* 3D Contact Shadow */}
        <ellipse cx="90" cy="188" rx="48" ry="12" fill="rgba(4, 12, 8, 0.65)" />
        <ellipse cx="90" cy="188" rx="28" ry="6" fill="rgba(2, 6, 4, 0.85)" />

        {/* 3D Fluffy Tail */}
        <circle cx="48" cy="148" r="14" fill="url(#rabbitFur3D)" />
        <circle cx="46" cy="146" r="6" fill="#ffffff" opacity="0.6" />

        {/* 3D Long Ears */}
        <g className="rabbit-ear-l" id="rabbit-ear-left">
          <ellipse cx="75" cy="40" rx="11" ry="34" fill="url(#rabbitFur3D)" transform="rotate(-15 75 40)" />
          <ellipse cx="75" cy="40" rx="6" ry="24" fill="url(#rabbitEar3D)" transform="rotate(-15 75 40)" />
        </g>
        <g className="rabbit-ear-r" id="rabbit-ear-right">
          <ellipse cx="98" cy="38" rx="11" ry="34" fill="url(#rabbitFur3D)" transform="rotate(15 98 38)" />
          <ellipse cx="98" cy="38" rx="6" ry="24" fill="url(#rabbitEar3D)" transform="rotate(15 98 38)" />
        </g>

        {/* 3D Chubby Body */}
        <ellipse cx="88" cy="142" rx="42" ry="36" fill="url(#rabbitFur3D)" />
        <ellipse cx="88" cy="126" rx="24" ry="10" fill="#ffffff" opacity="0.3" />

        {/* 3D Puffy White Belly */}
        <ellipse cx="98" cy="148" rx="28" ry="24" fill="#ffffff" />
        <ellipse cx="96" cy="144" rx="14" ry="10" fill="#ffffff" opacity="0.7" />

        {/* 3D Chubby Head Sphere */}
        <circle cx="95" cy="85" r="30" fill="url(#rabbitFur3D)" />
        <circle cx="90" cy="76" r="14" fill="#ffffff" opacity="0.35" />

        {/* 3D Rosy Cheeks */}
        <ellipse cx="84" cy="94" rx="6.5" ry="4" fill="#ffb3ba" opacity="0.65" />
        <ellipse cx="112" cy="94" rx="6.5" ry="4" fill="#ffb3ba" opacity="0.65" />

        {/* 3D GLOSSY PIXAR EYE */}
        <g className="rabbit-eye">
          <circle cx="102" cy="78" r="6" fill="url(#rabbitEye3D)" />
          <circle cx="102" cy="78" r="3.8" fill="#000000" />
          <circle cx="104" cy="76" r="2.2" fill="#ffffff" />
          <circle cx="100.5" cy="80" r="1.1" fill="#ffffff" />
        </g>

        {/* 3D Cute Pink Nose with Specular Gleam */}
        <polygon points="114,88 120,88 117,93" fill="#ff758f" />
        <circle cx="116.5" cy="89" r="1" fill="#ffffff" />

        {/* Sweet Bunny Mouth */}
        <path d="M 113 95 Q 117 99 121 95" fill="none" stroke="#7a4433" strokeWidth="1.6" strokeLinecap="round" />

        {/* Cute Whiskers */}
        <line x1="120" y1="91" x2="136" y2="88" stroke="#a38271" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="120" y1="94" x2="138" y2="95" stroke="#a38271" strokeWidth="1.2" strokeLinecap="round" />

        {/* 3D Feet with Rounded Toes */}
        <ellipse cx="78" cy="180" rx="16" ry="9" fill="url(#rabbitFur3D)" />
        <ellipse cx="108" cy="180" rx="16" ry="9" fill="url(#rabbitFur3D)" />

        {/* 3D Front Paws */}
        <ellipse cx="104" cy="130" rx="9" ry="7" fill="url(#rabbitFur3D)" transform="rotate(-15 104 130)" />
        <ellipse cx="118" cy="132" rx="9" ry="7" fill="url(#rabbitFur3D)" transform="rotate(15 118 132)" />
      </svg>
    </div>
  );
}

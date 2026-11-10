import React from 'react';

export default function DeerCharacter({
  isWalking = false,
  isCelebrating = false,
  direction = 'right',
  scale = 1,
  className = '',
  onClick = null
}) {
  const flip = direction === 'left' ? -1 : 1;

  return (
    <div
      onClick={onClick}
      className={`deer-character-wrapper ${className}`}
      style={{
        display: 'inline-block',
        transform: `scaleX(${flip}) scale(${scale})`,
        transformOrigin: 'bottom center',
        transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.3, 1)',
        cursor: onClick ? 'pointer' : 'default',
        filter: 'drop-shadow(0 14px 18px rgba(0,0,0,0.5)) drop-shadow(0 4px 6px rgba(0,0,0,0.35))',
        willChange: 'transform'
      }}
    >
      <svg
        viewBox="0 0 240 260"
        width="180"
        height="195"
        style={{ overflow: 'visible' }}
        className={isCelebrating ? 'deer-dancing' : isWalking ? 'deer-walking' : 'deer-idle'}
      >
        <defs>
          {/* 3D Volumetric Fawn Coat (Spherical Lighting Model) */}
          <radialGradient id="deerCoat3D" cx="38%" cy="32%" r="68%" fx="32%" fy="28%">
            <stop offset="0%" stopColor="#f8c291" />
            <stop offset="25%" stopColor="#e58e52" />
            <stop offset="70%" stopColor="#c0392b" />
            <stop offset="100%" stopColor="#78281f" />
          </radialGradient>

          {/* 3D Cylindrical Limbs */}
          <linearGradient id="deerLeg3D" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f8c291" />
            <stop offset="35%" stopColor="#e58e52" />
            <stop offset="85%" stopColor="#a93226" />
            <stop offset="100%" stopColor="#641e16" />
          </linearGradient>

          {/* 3D Soft Fluffy Belly */}
          <radialGradient id="deerBelly3D" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#fff3e0" />
            <stop offset="85%" stopColor="#f5cd79" />
            <stop offset="100%" stopColor="#d38936" />
          </radialGradient>

          {/* 3D Translucent Inner Ear */}
          <radialGradient id="deerEarInner3D" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffb8b8" />
            <stop offset="60%" stopColor="#f8a5a5" />
            <stop offset="100%" stopColor="#c76d6d" />
          </radialGradient>

          {/* 3D Glossy Eye Iris */}
          <radialGradient id="deerEyeIris3D" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#633d2e" />
            <stop offset="45%" stopColor="#3d1d11" />
            <stop offset="85%" stopColor="#1a0c06" />
            <stop offset="100%" stopColor="#050201" />
          </radialGradient>

          {/* 3D Metallic Golden Horns & Crown */}
          <linearGradient id="deerGold3D" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fff9db" />
            <stop offset="35%" stopColor="#ffd166" />
            <stop offset="75%" stopColor="#f39c12" />
            <stop offset="100%" stopColor="#b7791f" />
          </linearGradient>
        </defs>

        <style>
          {`
            .deer-idle {
              animation: deer-breathe 3.6s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .deer-walking {
              animation: deer-walk 0.75s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .deer-dancing {
              animation: calm-bounce 0.9s ease-in-out infinite;
              transform-origin: bottom center;
            }

            .deer-leg-fl {
              transform-origin: 105px 170px;
              ${isWalking ? 'animation: deer-leg-front-left 0.75s ease-in-out infinite;' : ''}
              ${isCelebrating ? 'animation: deer-leg-front-left 0.5s ease-in-out infinite;' : ''}
            }
            .deer-leg-fr {
              transform-origin: 125px 170px;
              ${isWalking ? 'animation: deer-leg-front-right 0.75s ease-in-out infinite;' : ''}
              ${isCelebrating ? 'animation: deer-leg-front-right 0.5s ease-in-out infinite;' : ''}
            }
            .deer-leg-bl {
              transform-origin: 55px 175px;
              ${isWalking ? 'animation: deer-leg-back-left 0.75s ease-in-out infinite;' : ''}
              ${isCelebrating ? 'animation: deer-leg-back-left 0.5s ease-in-out infinite;' : ''}
            }
            .deer-leg-br {
              transform-origin: 75px 175px;
              ${isWalking ? 'animation: deer-leg-back-right 0.75s ease-in-out infinite;' : ''}
              ${isCelebrating ? 'animation: deer-leg-back-right 0.5s ease-in-out infinite;' : ''}
            }

            .deer-tail {
              transform-origin: 36px 135px;
              animation: deer-tail-wag ${isCelebrating ? '0.5s' : '3s'} ease-in-out infinite;
            }

            .deer-ear-l {
              transform-origin: 125px 70px;
              animation: ear-twitch 4.5s ease-in-out infinite;
            }
            .deer-ear-r {
              transform-origin: 145px 65px;
              animation: ear-twitch 4.5s ease-in-out infinite 0.4s;
            }

            .deer-eye-blink {
              transform-origin: 155px 82px;
              animation: blink 3.8s infinite;
            }
          `}
        </style>

        {/* 3D Ground Contact Shadow */}
        <ellipse cx="95" cy="245" rx="68" ry="16" fill="rgba(4, 12, 8, 0.65)" />
        <ellipse cx="95" cy="245" rx="42" ry="8" fill="rgba(2, 6, 4, 0.85)" />

        {/* 3D Back Legs (Layered Behind Body with Deep Occlusion) */}
        <g id="deer-back-legs-3d">
          {/* Back Left Leg */}
          <g className="deer-leg-bl">
            <path d="M 50 160 Q 42 195 46 240 L 56 240 Q 60 195 62 165 Z" fill="url(#deerLeg3D)" />
            {/* Hoof */}
            <path d="M 45 238 L 47 244 L 57 244 L 56 238 Z" fill="#2d1306" stroke="#0a0301" strokeWidth="1" />
          </g>

          {/* Front Left Leg */}
          <g className="deer-leg-fl">
            <path d="M 102 160 Q 98 195 100 240 L 110 240 Q 112 195 114 165 Z" fill="url(#deerLeg3D)" />
            <path d="M 99 238 L 101 244 L 111 244 L 110 238 Z" fill="#2d1306" stroke="#0a0301" strokeWidth="1" />
          </g>
        </g>

        {/* 3D Fluffy Wagging Tail */}
        <g className="deer-tail" id="deer-tail-3d">
          <ellipse cx="32" cy="132" rx="14" ry="10" fill="url(#deerCoat3D)" transform="rotate(-30 32 132)" />
          <ellipse cx="30" cy="133" rx="8" ry="6" fill="url(#deerBelly3D)" transform="rotate(-30 30 133)" />
          {/* Fluff highlight */}
          <circle cx="28" cy="130" r="3.5" fill="#ffffff" opacity="0.6" />
        </g>

        {/* 3D VOLUMETRIC TORSO & CHEST (Spherical Curvature with Warm Highlights) */}
        <g id="deer-body-3d">
          {/* Main Body Sphere */}
          <ellipse cx="85" cy="155" rx="52" ry="34" fill="url(#deerCoat3D)" />

          {/* 3D Specular Highlight on Back */}
          <ellipse cx="80" cy="135" rx="36" ry="12" fill="#ffffff" opacity="0.25" />

          {/* 3D Fluffy White Belly & Chest */}
          <path
            d="M 60 160 C 60 178, 100 182, 115 170 C 105 158, 85 152, 60 160 Z"
            fill="url(#deerBelly3D)"
          />
          <ellipse cx="118" cy="148" rx="16" ry="24" fill="url(#deerBelly3D)" transform="rotate(20 118 148)" />

          {/* 3D Fawn Dappled Spots (Soft Volumetric Glow) */}
          <g id="deer-spots-3d">
            <circle cx="65" cy="142" r="4.2" fill="#ffffff" opacity="0.85" />
            <circle cx="78" cy="138" r="4.5" fill="#ffffff" opacity="0.9" />
            <circle cx="92" cy="142" r="4.2" fill="#ffffff" opacity="0.85" />
            <circle cx="72" cy="150" r="3.6" fill="#ffffff" opacity="0.8" />
            <circle cx="86" cy="150" r="3.8" fill="#ffffff" opacity="0.8" />
            <circle cx="100" cy="148" r="3.4" fill="#ffffff" opacity="0.75" />
          </g>

          {/* 3D Elegant Neck */}
          <path
            d="M 112 145 C 118 120, 126 95, 138 82 C 148 95, 142 125, 130 152 Z"
            fill="url(#deerCoat3D)"
          />
          <path d="M 124 135 Q 128 105 136 86" stroke="#ffffff" strokeWidth="1.8" fill="none" opacity="0.3" strokeLinecap="round" />
        </g>

        {/* 3D Fore Legs (Foreground Limbs with Strong Light Definition) */}
        <g id="deer-front-legs-3d">
          {/* Back Right Leg */}
          <g className="deer-leg-br">
            <path d="M 68 160 Q 64 195 68 244 L 78 244 Q 82 195 82 165 Z" fill="url(#deerLeg3D)" />
            <path d="M 67 242 L 69 248 L 79 248 L 78 242 Z" fill="#2d1306" stroke="#0a0301" strokeWidth="1" />
          </g>

          {/* Front Right Leg */}
          <g className="deer-leg-fr">
            <path d="M 118 160 Q 116 195 118 244 L 128 244 Q 130 195 130 165 Z" fill="url(#deerLeg3D)" />
            <path d="M 117 242 L 119 248 L 129 248 L 128 242 Z" fill="#2d1306" stroke="#0a0301" strokeWidth="1" />
          </g>
        </g>

        {/* 3D SCULPTED BABY DEER HEAD & EXPRESSIVE PIXAR FACE */}
        <g id="deer-head-3d">
          {/* 3D Ears with Translucent Inner Cartilage */}
          <g className="deer-ear-l" id="deer-ear-left">
            <ellipse cx="122" cy="58" rx="22" ry="11" fill="url(#deerCoat3D)" transform="rotate(-55 122 58)" />
            <ellipse cx="122" cy="58" rx="14" ry="6" fill="url(#deerEarInner3D)" transform="rotate(-55 122 58)" />
          </g>
          <g className="deer-ear-r" id="deer-ear-right">
            <ellipse cx="148" cy="52" rx="22" ry="11" fill="url(#deerCoat3D)" transform="rotate(35 148 52)" />
            <ellipse cx="148" cy="52" rx="14" ry="6" fill="url(#deerEarInner3D)" transform="rotate(35 148 52)" />
          </g>

          {/* Chubby 3D Head Sphere */}
          <ellipse cx="152" cy="88" rx="26" ry="24" fill="url(#deerCoat3D)" />
          <ellipse cx="146" cy="80" rx="15" ry="8" fill="#ffffff" opacity="0.3" />

          {/* Cute 3D Snout */}
          <path
            d="M 162 85 C 182 86, 185 102, 172 108 C 158 110, 154 98, 162 85 Z"
            fill="url(#deerBelly3D)"
          />
          {/* 3D Velvet Nose with Specular Gleam */}
          <ellipse cx="180" cy="95" rx="5" ry="3.8" fill="#1f0a03" />
          <ellipse cx="179" cy="94" rx="2" ry="1.2" fill="#ffffff" opacity="0.8" />

          {/* Gentle Smile */}
          <path d="M 172 102 Q 177 105 181 101" fill="none" stroke="#641e16" strokeWidth="1.6" strokeLinecap="round" />

          {/* Rosy Cheeks */}
          <ellipse cx="156" cy="98" rx="5" ry="3.5" fill="#ff758f" opacity="0.55" />

          {/* 3D GLOSSY PIXAR DOE EYE */}
          <g className="deer-eye-blink">
            <ellipse cx="155" cy="82" rx="7.5" ry="8.5" fill="url(#deerEyeIris3D)" />
            <circle cx="155" cy="82" r="5" fill="#020101" />

            {/* Specular Multi-point Eye Gleam */}
            <circle cx="157.5" cy="79" r="2.8" fill="#ffffff" />
            <circle cx="153" cy="84" r="1.4" fill="#ffffff" opacity="0.9" />

            {/* Cute Eyelashes */}
            <path d="M 149 76 Q 155 72 163 76" fill="none" stroke="#120703" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="162" y1="75" x2="166" y2="72" stroke="#120703" strokeWidth="1.6" strokeLinecap="round" />
          </g>

          {/* 3D LAYERED FLOWER CROWN WITH GOLDEN LEAVES & BERRIES */}
          <g id="deer-flower-crown-3d">
            {/* Crown Vine Base */}
            <path d="M 130 68 Q 148 64 165 70" fill="none" stroke="#2d6a4f" strokeWidth="3" strokeLinecap="round" />

            {/* Golden Leaves */}
            <ellipse cx="134" cy="66" rx="5" ry="2.5" fill="url(#deerGold3D)" transform="rotate(-25 134 66)" />
            <ellipse cx="162" cy="68" rx="5" ry="2.5" fill="url(#deerGold3D)" transform="rotate(25 162 68)" />

            {/* Left Blossom (Pink Rose) */}
            <circle cx="138" cy="65" r="5.5" fill="#ff758f" />
            <circle cx="138" cy="65" r="2.5" fill="#ffd166" />

            {/* Center Blossom (Royal Cream Magnolia) */}
            <circle cx="148" cy="63" r="7" fill="#fff9db" stroke="#ffd166" strokeWidth="0.8" />
            <circle cx="148" cy="63" r="3" fill="#f77f00" />

            {/* Right Blossom (Sky Blue Forget-Me-Not) */}
            <circle cx="158" cy="66" r="5.5" fill="#48cae4" />
            <circle cx="158" cy="66" r="2.2" fill="#ffffff" />

            {/* Red Berries with Specular Shine */}
            <circle cx="142" cy="71" r="2.8" fill="#d90429" />
            <circle cx="141.5" cy="70.5" r="0.9" fill="#ffffff" />
            <circle cx="154" cy="72" r="2.8" fill="#d90429" />
            <circle cx="153.5" cy="71.5" r="0.9" fill="#ffffff" />
          </g>
        </g>
      </svg>
    </div>
  );
}

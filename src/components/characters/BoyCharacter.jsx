import React from 'react';

export default function BoyCharacter({
  isWalking = false,
  isExtendingGift = true,
  isFinale = false,
  direction = 'right',
  scale = 1,
  className = '',
  onClick = null
}) {
  const flip = direction === 'left' ? -1 : 1;

  return (
    <div
      onClick={onClick}
      className={`boy-character-wrapper ${className}`}
      style={{
        display: 'inline-block',
        transform: `scaleX(${flip}) scale(${scale})`,
        transformOrigin: 'bottom center',
        transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.3, 1)',
        cursor: onClick ? 'pointer' : 'default',
        filter: 'drop-shadow(0 14px 18px rgba(0,0,0,0.42)) drop-shadow(0 3px 6px rgba(0,0,0,0.25))',
        willChange: 'transform'
      }}
    >
      <svg
        viewBox="0 0 190 290"
        width="145"
        height="230"
        style={{ overflow: 'visible' }}
        className={isWalking ? 'majnu-walking' : 'majnu-idle'}
      >
        <defs>
          {/* Authentic Kashmiri Phiran Plaid Check Pattern (From Movie Still) */}
          <pattern id="majnuPhiranPlaid" width="14" height="14" patternUnits="userSpaceOnUse">
            <rect width="14" height="14" fill="#3c2415" />
            <line x1="0" y1="0" x2="14" y2="0" stroke="#22120a" strokeWidth="2.2" />
            <line x1="0" y1="7" x2="14" y2="7" stroke="#4a2e1c" strokeWidth="0.8" opacity="0.85" />
            <line x1="0" y1="0" x2="0" y2="14" stroke="#22120a" strokeWidth="2.2" />
            <line x1="7" y1="0" x2="7" y2="14" stroke="#4a2e1c" strokeWidth="0.8" opacity="0.85" />
          </pattern>

          {/* Phiran Lighting & Fold Depth */}
          <linearGradient id="majnuPhiranLight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.38" />
          </linearGradient>

          {/* Clean, Handsome Sun-Kissed Kashmiri Skin */}
          <radialGradient id="majnuSkinClean" cx="45%" cy="38%" r="65%" fx="40%" fy="32%">
            <stop offset="0%" stopColor="#fdf0e6" />
            <stop offset="45%" stopColor="#f7d3ba" />
            <stop offset="85%" stopColor="#e2a47e" />
            <stop offset="100%" stopColor="#c57f56" />
          </radialGradient>

          {/* Tousled Mountain Windswept Dark Hair */}
          <radialGradient id="majnuHairDark" cx="40%" cy="30%" r="70%" fx="35%" fy="25%">
            <stop offset="0%" stopColor="#3d2116" />
            <stop offset="35%" stopColor="#24110a" />
            <stop offset="75%" stopColor="#100503" />
            <stop offset="100%" stopColor="#040101" />
          </radialGradient>

          <linearGradient id="majnuHairWave" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#572e1c" />
            <stop offset="40%" stopColor="#2e150a" />
            <stop offset="100%" stopColor="#0b0301" />
          </linearGradient>

          {/* White Inner Kurta / Shirt Collar */}
          <linearGradient id="majnuWhiteCollar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#f8f9fa" />
            <stop offset="100%" stopColor="#dee2e6" />
          </linearGradient>

          {/* Mountain Trekking Leather Boots */}
          <linearGradient id="majnuBootsLeather" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#543118" />
            <stop offset="40%" stopColor="#351d0d" />
            <stop offset="100%" stopColor="#150a04" />
          </linearGradient>

          {/* Dark Mountain Trousers */}
          <linearGradient id="majnuTrousers" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2b303a" />
            <stop offset="50%" stopColor="#1a1d24" />
            <stop offset="100%" stopColor="#0d0e12" />
          </linearGradient>

          {/* Royal Velvet Gift Box (Rich Crimson & Warm Gold) */}
          <radialGradient id="majnuGiftBox" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#e63946" />
            <stop offset="45%" stopColor="#a8091a" />
            <stop offset="85%" stopColor="#60040e" />
            <stop offset="100%" stopColor="#2b0206" />
          </radialGradient>

          <linearGradient id="majnuGoldRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fff8db" />
            <stop offset="35%" stopColor="#ffd166" />
            <stop offset="75%" stopColor="#f77f00" />
            <stop offset="100%" stopColor="#c56000" />
          </linearGradient>

          {/* Soulful Devoted Dark Eyes */}
          <radialGradient id="majnuDarkEye" cx="45%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#522b15" />
            <stop offset="45%" stopColor="#2b1408" />
            <stop offset="85%" stopColor="#120502" />
            <stop offset="100%" stopColor="#040101" />
          </radialGradient>
        </defs>

        <style>
          {`
            .majnu-idle {
              animation: majnu-breathe 3.6s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .majnu-walking {
              animation: majnu-stride 0.76s ease-in-out infinite;
              transform-origin: bottom center;
            }

            @keyframes majnu-breathe {
              0%, 100% { transform: translate3d(0, 0, 0); }
              50% { transform: translate3d(0, -3px, 0); }
            }
            @keyframes majnu-stride {
              0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
              50% { transform: translate3d(0, -6px, 0) rotate(-1.5deg); }
            }

            .majnu-hair-wind {
              transform-origin: 90px 45px;
              animation: majnu-hair-breeze 3s ease-in-out infinite;
            }
            @keyframes majnu-hair-breeze {
              0%, 100% { transform: rotate(0deg) skewX(0deg); }
              50% { transform: rotate(-5deg) skewX(-4deg); }
            }

            .majnu-phiran-flutter {
              transform-origin: 95px 145px;
              animation: majnu-phiran-breeze 3.4s ease-in-out infinite;
            }
            @keyframes majnu-phiran-breeze {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-3deg) scaleX(1.02); }
            }

            .majnu-eye-blink {
              transform-origin: 95px 56px;
              animation: blink 4.2s infinite;
            }

            .majnu-gift-sparkle {
              animation: star-pulse 2.2s infinite;
              transform-origin: 145px 148px;
            }
          `}
        </style>

        {/* Soft Grass Contact Shadow */}
        <ellipse cx="95" cy="275" rx="58" ry="13" fill="rgba(4, 12, 8, 0.55)" />
        <ellipse cx="95" cy="275" rx="36" ry="6.5" fill="rgba(2, 6, 4, 0.75)" />

        {/* Dark Mountain Trousers & Leather Trekking Boots */}
        <g id="majnu-legs">
          {/* Left Leg & Boot */}
          <path d="M 76 200 L 71 254 L 84 254 L 87 200 Z" fill="url(#majnuTrousers)" />
          {/* Left Leather Boot */}
          <path d="M 70 252 L 67 271 L 87 271 L 85 252 Z" fill="url(#majnuBootsLeather)" stroke="#0e0603" strokeWidth="1.2" />
          <ellipse cx="77" cy="271" rx="10" ry="4" fill="#0d0502" />
          {/* Boot laces */}
          <line x1="74" y1="256" x2="80" y2="256" stroke="#c57f56" strokeWidth="1" />
          <line x1="73" y1="261" x2="81" y2="261" stroke="#c57f56" strokeWidth="1" />

          {/* Right Leg & Boot */}
          <path d="M 97 200 L 98 254 L 111 254 L 108 200 Z" fill="url(#majnuTrousers)" />
          {/* Right Leather Boot */}
          <path d="M 97 252 L 96 271 L 116 271 L 113 252 Z" fill="url(#majnuBootsLeather)" stroke="#0e0603" strokeWidth="1.2" />
          <ellipse cx="106" cy="271" rx="10" ry="4" fill="#0d0502" />
          {/* Boot laces */}
          <line x1="102" y1="256" x2="108" y2="256" stroke="#c57f56" strokeWidth="1" />
          <line x1="101" y1="261" x2="109" y2="261" stroke="#c57f56" strokeWidth="1" />
        </g>

        {/* Tousled Dark Hair Blowing in Wind (Back Layer) */}
        <g className="majnu-hair-wind" id="majnu-back-hair">
          <path
            d="M 82 45 
               C 52 48, 30 76, 32 120 
               C 30 152, 48 165, 40 190 
               C 34 165, 44 126, 56 96 
               C 66 74, 76 52, 82 45 Z"
            fill="url(#majnuHairDark)"
          />
          {/* Silky Wave Highlights */}
          <path d="M 44 110 C 36 138, 48 168, 40 192" stroke="url(#majnuHairWave)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M 44 110 C 36 138, 48 168, 40 192" stroke="#572e1c" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.6" />
        </g>

        {/* ================= ICONIC BROWN CHECKERED KASHMIRI PHIRAN (From Film) ================= */}
        <g className="majnu-phiran-flutter" id="majnu-phiran">
          {/* Flowing Lower Phiran Body (Loose Mountain Wool) */}
          <path
            d="M 66 125 
               C 64 155, 52 195, 46 238 
               C 74 246, 118 246, 146 238 
               C 138 195, 126 155, 124 125 Z"
            fill="url(#majnuPhiranPlaid)"
            stroke="#22120a"
            strokeWidth="1.2"
          />
          {/* Lighting Depth Overlay */}
          <path
            d="M 66 125 
               C 64 155, 52 195, 46 238 
               C 74 246, 118 246, 146 238 
               C 138 195, 126 155, 124 125 Z"
            fill="url(#majnuPhiranLight)"
          />

          {/* Realistic Fabric Drape Folds */}
          <path d="M 72 135 Q 64 185 58 238" stroke="#1c0e07" strokeWidth="2.8" opacity="0.75" fill="none" />
          <path d="M 95 132 Q 95 188 95 244" stroke="#1c0e07" strokeWidth="2.5" opacity="0.65" fill="none" />
          <path d="M 118 135 Q 124 185 132 238" stroke="#1c0e07" strokeWidth="2.8" opacity="0.75" fill="none" />

          {/* Broad Shouldered Torso */}
          <path
            d="M 68 88 C 64 105, 65 118, 66 130 L 124 130 C 125 118, 126 105, 122 88 Z"
            fill="url(#majnuPhiranPlaid)"
            stroke="#22120a"
            strokeWidth="1.2"
          />
          <path
            d="M 68 88 C 64 105, 65 118, 66 130 L 124 130 C 125 118, 126 105, 122 88 Z"
            fill="url(#majnuPhiranLight)"
          />

          {/* ================= WHITE INNER SHIRT / KURTA COLLAR (Iconic Film Detail) ================= */}
          {/* Peeking White Collar inside V-slit */}
          <g id="majnu-inner-white-collar">
            <path
              d="M 83 82 L 95 106 L 107 82 Z"
              fill="url(#majnuWhiteCollar)"
              stroke="#adb5bd"
              strokeWidth="0.8"
            />
            {/* V-neck slit of the Phiran */}
            <path
              d="M 82 86 L 95 116 L 108 86"
              fill="none"
              stroke="#22120a"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* ================= ARMS & HANDS ================= */}
        {/* Left Arm in Phiran Sleeve with White Inner Cuff */}
        <g id="majnu-left-arm">
          <path
            d="M 72 94 C 64 112, 68 132, 84 144 C 92 148, 102 147, 110 142"
            fill="none"
            stroke="url(#majnuPhiranPlaid)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <path
            d="M 72 94 C 64 112, 68 132, 84 144 C 92 148, 102 147, 110 142"
            fill="none"
            stroke="url(#majnuPhiranLight)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* White inner shirt cuff */}
          <ellipse cx="106" cy="143" rx="4" ry="7" fill="url(#majnuWhiteCollar)" stroke="#ced4da" strokeWidth="0.8" />
          {/* Hand */}
          <circle cx="112" cy="144" r="6" fill="url(#majnuSkinClean)" stroke="#9c5631" strokeWidth="0.8" />
        </g>

        {/* Right Arm Extended Towards Laila */}
        <g id="majnu-right-arm">
          <path
            d="M 116 94 C 126 110, 136 128, 146 138 C 150 142, 158 140, 160 134"
            fill="none"
            stroke="url(#majnuPhiranPlaid)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <path
            d="M 116 94 C 126 110, 136 128, 146 138 C 150 142, 158 140, 160 134"
            fill="none"
            stroke="url(#majnuPhiranLight)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* White inner shirt cuff */}
          <ellipse cx="148" cy="138" rx="4.5" ry="7.5" fill="url(#majnuWhiteCollar)" stroke="#ced4da" strokeWidth="0.8" />
          {/* Strong expressive hand */}
          <circle cx="154" cy="144" r="6.2" fill="url(#majnuSkinClean)" stroke="#9c5631" strokeWidth="0.8" />
        </g>

        {/* ================= ROYAL VELVET GIFT BOX (Extended Towards Laila) ================= */}
        {isExtendingGift && (
          <g className="majnu-gift-sparkle" id="majnu-gift-box">
            {/* Glowing Golden Aura */}
            <circle cx="145" cy="146" r="32" fill="rgba(255, 215, 0, 0.35)" />

            {/* Crimson Velvet Box */}
            <rect x="125" y="132" width="40" height="30" rx="4" fill="url(#majnuGiftBox)" stroke="#ffd166" strokeWidth="1.2" />
            {/* Vertical Golden Ribbon */}
            <rect x="142" y="132" width="6.5" height="30" fill="url(#majnuGoldRibbon)" />
            {/* Horizontal Golden Ribbon */}
            <rect x="125" y="143" width="40" height="6.5" fill="url(#majnuGoldRibbon)" />

            {/* Radiant Satin Bow */}
            <ellipse cx="139" cy="128" rx="7" ry="4.5" fill="url(#majnuGoldRibbon)" transform="rotate(-20 139 128)" />
            <ellipse cx="151" cy="128" rx="7" ry="4.5" fill="url(#majnuGoldRibbon)" transform="rotate(20 151 128)" />
            <circle cx="145" cy="130" r="3" fill="#d90429" stroke="url(#majnuGoldRibbon)" strokeWidth="0.8" />

            {/* Sparkle highlights */}
            <circle cx="120" cy="126" r="2.5" fill="#ffd166" style={{ animation: 'magic-sparkle 2s infinite' }} />
            <circle cx="170" cy="132" r="2.5" fill="#ffffff" style={{ animation: 'magic-sparkle 2.4s infinite 0.4s' }} />
          </g>
        )}

        {/* Neck with Sun-Kissed Tone */}
        <path d="M 88 70 L 88 88 L 102 88 L 102 70 Z" fill="url(#majnuSkinClean)" stroke="#9c5631" strokeWidth="0.8" />

        {/* ================= HANDSOME AVINASH TIWARY / MAJNU HEAD & EXPRESSIVE FACE ================= */}
        <g id="majnu-head" style={{ transformOrigin: '95px 54px' }}>
          {/* Well-Defined Heroic Jawline & Head Contour */}
          <path
            d="M 81 44 
               C 81 28, 107 28, 107 44 
               C 107 60, 103 72, 95 76 
               C 87 72, 81 60, 81 44 Z"
            fill="url(#majnuSkinClean)"
            stroke="#9c5631"
            strokeWidth="0.9"
          />

          {/* Warm Rosy Glow on Cheeks */}
          <ellipse cx="88" cy="58" rx="4.5" ry="3" fill="#e76f51" opacity="0.22" />
          <ellipse cx="102" cy="58" rx="4.5" ry="3" fill="#e76f51" opacity="0.22" />

          {/* Handsome Straight Mountain Nose */}
          <path d="M 95 50 L 97 60 L 93 61" fill="none" stroke="#9c5631" strokeWidth="1.6" strokeLinecap="round" />

          {/* Radiant, Adoring Smile Showing Brilliant White Teeth (Just like in the still!) */}
          <g id="majnu-smile">
            <path
              d="M 88 66 Q 95 73 102 66 Q 95 70 88 66 Z"
              fill="#c1121f"
            />
            {/* White teeth shine */}
            <path
              d="M 89.5 66.5 Q 95 70 100.5 66.5 Q 95 68 89.5 66.5 Z"
              fill="#ffffff"
            />
            <path
              d="M 87 65.5 Q 95 73.5 103 65.5"
              fill="none"
              stroke="#581908"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </g>

          {/* ================= SOULFUL PASSIONATE DARK EYE LEFT ================= */}
          <g className="majnu-eye-blink">
            <path d="M 83 49 Q 88 44 93 48" fill="none" stroke="#040101" strokeWidth="2.2" strokeLinecap="round" />
            <ellipse cx="88" cy="52" rx="3.8" ry="4.2" fill="url(#majnuDarkEye)" />
            <circle cx="88" cy="52" r="2.2" fill="#020101" />
            <circle cx="89.2" cy="50.5" r="1.4" fill="#ffffff" />
          </g>

          {/* ================= SOULFUL PASSIONATE DARK EYE RIGHT (Gazing at Laila) ================= */}
          <g className="majnu-eye-blink">
            <path d="M 96 48 Q 101 44 106 49" fill="none" stroke="#040101" strokeWidth="2.2" strokeLinecap="round" />
            <ellipse cx="101" cy="52" rx="3.8" ry="4.2" fill="url(#majnuDarkEye)" />
            <circle cx="101" cy="52" r="2.2" fill="#020101" />
            <circle cx="102.2" cy="50.5" r="1.4" fill="#ffffff" />
          </g>

          {/* Expressive Masculine Eyebrows */}
          <path d="M 82 45 Q 88 40 93 44" fill="none" stroke="#0b0301" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 96 44 Q 101 40 107 45" fill="none" stroke="#0b0301" strokeWidth="2.4" strokeLinecap="round" />

          {/* ================= ICONIC TOUSLED, WAVY MOUNTAIN HAIR (Matching Avinash Tiwary) ================= */}
          {/* Main hair volume */}
          <path
            d="M 78 42 
               C 74 18, 112 16, 110 42 
               C 114 30, 104 20, 95 20 
               C 85 20, 78 30, 78 42 Z"
            fill="url(#majnuHairDark)"
          />
          {/* Wavy locks framing forehead & ears */}
          <path d="M 79 34 C 71 44, 70 64, 75 76 C 77 62, 78 48, 85 36 Z" fill="url(#majnuHairWave)" />
          {/* Bangs falling over the forehead */}
          <path d="M 88 26 C 82 36, 83 48, 89 52 C 89 44, 88 34, 91 29 Z" fill="url(#majnuHairWave)" />
          <path d="M 94 25 C 92 36, 96 46, 100 50 C 99 42, 97 34, 96 27 Z" fill="url(#majnuHairWave)" />
          {/* Curls on the right side */}
          <path d="M 105 34 C 112 46, 114 66, 108 78 C 107 64, 105 50, 99 38 Z" fill="url(#majnuHairWave)" />
          {/* Lustrous sheen line */}
          <path d="M 84 24 Q 95 19 105 24" stroke="#572e1c" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

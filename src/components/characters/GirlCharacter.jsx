import React from 'react';

export default function GirlCharacter({
  isWalking = false,
  isCelebrating = false,
  isBlowing = false,
  isLookingAtBoy = false,
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
      className={`girl-character-wrapper ${className}`}
      style={{
        display: 'inline-block',
        transform: `scaleX(${flip}) scale(${scale})`,
        transformOrigin: 'bottom center',
        transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.3, 1)',
        cursor: onClick ? 'pointer' : 'default',
        filter: 'drop-shadow(0 14px 18px rgba(0,0,0,0.38)) drop-shadow(0 3px 6px rgba(0,0,0,0.22))',
        willChange: 'transform'
      }}
    >
      <svg
        viewBox="0 0 190 290"
        width="145"
        height="230"
        style={{ overflow: 'visible' }}
        className={
          isCelebrating || isFinale
            ? 'girl-celebrating'
            : isWalking
            ? 'girl-walking'
            : isBlowing
            ? 'girl-blowing'
            : 'girl-idle'
        }
      >
        <defs>
          {/* Laila Radiant Natural Kashmiri Complexion (Soft Porcelain & Rose Glow) */}
          <radialGradient id="lailaSkinMovie" cx="45%" cy="38%" r="65%" fx="40%" fy="32%">
            <stop offset="0%" stopColor="#fff5ee" />
            <stop offset="45%" stopColor="#fde6da" />
            <stop offset="85%" stopColor="#f5c7b7" />
            <stop offset="100%" stopColor="#e4a796" />
          </radialGradient>

          {/* Pure White Kashmiri Gown with Soft Shading */}
          <linearGradient id="lailaWhiteGown" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#fafafa" />
            <stop offset="70%" stopColor="#f0f2f5" />
            <stop offset="100%" stopColor="#dce1e8" />
          </linearGradient>

          <linearGradient id="lailaFlaredSleeve" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f8f9fa" />
            <stop offset="100%" stopColor="#e9ecef" />
          </linearGradient>

          {/* Lustrous Flowing Jet-Black Hair */}
          <radialGradient id="lailaMovieHair" cx="40%" cy="30%" r="70%" fx="35%" fy="25%">
            <stop offset="0%" stopColor="#301b14" />
            <stop offset="35%" stopColor="#1e0e08" />
            <stop offset="75%" stopColor="#0f0502" />
            <stop offset="100%" stopColor="#040101" />
          </radialGradient>

          <linearGradient id="lailaHairWaveMovie" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#43251b" />
            <stop offset="40%" stopColor="#221008" />
            <stop offset="100%" stopColor="#0a0302" />
          </linearGradient>

          {/* Laila's Soulful Warm Brown Eyes */}
          <radialGradient id="lailaEyeMovie" cx="45%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#6e3d22" />
            <stop offset="45%" stopColor="#422110" />
            <stop offset="85%" stopColor="#1a0a03" />
            <stop offset="100%" stopColor="#030101" />
          </radialGradient>

          {/* Silver Kashmiri Dangling Earring */}
          <linearGradient id="lailaSilverEarring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#ced4da" />
            <stop offset="100%" stopColor="#6c757d" />
          </linearGradient>
        </defs>

        <style>
          {`
            .girl-idle {
              animation: laila-breathe-movie 3.6s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .girl-walking {
              animation: laila-stride-movie 0.72s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .girl-celebrating {
              animation: laila-celebrate-movie 0.95s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .girl-blowing {
              animation: laila-blow-movie 1.6s ease-in-out infinite;
              transform-origin: bottom center;
            }

            @keyframes laila-breathe-movie {
              0%, 100% { transform: translate3d(0, 0, 0); }
              50% { transform: translate3d(0, -3px, 0); }
            }
            @keyframes laila-stride-movie {
              0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
              50% { transform: translate3d(0, -5px, 0) rotate(1.2deg); }
            }
            @keyframes laila-celebrate-movie {
              0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
              50% { transform: translate3d(0, -6px, 0) scale(1.02); }
            }
            @keyframes laila-blow-movie {
              0%, 100% { transform: translate3d(0, 0, 0) rotate(2deg); }
              50% { transform: translate3d(4px, -2px, 0) rotate(5deg); }
            }

            .laila-hair-motion {
              transform-origin: 85px 50px;
              animation: laila-hair-breeze 3.2s ease-in-out infinite;
            }
            @keyframes laila-hair-breeze {
              0%, 100% { transform: rotate(0deg) skewX(0deg); }
              50% { transform: rotate(-5deg) skewX(-4deg); }
            }

            .laila-dress-motion {
              transform-origin: 95px 150px;
              animation: laila-dress-breeze 3.5s ease-in-out infinite;
            }
            @keyframes laila-dress-breeze {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-3deg) scaleX(1.03); }
            }

            .laila-bell-sleeve-motion {
              transform-origin: 70px 130px;
              animation: laila-sleeve-flutter 2.8s ease-in-out infinite;
            }
            @keyframes laila-sleeve-flutter {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-6deg) scaleY(1.04); }
            }

            .laila-eye-blink {
              transform-origin: 98px 58px;
              animation: blink 4s infinite;
            }
          `}
        </style>

        {/* Soft Grass Contact Shadow */}
        <ellipse cx="95" cy="274" rx="55" ry="12" fill="rgba(4, 12, 8, 0.45)" />
        <ellipse cx="95" cy="274" rx="35" ry="6" fill="rgba(2, 6, 4, 0.65)" />

        {/* Delicate Mojaris / Bare Feet running on grass */}
        <g id="laila-feet">
          <ellipse cx="84" cy="266" rx="9" ry="5" fill="#f8f9fa" stroke="#ced4da" strokeWidth="1" />
          <ellipse cx="106" cy="266" rx="9" ry="5" fill="#f8f9fa" stroke="#ced4da" strokeWidth="1" />
        </g>

        {/* Long Voluminous Jet-Black Hair Cascading in the Wind (Back Layer) */}
        <g className="laila-hair-motion" id="laila-back-hair">
          <path
            d="M 82 50 
               C 48 55, 26 90, 28 145 
               C 30 185, 52 215, 42 245 
               C 34 218, 44 160, 56 120 
               C 66 88, 76 65, 82 50 Z"
            fill="url(#lailaMovieHair)"
          />
          {/* Silky Hair Waves */}
          <path d="M 40 120 C 34 150, 48 185, 38 230" fill="none" stroke="url(#lailaHairWaveMovie)" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 40 120 C 34 150, 48 185, 38 230" fill="none" stroke="#542e1d" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        </g>

        {/* ================= ICONIC PURE WHITE KASHMIRI GOWN (From Film Scene) ================= */}
        <g className="laila-dress-motion" id="laila-dress">
          {/* Flared Flowing Skirt */}
          <path
            d="M 85 125 
               C 74 155, 50 205, 38 262 
               C 70 269, 122 271, 154 260 
               C 138 195, 116 155, 105 125 Z"
            fill="url(#lailaWhiteGown)"
            stroke="#ced4da"
            strokeWidth="0.8"
          />

          {/* Delicate Kashmiri White-on-White Floral Embroidery (Chikankari) */}
          <g opacity="0.65">
            {/* Scalloped hem lace */}
            <path
              d="M 38 262 Q 44 266 50 263 Q 56 267 62 264 Q 68 268 74 265 Q 80 269 86 266 Q 92 270 98 267 Q 104 271 110 268 Q 116 271 122 267 Q 128 270 134 266 Q 140 269 146 264 Q 150 263 154 260"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
            />
            {/* White floral embroidery motifs on skirt */}
            <circle cx="65" cy="235" r="3.5" fill="#ffffff" />
            <circle cx="65" cy="235" r="1.5" fill="#e9ecef" />
            <circle cx="85" cy="245" r="3.5" fill="#ffffff" />
            <circle cx="85" cy="245" r="1.5" fill="#e9ecef" />
            <circle cx="108" cy="242" r="3.5" fill="#ffffff" />
            <circle cx="108" cy="242" r="1.5" fill="#e9ecef" />
            <circle cx="130" cy="234" r="3.5" fill="#ffffff" />
            <circle cx="130" cy="234" r="1.5" fill="#e9ecef" />
            <circle cx="75" cy="195" r="3" fill="#ffffff" />
            <circle cx="98" cy="198" r="3" fill="#ffffff" />
            <circle cx="118" cy="192" r="3" fill="#ffffff" />
          </g>

          {/* Soft Fabric Folds */}
          <path
            d="M 54 170 Q 62 220 50 263 Q 66 267 80 265 Q 72 215 64 170 Z"
            fill="#e9ecef"
            opacity="0.4"
          />
          <path
            d="M 94 160 Q 102 215 98 267 Q 114 265 124 262 Q 116 210 106 160 Z"
            fill="#ffffff"
            opacity="0.6"
          />
        </g>

        {/* FITTED WHITE EMBROIDERED BODICE */}
        <g id="laila-bodice">
          <path
            d="M 82 92 C 78 106, 82 124, 85 130 C 92 132, 98 132, 105 130 C 108 124, 112 106, 108 92 Z"
            fill="url(#lailaWhiteGown)"
            stroke="#ced4da"
            strokeWidth="0.8"
          />
          {/* Soft V-Neckline with White Lace Border */}
          <path d="M 88 92 Q 95 102 102 92" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 88 92 Q 95 102 102 92" fill="none" stroke="#ced4da" strokeWidth="0.8" strokeLinecap="round" />

          {/* White Floral Motifs on Bodice */}
          <circle cx="95" cy="110" r="2.5" fill="#ffffff" />
          <circle cx="95" cy="120" r="2.5" fill="#ffffff" />
        </g>

        {/* ================= ICONIC FLARED BELL SLEEVES (Wide at Cuffs) ================= */}
        {/* Left Flared Bell Sleeve */}
        <g className="laila-bell-sleeve-motion" id="laila-left-bell-sleeve">
          {/* Upper Arm */}
          <path
            d="M 80 94 C 70 106, 68 120, 68 135 L 78 135 C 78 122, 82 110, 88 98 Z"
            fill="url(#lailaWhiteGown)"
          />
          {/* Flared Bell Cuff (Billowing Outward Graciously) */}
          <path
            d="M 68 135 
               C 56 148, 48 165, 46 178 
               C 58 182, 74 178, 82 165 
               C 80 152, 78 142, 78 135 Z"
            fill="url(#lailaFlaredSleeve)"
            stroke="#ced4da"
            strokeWidth="0.8"
          />
          {/* Scalloped Bell Sleeve Lace */}
          <path
            d="M 46 178 Q 54 182 62 179 Q 70 183 76 174 Q 80 170 82 165"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
          />
          {/* Hand Peeking Out of Bell Sleeve */}
          <ellipse cx="64" cy="172" rx="4.5" ry="3.5" fill="url(#lailaSkinMovie)" />
        </g>

        {/* Right Flared Bell Sleeve */}
        <g id="laila-right-bell-sleeve">
          {isBlowing ? (
            <g>
              <path
                d="M 108 94 C 118 104, 126 114, 130 125 L 122 128 C 116 118, 112 110, 106 98 Z"
                fill="url(#lailaWhiteGown)"
              />
              <path
                d="M 126 120 C 136 128, 148 138, 154 148 C 146 152, 134 146, 124 136 Z"
                fill="url(#lailaFlaredSleeve)"
                stroke="#ced4da"
                strokeWidth="0.8"
              />
              <ellipse cx="140" cy="140" rx="4.5" ry="3.5" fill="url(#lailaSkinMovie)" />
            </g>
          ) : isLookingAtBoy || isFinale ? (
            // Hand gently touching chest / heart with loving joy
            <g>
              <path
                d="M 108 94 C 116 104, 116 116, 112 125 L 105 125 C 106 114, 108 104, 106 98 Z"
                fill="url(#lailaWhiteGown)"
              />
              <path
                d="M 112 122 C 120 128, 126 138, 128 148 C 120 152, 110 148, 105 138 Z"
                fill="url(#lailaFlaredSleeve)"
                stroke="#ced4da"
                strokeWidth="0.8"
              />
              <ellipse cx="114" cy="136" rx="4.5" ry="3.5" fill="url(#lailaSkinMovie)" />
            </g>
          ) : (
            // Gracefully waving / holding bluebell
            <g>
              <path
                d="M 108 94 C 116 108, 118 124, 116 138 L 108 138 C 110 126, 110 110, 106 98 Z"
                fill="url(#lailaWhiteGown)"
              />
              <path
                d="M 116 135 C 126 148, 134 165, 138 178 C 128 182, 114 178, 108 165 Z"
                fill="url(#lailaFlaredSleeve)"
                stroke="#ced4da"
                strokeWidth="0.8"
              />
              <path
                d="M 138 178 Q 130 182 122 179 Q 114 183 108 165"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.5"
              />
              <ellipse cx="124" cy="172" rx="4.5" ry="3.5" fill="url(#lailaSkinMovie)" />
            </g>
          )}
        </g>

        {/* Slender Graceful Neck & Delicate Collarbone */}
        <path d="M 90 78 L 90 94 L 100 94 L 100 78 Z" fill="url(#lailaSkinMovie)" stroke="#d48b78" strokeWidth="0.5" />
        <path d="M 89 92 Q 95 96 101 92" fill="none" stroke="#e4a796" strokeWidth="1.2" />

        {/* ================= GORGEOUS LAILA HEAD & RADIANT FACE (Triptii Dimri Likeness) ================= */}
        <g id="laila-head" style={{ transformOrigin: '95px 60px' }}>
          {/* Beautiful Soft Oval Face */}
          <path
            d="M 81 50 
               C 81 33, 109 33, 109 50 
               C 109 66, 104 77, 95 81 
               C 86 77, 81 66, 81 50 Z"
            fill="url(#lailaSkinMovie)"
            stroke="#d48b78"
            strokeWidth="0.7"
          />

          {/* Radiant Soft Rosy Blush on Cheeks */}
          <ellipse cx="86" cy="65" rx="5" ry="3.2" fill="#ff758f" opacity="0.35" />
          <ellipse cx="104" cy="65" rx="5" ry="3.2" fill="#ff758f" opacity="0.35" />

          {/* Cute Delicate Nose */}
          <path d="M 94 62 Q 95 65 96 62" fill="none" stroke="#c08272" strokeWidth="1.2" strokeLinecap="round" />

          {/* Radiant Joyful Smile (Showing tender white teeth / joyful smile from photo!) */}
          <g id="laila-smile">
            <path
              d={isBlowing ? 'M 92 72 Q 95 76 98 72' : 'M 90 69 Q 95 75 100 69'}
              fill="#b51735"
              stroke="#800f2f"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            {/* White radiant smile gleam */}
            {!isBlowing && (
              <path d="M 92 70 Q 95 72 98 70" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </g>

          {/* ================= BIG SOULFUL DOE EYE LEFT ================= */}
          <g className="laila-eye-blink">
            <path d="M 84 54 Q 89 49 94 54" fill="none" stroke="#120603" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="93" y1="53" x2="96" y2="51" stroke="#120603" strokeWidth="1.6" strokeLinecap="round" />

            <ellipse cx="89" cy="57" rx="4.2" ry="4.8" fill="url(#lailaEyeMovie)" />
            <circle cx="89" cy="57" r="2.6" fill="#040101" />

            {/* Sparkle Catchlights */}
            <circle cx="90.5" cy="55.2" r="1.6" fill="#ffffff" />
            <circle cx="87.8" cy="58.5" r="0.9" fill="#ffffff" opacity="0.9" />

            <path d="M 85 58 Q 89 61 93 58" fill="none" stroke="#3d1f14" strokeWidth="0.8" strokeLinecap="round" />
          </g>

          {/* ================= BIG SOULFUL DOE EYE RIGHT ================= */}
          <g className="laila-eye-blink">
            <path d="M 96 54 Q 101 49 106 54" fill="none" stroke="#120603" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="105" y1="53" x2="108" y2="51" stroke="#120603" strokeWidth="1.6" strokeLinecap="round" />

            <ellipse cx="101" cy="57" rx="4.2" ry="4.8" fill="url(#lailaEyeMovie)" />
            <circle cx="101" cy="57" r="2.6" fill="#040101" />

            <circle cx="102.5" cy="55.2" r="1.6" fill="#ffffff" />
            <circle cx="99.8" cy="58.5" r="0.9" fill="#ffffff" opacity="0.9" />

            <path d="M 97 58 Q 101 61 105 58" fill="none" stroke="#3d1f14" strokeWidth="0.8" strokeLinecap="round" />
          </g>

          {/* Natural Arched Eyebrows */}
          <path d="M 84 50 Q 89 46 94 50" fill="none" stroke="#241108" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M 96 50 Q 101 46 106 50" fill="none" stroke="#241108" strokeWidth="1.6" strokeLinecap="round" />

          {/* Silky Hair Framing the Face */}
          <path
            d="M 79 50 C 77 30, 113 30, 111 50 C 108 42, 102 36, 95 36 C 88 36, 82 42, 79 50 Z"
            fill="url(#lailaMovieHair)"
          />
          {/* Hair locks gently framing ears & cheeks */}
          <path d="M 81 44 C 75 55, 75 72, 79 84 C 81 72, 82 55, 84 46 Z" fill="url(#lailaHairWaveMovie)" />
          <path d="M 109 44 C 115 55, 115 72, 111 84 C 109 72, 108 55, 106 46 Z" fill="url(#lailaHairWaveMovie)" />

          {/* ================= WHITE LACE EMBROIDERED HAIRBAND (From Movie Photo!) ================= */}
          <path
            d="M 81 44 Q 95 38 109 44 L 110 48 Q 95 42 80 48 Z"
            fill="#ffffff"
            stroke="#ced4da"
            strokeWidth="0.8"
          />
          <circle cx="88" cy="43" r="1.5" fill="#f8f9fa" />
          <circle cx="95" cy="41" r="1.8" fill="#f8f9fa" />
          <circle cx="102" cy="43" r="1.5" fill="#f8f9fa" />

          {/* Dangling Silver Kashmiri Earrings (From Movie Photo!) */}
          <g id="laila-movie-earrings">
            <circle cx="78" cy="65" r="1.6" fill="url(#lailaSilverEarring)" />
            <line x1="78" y1="66" x2="78" y2="73" stroke="url(#lailaSilverEarring)" strokeWidth="1.2" />
            <circle cx="78" cy="74" r="1.8" fill="#212529" stroke="url(#lailaSilverEarring)" strokeWidth="0.6" />

            <circle cx="112" cy="65" r="1.6" fill="url(#lailaSilverEarring)" />
            <line x1="112" y1="66" x2="112" y2="73" stroke="url(#lailaSilverEarring)" strokeWidth="1.2" />
            <circle cx="112" cy="74" r="1.8" fill="#212529" stroke="url(#lailaSilverEarring)" strokeWidth="0.6" />
          </g>
        </g>
      </svg>
    </div>
  );
}

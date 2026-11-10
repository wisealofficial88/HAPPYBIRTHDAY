import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import DeerCharacter from './DeerCharacter';
import AnimalCharacter from './characters/AnimalCharacter';
import GirlCharacter from './characters/GirlCharacter';
import BoyCharacter from './characters/BoyCharacter';
import CakeInteraction from './CakeInteraction';
import GiftLetter from './GiftLetter';
import FireworksCanvas, { triggerGrandCelebration, launchConfettiCannons } from './FireworksCanvas';
import { sound } from './AudioController';
import { birthdayConfig } from '../config';
import { Sparkles, Heart, Gift, FileText, RotateCcw } from 'lucide-react';

export default function BirthdayParty({ onRestartJourney }) {
  // Stages: 'cake' -> 'boy_entrance' -> 'gift_presented' -> 'grand_finale'
  const [stage, setStage] = useState('cake');
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [boyDistance, setBoyDistance] = useState('far'); // 'far' -> 'approaching' -> 'arrived'
  const [activeSpeech, setActiveSpeech] = useState({});
  const [releasedCount, setReleasedCount] = useState(0);

  // Dynamic user-released floating lanterns
  const [userLanterns, setUserLanterns] = useState([]);

  // Stardust click bursts
  const [stardusts, setStardusts] = useState([]);

  const cfg = birthdayConfig;

  // On mount: arrival fanfare
  useEffect(() => {
    sound.playCelebrationFanfare();
  }, []);

  // When candles are blown
  const handleCandlesBlown = () => {
    setCandlesBlown(true);
    triggerGrandCelebration();

    // After 1.4s, begin Phase 4: Cinematic entrance of the Boy from the mountains
    setTimeout(() => {
      setStage('boy_entrance');
      setBoyDistance('far');

      // Boy approaches from distance
      setTimeout(() => {
        setBoyDistance('approaching');
      }, 700);

      // Boy arrives center stage presenting gift
      setTimeout(() => {
        setBoyDistance('arrived');
        setStage('gift_presented');
        sound.playCelebrationFanfare();
      }, 3000);
    }, 1400);
  };

  const handleOpenLetter = () => {
    setIsLetterOpen(true);
  };

  const handleCloseLetter = () => {
    setIsLetterOpen(false);
    // Transition to the Grand Finale!
    if (stage !== 'grand_finale') {
      setStage('grand_finale');
      triggerGrandCelebration();
    }
  };

  // Launch a new sky lantern (Interactive & Instant!)
  const handleReleaseLantern = (clickX = null, clickY = null) => {
    sound.playLanternRise();
    const wishes = [
      'Pure Joy ✨',
      'Eternal Love 💖',
      'Sweet Laughter 🌸',
      'Bright Dreams 🌟',
      'Serenity 🕊️',
      'Endless Wonder 💫',
      'Timeless Health 🌺',
      'Grace & Blessings 🕯️'
    ];

    const posX = clickX !== null ? Math.max(8, Math.min(clickX, 92)) : Math.floor(Math.random() * 75) + 12;
    const startBottom = clickY !== null ? Math.max(10, 100 - clickY) : 8;

    const newLantern = {
      id: Date.now() + Math.random(),
      x: posX,
      bottom: startBottom,
      scale: 0.85 + Math.random() * 0.35,
      wish: wishes[Math.floor(Math.random() * wishes.length)]
    };

    setUserLanterns((prev) => [...prev, newLantern]);
    setReleasedCount((c) => c + 1);

    // Stardust burst at spawn
    setStardusts((prev) => [
      ...prev,
      { id: Date.now(), x: posX, y: clickY !== null ? clickY : 85 }
    ]);
    setTimeout(() => {
      setStardusts((prev) => prev.filter((s) => Date.now() - s.id < 1200));
    }, 1200);
  };

  const handleAnimalClick = (animalKey) => {
    sound.playStarChime(Math.floor(Math.random() * 3));
    const quote = cfg.animalQuotes[animalKey] || 'Happy Birthday!';
    setActiveSpeech((prev) => ({ ...prev, [animalKey]: quote }));
    setTimeout(() => {
      setActiveSpeech((prev) => ({ ...prev, [animalKey]: null }));
    }, 2800);
  };

  const handleSkyTap = (e) => {
    if (stage === 'grand_finale') {
      const rect = e.currentTarget.getBoundingClientRect();
      const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
      const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
      handleReleaseLantern(xPercent, yPercent);
    }
  };

  // Ambient sky lanterns positioned exclusively on left and right flanks
  // so the center sky message and title NEVER have text collisions or overlaps!
  const ambientLanterns = [
    { id: 'amb1', x: 6, y: 18, scale: 0.75, delay: '0s', wish: 'Pure Joy ✨' },
    { id: 'amb2', x: 15, y: 30, scale: 0.85, delay: '1.4s', wish: 'Eternal Love 💖' },
    { id: 'amb3', x: 8, y: 46, scale: 0.65, delay: '0.8s', wish: 'Serenity 🕊️' },
    { id: 'amb4', x: 17, y: 60, scale: 0.72, delay: '2.1s', wish: 'Wonder 💫' },
    { id: 'amb5', x: 83, y: 16, scale: 0.82, delay: '0.5s', wish: 'Sweet Dreams 🌟' },
    { id: 'amb6', x: 92, y: 28, scale: 0.88, delay: '1.7s', wish: 'Blessings 🌸' },
    { id: 'amb7', x: 81, y: 44, scale: 0.68, delay: '1.1s', wish: 'Golden Light 🕯️' },
    { id: 'amb8', x: 90, y: 58, scale: 0.72, delay: '2.4s', wish: 'Grace 🌺' }
  ];

  const balloons = [
    { color: '#ff758f', x: '8%', y: '16%', delay: '0s', size: 46 },
    { color: '#ffd166', x: '18%', y: '12%', delay: '0.8s', size: 50 },
    { color: '#48cae4', x: '26%', y: '18%', delay: '1.4s', size: 46 },
    { color: '#9d4edd', x: '72%', y: '14%', delay: '0.4s', size: 48 },
    { color: '#52b788', x: '82%', y: '10%', delay: '1.1s', size: 44 },
    { color: '#ffb703', x: '90%', y: '18%', delay: '1.7s', size: 52 }
  ];

  const isGrandFinale = stage === 'grand_finale';

  return (
    <div
      className="birthday-clearing-wrapper"
      onClick={handleSkyTap}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: isGrandFinale
          ? 'radial-gradient(ellipse at 50% 25%, #18283f 0%, #0d1b2a 45%, #050d18 100%)'
          : 'radial-gradient(ellipse at 50% 25%, #1d3557 0%, #173426 50%, #081a11 100%)',
        transition: 'background 2s ease',
        cursor: isGrandFinale ? 'pointer' : 'default',
        animation: 'clearingReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <style>
        {`
          @keyframes clearingReveal {
            from { opacity: 0; transform: scale(1.06); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes mistDrift {
            0%, 100% { transform: translateX(0); opacity: 0.35; }
            50% { transform: translateX(25px); opacity: 0.55; }
          }
          @keyframes lanternBob3D {
            0%, 100% { transform: translate3d(0, 0, 0) scale(var(--l-scale, 1)) rotate(-2deg); }
            50% { transform: translate3d(8px, -14px, 0) scale(calc(var(--l-scale, 1) * 1.03)) rotate(3deg); }
          }
          @keyframes lanternRiseAscend {
            0% {
              transform: translate3d(0, 0, 0) scale(var(--l-scale, 1)) rotate(0deg);
              opacity: 0.4;
            }
            8% {
              opacity: 1;
            }
            50% {
              transform: translate3d(24px, -45vh, 0) scale(calc(var(--l-scale, 1) * 0.92)) rotate(4deg);
            }
            100% {
              transform: translate3d(-18px, -115vh, 0) scale(calc(var(--l-scale, 1) * 0.65)) rotate(-4deg);
              opacity: 0;
            }
          }
          @keyframes shootingStarFly {
            0% {
              transform: translate3d(0, 0, 0) rotate(-35deg) scaleX(0);
              opacity: 0;
            }
            10% {
              opacity: 1;
              transform: translate3d(40px, 30px, 0) rotate(-35deg) scaleX(1);
            }
            50% {
              opacity: 1;
              transform: translate3d(200px, 150px, 0) rotate(-35deg) scaleX(1.4);
            }
            100% {
              opacity: 0;
              transform: translate3d(360px, 260px, 0) rotate(-35deg) scaleX(0.2);
            }
          }
          @keyframes campfireFlicker {
            0%, 100% { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 16px rgba(255,180,0,0.8)); }
            50% { transform: scale(1.08, 0.95) rotate(2deg); filter: drop-shadow(0 0 24px rgba(255,140,0,0.95)); }
          }
          @keyframes pineBoughSway {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(1.8deg) translateY(-2px); }
          }
          @keyframes wildflowerSway {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(4deg) skewX(2deg); }
          }
        `}
      </style>

      {/* ================= 3D MOON & STARRY CELESTIAL ENVIRONMENT (Grand Finale) ================= */}
      {isGrandFinale && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 4 }}>
          {/* Glowing 3D Moon with Crater Shading & Atmospheric Halo */}
          <div
            style={{
              position: 'absolute',
              top: '28px',
              right: '65px',
              width: '74px',
              height: '74px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #fffdf0 0%, #fff3b0 45%, #ffd166 75%, #e09f3e 100%)',
              boxShadow: '0 0 35px rgba(255, 243, 176, 0.65), 0 0 80px rgba(255, 209, 102, 0.35)',
              filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))'
            }}
          >
            <circle cx="28" cy="26" r="6" fill="#eed892" opacity="0.5" />
            <circle cx="48" cy="38" r="8.5" fill="#eed892" opacity="0.45" />
            <circle cx="34" cy="52" r="5" fill="#eed892" opacity="0.4" />
          </div>

          {/* Twinkling 3D Star Field */}
          {[
            { top: '8%', left: '10%', s: 3.5, d: '0s' },
            { top: '16%', left: '22%', s: 2.2, d: '1.2s' },
            { top: '7%', left: '38%', s: 3, d: '0.4s' },
            { top: '20%', left: '52%', s: 2.5, d: '1.8s' },
            { top: '12%', left: '68%', s: 3.5, d: '0.7s' },
            { top: '24%', left: '85%', s: 2.2, d: '2.3s' },
            { top: '30%', left: '15%', s: 2.8, d: '1.5s' },
            { top: '28%', left: '44%', s: 3.2, d: '0.9s' }
          ].map((st, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: st.top,
                left: st.left,
                width: `${st.s}px`,
                height: `${st.s}px`,
                borderRadius: '50%',
                background: '#ffffff',
                boxShadow: '0 0 8px #ffd166, 0 0 16px #ffffff',
                animation: `star-pulse 2.4s ease-in-out infinite ${st.d}`
              }}
            />
          ))}

          {/* Periodic Shooting Star (Meteor) */}
          <div
            style={{
              position: 'absolute',
              top: '8%',
              left: '25%',
              width: '120px',
              height: '2px',
              background: 'linear-gradient(90deg, #ffffff 0%, rgba(255,209,102,0.8) 40%, transparent 100%)',
              borderRadius: '2px',
              animation: 'shootingStarFly 7s cubic-bezier(0.1, 0.7, 0.1, 1) infinite',
              filter: 'drop-shadow(0 0 6px #fff)'
            }}
          />
        </div>
      )}

      {/* Distant Kashmiri Mountain Valley Background */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '48%',
          pointerEvents: 'none',
          opacity: isGrandFinale ? 0.65 : 0.4,
          transition: 'opacity 2s ease'
        }}
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
      >
        <path d="M 0 320 L 220 160 L 450 280 L 720 120 L 980 270 L 1220 140 L 1440 290 L 1440 400 L 0 400 Z" fill={isGrandFinale ? '#111b27' : '#2d3748'} />
        <polygon points="720,120 680,165 760,165" fill="#f8f9fa" opacity={isGrandFinale ? 0.35 : 0.6} />
      </svg>

      {/* Floating Mountain Mist */}
      <div
        style={{
          position: 'absolute',
          top: '32%',
          left: 0,
          width: '120%',
          height: '75px',
          background: isGrandFinale
            ? 'linear-gradient(180deg, transparent, rgba(255, 230, 180, 0.12), transparent)'
            : 'linear-gradient(180deg, transparent, rgba(235, 245, 255, 0.18), transparent)',
          animation: 'mistDrift 8s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 8
        }}
      />

      {/* ================= FLOATING SKY LANTERNS (FLANK POSITIONS - NO TEXT OVERLAPS!) ================= */}
      {isGrandFinale && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 11 }}>
          {/* 1. Ambient Lanterns on Left and Right Sky Wings */}
          {ambientLanterns.map((lan) => (
            <div
              key={lan.id}
              style={{
                position: 'absolute',
                left: `${lan.x}%`,
                top: `${lan.y}%`,
                '--l-scale': lan.scale,
                animation: `lanternBob3D 4.5s ease-in-out infinite ${lan.delay}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                filter: 'drop-shadow(0 6px 14px rgba(255, 180, 0, 0.65))'
              }}
            >
              <svg viewBox="0 0 50 65" width={44 * lan.scale} height={58 * lan.scale}>
                <defs>
                  <radialGradient id={`lanGlow-${lan.id}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fff9db" />
                    <stop offset="40%" stopColor="#ffd166" />
                    <stop offset="85%" stopColor="#f77f00" />
                    <stop offset="100%" stopColor="#d62828" />
                  </radialGradient>
                </defs>
                <circle cx="25" cy="35" r="25" fill="rgba(255, 209, 102, 0.4)" />
                <path d="M 12 10 Q 7 35 14 55 L 36 55 Q 43 35 38 10 Z" fill={`url(#lanGlow-${lan.id})`} stroke="#ffd166" strokeWidth="1" />
                <ellipse cx="25" cy="10" rx="13" ry="4" fill="#f77f00" stroke="#ffd166" strokeWidth="1" />
                <ellipse cx="25" cy="55" rx="11" ry="3.5" fill="#9d0208" stroke="#ffd166" strokeWidth="1" />
                <ellipse cx="25" cy="40" rx="4.5" ry="9" fill="#ffffff" />
                <ellipse cx="25" cy="40" rx="2.5" ry="6" fill="#fff3b0" />
              </svg>
              <span
                style={{
                  marginTop: '4px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '11px',
                  color: '#fff3b0',
                  background: 'rgba(0, 0, 0, 0.55)',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(255, 209, 102, 0.4)',
                  textShadow: '0 0 8px rgba(255, 209, 102, 0.9)',
                  whiteSpace: 'nowrap',
                  fontWeight: 600
                }}
              >
                {lan.wish}
              </span>
            </div>
          ))}

          {/* 2. User-Released Lanterns Ascending from Spawn Location into the Stars */}
          {userLanterns.map((lan) => (
            <div
              key={lan.id}
              style={{
                position: 'absolute',
                left: `${lan.x}%`,
                bottom: `${lan.bottom}%`,
                '--l-scale': lan.scale,
                animation: 'lanternRiseAscend 7.5s cubic-bezier(0.2, 0.8, 0.3, 1) forwards',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                filter: 'drop-shadow(0 8px 20px rgba(255, 200, 50, 0.85))'
              }}
            >
              <svg viewBox="0 0 50 65" width={50 * lan.scale} height={65 * lan.scale}>
                <radialGradient id={`userLanGlow-${lan.id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="35%" stopColor="#fff3b0" />
                  <stop offset="70%" stopColor="#ffb703" />
                  <stop offset="100%" stopColor="#d00000" />
                </radialGradient>
                <circle cx="25" cy="35" r="28" fill="rgba(255, 215, 0, 0.55)" />
                <path d="M 12 10 Q 7 35 14 55 L 36 55 Q 43 35 38 10 Z" fill={`url(#userLanGlow-${lan.id})`} stroke="#fff3b0" strokeWidth="1.2" />
                <ellipse cx="25" cy="10" rx="13" ry="4" fill="#f77f00" stroke="#ffd166" strokeWidth="1" />
                <ellipse cx="25" cy="55" rx="11" ry="3.5" fill="#9d0208" stroke="#ffd166" strokeWidth="1" />
                <ellipse cx="25" cy="40" rx="5" ry="10" fill="#ffffff" />
              </svg>
              <span
                style={{
                  marginTop: '4px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '12px',
                  color: '#ffffff',
                  background: 'rgba(0, 0, 0, 0.65)',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  border: '1px solid #ffd166',
                  textShadow: '0 0 10px #ffd166, 0 2px 4px #000',
                  whiteSpace: 'nowrap',
                  fontWeight: 700
                }}
              >
                {lan.wish}
              </span>
            </div>
          ))}

          {/* Stardust Click Bursts */}
          {stardusts.map((st) => (
            <div
              key={st.id}
              style={{
                position: 'absolute',
                left: `${st.x}%`,
                top: `${st.y}%`,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none'
              }}
            >
              <div style={{ animation: 'magic-sparkle 1s ease-out' }}>
                <Sparkles size={36} color="#ffd166" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Balloons floating (only during cake/entrance, disappears for serene starry finale) */}
      {!isGrandFinale &&
        balloons.map((b, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: b.x,
              top: b.y,
              animation: `balloon-bob 4s ease-in-out infinite ${b.delay}`,
              zIndex: 12,
              willChange: 'transform'
            }}
          >
            <svg viewBox="0 0 60 90" width={b.size} height={b.size * 1.5}>
              <path d="M 30 5 C 10 5, 5 30, 10 50 C 15 65, 25 75, 30 75 C 35 75, 45 65, 50 50 C 55 30, 50 5, 30 5 Z" fill={b.color} />
              <ellipse cx="20" cy="22" rx="5" ry="10" fill="#ffffff" opacity="0.4" transform="rotate(-15 20 22)" />
              <polygon points="27,75 33,75 30,80" fill={b.color} />
              <path d="M 30 80 Q 26 85 30 90" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
            </svg>
          </div>
        ))}

      {/* ================= UNIFIED NON-OVERLAPPING SKY HEADER ================= */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          zIndex: 35,
          width: '92%',
          maxWidth: '850px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          pointerEvents: 'none'
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-letter)',
            fontSize: isGrandFinale ? 'clamp(24px, 3.6vw, 32px)' : 'clamp(26px, 4vw, 36px)',
            color: '#ffd166',
            lineHeight: 1.1
          }}
        >
          {isGrandFinale ? 'Beyond The Mountains & Across The Eternal Stars...' : cfg.celebrationSubtitle}
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: isGrandFinale ? 'clamp(28px, 5.2vw, 48px)' : 'clamp(28px, 5.5vw, 48px)',
            fontWeight: 700,
            letterSpacing: '0.04em',
            background: 'linear-gradient(180deg, #ffffff 0%, #fff3b0 35%, #ffd166 70%, #f77f00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.85))',
            lineHeight: 1.15,
            margin: 0
          }}
        >
          {cfg.celebrationTitle}
        </h1>

        {/* Epilogue or Sender Dedication */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(8px)',
            padding: '4px 20px',
            borderRadius: '9999px',
            border: '1.5px solid rgba(255, 215, 0, 0.5)',
            color: '#fff9db',
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: 500,
            boxShadow: '0 4px 14px rgba(0,0,0,0.35)'
          }}
        >
          {isGrandFinale ? (
            <>
              <Sparkles size={14} color="#ffd166" /> Where love is timeless and every dream comes true — Forever yours, {cfg.senderName} <Heart size={14} color="#ff758f" />
            </>
          ) : (
            <>
              <Sparkles size={13} color="#ffd166" /> With boundless love from {cfg.senderName} <Heart size={13} color="#ff758f" />
            </>
          )}
        </div>

        {/* Phase 4 Narrative Banner (when Majnu arrives) */}
        {(stage === 'boy_entrance' || stage === 'gift_presented') && (
          <div
            style={{
              marginTop: '4px',
              background: 'rgba(12, 28, 20, 0.92)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid rgba(255, 215, 0, 0.55)',
              padding: '5px 22px',
              borderRadius: '9999px',
              color: '#fff3b0',
              fontFamily: 'var(--font-heading)',
              fontSize: '15px',
              fontWeight: 600,
              boxShadow: '0 4px 18px rgba(0,0,0,0.45)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              animation: 'calm-bounce 2s infinite',
              pointerEvents: 'auto'
            }}
          >
            {boyDistance === 'arrived' ? (
              <>
                <Gift size={16} color="#ffd166" /> {cfg.senderName} presents his gift to {cfg.recipientTitle} ✨
              </>
            ) : (
              <>
                <Sparkles size={15} color="#ffd166" /> Through the mountain valley, {cfg.senderName} approaches...
              </>
            )}
          </div>
        )}

        {/* Grand Finale Tap Lantern Instruction */}
        {isGrandFinale && (
          <div
            style={{
              marginTop: '4px',
              background: 'rgba(5, 15, 25, 0.88)',
              backdropFilter: 'blur(10px)',
              border: '1.5px solid rgba(255, 209, 102, 0.55)',
              padding: '5px 22px',
              borderRadius: '9999px',
              color: '#ffd166',
              fontFamily: 'var(--font-heading)',
              fontSize: '14px',
              fontWeight: 600,
              animation: 'calm-bounce 2.5s infinite',
              boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
              whiteSpace: 'nowrap',
              pointerEvents: 'auto'
            }}
          >
            🏮 Tap anywhere in the sky to release wishing lanterns! ({releasedCount} released) 🏮
          </div>
        )}
      </div>

      {/* Meadow Ground */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '-5%',
          width: '110%',
          height: '42%',
          background: isGrandFinale
            ? 'linear-gradient(180deg, #173224 0%, #0d2217 50%, #041009 100%)'
            : 'linear-gradient(180deg, #284b39 0%, #1a3627 50%, #0b1a11 100%)',
          borderRadius: '50% 50% 0 0 / 22% 22% 0 0',
          boxShadow: isGrandFinale
            ? 'inset 0 10px 35px rgba(255, 209, 102, 0.22)'
            : 'inset 0 10px 30px rgba(82, 183, 136, 0.25)',
          transition: 'all 2s ease',
          zIndex: 15
        }}
      />

      {/* ================= KASHMIRI PINE FOREST FLANK (Left Wing) ================= */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '260px',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 17
        }}
      >
        <svg viewBox="0 0 260 800" width="100%" height="100%" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="deodarBarkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1f1610" />
              <stop offset="35%" stopColor="#3d2c20" />
              <stop offset="70%" stopColor="#2c1e15" />
              <stop offset="100%" stopColor="#150d09" />
            </linearGradient>
            <linearGradient id="deodarBarkBack" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#141a16" />
              <stop offset="60%" stopColor="#1d2620" />
              <stop offset="100%" stopColor="#0c120e" />
            </linearGradient>
            <linearGradient id="mossGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#52796f" />
              <stop offset="60%" stopColor="#354f52" />
              <stop offset="100%" stopColor="#2f3e46" />
            </linearGradient>
            <radialGradient id="graniteRockGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#6c757d" />
              <stop offset="50%" stopColor="#495057" />
              <stop offset="85%" stopColor="#343a40" />
              <stop offset="100%" stopColor="#212529" />
            </radialGradient>
          </defs>

          {/* Slender Background Pine Trunk */}
          <path d="M 120 0 L 138 0 L 155 580 L 130 580 Z" fill="url(#deodarBarkBack)" opacity="0.65" />

          {/* Massive Ancient Foreground Deodar Pine Trunk (Movie Still Authenticity) */}
          <path
            d="M -10 0 
               L 70 0 
               C 65 240, 85 450, 110 650 
               C 118 710, 140 760, 155 800 
               L -10 800 Z"
            fill="url(#deodarBarkGrad)"
          />

          {/* Bark Grooves & Ridges */}
          <path d="M 25 0 Q 32 300 48 650 Q 54 730 65 800" stroke="#120c08" strokeWidth="3" fill="none" opacity="0.8" />
          <path d="M 45 0 Q 52 350 78 680" stroke="#120c08" strokeWidth="2.5" fill="none" opacity="0.7" />
          <path d="M 10 120 Q 20 400 35 750" stroke="#4a3728" strokeWidth="2" fill="none" opacity="0.5" />

          {/* Moss patches on Pine Trunk */}
          <ellipse cx="68" cy="620" rx="16" ry="38" fill="url(#mossGrad)" opacity="0.6" transform="rotate(-5 68 620)" />
          <ellipse cx="85" cy="710" rx="20" ry="45" fill="url(#mossGrad)" opacity="0.7" transform="rotate(-8 85 710)" />

          {/* Overhanging Evergreen Needle Branches Swaying Gently */}
          <g style={{ transformOrigin: '0px 80px', animation: 'pineBoughSway 6s ease-in-out infinite' }}>
            <path d="M 0 60 Q 90 70 170 110 Q 110 95 0 90" fill="#1b3a28" />
            <path d="M 20 85 Q 120 100 210 145 Q 130 125 20 115" fill="#132a1d" />
            <path d="M 0 120 Q 80 145 150 185 Q 90 165 0 150" fill="#2d5a3f" />
            <ellipse cx="170" cy="110" rx="35" ry="12" fill="#2d5a3f" transform="rotate(15 170 110)" />
            <ellipse cx="210" cy="145" rx="38" ry="14" fill="#1b3a28" transform="rotate(18 210 145)" />
          </g>

          {/* Large Mossy Granite Boulder at Base of Tree (Seen in Movie Still) */}
          <g id="left-granite-boulder" transform="translate(65, 660)">
            <ellipse cx="45" cy="55" rx="55" ry="32" fill="rgba(0,0,0,0.45)" />
            <path
              d="M 5 60 
                 C 0 35, 20 10, 48 8 
                 C 75 6, 98 25, 96 55 
                 C 94 72, 70 82, 45 80 
                 C 20 78, 8 72, 5 60 Z"
              fill="url(#graniteRockGrad)"
              stroke="#1b1e23"
              strokeWidth="1.5"
            />
            <path
              d="M 12 40 
                 C 20 15, 45 8, 55 10 
                 C 72 12, 88 24, 90 42 
                 C 78 35, 60 38, 48 30 
                 C 36 24, 22 35, 12 40 Z"
              fill="url(#mossGrad)"
            />
            <circle cx="35" cy="22" r="3" fill="#a7c957" opacity="0.6" />
            <circle cx="65" cy="24" r="3.5" fill="#a7c957" opacity="0.5" />
          </g>
        </svg>
      </div>

      {/* ================= KASHMIRI PINE FOREST FLANK (Right Wing) ================= */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '260px',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 17
        }}
      >
        <svg viewBox="0 0 260 800" width="100%" height="100%" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
          {/* Background Pine Trunk */}
          <path d="M 125 0 L 140 0 L 115 580 L 95 580 Z" fill="url(#deodarBarkBack)" opacity="0.6" />

          {/* Massive Ancient Foreground Pine Trunk */}
          <path
            d="M 270 0 
               L 190 0 
               C 195 240, 175 450, 150 650 
               C 142 710, 120 760, 105 800 
               L 270 800 Z"
            fill="url(#deodarBarkGrad)"
          />

          {/* Bark Grooves */}
          <path d="M 235 0 Q 228 300 212 650 Q 206 730 195 800" stroke="#120c08" strokeWidth="3" fill="none" opacity="0.8" />
          <path d="M 215 0 Q 208 350 182 680" stroke="#120c08" strokeWidth="2.5" fill="none" opacity="0.7" />

          {/* Moss on trunk */}
          <ellipse cx="192" cy="630" rx="16" ry="38" fill="url(#mossGrad)" opacity="0.6" transform="rotate(6 192 630)" />
          <ellipse cx="175" cy="720" rx="20" ry="45" fill="url(#mossGrad)" opacity="0.7" transform="rotate(8 175 720)" />

          {/* Overhanging Evergreen Needle Branches Swaying Gently */}
          <g style={{ transformOrigin: '260px 90px', animation: 'pineBoughSway 6.5s ease-in-out infinite 0.8s' }}>
            <path d="M 260 70 Q 170 80 90 120 Q 150 105 260 100" fill="#1b3a28" />
            <path d="M 240 95 Q 140 110 50 155 Q 130 135 240 125" fill="#132a1d" />
            <path d="M 260 130 Q 180 155 110 195 Q 170 175 260 160" fill="#2d5a3f" />
            <ellipse cx="90" cy="120" rx="35" ry="12" fill="#2d5a3f" transform="rotate(-15 90 120)" />
            <ellipse cx="50" cy="155" rx="38" ry="14" fill="#1b3a28" transform="rotate(-18 50 155)" />
          </g>

          {/* Large Mossy Granite Boulder on Right */}
          <g id="right-granite-boulder" transform="translate(100, 670)">
            <ellipse cx="45" cy="55" rx="55" ry="32" fill="rgba(0,0,0,0.45)" />
            <path
              d="M 5 58 
                 C 2 32, 22 10, 50 9 
                 C 76 8, 96 26, 94 56 
                 C 92 72, 68 82, 44 80 
                 C 20 78, 8 70, 5 58 Z"
              fill="url(#graniteRockGrad)"
              stroke="#1b1e23"
              strokeWidth="1.5"
            />
            <path
              d="M 14 38 
                 C 22 15, 48 8, 58 10 
                 C 74 12, 88 24, 90 40 
                 C 76 33, 62 36, 50 28 
                 C 38 22, 24 33, 14 38 Z"
              fill="url(#mossGrad)"
            />
            <circle cx="38" cy="22" r="3" fill="#a7c957" opacity="0.6" />
          </g>
        </svg>
      </div>

      {/* ================= KASHMIRI ALPINEMWILD FLOWERS (Meadow Ground Flora) ================= */}
      <div
        style={{
          position: 'absolute',
          bottom: '4%',
          left: '4%',
          right: '4%',
          height: '35px',
          pointerEvents: 'none',
          zIndex: 18,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: '0 20px'
        }}
      >
        {[
          { type: 'buttercup', color: '#ffd166', center: '#f77f00', size: 13, delay: '0s' },
          { type: 'forgetmenot', color: '#90e0ef', center: '#ffd166', size: 11, delay: '0.6s' },
          { type: 'daisy', color: '#ffffff', center: '#ffb703', size: 14, delay: '1.2s' },
          { type: 'buttercup', color: '#ffd166', center: '#f77f00', size: 12, delay: '0.3s' },
          { type: 'forgetmenot', color: '#a2d2ff', center: '#ffd166', size: 11, delay: '0.9s' },
          { type: 'daisy', color: '#ffffff', center: '#ffb703', size: 13, delay: '1.5s' },
          { type: 'buttercup', color: '#ffd166', center: '#f77f00', size: 13, delay: '0.7s' },
          { type: 'forgetmenot', color: '#90e0ef', center: '#ffd166', size: 12, delay: '1.1s' }
        ].map((fl, idx) => (
          <div
            key={idx}
            style={{
              animation: `wildflowerSway 3.6s ease-in-out infinite ${fl.delay}`,
              transformOrigin: 'bottom center',
              filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.5))'
            }}
          >
            <svg viewBox="0 0 24 28" width={fl.size * 1.5} height={fl.size * 1.8}>
              <path d="M 12 28 Q 11 18 12 12" stroke="#38b000" strokeWidth="2" fill="none" />
              <path d="M 12 20 Q 8 18 6 15" stroke="#2d6a4f" strokeWidth="1.5" fill="none" />
              <circle cx="12" cy="10" r="7" fill={fl.color} opacity="0.9" />
              <circle cx="12" cy="10" r="3.2" fill={fl.center} />
            </svg>
          </div>
        ))}
      </div>

      {/* ================= 3D WARM CAMPFIRE IN MEADOW (Grand Finale) ================= */}
      {isGrandFinale && (
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 22,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none'
          }}
        >
          <ellipse cx="50" cy="50" rx="90" ry="24" fill="rgba(255, 170, 0, 0.25)" filter="blur(10px)" />
          <svg viewBox="0 0 100 80" width="85" height="68" style={{ overflow: 'visible' }}>
            <rect x="15" y="55" width="70" height="12" rx="4" fill="#3e2009" transform="rotate(-10 50 61)" stroke="#1a0a03" strokeWidth="1" />
            <rect x="15" y="55" width="70" height="12" rx="4" fill="#4a2810" transform="rotate(10 50 61)" stroke="#1a0a03" strokeWidth="1" />
            <circle cx="50" cy="58" r="14" fill="#d90429" opacity="0.8" />
            <circle cx="50" cy="58" r="8" fill="#ffd166" />
            <g style={{ animation: 'campfireFlicker 1.8s ease-in-out infinite', transformOrigin: '50px 60px' }}>
              <path
                d="M 50 15 
                   C 65 32, 70 48, 58 60 
                   C 50 64, 42 62, 38 56 
                   C 32 46, 38 32, 50 15 Z"
                fill="url(#fireGrad)"
              />
              <path
                d="M 50 28 
                   C 60 40, 62 50, 54 58 
                   C 48 60, 44 58, 42 54 
                   C 38 48, 42 38, 50 28 Z"
                fill="#ffffff"
                opacity="0.85"
              />
            </g>
            <defs>
              <radialGradient id="fireGrad" cx="50%" cy="75%" r="60%">
                <stop offset="0%" stopColor="#fff3b0" />
                <stop offset="35%" stopColor="#ffd166" />
                <stop offset="75%" stopColor="#f77f00" />
                <stop offset="100%" stopColor="#d62828" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      )}

      {/* ================= PHASE 3: CAKE AND CANDLES ================= */}
      {stage === 'cake' && (
        <div
          style={{
            position: 'absolute',
            bottom: '18%',
            left: '50%',
            transform: 'translateX(-50%) scale(1)',
            zIndex: 22,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <CakeInteraction
            isBlown={candlesBlown}
            onCandlesBlown={handleCandlesBlown}
          />
        </div>
      )}

      {/* The Girl & Baby Deer in Phase 3 (Beside the Cake) */}
      {stage === 'cake' && (
        <>
          {/* Beautiful Laila standing beside the cake */}
          <div
            style={{
              position: 'absolute',
              bottom: '16%',
              left: '36%',
              zIndex: 24,
              transition: 'all 0.5s ease'
            }}
          >
            <GirlCharacter
              isWalking={false}
              isCelebrating={candlesBlown}
              isBlowing={!candlesBlown}
              direction="right"
              scale={0.96}
            />
          </div>

          {/* Baby Deer beside Laila */}
          <div
            style={{
              position: 'absolute',
              bottom: '14%',
              left: '22%',
              zIndex: 23
            }}
          >
            <DeerCharacter
              isCelebrating={candlesBlown}
              direction="right"
              scale={0.92}
              onClick={() => handleAnimalClick('deer')}
            />
          </div>
        </>
      )}

      {/* ================= PHASE 4: CINEMATIC ENTRANCE OF MAJNU ================= */}
      {(stage === 'boy_entrance' || stage === 'gift_presented') && (
        <>
          {/* Center Meeting Stage: Gorgeous Laila & Handsome Majnu */}
          <div
            style={{
              position: 'absolute',
              bottom: '14%',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 26,
              display: 'flex',
              alignItems: 'flex-end',
              gap: '24px'
            }}
          >
            {/* The Baby Deer watching happily nearby */}
            <div style={{ marginRight: '10px' }}>
              <DeerCharacter
                direction="right"
                scale={0.88}
                isCelebrating={true}
                onClick={() => handleAnimalClick('deer')}
              />
            </div>

            {/* Gorgeous Laila looking at Majnu */}
            <div style={{ position: 'relative' }}>
              <GirlCharacter
                direction="right"
                scale={0.96}
                isCelebrating={boyDistance === 'arrived'}
                isLookingAtBoy={true}
              />
            </div>

            {/* Handsome Majnu Approaching (Clean, Handsome Hero) */}
            <div
              style={{
                position: 'relative',
                transform:
                  boyDistance === 'far'
                    ? 'translate3d(180px, -40px, 0) scale(0.48)'
                    : boyDistance === 'approaching'
                    ? 'translate3d(60px, -15px, 0) scale(0.74)'
                    : 'translate3d(0, 0, 0) scale(0.96)',
                opacity: 1,
                transition: 'transform 2.4s cubic-bezier(0.25, 1, 0.5, 1)',
                willChange: 'transform'
              }}
            >
              <BoyCharacter
                direction="left"
                isWalking={boyDistance !== 'arrived'}
                isExtendingGift={true}
                scale={1}
                onClick={() => {
                  if (boyDistance === 'arrived') handleOpenLetter();
                }}
              />
            </div>
          </div>

          {/* Trigger button to open the letter */}
          {boyDistance === 'arrived' && (
            <div
              style={{
                position: 'absolute',
                bottom: '4%',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 35,
                textAlign: 'center'
              }}
            >
              <button
                onClick={handleOpenLetter}
                className="storybook-btn"
                style={{
                  fontSize: '16px',
                  padding: '13px 36px',
                  boxShadow: '0 8px 24px rgba(247, 127, 0, 0.5)'
                }}
              >
                <Gift size={20} /> Open {cfg.senderName}'s Birthday Gift ✨
              </button>
            </div>
          )}
        </>
      )}

      {/* ================= STAGE: GRAND FINALE (Clean Space, Non-Overlapping Banner) ================= */}
      {isGrandFinale && (
        <>
          {/* Laila & Majnu Standing Side-by-Side Under the Stars */}
          <div
            style={{
              position: 'absolute',
              bottom: '14%',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 26,
              display: 'flex',
              alignItems: 'flex-end',
              gap: '20px'
            }}
          >
            {/* Laila */}
            <div style={{ position: 'relative' }}>
              <GirlCharacter
                direction="right"
                scale={1}
                isFinale={true}
                isCelebrating={false}
                isLookingAtBoy={true}
              />
            </div>

            {/* Baby Deer between them */}
            <div style={{ marginBottom: '4px' }}>
              <DeerCharacter
                direction="right"
                scale={0.88}
                isCelebrating={true}
                onClick={() => handleAnimalClick('deer')}
              />
            </div>

            {/* Majnu */}
            <div style={{ position: 'relative' }}>
              <BoyCharacter
                direction="left"
                scale={1}
                isFinale={true}
                isWalking={false}
                isExtendingGift={false}
              />
            </div>
          </div>

          {/* Interactive Action Hub at bottom center */}
          <div
            style={{
              position: 'absolute',
              bottom: '22px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 35,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'center',
              width: '90%',
              maxWidth: '680px'
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleReleaseLantern();
              }}
              className="storybook-btn"
              style={{
                fontSize: '14px',
                padding: '10px 22px',
                boxShadow: '0 6px 20px rgba(255, 209, 102, 0.45)'
              }}
            >
              🏮 Release Sky Lantern
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLetterOpen(true);
              }}
              className="storybook-btn-secondary"
              style={{
                fontSize: '14px',
                padding: '10px 22px',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)',
                borderColor: '#ffd166',
                color: '#fff3b0'
              }}
            >
              <FileText size={16} /> Re-read {cfg.senderName}'s Letter
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                triggerGrandCelebration();
              }}
              className="storybook-btn-secondary"
              style={{
                fontSize: '14px',
                padding: '10px 22px',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)',
                borderColor: '#ffd166',
                color: '#fff3b0',
                cursor: 'pointer'
              }}
            >
              🎆 Fireworks & Confetti
            </button>
          </div>
        </>
      )}

      {/* Grand Fireworks & Particle Canvas Engine */}
      <FireworksCanvas />

      {/* The Wide Royal Parchment Letter Modal */}
      <GiftLetter
        isOpen={isLetterOpen}
        onOpen={() => setIsLetterOpen(true)}
        onClose={handleCloseLetter}
      />

      {/* ================= ALL 8 WOODLAND ANIMALS CELEBRATING IN CLEARING ================= */}
      {/* 1. Bear (Left outer) */}
      <div style={{ position: 'absolute', bottom: '16%', left: '3%', zIndex: 20 }}>
        <AnimalCharacter
          type="bear"
          direction="right"
          isDancing={true}
          scale={0.88}
          speech={activeSpeech['bear']}
          onClick={() => handleAnimalClick('bear')}
        />
      </div>

      {/* 2. Rabbit (Left mid) */}
      <div style={{ position: 'absolute', bottom: '11%', left: '16%', zIndex: 24 }}>
        <AnimalCharacter
          type="rabbit"
          direction="right"
          isDancing={true}
          scale={0.82}
          speech={activeSpeech['rabbit']}
          onClick={() => handleAnimalClick('rabbit')}
        />
      </div>

      {/* 3. Fox (Right Center) */}
      <div style={{ position: 'absolute', bottom: '15%', right: '24%', zIndex: 23 }}>
        <AnimalCharacter
          type="fox"
          direction="left"
          isDancing={true}
          scale={0.88}
          speech={activeSpeech['fox']}
          onClick={() => handleAnimalClick('fox')}
        />
      </div>

      {/* 4. Baby Lion (Right outer - positioned with generous screen margin so speech never clips!) */}
      <div style={{ position: 'absolute', bottom: '16%', right: '6%', zIndex: 20 }}>
        <AnimalCharacter
          type="lion"
          direction="left"
          isDancing={true}
          scale={0.84}
          speech={activeSpeech['lion']}
          onClick={() => handleAnimalClick('lion')}
        />
      </div>

      {/* 5. Puppy (Right mid) */}
      <div style={{ position: 'absolute', bottom: '11%', right: '16%', zIndex: 24 }}>
        <AnimalCharacter
          type="puppy"
          direction="left"
          isDancing={true}
          scale={0.82}
          speech={activeSpeech['puppy']}
          onClick={() => handleAnimalClick('puppy')}
        />
      </div>

      {/* 6. Squirrel (Foreground left) */}
      <div style={{ position: 'absolute', bottom: '4%', left: '8%', zIndex: 26 }}>
        <AnimalCharacter
          type="squirrel"
          direction="right"
          isDancing={true}
          scale={0.78}
          speech={activeSpeech['squirrel']}
          onClick={() => handleAnimalClick('squirrel')}
        />
      </div>

      {/* 7. Kitten (Foreground right) */}
      <div style={{ position: 'absolute', bottom: '4%', right: '8%', zIndex: 26 }}>
        <AnimalCharacter
          type="kitten"
          direction="left"
          isDancing={true}
          scale={0.76}
          speech={activeSpeech['kitten']}
          onClick={() => handleAnimalClick('kitten')}
        />
      </div>

      {/* 8. Two Ducks (Foreground stream corner) */}
      <div style={{ position: 'absolute', bottom: '3%', left: '26%', zIndex: 25 }}>
        <AnimalCharacter
          type="ducks"
          direction="right"
          isDancing={true}
          scale={0.72}
          speech={activeSpeech['ducks']}
          onClick={() => handleAnimalClick('ducks')}
        />
      </div>

      {/* ================= REPLAY JOURNEY BUTTON ================= */}
      {onRestartJourney && (
        <div
          style={{
            position: 'absolute',
            bottom: '14px',
            right: '16px',
            zIndex: 40
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRestartJourney();
            }}
            className="storybook-btn-secondary"
            style={{
              fontSize: '12px',
              padding: '6px 14px',
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(6px)',
              borderColor: 'rgba(255, 215, 0, 0.4)',
              color: '#fff3b0'
            }}
          >
            <RotateCcw size={13} style={{ display: 'inline', marginRight: '5px' }} /> Replay Journey
          </button>
        </div>
      )}
    </div>
  );
}

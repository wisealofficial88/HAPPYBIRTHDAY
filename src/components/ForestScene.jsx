import React, { useState, useEffect, useRef } from 'react';
import DeerCharacter from './DeerCharacter';
import GirlCharacter from './characters/GirlCharacter';
import StarCollectible from './StarCollectible';
import {
  MushroomInteractive,
  FlowerInteractive,
  GlowingRuneStoneInteractive,
  FireflySwarmInteractive
} from './InteractiveObject';
import AnimalCharacter from './characters/AnimalCharacter';
import { sound } from './AudioController';
import { birthdayConfig } from '../config';
import { ChevronRight, ChevronLeft, Sparkles, Star } from 'lucide-react';

export default function ForestScene({ onReachCelebration }) {
  const WORLD_WIDTH = 3400;

  // Deer & Girl positions (Girl walks gracefully beside/behind deer)
  const [deerX, setDeerX] = useState(280);
  const [deerDirection, setDeerDirection] = useState('right');
  const [isWalking, setIsWalking] = useState(false);
  const [cameraX, setCameraX] = useState(0);

  // Scene state: 'greeting' -> 'journey'
  const [stage, setStage] = useState('greeting');
  const [deerSpeech, setDeerSpeech] = useState(birthdayConfig.deerGreeting);

  // 3 Collectible Magical Stars
  const [collectedStars, setCollectedStars] = useState([]);
  const [activeAnimalSpeech, setActiveAnimalSpeech] = useState({});

  const viewportRef = useRef(null);
  const walkTimeoutRef = useRef(null);

  // Welcome walk-in for Deer and Girl
  useEffect(() => {
    setIsWalking(true);
    const walkTimer = setTimeout(() => {
      setDeerX(360);
      setIsWalking(false);
    }, 850);
    return () => clearTimeout(walkTimer);
  }, []);

  const handleStartJourney = () => {
    setStage('journey');
    setDeerSpeech(birthdayConfig.deerFollowPrompt);
    setTimeout(() => {
      setDeerSpeech(null);
    }, 3800);
  };

  const moveGroupTo = (targetX) => {
    const clampedX = Math.max(220, Math.min(targetX, WORLD_WIDTH - 260));
    const isMovingRight = clampedX >= deerX;
    setDeerDirection(isMovingRight ? 'right' : 'left');
    setIsWalking(true);

    const vw = viewportRef.current ? viewportRef.current.clientWidth : window.innerWidth;
    const targetCam = Math.max(0, Math.min(clampedX - vw * 0.4, WORLD_WIDTH - vw));

    setDeerX(clampedX);
    setCameraX(targetCam);

    if (walkTimeoutRef.current) clearTimeout(walkTimeoutRef.current);
    walkTimeoutRef.current = setTimeout(() => {
      setIsWalking(false);
    }, 600);
  };

  const handleMoveDistance = (distance) => {
    moveGroupTo(deerX + distance);
  };

  const handleCollectStar = (index) => {
    if (!collectedStars.includes(index)) {
      const updated = [...collectedStars, index];
      setCollectedStars(updated);

      if (updated.length === 1) {
        setDeerSpeech(`Starlight of the Mountains found, ${birthdayConfig.recipientTitle}!`);
        setTimeout(() => setDeerSpeech(null), 3000);
      } else if (updated.length === 2) {
        setDeerSpeech("Look how the mountain valley glows! One star remains!");
        setTimeout(() => setDeerSpeech(null), 3000);
      } else if (updated.length === 3) {
        sound.playCelebrationFanfare();
        setDeerSpeech(birthdayConfig.deerAllStarsFound);
      }
    }
  };

  const handlePathClick = (e) => {
    if (stage !== 'journey') return;
    const rect = viewportRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left + cameraX;
    moveGroupTo(clickX - 60);
  };

  const stars = birthdayConfig.stars;

  return (
    <div
      ref={viewportRef}
      className="forest-viewport"
      onClick={handlePathClick}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        cursor: stage === 'journey' ? 'pointer' : 'default',
        background: '#0d1a24' // Dusky Kashmiri twilight palette
      }}
    >
      <style>
        {`
          .parallax-layer-smooth {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            pointer-events: none;
            will-change: transform;
            transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          }
          .world-container-smooth {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            will-change: transform;
            transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          }
          .traveler-lane-smooth {
            position: absolute;
            bottom: 45px;
            will-change: transform;
            transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          }
        `}
      </style>

      {/* ================= PARALLAX 1: DUSKY PINK MOUNTAIN SKY & GOLDEN HOUR HAZE (0.15x) ================= */}
      <div
        className="parallax-layer-smooth"
        style={{
          width: `${WORLD_WIDTH * 0.4 + window.innerWidth}px`,
          transform: `translate3d(${-cameraX * 0.15}px, 0, 0)`,
          background: 'linear-gradient(180deg, #1b263b 0%, #415a77 35%, #778da9 65%, #c89f9c 85%, #e0afa0 100%)',
          zIndex: 1
        }}
      >
        {/* Soft Golden Sunlight over the Peaks */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 45% 30%, rgba(255, 225, 160, 0.35) 0%, rgba(244, 162, 97, 0.15) 50%, transparent 80%)'
          }}
        />

        {/* Distant Snow-Capped Himalayan Peak Silhouettes */}
        <svg viewBox="0 0 2400 450" width="100%" height="450" preserveAspectRatio="none" style={{ position: 'absolute', bottom: '22%' }}>
          {/* Back peak range */}
          <path
            d="M 0 350 L 180 180 L 380 320 L 560 140 L 780 290 L 1020 120 L 1260 280 L 1480 150 L 1720 310 L 1940 130 L 2180 270 L 2400 350 L 2400 450 L 0 450 Z"
            fill="#2d3748"
            opacity="0.45"
          />
          {/* Snow glimmers on distant ridges */}
          <polygon points="560,140 520,185 600,185" fill="#f8f9fa" opacity="0.5" />
          <polygon points="1020,120 980,170 1060,170" fill="#f8f9fa" opacity="0.55" />
          <polygon points="1480,150 1440,195 1520,195" fill="#f8f9fa" opacity="0.5" />
          <polygon points="1940,130 1900,175 1980,175" fill="#f8f9fa" opacity="0.5" />
        </svg>
      </div>

      {/* ================= PARALLAX 2: LAYERED KASHMIR VALLEY SILHOUETTES & DRIFTING MIST (0.35x) ================= */}
      <div
        className="parallax-layer-smooth"
        style={{
          width: `${WORLD_WIDTH * 0.6 + window.innerWidth}px`,
          transform: `translate3d(${-cameraX * 0.35}px, 0, 0)`,
          zIndex: 2
        }}
      >
        <svg viewBox="0 0 3000 600" width="3000" height="600" preserveAspectRatio="none" style={{ position: 'absolute', bottom: '14%' }}>
          {/* Soft mountain slopes */}
          <path
            d="M 0 420 Q 300 240 650 340 T 1300 260 T 1950 320 T 2600 270 L 3000 380 L 3000 600 L 0 600 Z"
            fill="#264653"
            opacity="0.6"
          />
          {/* Pine forests clinging to mountain slopes */}
          {[120, 380, 720, 1050, 1420, 1780, 2120, 2480, 2820].map((px, i) => (
            <g key={i} fill="#1d3557" opacity="0.7">
              <polygon points={`${px},280 ${px - 25},360 ${px + 25},360`} />
              <polygon points={`${px},320 ${px - 35},410 ${px + 35},410`} />
              <polygon points={`${px + 60},310 ${px + 35},380 ${px + 85},380`} />
            </g>
          ))}
        </svg>

        {/* Drifting mountain mist band */}
        <div
          style={{
            position: 'absolute',
            bottom: '22%',
            left: 0,
            width: '100%',
            height: '80px',
            background: 'linear-gradient(180deg, transparent, rgba(230, 240, 250, 0.22), transparent)'
          }}
        />
      </div>

      {/* ================= PARALLAX 3: ALPINE STREAM, WOODEN BRIDGE & CEDARS (0.65x) ================= */}
      <div
        className="parallax-layer-smooth"
        style={{
          width: `${WORLD_WIDTH * 0.85 + window.innerWidth}px`,
          transform: `translate3d(${-cameraX * 0.65}px, 0, 0)`,
          zIndex: 4
        }}
      >
        <svg viewBox="0 0 3200 800" width="3200" height="800" style={{ position: 'absolute', bottom: '0' }}>
          {/* Himalayan Cedar (Deodar) Trees */}
          {[80, 650, 1200, 1750, 2300, 2850].map((tx, i) => (
            <g key={i}>
              <path
                d={`M ${tx} 800 Q ${tx + 15} 480 ${tx + 25} 200 C ${tx + 30} 120, ${tx + 60} 40, ${tx + 80} 0 L ${tx + 120} 0 C ${tx + 100} 80, ${tx + 110} 320, ${tx + 105} 520 Q ${tx + 120} 680 ${tx + 140} 800 Z`}
                fill="#173426"
              />
              {/* Sweeping deodar branches */}
              <path d={`M ${tx + 30} 220 Q ${tx - 80} 180 ${tx - 140} 220`} stroke="#173426" strokeWidth="14" strokeLinecap="round" fill="none" />
              <path d={`M ${tx + 95} 250 Q ${tx + 200} 200 ${tx + 280} 250`} stroke="#173426" strokeWidth="12" strokeLinecap="round" fill="none" />
            </g>
          ))}

          {/* Little Rustic Wooden Bridge across the mountain creek at x=1950 */}
          <g transform="translate(1950, 520)">
            {/* Bridge arch */}
            <path d="M 0 70 Q 120 40 240 70" fill="none" stroke="#5c3d2e" strokeWidth="18" strokeLinecap="round" />
            {/* Bridge planks */}
            <path d="M 5 62 L 235 62" stroke="#8d5b4c" strokeWidth="6" />
            {/* Wooden railing */}
            <path d="M 10 35 Q 120 15 230 35" fill="none" stroke="#5c3d2e" strokeWidth="6" />
            <line x1="40" y1="32" x2="40" y2="65" stroke="#5c3d2e" strokeWidth="4" />
            <line x1="120" y1="25" x2="120" y2="60" stroke="#5c3d2e" strokeWidth="4" />
            <line x1="200" y1="32" x2="200" y2="65" stroke="#5c3d2e" strokeWidth="4" />
          </g>
        </svg>
      </div>

      {/* ================= MAIN WORLD CONTAINER (1.0x) ================= */}
      <div
        className="world-container-smooth"
        style={{
          width: `${WORLD_WIDTH}px`,
          transform: `translate3d(${-cameraX}px, 0, 0)`,
          zIndex: 10
        }}
      >
        {/* Mountain Valley Ground / Meadow */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: `${WORLD_WIDTH}px`,
            height: '240px',
            background: 'linear-gradient(180deg, #284b39 0%, #1a3627 45%, #0e2017 100%)',
            borderTop: '5px solid #3d7054'
          }}
        >
          {/* Alpine Stream flowing along meadow */}
          <svg viewBox={`0 0 ${WORLD_WIDTH} 120`} width={WORLD_WIDTH} height="120" style={{ position: 'absolute', top: '15px' }}>
            {/* Stream Water Band */}
            <path
              d={`M 0 55 Q 600 75 1200 50 Q 1800 68 2400 45 Q 2900 65 ${WORLD_WIDTH} 50 L ${WORLD_WIDTH} 85 Q 2900 100 2400 80 Q 1800 102 1200 85 Q 600 108 0 85 Z`}
              fill="#48cae4"
              opacity="0.3"
            />
            {/* Riverbank stones */}
            {Array.from({ length: 48 }).map((_, i) => (
              <ellipse
                key={i}
                cx={70 * i + 35}
                cy={68 + (i % 2 === 0 ? 12 : -10)}
                rx="18"
                ry="9"
                fill="#4a5568"
                stroke="#718096"
                strokeWidth="1"
                opacity="0.65"
              />
            ))}
          </svg>
        </div>

        {/* ================= INTERACTIVE DISCOVERIES ALONG THE MOUNTAIN PATH ================= */}
        {/* Kashmiri Blue Poppies & Wildflowers */}
        <FlowerInteractive x={520} y={150} size={54} />
        <MushroomInteractive x={620} y={152} size={58} />

        {/* Friendly Rabbit in Alpine Meadow */}
        <div style={{ position: 'absolute', left: '980px', bottom: '72px', zIndex: 12 }}>
          <AnimalCharacter
            type="rabbit"
            direction="left"
            isHopping={true}
            scale={0.88}
            speech={activeAnimalSpeech['rabbit']}
            onClick={() => {
              sound.playStarChime(0);
              setActiveAnimalSpeech((prev) => ({ ...prev, rabbit: `The mountain breeze is so pure, ${birthdayConfig.recipientTitle}! 🥕` }));
              setTimeout(() => setActiveAnimalSpeech((prev) => ({ ...prev, rabbit: null })), 2600);
            }}
          />
        </div>

        {/* STAR 1 (Wonder) */}
        <StarCollectible
          x={stars[0].x}
          y={stars[0].y}
          starIndex={0}
          isCollected={collectedStars.includes(0)}
          onCollect={handleCollectStar}
        />

        {/* Ancient Valley Stone Rune */}
        <GlowingRuneStoneInteractive x={1320} y={148} size={68} />

        {/* Squirrel on Pine Ridge */}
        <div style={{ position: 'absolute', left: '1460px', bottom: '80px', zIndex: 12 }}>
          <AnimalCharacter
            type="squirrel"
            direction="right"
            isRunning={true}
            scale={0.85}
            speech={activeAnimalSpeech['squirrel']}
            onClick={() => {
              sound.playMushroomBoing();
              setActiveAnimalSpeech((prev) => ({ ...prev, squirrel: 'Fresh pinecones from the peaks! 🌰' }));
              setTimeout(() => setActiveAnimalSpeech((prev) => ({ ...prev, squirrel: null })), 2600);
            }}
          />
        </div>

        {/* Fireflies in the mountain hollow */}
        <FireflySwarmInteractive
          x={1620}
          y={200}
          onAttractDeer={() => {
            setDeerSpeech(`The valley fireflies are illuminating your steps, ${birthdayConfig.recipientTitle}!`);
            setTimeout(() => setDeerSpeech(null), 2500);
          }}
        />

        {/* STAR 2 (Joy) */}
        <StarCollectible
          x={stars[1].x}
          y={stars[1].y}
          starIndex={1}
          isCollected={collectedStars.includes(1)}
          onCollect={handleCollectStar}
        />

        {/* Two Ducks swimming under the wooden bridge */}
        <div style={{ position: 'absolute', left: '2050px', bottom: '65px', zIndex: 12 }}>
          <AnimalCharacter
            type="ducks"
            direction="right"
            isSwimming={true}
            scale={0.84}
            speech={activeAnimalSpeech['ducks']}
            onClick={() => {
              sound.playStarChime(1);
              setActiveAnimalSpeech((prev) => ({ ...prev, ducks: 'The birthday meadow is just ahead! Quack! 🦆' }));
              setTimeout(() => setActiveAnimalSpeech((prev) => ({ ...prev, ducks: null })), 2600);
            }}
          />
        </div>

        {/* Fox looking across from the wild roses */}
        <div style={{ position: 'absolute', left: '2380px', bottom: '74px', zIndex: 12 }}>
          <AnimalCharacter
            type="fox"
            direction="left"
            isWalking={false}
            scale={0.88}
            speech={activeAnimalSpeech['fox']}
            onClick={() => {
              sound.playStarChime(2);
              setActiveAnimalSpeech((prev) => ({ ...prev, fox: 'Follow the river of stars! 🦊' }));
              setTimeout(() => setActiveAnimalSpeech((prev) => ({ ...prev, fox: null })), 2600);
            }}
          />
        </div>

        <FlowerInteractive x={2240} y={145} size={52} />
        <MushroomInteractive x={2520} y={150} size={60} />

        {/* STAR 3 (Radiance) */}
        <StarCollectible
          x={stars[2].x}
          y={stars[2].y}
          starIndex={2}
          isCollected={collectedStars.includes(2)}
          onCollect={handleCollectStar}
        />

        {/* MAGICAL MOUNTAIN ARCHWAY PORTAL */}
        <div
          onClick={() => {
            if (collectedStars.length >= 3) {
              onReachCelebration();
            } else {
              setDeerSpeech(`We need all 3 magical stars to open the gateway! (${collectedStars.length}/3 found)`);
              setTimeout(() => setDeerSpeech(null), 3000);
            }
          }}
          style={{
            position: 'absolute',
            left: '3020px',
            bottom: '75px',
            width: '240px',
            height: '320px',
            cursor: collectedStars.length >= 3 ? 'pointer' : 'default',
            zIndex: 18,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          title={collectedStars.length >= 3 ? 'Enter the Birthday Meadow!' : 'Collect 3 stars to unlock'}
        >
          <div
            style={{
              position: 'absolute',
              width: '250px',
              height: '330px',
              borderRadius: '50% 50% 0 0',
              background: collectedStars.length >= 3
                ? 'radial-gradient(ellipse at 50% 60%, rgba(255, 215, 0, 0.65) 0%, rgba(255, 140, 0, 0.25) 60%, transparent 100%)'
                : 'radial-gradient(ellipse at 50% 60%, rgba(100, 180, 255, 0.2) 0%, transparent 70%)',
              animation: collectedStars.length >= 3 ? 'star-pulse 2.2s infinite' : 'none'
            }}
          />

          <svg viewBox="0 0 240 320" width="240" height="320">
            <path d="M 30 320 Q 25 150 120 70 Q 215 150 210 320" fill="none" stroke="#582f0e" strokeWidth="36" strokeLinecap="round" />
            <path d="M 20 320 Q 15 140 120 55 Q 225 140 220 320" fill="none" stroke={collectedStars.length >= 3 ? '#ffd166' : '#2d6a4f'} strokeWidth="7" />
            <circle cx="120" cy="55" r="12" fill={collectedStars.length >= 3 ? '#ff4d6d' : '#495057'} />
            <circle cx="120" cy="55" r="6" fill="#ffd166" />
            {collectedStars.length >= 3 && (
              <ellipse cx="120" cy="200" rx="60" ry="100" fill="rgba(255, 238, 140, 0.75)" opacity="0.8" />
            )}
          </svg>

          <div
            style={{
              marginTop: '-30px',
              fontFamily: 'var(--font-heading)',
              fontSize: '16px',
              fontWeight: 700,
              color: '#fff',
              background: collectedStars.length >= 3 ? 'linear-gradient(135deg, #f77f00, #d62828)' : 'rgba(0,0,0,0.65)',
              padding: '6px 20px',
              borderRadius: '9999px',
              border: '2px solid #ffd166',
              boxShadow: collectedStars.length >= 3 ? '0 0 16px rgba(255, 209, 102, 0.7)' : 'none',
              textAlign: 'center'
            }}
          >
            {collectedStars.length >= 3 ? '✨ Enter Celebration Meadow! ✨' : `Collect Stars (${collectedStars.length}/3)`}
          </div>
        </div>

        {/* ================= THE TRAVELERS: BABY DEER & THE GIRL TOGETHER ================= */}
        {/* 1. The Girl in Flowing White Gown (Walking behind/beside the deer as faithful companion!) */}
        <div
          className="traveler-lane-smooth"
          style={{
            transform: `translate3d(${deerX - 85}px, 0, 0)`,
            zIndex: 21
          }}
        >
          <GirlCharacter
            isWalking={isWalking}
            direction={deerDirection}
            scale={0.92}
            onClick={() => {
              sound.playStarChime(1);
            }}
          />
        </div>

        {/* 2. The Hero Baby Deer with Flower Crown */}
        <div
          className="traveler-lane-smooth"
          style={{
            transform: `translate3d(${deerX}px, 0, 0)`,
            zIndex: 22
          }}
        >
          <div style={{ position: 'relative' }}>
            {deerSpeech && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '105%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(255, 255, 255, 0.96)',
                  backdropFilter: 'blur(8px)',
                  color: '#2b1100',
                  padding: '9px 18px',
                  borderRadius: '16px',
                  fontSize: '15px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  maxWidth: '280px',
                  textAlign: 'center',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                  border: '2px solid #ffd166',
                  pointerEvents: 'none',
                  zIndex: 35,
                  animation: 'float-particle 3s ease-in-out infinite'
                }}
              >
                {deerSpeech}
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderTop: '8px solid rgba(255, 255, 255, 0.96)'
                  }}
                />
              </div>
            )}

            <DeerCharacter
              isWalking={isWalking}
              direction={deerDirection}
              scale={1}
              onClick={() => {
                sound.playStarChime(1);
                setDeerSpeech(`Together we shall find the celebration meadow, ${birthdayConfig.recipientTitle}! 🌸`);
                setTimeout(() => setDeerSpeech(null), 2500);
              }}
            />
          </div>
        </div>
      </div>

      {/* ================= FOREGROUND (1.25x) ================= */}
      <div
        className="parallax-layer-smooth"
        style={{
          width: `${WORLD_WIDTH * 1.25 + window.innerWidth}px`,
          transform: `translate3d(${-cameraX * 1.25}px, 0, 0)`,
          zIndex: 30,
          pointerEvents: 'none'
        }}
      >
        <svg viewBox="0 0 4000 300" width="4000" height="300" style={{ position: 'absolute', bottom: 0 }}>
          {[0, 500, 1000, 1500, 2000, 2500, 3000, 3500].map((fx, i) => (
            <g key={i}>
              <path d={`M ${fx} 300 Q ${fx + 50} 210 ${fx + 120} 180 Q ${fx + 80} 240 ${fx + 50} 300`} fill="#091c13" opacity="0.8" />
              <path d={`M ${fx + 100} 300 Q ${fx + 160} 190 ${fx + 240} 160 Q ${fx + 180} 250 ${fx + 140} 300`} fill="#06160e" opacity="0.85" />
            </g>
          ))}
        </svg>

        {/* Floating mountain sparks */}
        {[
          { x: 320, y: 170, delay: '0s' },
          { x: 850, y: 130, delay: '1.2s' },
          { x: 1400, y: 200, delay: '0.5s' },
          { x: 1900, y: 150, delay: '1.8s' },
          { x: 2500, y: 180, delay: '0.9s' },
          { x: 3100, y: 140, delay: '1.4s' }
        ].map((f, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${f.x}px`,
              bottom: `${f.y}px`,
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#fff75e',
              boxShadow: '0 0 10px #fffa65',
              animation: `firefly-glow 2.8s infinite ${f.delay}`
            }}
          />
        ))}
      </div>

      {/* ================= HUD: STAR COUNTER ================= */}
      <div
        style={{
          position: 'absolute',
          top: '18px',
          right: '18px',
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(8, 23, 14, 0.75)',
          backdropFilter: 'blur(8px)',
          padding: '6px 16px',
          borderRadius: '9999px',
          border: '1.5px solid rgba(255, 215, 0, 0.45)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '15px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: '#fff3b0'
          }}
        >
          Magical Stars:
        </span>
        <div style={{ display: 'flex', gap: '5px' }}>
          {[0, 1, 2].map((idx) => {
            const hasStar = collectedStars.includes(idx);
            return (
              <div
                key={idx}
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: hasStar ? 'linear-gradient(135deg, #ffd166, #f77f00)' : 'rgba(255,255,255,0.1)',
                  boxShadow: hasStar ? '0 0 10px #ffd166' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <Star size={13} fill={hasStar ? '#ffffff' : 'none'} color={hasStar ? '#ffffff' : '#888'} />
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= BOTTOM NAVIGATION CONTROLS ================= */}
      {stage === 'greeting' ? (
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 45,
            textAlign: 'center'
          }}
        >
          <button
            onClick={handleStartJourney}
            className="storybook-btn"
            style={{ fontSize: '16px', padding: '14px 40px' }}
          >
            <Sparkles size={18} /> Follow The Deer Through The Mountains
          </button>
        </div>
      ) : (
        <div
          style={{
            position: 'absolute',
            bottom: '18px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 45,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(8, 23, 14, 0.75)',
            backdropFilter: 'blur(8px)',
            padding: '6px 14px',
            borderRadius: '9999px',
            border: '1px solid rgba(255,255,255,0.25)'
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMoveDistance(-220);
            }}
            className="storybook-btn-secondary"
            style={{ padding: '7px 14px' }}
            title="Walk Left"
          >
            <ChevronLeft size={16} /> Walk Left
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMoveDistance(220);
            }}
            className="storybook-btn"
            style={{ padding: '8px 18px', fontSize: '13px' }}
            title="Walk Right"
          >
            Walk Forward <ChevronRight size={16} />
          </button>

          {collectedStars.length >= 3 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onReachCelebration();
              }}
              className="storybook-btn"
              style={{
                background: 'linear-gradient(135deg, #70e000, #38b000)',
                borderColor: '#ccff33',
                fontSize: '13px',
                padding: '8px 18px'
              }}
            >
              Enter Celebration 🌟
            </button>
          )}
        </div>
      )}
    </div>
  );
}

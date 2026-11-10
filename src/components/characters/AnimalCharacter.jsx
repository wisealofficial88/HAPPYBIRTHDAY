import React from 'react';
import DeerCharacter from '../DeerCharacter';
import RabbitCharacter from './RabbitCharacter';
import SquirrelCharacter from './SquirrelCharacter';
import DucksCharacter from './DucksCharacter';
import FoxCharacter from './FoxCharacter';
import PuppyCharacter from './PuppyCharacter';
import KittenCharacter from './KittenCharacter';
import BearCharacter from './BearCharacter';
import LionCharacter from './LionCharacter';

export default function AnimalCharacter({
  type = 'deer',
  speech = null,
  isDancing = false,
  isWalking = false,
  isHopping = false,
  isRunning = false,
  isSwimming = true,
  direction = 'right',
  scale = 1,
  className = '',
  onClick = null
}) {
  const renderCharacter = () => {
    switch (type) {
      case 'deer':
        return (
          <DeerCharacter
            isWalking={isWalking}
            isCelebrating={isDancing}
            direction={direction}
            scale={scale}
            onClick={onClick}
          />
        );
      case 'rabbit':
        return (
          <RabbitCharacter
            isHopping={isHopping}
            isDancing={isDancing}
            direction={direction}
            scale={scale}
            onClick={onClick}
          />
        );
      case 'squirrel':
        return (
          <SquirrelCharacter
            isRunning={isRunning}
            isDancing={isDancing}
            direction={direction}
            scale={scale}
            onClick={onClick}
          />
        );
      case 'ducks':
        return (
          <DucksCharacter
            isSwimming={isSwimming}
            isDancing={isDancing}
            direction={direction}
            scale={scale}
            onClick={onClick}
          />
        );
      case 'fox':
        return (
          <FoxCharacter
            isWalking={isWalking}
            isDancing={isDancing}
            direction={direction}
            scale={scale}
            onClick={onClick}
          />
        );
      case 'puppy':
        return (
          <PuppyCharacter
            isWalking={isWalking}
            isDancing={isDancing}
            direction={direction}
            scale={scale}
            onClick={onClick}
          />
        );
      case 'kitten':
        return (
          <KittenCharacter
            isDancing={isDancing}
            direction={direction}
            scale={scale}
            onClick={onClick}
          />
        );
      case 'bear':
        return (
          <BearCharacter
            isDancing={isDancing}
            direction={direction}
            scale={scale}
            onClick={onClick}
          />
        );
      case 'lion':
        return (
          <LionCharacter
            isDancing={isDancing}
            direction={direction}
            scale={scale}
            onClick={onClick}
          />
        );
      default:
        return null;
    }
  };

  // Adjust speech bubble positioning so edge animals (like Lion on right, Bear on left) never clip screen edges!
  const isRightEdge = type === 'lion';
  const isLeftEdge = type === 'bear';

  return (
    <div className={`animal-container relative ${className}`} style={{ display: 'inline-block' }}>
      {speech && (
        <div
          className="speech-bubble"
          style={{
            position: 'absolute',
            bottom: '105%',
            left: isRightEdge ? 'auto' : isLeftEdge ? '0px' : '50%',
            right: isRightEdge ? '0px' : 'auto',
            transform: isRightEdge || isLeftEdge ? 'none' : 'translateX(-50%)',
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(8px)',
            color: '#2d1b0d',
            padding: '8px 16px',
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: 700,
            whiteSpace: 'normal',
            maxWidth: '220px',
            textAlign: 'center',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
            border: '2px solid #ffd166',
            pointerEvents: 'none',
            zIndex: 40,
            animation: 'float-particle 3s ease-in-out infinite'
          }}
        >
          {speech}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: isRightEdge ? '80%' : isLeftEdge ? '20%' : '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '8px solid rgba(255, 255, 255, 0.98)'
            }}
          />
        </div>
      )}
      {renderCharacter()}
    </div>
  );
}

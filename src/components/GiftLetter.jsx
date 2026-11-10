import React from 'react';
import { sound } from './AudioController';
import { birthdayConfig } from '../config';
import { X, Sparkles, Heart } from 'lucide-react';

export default function GiftLetter({ isOpen, onClose }) {
  const cfg = birthdayConfig;

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 12, 8, 0.88)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '24px 20px',
        animation: 'modalFadeIn 0.3s ease'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <style>
        {`
          @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes letterUnrollWide {
            from { transform: scale(0.92) translateY(24px); opacity: 0; }
            to { transform: scale(1) translateY(0); opacity: 1; }
          }
        `}
      </style>

      <div
        style={{
          position: 'relative',
          maxWidth: '820px',
          width: '100%',
          maxHeight: '88vh',
          overflowY: 'auto',
          background: 'linear-gradient(135deg, #fefcf0 0%, #faedcd 45%, #e9d8a6 100%)',
          color: '#2a1a0f',
          borderRadius: '24px',
          padding: '42px 46px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 50px rgba(246, 200, 95, 0.4), inset 0 0 60px rgba(212, 163, 115, 0.35)',
          border: '4px double #b08968',
          animation: 'letterUnrollWide 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        {/* Top Close Button X */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(112, 72, 40, 0.12)',
            border: '1.5px solid #8d6e63',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#4a2810',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          className="hover:scale-105 hover:bg-amber-100"
          title="Close Letter"
        >
          <X size={22} />
        </button>

        {/* Letter Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              fontFamily: 'var(--font-letter)',
              fontSize: '32px',
              color: '#b7410e',
              lineHeight: 1.1
            }}
          >
            {cfg.letter.heading}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '32px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: '#3d261a',
              marginTop: '6px'
            }}
          >
            {cfg.letter.salutation}
          </h2>
          <div
            style={{
              width: '80px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #b7410e, transparent)',
              margin: '12px auto'
            }}
          />
        </div>

        {/* Letter Paragraphs */}
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '17px',
            lineHeight: 1.85,
            color: '#382214',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '720px',
            margin: '0 auto'
          }}
        >
          {cfg.letter.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <div
            style={{
              marginTop: '18px',
              textAlign: 'right',
              fontFamily: 'var(--font-letter)',
              fontSize: '30px',
              color: '#6b3e1b'
            }}
          >
            {cfg.letter.closing}
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '28px',
                fontWeight: 700,
                color: '#b7410e',
                marginTop: '4px'
              }}
            >
              {cfg.letter.signature}
            </div>
          </div>
        </div>

        {/* Wax Seal */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '26px',
            marginBottom: '18px'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #e63946, #9d0208)',
              boxShadow: '0 4px 14px rgba(157, 2, 8, 0.4), inset 0 2px 4px rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px dashed rgba(255, 255, 255, 0.35)',
              color: '#fff',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '26px'
            }}
          >
            {cfg.senderWaxSealInitial}
          </div>
        </div>

        {/* Return / Celebrate button */}
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <button
            onClick={onClose}
            className="storybook-btn"
            style={{
              fontSize: '15px',
              padding: '12px 34px'
            }}
          >
            <Sparkles size={17} /> Celebrate Under The Stars ✨
          </button>
        </div>
      </div>
    </div>
  );
}

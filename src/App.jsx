import React, { useState, useEffect } from 'react';
import ForestEntrance from './components/ForestEntrance';
import ForestScene from './components/ForestScene';
import BirthdayParty from './components/BirthdayParty';
import { sound } from './components/AudioController';
import { birthdayConfig } from './config';
import { Volume2, VolumeX, RefreshCw, Maximize2, Minimize2, Sparkles } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(ellipse at 50% 40%, #173d2b 0%, #0c241a 50%, #04100a 100%)',
            color: '#fff3b0',
            textAlign: 'center',
            padding: '20px'
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', marginBottom: '16px' }}>
            A Magical Moment
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', maxWidth: '400px', marginBottom: '24px' }}>
            The forest is re-aligning its stars for {birthdayConfig.recipientTitle}.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
            className="storybook-btn"
          >
            <Sparkles size={18} /> Continue Celebration
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [currentScene, setCurrentScene] = useState('entrance');
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    document.title = `${birthdayConfig.adventureTitle} | For ${birthdayConfig.recipientName}`;
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleSound = () => {
    sound.init();
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log('Fullscreen request prevented:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <ErrorBoundary>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#04100a'
        }}
      >
        {/* Top HUD Controls (Sound, Fullscreen/Maximise, Restart) */}
        <div
          style={{
            position: 'fixed',
            top: '14px',
            left: '14px',
            zIndex: 90,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            style={{
              background: 'rgba(8, 23, 14, 0.75)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid rgba(255, 215, 0, 0.45)',
              borderRadius: '9999px',
              padding: '7px 13px',
              color: '#fff3b0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-heading)',
              fontSize: '14px',
              fontWeight: 700,
              boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
              transition: 'transform 0.2s ease'
            }}
            className="hover:scale-105"
            title={isMuted ? 'Turn Sound On' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX size={16} color="#e76f51" /> : <Volume2 size={16} color="#ffd166" />}
            <span>{isMuted ? 'Muted' : 'Music'}</span>
          </button>

          {/* Maximise / Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            style={{
              background: 'rgba(8, 23, 14, 0.75)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid rgba(255, 215, 0, 0.45)',
              borderRadius: '9999px',
              padding: '7px 13px',
              color: '#fff3b0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-heading)',
              fontSize: '14px',
              fontWeight: 700,
              boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
              transition: 'transform 0.2s ease'
            }}
            className="hover:scale-105"
            title={isFullscreen ? 'Exit Fullscreen' : 'Maximise Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={15} color="#ffd166" /> : <Maximize2 size={15} color="#ffd166" />}
            <span>{isFullscreen ? 'Normal' : 'Maximise'}</span>
          </button>

          {/* Restart Button */}
          {currentScene !== 'entrance' && (
            <button
              onClick={() => setCurrentScene('entrance')}
              style={{
                background: 'rgba(8, 23, 14, 0.65)',
                backdropFilter: 'blur(8px)',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '9999px',
                padding: '7px 12px',
                color: '#fefae0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontFamily: 'var(--font-heading)',
                fontSize: '14px',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                transition: 'transform 0.2s ease'
              }}
              className="hover:scale-105"
              title="Start from Beginning"
            >
              <RefreshCw size={13} /> Restart
            </button>
          )}
        </div>

        {/* Main Scenes */}
        {currentScene === 'entrance' && (
          <ForestEntrance onEnter={() => setCurrentScene('forest')} />
        )}

        {currentScene === 'forest' && (
          <ForestScene onReachCelebration={() => setCurrentScene('celebration')} />
        )}

        {currentScene === 'celebration' && (
          <BirthdayParty onRestartJourney={() => setCurrentScene('forest')} />
        )}
      </div>
    </ErrorBoundary>
  );
}

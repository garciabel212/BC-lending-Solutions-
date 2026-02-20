
import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasError, setHasError] = useState(false);

  const logoUrl = "https://i.postimg.cc/YCwJ6J4t/IMG-0375.png";

  useEffect(() => {
    // Start animation shortly after mount
    const animTimer = setTimeout(() => setIsAnimating(true), 150);
    // Hide component after 2.5 seconds to allow for final fade out
    const hideTimer = setTimeout(() => setIsVisible(false), 2500);

    return () => {
      clearTimeout(animTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-midnight transition-opacity duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-100'}`}>
      <style>{`
        @keyframes logoShimmer {
          0% { transform: translateX(-150%) skewX(-25deg); }
          100% { transform: translateX(250%) skewX(-25deg); }
        }
        .animate-logo-shimmer {
          animation: logoShimmer 1.8s ease-in-out infinite;
          animation-delay: 0.8s;
        }
        .progress-easing {
          transition-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
        }
        .smooth-scale {
          transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>

      <div className="relative flex flex-col items-center">
        {/* Ambient Pulsing Glow */}
        <div className={`absolute inset-0 bg-gold/20 blur-[120px] rounded-full transition-all duration-1000 scale-150 ${
          isAnimating ? 'opacity-100 scale-150' : 'opacity-0 scale-100'
        }`} />
        
        {/* Animated Logo Container */}
        <div className={`relative transition-all duration-[1200ms] smooth-scale transform ${
          isAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-8'
        }`}>
          {!hasError ? (
            <div className="relative group">
              <img 
                src={logoUrl} 
                alt="BC Prime" 
                className="h-72 md:h-[432px] w-auto object-contain drop-shadow-[0_0_40px_rgba(216,182,106,0.25)] relative z-10"
                onError={() => setHasError(true)}
              />
              
              {/* Refined Shimmer Effect directly over the logo area */}
              <div className="absolute inset-0 z-20 overflow-hidden rounded-2xl pointer-events-none mix-blend-overlay">
                <div className={`absolute top-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-logo-shimmer opacity-0 transition-opacity duration-1000 ${isAnimating ? 'opacity-100' : ''}`} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 text-center">
               <div className="h-36 w-36 bg-gold/20 rounded-2xl flex items-center justify-center border border-gold/30 mb-2">
                 <span className="text-gold text-5xl font-black">BC</span>
               </div>
               <div className="text-4xl font-black tracking-tighter text-white">BC PRIME</div>
               <div className="text-[12px] font-bold tracking-[0.4em] text-gold uppercase mt-1">Lending Solutions</div>
            </div>
          )}
        </div>

        {/* Loading Text Label */}
        <div className={`mt-8 text-[10px] font-black uppercase tracking-[0.5em] text-gold/40 transition-all duration-1000 delay-500 ${
          isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Establishing Connection
        </div>
      </div>
      
      {/* Dynamic Progress Bar at the bottom */}
      <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r from-gold/50 via-gold to-gold/50 progress-easing transition-all duration-[2200ms] relative ${
            isAnimating ? 'w-full' : 'w-0'
          }`}
        >
          {/* Leading glow on the progress bar */}
          <div className="absolute top-0 right-0 h-full w-24 bg-gold blur-md opacity-50" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

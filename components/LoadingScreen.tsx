
import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Start animation shortly after mount
    const animTimer = setTimeout(() => setIsAnimating(true), 100);
    // Hide component after 2 seconds
    const hideTimer = setTimeout(() => setIsVisible(false), 2000);

    return () => {
      clearTimeout(animTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-midnight transition-opacity duration-700 ${!isVisible ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative flex flex-col items-center">
        {/* Ambient Glow */}
        <div className={`absolute inset-0 bg-gold/20 blur-[100px] rounded-full transition-all duration-1000 scale-150 ${isAnimating ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Animated Logo Container */}
        <div className={`relative transition-all duration-1000 ease-out transform ${
          isAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4'
        }`}>
          {!hasError ? (
            <img 
              src="logo.png" 
              alt="BC Prime" 
              className="h-32 md:h-48 w-auto object-contain drop-shadow-[0_0_30px_rgba(216,182,106,0.3)]"
              onError={() => setHasError(true)}
            />
          ) : (
            <div className="flex flex-col items-center gap-4">
              <svg viewBox="0 0 200 200" className="h-40 md:h-56 w-auto drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Stylized Crown */}
                <path d="M70 45L85 65L100 40L115 65L130 45L125 80H75L70 45Z" fill="#D8B66A" />
                <circle cx="100" cy="35" r="4" fill="#D8B66A" />
                
                {/* House Roof */}
                <path d="M50 110L100 70L150 110" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* BC Letters */}
                <text x="60" y="145" fontFamily="Arial" fontWeight="900" fontSize="55" fill="#D8B66A">B</text>
                <text x="105" y="145" fontFamily="Arial" fontWeight="900" fontSize="55" fill="white">C</text>
                
                {/* Swoosh */}
                <path d="M40 165Q100 145 160 165" stroke="#D8B66A" strokeWidth="4" strokeLinecap="round" />
                <path d="M50 175Q100 155 150 175" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
              </svg>
              <div className="text-center">
                <div className="text-3xl font-black tracking-tighter text-white">BC PRIME</div>
                <div className="text-[10px] font-bold tracking-[0.4em] text-gold uppercase mt-1">Lending Solutions</div>
              </div>
            </div>
          )}
          
          {/* Shimmer line effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className={`absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] transition-all duration-1000 delay-500 ${isAnimating ? 'left-[150%]' : '-left-full'}`} />
          </div>
        </div>
      </div>
      
      {/* Progress bar at the bottom */}
      <div className="absolute bottom-0 left-0 h-1 bg-gold/10 w-full">
        <div className={`h-full bg-gold transition-all duration-[2000ms] ease-linear ${isAnimating ? 'w-full' : 'w-0'}`} />
      </div>
    </div>
  );
};

export default LoadingScreen;

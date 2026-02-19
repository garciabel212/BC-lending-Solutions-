
import React from 'react';
import { Theme } from '../types';

interface LogoProps {
  className?: string;
  theme?: Theme;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12", theme = 'dark' }) => {
  const [hasError, setHasError] = React.useState(false);

  // If image fails or we want to force the placeholder for aesthetics
  if (hasError) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <svg viewBox="0 0 200 200" className="h-full w-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stylized Crown */}
          <path d="M70 45L85 65L100 40L115 65L130 45L125 80H75L70 45Z" fill="#D8B66A" />
          <circle cx="100" cy="35" r="4" fill="#D8B66A" />
          
          {/* House Roof */}
          <path d="M50 110L100 70L150 110" stroke={theme === 'dark' ? "white" : "#0B1220"} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* BC Letters */}
          <text x="65" y="145" fontFamily="Arial" fontWeight="900" fontSize="55" fill="#D8B66A">B</text>
          <text x="105" y="145" fontFamily="Arial" fontWeight="900" fontSize="55" fill={theme === 'dark' ? "white" : "#0B1220"}>C</text>
          
          {/* Swoosh */}
          <path d="M40 165Q100 145 160 165" stroke="#D8B66A" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 175Q100 155 150 175" stroke={theme === 'dark' ? "white" : "#0B1220"} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
        </svg>
        <div className="flex flex-col justify-center leading-none">
          <span className={`text-xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>BC PRIME</span>
          <span className="text-[8px] font-bold tracking-[0.2em] text-gold uppercase mt-1">Lending Solutions</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="logo.png" 
        alt="BC Prime Lending Solutions" 
        className="h-full w-auto object-contain"
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default Logo;

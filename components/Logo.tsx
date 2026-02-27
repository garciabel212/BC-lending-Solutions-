
import React from 'react';
import { Theme } from '../types';

interface LogoProps {
  className?: string;
  theme?: Theme;
}

const Logo: React.FC<LogoProps> = ({ className = "h-24", theme = 'dark' }) => {
  const [hasError, setHasError] = React.useState(false);

  // High-quality professional logo for BC Prime
  const logoUrl = "https://i.postimg.cc/YCwJ6J4t/IMG-0375.png";

  if (hasError) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="h-full aspect-square bg-gold/20 rounded-lg flex items-center justify-center border border-gold/30">
          <span className="text-gold font-black">BC</span>
        </div>
        <div className="flex flex-col justify-center leading-none">
          <span className={`text-lg font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>BC PRIME</span>
          <span className="text-[7px] font-bold text-gold uppercase tracking-widest mt-0.5">Lending Solutions</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logoUrl} 
        alt="BC Prime Lending Solutions" 
        className="h-full w-auto object-contain"
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default Logo;

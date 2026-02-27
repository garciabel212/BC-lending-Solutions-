
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Language, Theme } from '../types';

interface HeroProps {
  lang: Language;
  theme: Theme;
}

const MIAMI_IMAGES = [
  'https://i.postimg.cc/15qWYfGs/uwp4636303.jpg',
  'https://i.postimg.cc/fT9HgJcM/wp1911513-hd-miami-wallpaper.jpg',
  'https://i.postimg.cc/xTzsFcvV/wp3324963-hd-miami-wallpaper.jpg',
  'https://i.postimg.cc/NfHNP56Y/wp3324965-hd-miami-wallpaper.jpg'
];

const Hero: React.FC<HeroProps> = ({ lang, theme }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % MIAMI_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={`relative min-h-[80vh] md:min-h-[90vh] flex items-center overflow-hidden transition-colors duration-500 py-12 md:py-24 ${theme === 'dark' ? 'bg-ink' : 'bg-slate-50'}`}>
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {MIAMI_IMAGES.map((img, idx) => (
          <div 
            key={img}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out ${
              idx === currentIdx ? (theme === 'dark' ? 'opacity-90' : 'opacity-85') : 'opacity-0'
            }`}
            style={{ 
              backgroundImage: `url('${img}')`,
              transform: idx === currentIdx ? 'scale(1.1) rotate(0.01deg)' : 'scale(1) rotate(0deg)',
              transition: 'opacity 2000ms ease-in-out, transform 12000ms linear'
            }}
          />
        ))}
        <div className={`absolute inset-0 bg-gradient-to-b ${
          theme === 'dark' 
            ? 'from-blue-900/30 via-ink/40 to-ink/95' 
            : 'from-blue-200/20 via-white/30 to-white/90'
        }`} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 grid lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full py-8 md:py-24">
        {/* Main Content Area */}
        <div className="lg:col-span-7 animate-in fade-in slide-in-from-left-10 duration-1000 flex flex-col justify-center text-center lg:text-left items-center lg:items-start">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 md:px-5 md:py-2.5 text-[clamp(0.5rem,2vw,0.65rem)] font-black text-gold mb-6 md:mb-10 shadow-goldglow backdrop-blur-xl uppercase tracking-[0.2em] md:tracking-[0.3em] w-fit leading-none ${
            theme === 'dark' ? 'border-gold/30 bg-midnight/80' : 'border-gold/40 bg-white/90'
          }`}>
            <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-gold animate-pulse shrink-0"></span>
            <span className="truncate">{lang === 'en' ? 'STRATEGIC CAPITAL • NMLS 2616069' : 'CAPITAL ESTRATÉGICO • NMLS 2616069'}</span>
          </div>
          
          <h1 className={`text-[clamp(1.75rem,8vw,5.5rem)] font-black tracking-tight leading-[1.15] mb-6 md:mb-10 uppercase drop-shadow-[0_2px_15px_rgba(0,0,0,0.4)] break-words px-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {lang === 'en' ? 'Smart Loan,' : 'Crédito Inteligente,'}<br/>
            <span className="bg-gradient-to-r from-gold via-gold2 to-gold bg-clip-text text-transparent italic inline-block pr-4 pb-2">
              {lang === 'en' ? 'Strong Future.' : 'Futuro Sólido.'}
            </span>
          </h1>
          
          <p className={`text-sm md:text-xl max-w-xl leading-relaxed mb-8 md:mb-12 drop-shadow-lg font-medium px-1 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-700'}`}>
            {lang === 'en' 
              ? 'Raudel Bonne is Miami’s premier private lending specialist. From primary residences to complex commercial acquisitions, we deliver strategic capital with absolute discretion.' 
              : 'Raudel Bonne es el principal especialista en préstamos privados de Miami. Desde residencias exclusivas hasta adquisiciones comerciales complejas, entregamos capital estratégico con absoluta discreción.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto">
            <Link 
              to="/contact"
              className="group flex items-center justify-center gap-3 rounded-xl md:rounded-2xl px-6 py-4 md:px-10 md:py-5 font-black text-ink bg-gold shadow-2xl transition-all hover:scale-105 active:scale-95 hover:shadow-goldglow uppercase tracking-widest text-[9px] md:text-xs"
            >
              {lang === 'en' ? 'Request Pre-Qualification' : 'Solicitar Pre-Calificación'} 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link 
              to="/calculator"
              className={`flex items-center justify-center rounded-xl md:rounded-2xl px-6 py-4 md:px-10 md:py-5 font-black border-2 backdrop-blur-md transition-all uppercase tracking-widest text-[9px] md:text-xs ${
                theme === 'dark' 
                  ? 'text-white border-white/20 bg-midnight/60 hover:bg-white/20' 
                  : 'text-slate-900 border-slate-300 bg-white/70 hover:bg-slate-100'
              }`}
            >
              {lang === 'en' ? 'Analyze My Rate' : 'Analizar mi Tasa'}
            </Link>
          </div>

          {/* Experience Indicators */}
          <div className={`mt-10 md:mt-14 flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-10 border-t pt-8 md:pt-10 w-full lg:w-auto ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
            <div className="flex -space-x-3 md:-space-x-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`h-9 w-9 md:h-11 md:w-11 rounded-full border-2 flex items-center justify-center text-[8px] font-bold backdrop-blur-md transition-transform hover:-translate-y-1 ${
                  theme === 'dark' ? 'border-midnight bg-gold/40' : 'border-white bg-gold/30'
                }`}>★</div>
              ))}
              <div className="h-9 w-9 md:h-11 md:w-11 rounded-full border-2 border-midnight bg-gold flex items-center justify-center text-[9px] font-black text-ink shadow-lg">+</div>
            </div>
            <div className={`text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] max-w-[240px] md:max-w-[280px] leading-[1.6] opacity-70 px-1 text-center sm:text-left ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'en' ? 'Strategic Wealth Partnership & Private Lending' : 'Alianza Estratégica de Patrimonio y Financiamiento Privado'}
            </div>
          </div>
        </div>

        {/* Dashboard Side */}
        <div className="hidden lg:block lg:col-span-5 relative animate-in fade-in slide-in-from-right-10 duration-1000 delay-300 py-6">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gold/10 rounded-[56px] blur-[100px] opacity-40 group-hover:opacity-60 transition duration-1000"></div>
            
            <div className={`relative border-2 rounded-[40px] md:rounded-[52px] overflow-hidden shadow-2xl p-8 lg:p-12 backdrop-blur-3xl grain transition-all duration-700 hover:border-gold/30 ${
              theme === 'dark' ? 'bg-midnight/90 border-white/10' : 'bg-white/95 border-slate-200'
            }`}>
              <div className="flex flex-col items-center mb-10 md:mb-12">
                 <Logo className="h-24 md:h-32 lg:h-40 mb-6" theme={theme} />
                 <div className="text-center">
                    <div className="font-black text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-gold mb-2 leading-none">
                      {lang === 'en' ? 'Capital Management' : 'Gestión de Capital'}
                    </div>
                    <div className={`font-black text-xs md:text-sm uppercase tracking-[0.2em] leading-tight ${theme === 'dark' ? 'text-white/80' : 'text-slate-600'}`}>
                      Brickell District
                    </div>
                 </div>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                {[
                  { 
                    name: lang === 'en' ? "Luxury Portfolios" : "Portafolios de Lujo", 
                    sub: "NMLS: 2616069",
                    icon: '💎'
                  },
                  { 
                    name: lang === 'en' ? "Institutional Debt" : "Deuda Institucional", 
                    sub: lang === 'en' ? "Structured Acquisitions" : "Adquisiciones Estructuradas",
                    icon: '🏛️'
                  },
                  { 
                    name: lang === 'en' ? "Private Capital" : "Capital Privado", 
                    sub: lang === 'en' ? "Bespoke Lending Solutions" : "Soluciones Hipotecarias a Medida",
                    icon: '⚡'
                  }
                ].map((item, idx) => (
                  <Link key={idx} to="/services" className={`flex gap-4 md:gap-6 items-center p-4 md:p-6 rounded-2xl md:rounded-[32px] border-2 transition-all hover:translate-x-3 active:scale-95 ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-transparent hover:bg-white/10 hover:border-gold/30' 
                      : 'bg-slate-50 border-transparent hover:bg-white hover:border-gold/30 hover:shadow-xl'
                  }`}>
                    <div className="h-10 w-10 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-gold/10 flex shrink-0 items-center justify-center text-xl md:text-2xl shadow-sm border border-gold/10">
                      {item.icon}
                    </div>
                    <div>
                      <div className={`text-sm md:text-base font-black tracking-tight leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.name}</div>
                      <div className={`text-[8px] md:text-[9px] uppercase tracking-[0.3em] mt-1.5 md:mt-2 font-black ${theme === 'dark' ? 'text-gold/50' : 'text-slate-400'}`}>{item.sub}</div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className={`mt-8 md:mt-10 p-6 md:p-8 rounded-3xl md:rounded-[44px] border-2 transition-all group/call relative overflow-hidden ${
                theme === 'dark' ? 'bg-gradient-to-br from-midnight to-blue-900/30 border-white/5 hover:border-gold/30' : 'bg-slate-50 border-slate-100 hover:border-gold/40 shadow-sm'
              }`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <div className="text-[9px] md:text-[10px] uppercase font-black tracking-[0.5em] text-gold mb-2 md:mb-3 leading-none">
                      {lang === 'en' ? 'Concierge Desk' : 'Atención Concierge'}
                    </div>
                    <a href="tel:7867101976" className={`text-xl md:text-2xl font-black tracking-tight transition-colors leading-none ${theme === 'dark' ? 'text-white group-hover/call:text-gold' : 'text-slate-900 group-hover/call:text-gold'}`}>
                      (786) 710-1976
                    </a>
                  </div>
                  <div className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-gold shadow-goldglow flex items-center justify-center text-ink transition-transform group-hover/call:rotate-12 group-hover/call:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

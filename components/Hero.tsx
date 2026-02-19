
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Language, Theme } from '../types';

interface HeroProps {
  lang: Language;
  theme: Theme;
}

const MIAMI_IMAGES = [
  'https://i.postimg.cc/CzwHRMrQ/uwp4636303.jpg', // postimg = can't control size/quality much

  'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=2400&q=90',
  'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&w=2400&q=90',
  'https://images.unsplash.com/photo-1605723511530-4ad99871755a?auto=format&fit=crop&w=2400&q=90',
  'https://images.unsplash.com/photo-1624391787113-6d9b62f7480a?auto=format&fit=crop&w=2400&q=90'
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
    <section className={`relative min-h-[90vh] flex items-center overflow-hidden transition-colors duration-500 ${theme === 'dark' ? 'bg-ink' : 'bg-slate-50'}`}>
      <div className="absolute inset-0 z-0">
        {MIAMI_IMAGES.map((img, idx) => (
          <div 
            key={img}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out ${
              idx === currentIdx ? (theme === 'dark' ? 'opacity-75' : 'opacity-60') : 'opacity-0'
            }`}
            style={{ 
              backgroundImage: `url('${img}')`,
              transform: idx === currentIdx ? 'scale(1.1)' : 'scale(1)',
              transition: 'opacity 2000ms ease-in-out, transform 12000ms linear'
            }}
          />
        ))}
        <div className={`absolute inset-0 bg-gradient-to-b ${
          theme === 'dark' 
            ? 'from-blue-900/50 via-ink/70 to-ink' 
            : 'from-blue-200/30 via-white/70 to-white'
        }`} />
        <div className={`absolute inset-0 backdrop-blur-[1px] ${theme === 'dark' ? 'bg-ink/10' : 'bg-white/5'}`} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center w-full">
        <div className="animate-in fade-in slide-in-from-left-10 duration-1000">
          <div className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-black text-gold mb-10 shadow-goldglow backdrop-blur-md ${
            theme === 'dark' ? 'border-gold/40 bg-midnight/80' : 'border-gold/50 bg-white/90'
          }`}>
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse"></span>
            {lang === 'en' ? 'TRUSTED FINANCING • RESIDENTIAL & COMMERCIAL' : 'FINANCIAMIENTO DE CONFIANZA • RESIDENCIAL Y COMERCIAL'}
          </div>
          
          <h1 className={`text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] mb-8 uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {lang === 'en' ? 'Your Assets,' : 'Tus Activos,'}<br/>
            <span className="bg-gradient-to-r from-gold via-gold2 to-gold bg-clip-text text-transparent">
              {lang === 'en' ? 'Our Priority.' : 'Nuestra Prioridad.'}
            </span>
          </h1>
          
          <p className={`text-xl max-w-xl leading-relaxed mb-12 drop-shadow-sm ${theme === 'dark' ? 'text-slate2/95' : 'text-slate-600'}`}>
            {lang === 'en' 
              ? 'Miami property experts. From your first home to large-scale commercial acquisitions, we provide capital with speed and precision.' 
              : 'Expertos en propiedades en Miami. Desde su primera casa hasta adquisiciones comerciales a gran escala, brindamos capital con rapidez y precisión.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <Link 
              to="/contact"
              className="flex items-center justify-center gap-3 rounded-2xl px-12 py-5 font-black text-ink bg-gold shadow-2xl transition-all hover:scale-105 active:scale-95 hover:shadow-goldglow"
            >
              {lang === 'en' ? 'Get Pre-Approved' : 'Pre-Aprobarse'} <span>→</span>
            </Link>
            <Link 
              to="/team"
              className={`flex items-center justify-center rounded-2xl px-12 py-5 font-black border-2 backdrop-blur-sm transition-all ${
                theme === 'dark' 
                  ? 'text-white border-white/20 bg-midnight/40 hover:bg-white/10' 
                  : 'text-slate-900 border-slate-200 bg-white/60 hover:bg-slate-100'
              }`}
            >
              {lang === 'en' ? 'Meet Our Team' : 'Conoce Nuestro Equipo'}
            </Link>
          </div>

          <div className={`mt-16 flex items-center gap-8 border-t pt-10 ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`h-11 w-11 rounded-full border-2 flex items-center justify-center text-[10px] font-bold backdrop-blur-sm ${
                  theme === 'dark' ? 'border-midnight bg-gold/30' : 'border-white bg-gold/20'
                }`}>★</div>
              ))}
              <div className="h-11 w-11 rounded-full border-2 border-midnight bg-gold flex items-center justify-center text-[10px] font-bold text-ink shadow-lg">+</div>
            </div>
            <div className={`text-xs font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white/60' : 'text-slate-400'}`}>
              {lang === 'en' ? 'Licensed Finance Expert' : 'Experto Financiero Licenciado'} • NMLS 2616069
            </div>
          </div>
        </div>

        <div className="hidden lg:block relative animate-in fade-in slide-in-from-right-10 duration-1000 delay-300">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gold/30 rounded-[48px] blur-2xl opacity-40 group-hover:opacity-70 transition duration-1000"></div>
            <div className={`relative border-2 rounded-[40px] overflow-hidden shadow-2xl p-10 grain ${
              theme === 'dark' ? 'bg-midnight/90 border-white/10' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-10">
                 <Logo className="h-12" theme={theme} />
                 <div className="text-right">
                    <div className={`font-black text-xs uppercase ${theme === 'dark' ? 'text-white/50' : 'text-slate-400'}`}>
                      {lang === 'en' ? 'Miami Headquarters' : 'Sede de Miami'}
                    </div>
                 </div>
              </div>
              
              <ul className="space-y-6">
                {[
                  { 
                    name: lang === 'en' ? "Commercial Acquisition" : "Adquisición Comercial", 
                    sub: lang === 'en' ? "Office, Retail & Industrial" : "Oficina, Retail e Industrial" 
                  },
                  { 
                    name: lang === 'en' ? "Luxury Residential" : "Residencial de Lujo", 
                    sub: lang === 'en' ? "High-limit mortgage facilities" : "Facilidades hipotecarias de alto límite" 
                  },
                  { 
                    name: lang === 'en' ? "Investment Properties" : "Propiedades de Inversión", 
                    sub: lang === 'en' ? "Maximize portfolio growth" : "Maximice el crecimiento de su cartera" 
                  },
                  { 
                    name: lang === 'en' ? "Fast Closings" : "Cierres Rápidos", 
                    sub: lang === 'en' ? "Liquidity when it matters most" : "Liquidez cuando más importa" 
                  }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-5 items-start group/item hover:translate-x-2 transition-transform">
                    <div className="h-11 w-11 rounded-xl bg-gold/10 border border-gold/30 flex shrink-0 items-center justify-center text-gold shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className={`text-base font-black group-hover/item:text-gold transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.name}</div>
                      <div className={`text-[11px] uppercase tracking-widest mt-1 font-bold ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>{item.sub}</div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className={`mt-12 p-8 rounded-[32px] border-2 ${
                theme === 'dark' ? 'bg-gradient-to-br from-blue-900/40 to-midnight border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-[10px] uppercase font-black tracking-widest mb-1 ${theme === 'dark' ? 'text-white/50' : 'text-slate-400'}`}>
                      {lang === 'en' ? 'Office Contact' : 'Contacto de Oficina'}
                    </div>
                    <div className={`text-xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>(786) 710-1976</div>
                  </div>
                  <div className="h-12 w-12 rounded-full border border-gold/50 flex items-center justify-center text-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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

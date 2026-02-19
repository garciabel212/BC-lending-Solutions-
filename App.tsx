
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import LoanCalculator from './components/LoanCalculator';
import AdvisorWidget from './components/AdvisorWidget';
import Footer from './components/Footer';
import OwnerBio from './components/OwnerBio';
import Team from './components/Team';
import Contact from './components/Contact';
import LoadingScreen from './components/LoadingScreen';
import { Language, Theme } from './types';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const HomePage = ({ lang, theme }: { lang: Language, theme: Theme }) => (
  <>
    <Hero lang={lang} theme={theme} />
    <OwnerBio lang={lang} theme={theme} />
    <section className={`py-24 border-t ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={`flex flex-col md:flex-row items-center justify-between gap-12 p-12 rounded-[48px] border backdrop-blur-xl ${
          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'
        }`}>
          <div>
            <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'en' ? 'Fast Pre-Approvals' : 'Pre-Aprobaciones Rápidas'}
            </h2>
            <p className={`max-w-md ${theme === 'dark' ? 'text-slate2' : 'text-slate-600'}`}>
              {lang === 'en' 
                ? 'Get the clarity you need to start your home search. Our team reviews applications daily to ensure you don\'t miss out on your dream home.' 
                : 'Obtenga la claridad que necesita para comenzar su búsqueda de casa. Nuestro equipo revisa las solicitudes diariamente para asegurar que no pierda la casa de sus sueños.'}
            </p>
          </div>
          <a href="#/contact" className="px-8 py-4 rounded-2xl bg-gold text-ink font-bold shadow-goldglow hover:scale-105 transition-all">
            {lang === 'en' ? 'Start Pre-Approval' : 'Comenzar Pre-Aprobación'}
          </a>
        </div>
      </div>
    </section>
  </>
);

const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Complete initial loading state after 2 seconds to match animation
    const timer = setTimeout(() => setIsLoading(false), 2000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      {isLoading && <LoadingScreen />}
      
      <div className={`relative min-h-screen selection:bg-gold/30 selection:text-white overflow-x-hidden transition-colors duration-500 ${
        theme === 'dark' ? 'bg-ink text-slate-100' : 'bg-white text-slate-900'
      } ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
        
        <div className="fixed inset-0 pointer-events-none z-0">
          <div 
            className={`absolute top-0 left-1/4 w-[800px] h-[800px] blur-[120px] rounded-full transition-all duration-700 ${
              theme === 'dark' ? 'bg-gold/5' : 'bg-gold/10'
            }`}
            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
          />
          <div 
            className={`absolute bottom-1/4 right-0 w-[600px] h-[600px] blur-[100px] rounded-full transition-all duration-700 ${
              theme === 'dark' ? 'bg-blue-900/10' : 'bg-blue-100/50'
            }`}
            style={{ transform: `translateY(${scrollY * 0.05}px)` }}
          />
          <div className={`absolute inset-0 grain ${theme === 'dark' ? 'opacity-[0.03]' : 'opacity-[0.01]'}`} />
        </div>

        <Navbar 
          isScrolled={scrollY > 50} 
          lang={lang} 
          setLang={setLang} 
          theme={theme} 
          toggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} 
        />

        <main className={`relative z-10 pt-24 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <Routes>
            <Route path="/" element={<HomePage lang={lang} theme={theme} />} />
            <Route path="/services" element={<div className="pb-24"><Services lang={lang} theme={theme} /></div>} />
            <Route path="/team" element={<div className="pb-24"><Team lang={lang} theme={theme} /></div>} />
            <Route path="/calculator" element={<div className="py-24"><LoanCalculator lang={lang} theme={theme} /></div>} />
            <Route path="/contact" element={<div className="pb-24"><Contact lang={lang} theme={theme} /></div>} />
          </Routes>
        </main>

        {!isLoading && (
          <>
            <AdvisorWidget lang={lang} theme={theme} />
            <Footer lang={lang} theme={theme} />
          </>
        )}
      </div>
    </Router>
  );
};

export default App;

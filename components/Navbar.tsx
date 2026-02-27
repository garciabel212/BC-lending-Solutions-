
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logo from './Logo';
import { Language, Theme } from '../types';

interface NavbarProps {
  isScrolled: boolean;
  lang: Language;
  setLang: (l: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled, lang, setLang, theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: lang === 'en' ? 'Home' : 'Inicio', href: '/' },
    { name: lang === 'en' ? 'About Raudel Bonne' : 'Sobre Raudel Bonne', href: '/about' },
    { name: lang === 'en' ? 'Services' : 'Portafolio', href: '/services' },
    { name: lang === 'en' ? 'Our Team' : 'Especialista', href: '/team' },
    { name: lang === 'en' ? 'Calculator' : 'Calculadora', href: '/calculator' },
    { name: lang === 'en' ? 'Apply' : 'Solicitud', href: '/contact' },
  ];

  const activeLinkStyle = "text-gold";
  const inactiveLinkStyle = theme === 'dark' ? "text-white/60 hover:text-white" : "text-slate-600 hover:text-slate-900";

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 px-2 sm:px-4 pt-2 sm:pt-4`}>
      <div className={`mx-auto max-w-7xl transition-all duration-500 rounded-xl md:rounded-3xl border h-auto ${
        isScrolled || isOpen
          ? theme === 'dark' 
            ? 'bg-midnight/95 border-white/10 shadow-glow backdrop-blur-2xl' 
            : 'bg-white/95 border-slate-200 shadow-xl backdrop-blur-2xl'
          : 'bg-transparent border-transparent'
      }`}>
        <div className="flex items-center justify-between px-3 md:px-6 py-2 md:py-4">
          <Link to="/" className="flex items-center gap-2 md:gap-4 group shrink-0" onClick={() => setIsOpen(false)}>
            <Logo className="h-10 sm:h-12 md:h-16 lg:h-20" theme={theme} />
          </Link>

          <div className="hidden md:flex items-center gap-4 lg:gap-8 text-[10px] lg:text-[11px] font-black uppercase tracking-widest leading-none">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.href}
                className={({ isActive }) => 
                  `transition-all duration-300 hover:scale-105 py-2 ${isActive ? activeLinkStyle : inactiveLinkStyle}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className={`p-2 md:p-3 rounded-lg md:rounded-xl border transition-all active:scale-90 leading-none ${
                theme === 'dark' 
                  ? 'bg-white/5 border-white/10 text-gold hover:bg-white/10' 
                  : 'bg-slate-100 border-slate-200 text-slate-900 hover:bg-slate-200'
              }`}
              aria-label="Toggle Theme"
            >
              <span className="text-sm md:text-base">{theme === 'dark' ? '☀️' : '🌙'}</span>
            </button>

            <div className={`hidden sm:flex rounded-lg md:rounded-xl p-1 border ${
              theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'
            }`}>
              <button 
                onClick={() => setLang('en')}
                className={`px-2 md:px-3 py-1.5 md:py-2 text-[9px] md:text-[10px] font-black rounded-md md:rounded-lg transition-all leading-none ${lang === 'en' ? 'bg-gold text-ink' : theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang('es')}
                className={`px-2 md:px-3 py-1.5 md:py-2 text-[9px] md:text-[10px] font-black rounded-md md:rounded-lg transition-all leading-none ${lang === 'es' ? 'bg-gold text-ink' : theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
              >
                ES
              </button>
            </div>

            <Link 
              to="/contact"
              className={`hidden lg:inline-flex relative items-center justify-center rounded-xl px-6 py-3.5 text-[10px] font-black text-white bg-blue-900 border border-white/10 shadow-xl overflow-hidden group transition-all hover:scale-105 hover:shadow-goldglow uppercase tracking-widest leading-none text-center`}
            >
              <span className="relative z-10">{lang === 'en' ? 'Get Pre-Approved' : 'Obtener Pre-Aprobación'}</span>
              <div className="absolute inset-0 bg-gold translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out opacity-20" />
            </Link>
            
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-lg border leading-none transition-colors ${
                theme === 'dark' 
                  ? 'bg-white/5 border-white/10 text-white active:bg-white/20' 
                  : 'bg-slate-100 border-slate-200 text-slate-900 active:bg-slate-200'
              }`}
              aria-label="Toggle Menu"
            >
              <span className="text-lg">{isOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className={`md:hidden border-t px-4 py-8 rounded-b-xl h-auto overflow-hidden animate-in slide-in-from-top-4 duration-300 ${
            theme === 'dark' ? 'bg-midnight border-white/10' : 'bg-white border-slate-200 shadow-2xl'
          }`}>
            <div className="flex flex-col gap-6">
              <div className="flex justify-center sm:hidden mb-2">
                <div className={`flex rounded-lg p-1 border ${
                  theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'
                }`}>
                  <button 
                    onClick={() => setLang('en')}
                    className={`px-4 py-2.5 text-[9px] font-black rounded-md transition-all leading-none ${lang === 'en' ? 'bg-gold text-ink' : theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}
                  >
                    ENGLISH
                  </button>
                  <button 
                    onClick={() => setLang('es')}
                    className={`px-4 py-2.5 text-[9px] font-black rounded-md transition-all leading-none ${lang === 'es' ? 'bg-gold text-ink' : theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}
                  >
                    ESPAÑOL
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <NavLink 
                    key={link.name} 
                    to={link.href}
                    className={({ isActive }) => 
                      `py-3.5 px-2 block transition-colors uppercase font-black tracking-[0.2em] text-xs leading-none border-b border-transparent ${isActive ? activeLinkStyle : theme === 'dark' ? 'text-white/70 active:text-white' : 'text-slate-600 active:text-slate-900'}`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>

              <Link 
                to="/contact"
                className="w-full text-center py-4.5 rounded-xl bg-gold text-ink font-black shadow-goldglow block mt-2 uppercase tracking-[0.2em] text-[10px] leading-none active:scale-95 transition-transform"
                onClick={() => setIsOpen(false)}
              >
                {lang === 'en' ? 'Get Pre-Approved' : 'Obtener Pre-Aprobación'}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

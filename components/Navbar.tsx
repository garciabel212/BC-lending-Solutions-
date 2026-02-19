
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
    { name: lang === 'en' ? 'Services' : 'Servicios', href: '/services' },
    { name: lang === 'en' ? 'Our Team' : 'Nuestro Equipo', href: '/team' },
    { name: lang === 'en' ? 'Calculator' : 'Calculadora', href: '/calculator' },
    { name: lang === 'en' ? 'Apply' : 'Aplicar', href: '/contact' },
  ];

  const activeLinkStyle = "text-gold";
  const inactiveLinkStyle = theme === 'dark' ? "text-white/60 hover:text-white" : "text-slate-600 hover:text-slate-900";

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 px-4 pt-4`}>
      <div className={`mx-auto max-w-7xl transition-all duration-500 rounded-2xl border ${
        isScrolled 
          ? theme === 'dark' 
            ? 'bg-midnight/90 border-white/10 shadow-glow backdrop-blur-xl' 
            : 'bg-white/90 border-slate-200 shadow-xl backdrop-blur-xl'
          : 'bg-transparent border-transparent'
      }`}>
        <div className="flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-4 group">
            <Logo className="h-10 md:h-12" theme={theme} />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.href}
                className={({ isActive }) => 
                  `transition-colors duration-200 uppercase tracking-wider ${isActive ? activeLinkStyle : inactiveLinkStyle}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-all ${
                theme === 'dark' 
                  ? 'bg-white/5 border-white/10 text-gold hover:bg-white/10' 
                  : 'bg-slate-100 border-slate-200 text-slate-900 hover:bg-slate-200'
              }`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <div className={`flex rounded-lg p-1 border ${
              theme === 'dark' ? 'bg-white/10 border-white/10' : 'bg-slate-100 border-slate-200'
            }`}>
              <button 
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${lang === 'en' ? 'bg-gold text-ink' : theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang('es')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${lang === 'es' ? 'bg-gold text-ink' : theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
              >
                ES
              </button>
            </div>

            <Link 
              to="/contact"
              className={`hidden lg:inline-flex relative items-center justify-center rounded-xl px-6 py-2.5 text-sm font-bold text-white bg-blue-900 border border-white/20 shadow-xl overflow-hidden group transition-transform hover:scale-105`}
            >
              <span className="relative z-10">{lang === 'en' ? 'Get Pre-Approved' : 'Pre-Aprobarse'}</span>
              <div className="absolute inset-0 bg-gold/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out" />
            </Link>
            
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-lg border ${
                theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
              }`}
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className={`md:hidden border-t px-6 py-4 rounded-b-2xl ${
            theme === 'dark' ? 'bg-midnight border-white/10' : 'bg-white border-slate-200 shadow-xl'
          }`}>
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.name} 
                  to={link.href}
                  className={({ isActive }) => 
                    `py-2 block transition-colors uppercase font-bold ${isActive ? activeLinkStyle : theme === 'dark' ? 'text-white/70 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
              <Link 
                to="/contact"
                className="w-full text-center py-3 rounded-xl bg-gold text-ink font-bold block mt-2"
                onClick={() => setIsOpen(false)}
              >
                {lang === 'en' ? 'Get Pre-Approved' : 'Pre-Aprobarse'}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

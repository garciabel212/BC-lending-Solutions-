
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Language, Theme } from '../types';

interface FooterProps {
  lang: Language;
  theme: Theme;
}

const Footer: React.FC<FooterProps> = ({ lang, theme }) => {
  return (
    <footer className={`py-20 relative z-10 transition-colors duration-500 border-t ${
      theme === 'dark' ? 'bg-midnight border-white/10' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-12 gap-16 mb-20">
          <div className="md:col-span-5">
            <div className="mb-8">
               <Logo className="h-36" theme={theme} />
            </div>
            <p className={`text-base leading-relaxed max-w-sm mb-10 ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>
              {lang === 'en' 
                ? 'Smart Loan, Strong Future. BC Prime Lending Solutions is your dedicated partner for professional mortgage guidance in Florida.' 
                : 'Crédito Inteligente, Futuro Sólido. BC Prime Lending Solutions es su aliado estratégico para una asesoría hipotecaria profesional en Florida.'}
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/bcprimelending?igsh=YzBwYjRjM3Nhdmph" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`h-10 px-4 rounded-xl border flex items-center justify-center text-xs font-bold transition-all ${
                  theme === 'dark' ? 'border-white/10 bg-white/5 text-white/60 hover:text-gold hover:border-gold' : 'border-slate-200 bg-white text-slate-500 hover:text-gold hover:border-gold'
                }`}
              >
                Instagram
              </a>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gold mb-8">
              {lang === 'en' ? 'Direct Desk' : 'Atención Directa'}
            </h4>
            <ul className="space-y-6 text-sm">
              <li>
                <div className={`uppercase text-[10px] font-bold mb-1 ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>{lang === 'en' ? 'Branch Manager' : 'Gerente de Sucursal'}</div>
                <div className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Raudel Bonne</div>
              </li>
              <li>
                <div className={`uppercase text-[10px] font-bold mb-1 ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>{lang === 'en' ? 'Phone' : 'Teléfono'}</div>
                <a href="tel:7867101976" className={`font-bold text-lg hover:text-gold transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>(786) 710-1976</a>
              </li>
              <li>
                <div className={`uppercase text-[10px] font-bold mb-1 ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>{lang === 'en' ? 'Email' : 'Correo Electrónico'}</div>
                <a href="mailto:ufinancings@bcprimelendingsolutions.com" className={`font-bold hover:text-gold transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>ufinancings@bcprimelendingsolutions.com</a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gold mb-8">
              {lang === 'en' ? 'Quick Links' : 'Enlaces Rápidos'}
            </h4>
            <ul className={`space-y-4 text-sm font-bold ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>
              <li><Link to="/services" className={`hover:text-gold transition ${theme === 'dark' ? 'hover:text-white' : ''}`}>{lang === 'en' ? 'Programs' : 'Programas'}</Link></li>
              <li><Link to="/team" className={`hover:text-gold transition ${theme === 'dark' ? 'hover:text-white' : ''}`}>{lang === 'en' ? 'Especialista' : 'Especialista'}</Link></li>
              <li><Link to="/calculator" className={`hover:text-gold transition ${theme === 'dark' ? 'hover:text-white' : ''}`}>{lang === 'en' ? 'Rates' : 'Tasas'}</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition text-gold">{lang === 'en' ? 'Apply Now' : 'Solicitud'}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gold mb-8">{lang === 'en' ? 'Compliance' : 'Normativa'}</h4>
            <ul className={`space-y-4 text-sm ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>
              <li><a href="#" className={`hover:text-gold transition ${theme === 'dark' ? 'hover:text-white' : ''}`}>{lang === 'en' ? 'Privacy Policy' : 'Privacidad'}</a></li>
              <li><a href="#" className={`hover:text-gold transition ${theme === 'dark' ? 'hover:text-white' : ''}`}>{lang === 'en' ? 'Fair Housing' : 'Vivienda Justa'}</a></li>
              <li className="flex flex-col gap-1">
                <span className={`font-bold text-[9px] uppercase tracking-wider ${theme === 'dark' ? 'text-gold' : 'text-gold'}`}>NMLS 2616069</span>
                <span className={`font-bold text-[9px] uppercase tracking-wider ${theme === 'dark' ? 'text-gold' : 'text-gold'}`}>Company NMLS 2805990</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={`pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase tracking-[0.3em] font-bold ${
          theme === 'dark' ? 'border-white/5 text-white/20' : 'border-slate-200 text-slate-400'
        }`}>
          <div className="text-center md:text-left">
            © 2024 BC Prime Lending Solutions. {lang === 'en' ? 'Licensed Mortgage Broker in Florida.' : 'Corredor Hipotecario Licenciado en Florida.'}
          </div>
          <div className="flex items-center gap-4">
             <span>{lang === 'en' ? 'Equal Housing Lender' : 'Prestamista de Vivienda Equitativa'}</span>
             <span className="h-1 w-1 rounded-full bg-slate-300"></span>
             <span>{lang === 'en' ? 'Trusted Financing' : 'Financiamiento de Confianza'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

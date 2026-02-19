import React from 'react';
import { Link } from 'react-router-dom';
import { ServiceItem, Language, Theme } from '../types';

interface ServicesProps {
  lang: Language;
  theme: Theme;
}

const getServices = (lang: Language): ServiceItem[] => [
  { 
    id: 'purchase', 
    title: lang === 'en' ? 'Home Purchase Loans' : 'Préstamos para Compra de Vivienda', 
    description: lang === 'en' 
      ? 'Competitive financing options for your primary residence or second home.' 
      : 'Opciones de financiamiento competitivas para su residencia principal o segunda vivienda.', 
    icon: '🏠', 
    tag: lang === 'en' ? 'Residential' : 'Residencial' 
  },
  { 
    id: 'refi', 
    title: lang === 'en' ? 'Refinance & Cash Out' : 'Refinanciamiento y Cash Out', 
    description: lang === 'en' 
      ? 'Lower your monthly payments or access equity for other investments.' 
      : 'Reduzca sus pagos mensuales o acceda al capital para otras inversiones.', 
    icon: '🔄', 
    tag: lang === 'en' ? 'Refinance' : 'Refinanciamiento' 
  },
  { 
    id: 'jumbo', 
    title: lang === 'en' ? 'Jumbo & Investment Loans' : 'Préstamos Jumbo e Inversión', 
    description: lang === 'en' 
      ? 'High-limit financing for luxury estates and multi-unit investment properties.' 
      : 'Financiamiento de alto límite para propiedades de lujo e inversiones multi-familiares.', 
    icon: '🏰', 
    tag: lang === 'en' ? 'High-Limit' : 'Alto Límite' 
  },
  { 
    id: 'fha-va', 
    title: lang === 'en' ? 'FHA | VA | Conventional' : 'FHA | VA | Convencional', 
    description: lang === 'en' 
      ? 'Standard loan programs tailored to your credit profile and military service.' 
      : 'Programas de préstamos estándar adaptados a su perfil crediticio y servicio militar.', 
    icon: '📜', 
    tag: lang === 'en' ? 'Programs' : 'Programas' 
  },
  { 
    id: 'nationwide', 
    title: lang === 'en' ? 'Nationwide Lending' : 'Préstamos a Nivel Nacional', 
    description: lang === 'en' 
      ? 'Capital solutions available across the United States for all property types.' 
      : 'Soluciones de capital disponibles en todo Estados Unidos para todo tipo de propiedades.', 
    icon: '🗺️', 
    tag: lang === 'en' ? 'Flexible' : 'Flexible' 
  },
  { 
    id: 'dscr', 
    title: lang === 'en' ? 'DSCR Loans' : 'Préstamos DSCR', 
    description: lang === 'en' 
      ? 'Investor loans based on property cash flow rather than personal income.' 
      : 'Préstamos para inversores basados en el flujo de caja de la propiedad.', 
    icon: '📊', 
    tag: lang === 'en' ? 'Investor' : 'Inversionista' 
  },
  { 
    id: 'self-employed', 
    title: lang === 'en' ? 'Self-Employed & Bank Statement' : 'Trabajadores Independientes y Extractos', 
    description: lang === 'en' 
      ? 'Alternative qualification for entrepreneurs using bank statement verification.' 
      : 'Calificación alternativa para emprendedores mediante verificación de extractos bancarios.', 
    icon: '📁', 
    tag: lang === 'en' ? 'Specialized' : 'Especializado' 
  },
  { 
    id: 'commercial', 
    title: lang === 'en' ? 'Commercial Loans' : 'Préstamos Comerciales', 
    description: lang === 'en' 
      ? 'Strategic capital for office, retail, industrial, and multi-family acquisitions.' 
      : 'Capital estratégico para adquisiciones de oficinas, locales comerciales e industriales.', 
    icon: '🏢', 
    tag: lang === 'en' ? 'Business' : 'Negocios' 
  },
  { 
    id: 'hard-money', 
    title: lang === 'en' ? 'Hard Money Loans' : 'Préstamos Hard Money', 
    description: lang === 'en' 
      ? 'Fast, asset-based bridge financing for time-sensitive real estate opportunities.' 
      : 'Financiamiento puente rápido basado en activos para oportunidades inmobiliarias urgentes.', 
    icon: '⚡', 
    tag: lang === 'en' ? 'Speed' : 'Rapidez' 
  },
  { 
    id: 'loc', 
    title: lang === 'en' ? 'Business Lines of Credit' : 'Líneas de Crédito para Negocios', 
    description: lang === 'en' 
      ? 'Flexible working capital to fuel your enterprise growth and operations.' 
      : 'Capital de trabajo flexible para impulsar el crecimiento y las operaciones de su empresa.', 
    icon: '💳', 
    tag: lang === 'en' ? 'Corporate' : 'Corporativo' 
  },
  { 
    id: 'improvement', 
    title: lang === 'en' ? 'Home Improvement Loans' : 'Préstamos para Mejoras del Hogar', 
    description: lang === 'en' 
      ? 'Finance renovations and upgrades to maximize your property value.' 
      : 'Financie renovaciones y mejoras para maximizar el valor de su propiedad.', 
    icon: '🔨', 
    tag: lang === 'en' ? 'Renovate' : 'Renovación' 
  }
];

const Services: React.FC<ServicesProps> = ({ lang, theme }) => {
  const services = getServices(lang);

  return (
    <section id="services" className={`py-24 transition-colors duration-500 ${theme === 'dark' ? 'bg-ink' : 'bg-white'}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'en' ? 'Our Solutions' : 'Nuestras Soluciones'}
            </h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-slate2' : 'text-slate-600'}`}>
              {lang === 'en' 
                ? 'Comprehensive lending products designed for residential, commercial, and investor needs.' 
                : 'Productos de préstamo integrales diseñados para necesidades residenciales, comerciales e inversores.'}
            </p>
          </div>
          <div className="flex gap-4">
             <div className="h-2 w-12 bg-gold/20 rounded-full" />
             <div className="h-2 w-24 bg-gold rounded-full" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item) => (
            <div key={item.id} className={`group relative border rounded-[32px] p-10 overflow-hidden transition-all duration-500 hover:translate-y-[-8px] ${
              theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/[0.08]' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:shadow-xl'
            }`}>
              <div className={`absolute top-0 right-0 p-8 text-8xl transition-all duration-700 pointer-events-none ${
                theme === 'dark' ? 'opacity-[0.03] group-hover:opacity-[0.08]' : 'opacity-[0.05] group-hover:opacity-[0.1]'
              }`}>
                {item.icon}
              </div>
              
              <div className="flex items-start justify-between mb-8">
                <div className={`h-14 w-14 rounded-2xl border flex items-center justify-center text-3xl ${
                  theme === 'dark' ? 'bg-black/40 border-gold/30' : 'bg-white border-gold/50 shadow-sm'
                }`}>
                  {item.icon}
                </div>
                <span className="px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-[10px] font-bold text-gold uppercase tracking-widest">
                  {item.tag}
                </span>
              </div>

              <h3 className={`text-2xl font-bold mb-4 group-hover:text-gold transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
              <p className={`leading-relaxed mb-8 ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>{item.description}</p>
              
              <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-gold group-hover:gap-3 transition-all">
                {lang === 'en' ? 'Inquire Now' : 'Consultar Ahora'} <span>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

import React from 'react';
import { Language, Theme } from '../types';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

interface TeamProps {
  lang: Language;
  theme: Theme;
}

const Team: React.FC<TeamProps> = ({ lang, theme }) => {
  const team: TeamMember[] = [
    {
      name: 'Raudel Bonne',
      role: lang === 'en' ? 'Principal & Senior Asset Originator' : 'Principal y Originador de Activos Senior',
      description: lang === 'en' 
        ? 'Expert with over a decade in Miami real estate finance, specializing in structured residential debt and commercial building acquisition.' 
        : 'Experto con más de una década en finanzas inmobiliarias en Miami, especializado en deuda residencial estructurada y adquisición de edificios comerciales.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80',
    },
    {
      name: 'Elena Rodriguez',
      role: lang === 'en' ? 'Commercial Loan Officer' : 'Oficial de Préstamos Comerciales',
      description: lang === 'en' 
        ? 'Dedicated to financing retail spaces, warehouses, and office complexes for business owners.' 
        : 'Dedicada al financiamiento de espacios comerciales, almacenes y complejos de oficinas para dueños de negocios.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80',
    },
    {
      name: 'Marco Valenzuela',
      role: lang === 'en' ? 'High-Rise Investment Realtor' : 'Realtor de Inversión en Edificios',
      description: lang === 'en' 
        ? 'Navigates the acquisition of luxury residential high-rises and commercial assets in the Brickell district.' 
        : 'Navega la adquisición de edificios residenciales de lujo y activos comerciales en el distrito de Brickell.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
    },
    {
      name: 'Sarah Thompson',
      role: lang === 'en' ? 'Strategic Operations Manager' : 'Gerente de Operaciones Estratégicas',
      description: lang === 'en' 
        ? 'Manages the complex closing pipelines for both multi-million dollar residential and commercial deals.' 
        : 'Gestiona los complejos canales de cierre para acuerdos residenciales y comerciales de millones de dólares.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80',
    },
    {
      name: 'Julian Ortiz',
      role: lang === 'en' ? 'Corporate Financial Advisor' : 'Asesor Financiero Corporativo',
      description: lang === 'en' 
        ? 'Specializes in balance sheet optimization for commercial entities looking to acquire real estate.' 
        : 'Se especializa en la optimización del balance para entidades comerciales que buscan adquirir bienes raíces.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    },
    {
      name: 'Sofia Mendez',
      role: lang === 'en' ? 'Residential Specialist Realtor' : 'Realtor Especialista Residencial',
      description: lang === 'en' 
        ? 'Provides high-touch service for families looking for luxury homes and coastal estates.' 
        : 'Brinda un servicio de alto nivel para familias que buscan casas de lujo y propiedades costeras.',
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0ad2f04?auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section id="team" className={`py-24 transition-colors duration-500 ${theme === 'dark' ? 'bg-ink' : 'bg-white'}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-6">
            {lang === 'en' ? 'Professional Network' : 'Red Profesional'}
          </div>
          <h2 className={`text-5xl md:text-6xl font-black mb-8 uppercase tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {lang === 'en' ? 'Elite Finance' : 'Especialistas'} <span className="text-gold">{lang === 'en' ? 'Specialists' : 'en Finanzas'}</span>
          </h2>
          <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-slate2' : 'text-slate-600'}`}>
            {lang === 'en' 
              ? 'Meet the team securing your residential and commercial legacy in the Florida market.' 
              : 'Conozca al equipo que asegura su legado residencial y comercial en el mercado de Florida.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className={`group relative border rounded-[40px] overflow-hidden transition-all duration-500 hover:translate-y-[-8px] ${
              theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/[0.08]' : 'bg-slate-50 border-slate-200 hover:bg-white hover:shadow-2xl'
            }`}>
              <div className="aspect-[4/5] overflow-hidden relative">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 ${
                    theme === 'light' ? 'grayscale-0' : ''
                  }`}
                />
                <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${
                  theme === 'dark' ? 'from-midnight opacity-60' : 'from-slate-200 opacity-30'
                }`}></div>
              </div>
              
              <div className="p-8">
                <h3 className={`text-2xl font-bold mb-2 group-hover:text-gold transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{member.name}</h3>
                <div className="text-gold font-bold text-xs uppercase tracking-widest mb-4 opacity-80">{member.role}</div>
                <p className={`text-sm leading-relaxed line-clamp-3 ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>
                  {member.description}
                </p>
              </div>
              
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gold group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;

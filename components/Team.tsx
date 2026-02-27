
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
      role: lang === 'en' ? 'Branch Manager' : 'Gerente de Sucursal',
      description: 'Raudel Bonne/Branch Manager\nBC Prime Lending Solutions\n(DBA of Ultimate Financing Solutions Corp)\nNMLS: 2616069\nCompany NMLS: 2805990\nLicensed Mortgage Broker in Florida',
      image: 'https://i.postimg.cc/tqt7FjYj/1a4a47a3-2c5c-4727-8546-7272ea1fba3f.jpg',
    }
  ];

  return (
    <section id="team" className={`py-12 md:py-24 transition-colors duration-500 h-auto ${theme === 'dark' ? 'bg-ink' : 'bg-white'}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-12 md:mb-20 px-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] mb-6 md:mb-8 shadow-sm leading-none">
            {lang === 'en' ? 'Strategic Leadership' : 'Liderazgo Estratégico'}
          </div>
          <h2 className={`text-[clamp(1.75rem,6vw,3.5rem)] font-black mb-6 md:mb-8 uppercase tracking-tighter leading-[1.1] ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {lang === 'en' ? 'The Expert' : 'El Especialista'} <span className="text-gold italic">{lang === 'en' ? 'Behind the Capital' : 'detrás del Capital'}</span>
          </h2>
          <p className={`text-sm md:text-xl max-w-2xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-slate2' : 'text-slate-600'}`}>
            {lang === 'en' 
              ? 'Securing your residential and commercial legacy in the Florida market through institutional-grade oversight.' 
              : 'Asegurando su patrimonio residencial y comercial en el mercado de Florida mediante supervisión institucional.'}
          </p>
        </div>

        <div className="flex justify-center">
          {team.map((member, idx) => (
            <div key={idx} className={`group relative border rounded-3xl md:rounded-[48px] overflow-hidden transition-all duration-500 hover:translate-y-[-8px] h-auto max-w-md w-full ${
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
              
              <div className="p-6 md:p-10">
                <h3 className={`text-xl md:text-2xl font-black mb-2 md:mb-3 group-hover:text-gold transition-colors leading-[1.15] uppercase tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{member.name}</h3>
                <div className="text-gold font-black text-[8px] md:text-[10px] uppercase tracking-[0.2em] mb-4 md:mb-6 opacity-80 leading-none">{member.role}</div>
                <div className={`text-sm md:text-base leading-relaxed whitespace-pre-line font-medium ${theme === 'dark' ? 'text-white/70' : 'text-slate-600'}`}>
                  {member.description}
                </div>
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


import React from 'react';
import { Link } from 'react-router-dom';
import { Language, Theme } from '../types';

interface OwnerBioProps {
  lang: Language;
  theme: Theme;
}

const OwnerBio: React.FC<OwnerBioProps> = ({ lang, theme }) => {
  return (
    <section id="owner-bio" className={`py-24 relative overflow-hidden transition-colors duration-500 border-t ${
      theme === 'dark' ? 'bg-ink border-white/5' : 'bg-slate-50 border-slate-200'
    }`}>
       <div className="mx-auto max-w-7xl px-6">
         <div className="grid lg:grid-cols-12 gap-16 items-start">
           
           <div className="lg:col-span-5">
             <div className="relative group">
               <div className="absolute -inset-6 bg-gold/15 rounded-[60px] blur-3xl opacity-50 group-hover:opacity-80 transition duration-1000"></div>
               
               <div className={`relative aspect-[3/4.2] rounded-[56px] overflow-hidden border-4 shadow-2xl transition-all duration-500 group-hover:border-gold/30 ${
                 theme === 'dark' ? 'border-white/10 bg-midnight' : 'border-white bg-slate-200'
               }`}>
                 <img 
                   src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" 
                   alt="Raudel Bonne" 
                   className="w-full h-full object-cover object-top hover:scale-105 transition-all duration-700" 
                 />
                 <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark' ? 'from-blue-900/80' : 'from-blue-900/40'} via-transparent to-transparent`}></div>
                 
                 <div className={`absolute bottom-12 left-10 right-10 p-8 rounded-[36px] backdrop-blur-xl border shadow-2xl ${
                   theme === 'dark' ? 'bg-black/70 border-white/20' : 'bg-white/80 border-slate-200'
                 }`}>
                    <div className={`font-black text-3xl mb-1 uppercase tracking-tighter ${theme === 'dark' ? 'text-gold' : 'text-blue-900'}`}>Raudel Bonne</div>
                    <div className={`font-black text-xs flex items-center gap-3 uppercase tracking-widest opacity-80 ${theme === 'dark' ? 'text-white' : 'text-slate-600'}`}>
                       <span>{lang === 'en' ? 'Finance Originator' : 'Originador de Finanzas'}</span>
                       <span className={`h-4 w-[2px] ${theme === 'dark' ? 'bg-gold/40' : 'bg-gold/60'}`}></span>
                       <span className="text-gold">NMLS: 2616069</span>
                    </div>
                 </div>
               </div>
               
               <div className={`absolute -top-8 -right-8 h-40 w-40 rounded-full bg-gradient-to-br from-gold to-gold2 shadow-goldglow flex flex-col items-center justify-center text-center p-6 transform -rotate-12 border-4 z-20 ${
                 theme === 'dark' ? 'border-midnight' : 'border-white'
               }`}>
                  <div className="text-ink font-black text-sm uppercase leading-none mb-1">{lang === 'en' ? 'Verified' : 'Verificado'}</div>
                  <div className="text-ink font-bold text-[10px] uppercase tracking-tighter opacity-70">
                    {lang === 'en' ? 'Top Producer' : 'Mejor Productor'}
                  </div>
                  <div className="mt-2 text-ink text-2xl font-black">2024</div>
               </div>
             </div>
           </div>

           <div className="lg:col-span-7 pt-12">
             <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-black uppercase tracking-[0.3em] mb-10 shadow-sm">
               {lang === 'en' ? 'Miami Premier Finance' : 'Miami Finanzas Premier'}
             </div>
             
             <h2 className={`text-6xl md:text-7xl font-black mb-10 leading-[0.9] uppercase tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
               {lang === 'en' ? 'Residential &' : 'Hipotecas y'} <br/>
               <span className="bg-gradient-to-r from-gold to-gold2 bg-clip-text text-transparent italic">
                {lang === 'en' ? 'Commercial Expertise.' : 'Experticia Comercial.'}
               </span>
             </h2>

             <div className={`space-y-8 text-xl leading-relaxed ${theme === 'dark' ? 'text-slate2' : 'text-slate-600'}`}>
               <p className={`font-black text-2xl border-l-4 border-gold pl-8 py-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                 {lang === 'en' 
                   ? 'Bridging the gap between ambitious goals and the capital required to build, buy, or scale.' 
                   : 'Cerrando la brecha entre las metas ambiciosas y el capital necesario para construir, comprar o escalar.'}
               </p>
               
               <p className={`${theme === 'dark' ? 'text-white/80' : 'text-slate-700'}`}>
                 {lang === 'en' 
                   ? 'Raudel Bonne is more than a loan officer; he is a strategic partner for Miami’s residential and commercial landscape. Whether it is securing a family’s first home or structured debt for a commercial tower, he delivers with absolute discretion.' 
                   : 'Raudel Bonne es más que un oficial de préstamos; es un socio estratégico para el panorama residencial y comercial de Miami. Ya sea para asegurar la primera casa de una familia o deuda estructurada para una torre comercial, cumple con absoluta discreción.'}
               </p>

               <div className={`grid md:grid-cols-2 gap-10 py-12 border-y my-12 ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
                 <div className="space-y-4">
                    <div className="h-12 w-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h4 className={`font-black uppercase text-sm tracking-widest ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {lang === 'en' ? 'Commercial Assets' : 'Activos Comerciales'}
                    </h4>
                    <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>
                      {lang === 'en' 
                        ? 'Strategic financing for commercial office, retail centers, and industrial hubs across the region.' 
                        : 'Financiamiento estratégico para oficinas comerciales, centros minoristas y centros industriales en toda la región.'}
                    </p>
                 </div>
                 <div className="space-y-4">
                    <div className="h-12 w-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <h4 className={`font-black uppercase text-sm tracking-widest ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {lang === 'en' ? 'Private Residential' : 'Residencial Privado'}
                    </h4>
                    <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>
                      {lang === 'en' 
                        ? 'High-limit and conventional financing for luxury estates and family homes.' 
                        : 'Financiamiento convencional y de alto límite para propiedades de lujo y casas familiares.'}
                    </p>
                 </div>
               </div>

               <div className={`pt-12 flex flex-wrap gap-12 border-t mt-12 ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
                  <div className="space-y-2">
                     <div className={`text-[10px] uppercase tracking-[0.3em] font-black ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>
                       {lang === 'en' ? 'Direct Line' : 'Línea Directa'}
                     </div>
                     <a href="tel:7867101976" className="text-3xl font-black text-gold hover:text-white transition-colors tracking-tight">(786) 710-1976</a>
                  </div>
                  <div className="space-y-2">
                     <div className={`text-[10px] uppercase tracking-[0.3em] font-black ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>
                       {lang === 'en' ? 'Official Channel' : 'Canal Oficial'}
                     </div>
                     <a href="mailto:bonnecapitalgroup@gmail.com" className={`text-xl font-black hover:text-gold transition-colors underline decoration-gold/30 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>bonnecapitalgroup@gmail.com</a>
                  </div>
               </div>
             </div>
           </div>

         </div>
       </div>
    </section>
  );
};

export default OwnerBio;

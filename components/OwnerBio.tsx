
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Language, Theme } from '../types';

interface OwnerBioProps {
  lang: Language;
  theme: Theme;
}

const BioModal = ({ lang, theme, onClose }: { lang: Language, theme: Theme, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      <div 
        className="absolute inset-0 bg-ink/90 backdrop-blur-xl transition-opacity animate-in fade-in duration-500"
        onClick={onClose}
      />
      
      <div className={`relative w-full max-w-4xl max-h-[85vh] md:max-h-[90vh] overflow-y-auto rounded-3xl md:rounded-[48px] border-2 shadow-goldglow transition-all animate-in zoom-in duration-500 h-auto ${
        theme === 'dark' ? 'bg-midnight border-gold/20' : 'bg-white border-slate-200'
      }`}>
        <button 
          onClick={onClose}
          className={`absolute top-4 right-4 md:top-8 md:right-8 h-10 w-10 md:h-12 md:w-12 rounded-full border flex items-center justify-center transition-all active:scale-90 leading-none z-20 ${
            theme === 'dark' ? 'border-white/10 text-white bg-midnight/50' : 'border-slate-200 text-slate-900 bg-white/50'
          }`}
        >
          ✕
        </button>

        <div className="p-6 md:p-16">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start mb-8 md:mb-12 text-center md:text-left">
              <div className={`h-20 w-20 md:h-24 md:w-24 rounded-2xl md:rounded-3xl border flex items-center justify-center shrink-0 overflow-hidden ${
              theme === 'dark' ? 'bg-white/5 border-gold/30' : 'bg-slate-50 border-gold/40'
            }`}>
              <img 
                src="https://i.postimg.cc/tqt7FjYj/1a4a47a3-2c5c-4727-8546-7272ea1fba3f.jpg" 
                alt="Raudel Bonne" 
                className={`w-full h-full object-cover object-top grayscale transition-all duration-700 ${theme === 'light' ? 'grayscale-0' : ''}`} 
              />
            </div>
            <div>
              <div className="text-gold font-black text-[9px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] mb-2 md:mb-4 leading-none">
                {lang === 'en' ? 'Professional Profile' : 'Perfil Profesional'}
              </div>
              <h2 className={`text-[clamp(1.5rem,5vw,3.5rem)] font-black uppercase tracking-tight leading-[1.15] md:leading-[1.1] ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Raudel Bonne
              </h2>
              <p className="text-gold font-bold text-xs md:text-sm mt-1.5 md:mt-2">NMLS 2616069</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-6 md:space-y-10">
              <section>
                <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-gold mb-3 md:mb-5 leading-none">
                  {lang === 'en' ? 'About Raudel Bonne' : 'Sobre Raudel Bonne'}
                </h4>
                <p className={`text-sm md:text-lg leading-relaxed ${theme === 'dark' ? 'text-slate2' : 'text-slate-600'}`}>
                  {lang === 'en' 
                    ? "Raudel Bonne is a distinguished figure in the Miami private lending sector, known for his strategic approach to capital deployment. With a background rooted in high-stakes decision-making and institutional precision, Raudel Bonne has transitioned his expertise into the financial services industry, where he serves as a trusted advisor for Raudel Bonne private lending and bespoke capital solutions."
                    : "Raudel Bonne es una figura distinguida en el sector de préstamos privados de Miami, conocido por su enfoque estratégico para el despliegue de capital. Con una trayectoria basada en la toma de decisiones de alto nivel y la precisión institucional, Raudel Bonne ha trasladado su experiencia a la industria de servicios financieros, donde se desempeña como un asesor de confianza para préstamos privados de Raudel Bonne y soluciones de capital a medida."}
                </p>
              </section>

              <section>
                <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-gold mb-3 md:mb-5 leading-none">
                  {lang === 'en' ? 'Financial Leadership' : 'Liderazgo Financiero'}
                </h4>
                <p className={`text-sm md:text-lg leading-relaxed ${theme === 'dark' ? 'text-slate2' : 'text-slate-600'}`}>
                  {lang === 'en'
                    ? "Based in the heart of Brickell, Raudel Bonne focuses on high-leverage residential assets and strategic commercial developments. As a leader in Raudel Bonne lending, his commitment to the Miami market is reflected in his ability to structure complex debt solutions that empower clients to achieve their financial ambitions."
                    : "Con sede en el corazón de Brickell, Raudel Bonne se centra en activos residenciales de alto apalancamiento y desarrollos comerciales estratégicos. Como líder en préstamos de Raudel Bonne, su compromiso con el mercado de Miami se refleja en su capacidad para estructurar soluciones de deuda complejas que permiten a los clientes alcanzar sus ambiciones financieras."}
                </p>
              </section>
            </div>

            <div className="space-y-6 md:space-y-10">
              <section>
                <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-gold mb-4 md:mb-6 leading-none">
                  {lang === 'en' ? 'Core Expertise' : 'Experiencia Principal'}
                </h4>
                <ul className="space-y-2 md:space-y-4">
                  {[
                    lang === 'en' ? "High-Net-Worth Residential Debt" : "Financiamiento Residencial Élite",
                    lang === 'en' ? "Complex Asset Acquisition" : "Adquisición de Activos Complejos",
                    lang === 'en' ? "Bespoke Portfolio Restructuring" : "Reestructuración de Portafolios",
                    lang === 'en' ? "Institutional Relations" : "Relaciones Institucionales"
                  ].map((b, i) => (
                    <li key={i} className="flex items-center gap-3 md:gap-4 group">
                      <span className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-gold shrink-0"></span>
                      <span className={`text-xs md:text-base font-bold leading-snug ${theme === 'dark' ? 'text-white/80' : 'text-slate-700'}`}>{b}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-gold mb-4 md:mb-6 leading-none">
                  {lang === 'en' ? 'Regulatory Compliance' : 'Cumplimiento Regulatorio'}
                </h4>
                <ul className="space-y-2 md:space-y-4">
                  {[
                    lang === 'en' ? "Branch Manager (BC Prime)" : "Branch Manager (BC Prime)",
                    lang === 'en' ? "NMLS: 2616069" : "NMLS: 2616069",
                    lang === 'en' ? "Company NMLS: 2805990" : "NMLS de Compañía: 2805990",
                    lang === 'en' ? "Licensed Mortgage Broker in Florida" : "Broker Hipotecario Licenciado en Florida"
                  ].map((r, i) => (
                    <li key={i} className="flex items-start gap-3 md:gap-4">
                      <span className="mt-1 text-gold leading-none text-xs md:text-sm">✓</span>
                      <span className={`text-[10px] md:text-sm leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>{r}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3 md:gap-4 pt-2">
                    <span className="mt-1 text-gold leading-none text-xs md:text-sm">📸</span>
                    <a 
                      href="https://www.instagram.com/bcprimelending?igsh=YzBwYjRjM3Nhdmph" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`text-[10px] md:text-sm leading-relaxed hover:text-gold transition-colors underline decoration-gold/30 ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}
                    >
                      @bcprimelending
                    </a>
                  </li>
                </ul>
              </section>

              <div className="pt-4 md:pt-6">
                 <Link 
                   to="/contact" 
                   onClick={onClose}
                   className="flex items-center justify-center w-full py-4 md:py-6 rounded-xl md:rounded-2xl bg-gold text-ink font-black shadow-goldglow active:scale-95 transition-all uppercase tracking-[0.2em] text-[10px] md:text-xs leading-none text-center"
                 >
                   {lang === 'en' ? 'Schedule Consultation' : 'Programar Consulta'}
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OwnerBio: React.FC<OwnerBioProps> = ({ lang, theme }) => {
  const [showFullBio, setShowFullBio] = useState(false);

  return (
    <section id="owner-bio" className={`py-12 md:py-24 relative overflow-hidden transition-colors duration-500 border-t h-auto ${
      theme === 'dark' ? 'bg-ink border-white/5' : 'bg-slate-50 border-slate-200'
    }`}>
       <div className="mx-auto max-w-7xl px-4 md:px-6">
         <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
           
           <div className="lg:col-span-5 order-1 lg:order-1">
             <div className="relative group h-auto max-w-sm mx-auto lg:max-w-none">
               <div className="absolute -inset-4 md:-inset-6 bg-gold/15 rounded-3xl md:rounded-[60px] blur-3xl opacity-50"></div>
               
               <div className={`relative aspect-[3/4.2] rounded-2xl md:rounded-[56px] overflow-hidden border-2 md:border-4 shadow-2xl transition-all duration-500 group-hover:border-gold/30 ${
                 theme === 'dark' ? 'border-white/10 bg-midnight' : 'border-white bg-slate-200'
               }`}>
                 <img 
                   src="https://i.postimg.cc/tqt7FjYj/1a4a47a3-2c5c-4727-8546-7272ea1fba3f.jpg" 
                   alt="Raudel Bonne" 
                   className={`w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 ${
                      theme === 'light' ? 'grayscale-0' : ''
                    }`} 
                 />
                 <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${
                    theme === 'dark' ? 'from-midnight opacity-60' : 'from-slate-200 opacity-30'
                  }`}></div>
                 
                 <div className={`absolute bottom-3 left-3 right-3 md:bottom-10 md:left-10 md:right-10 p-4 md:p-10 rounded-xl md:rounded-[36px] backdrop-blur-xl border shadow-2xl h-auto ${
                   theme === 'dark' ? 'bg-black/70 border-white/20' : 'bg-white/80 border-slate-200'
                 }`}>
                    <div className={`font-black text-lg md:text-3xl mb-1 md:mb-3 uppercase tracking-tighter leading-[1.1] ${theme === 'dark' ? 'text-gold' : 'text-blue-900'}`}>Raudel Bonne</div>
                    <div className={`font-black text-[7px] md:text-[10px] flex flex-col gap-1 md:gap-2 uppercase tracking-widest opacity-80 ${theme === 'dark' ? 'text-white' : 'text-slate-600'}`}>
                       <div className="flex items-center gap-2 md:gap-3">
                         <span className="leading-none">{lang === 'en' ? 'Branch Manager' : 'Gerente de Sucursal'}</span>
                         <span className={`h-2 md:h-3 w-[1px] md:w-[1.5px] shrink-0 ${theme === 'dark' ? 'bg-gold/40' : 'bg-gold/60'}`}></span>
                         <span className="text-gold leading-none">2616069</span>
                       </div>
                    </div>
                 </div>
               </div>
               
               <div className={`absolute -top-3 -right-3 md:-top-6 md:-right-6 h-20 w-20 md:h-40 md:w-40 rounded-full bg-gradient-to-br from-gold to-gold2 shadow-goldglow flex flex-col items-center justify-center text-center p-2 md:p-5 transform rotate-12 md:-rotate-12 border-2 md:border-4 z-20 leading-none ${
                 theme === 'dark' ? 'border-midnight' : 'border-white'
               }`}>
                  <div className="text-ink font-black text-[7px] md:text-xs uppercase mb-1 md:mb-2">{lang === 'en' ? 'Verified' : 'Verificado'}</div>
                  <div className="text-ink font-bold text-[5px] md:text-[8px] uppercase tracking-tighter opacity-70 leading-tight hidden xs:block">
                    {lang === 'en' ? 'Florida Licensed' : 'Licenciado en FL'}
                  </div>
                  <div className="mt-1 md:mt-3 text-ink text-base md:text-3xl font-black leading-none">2024</div>
               </div>
             </div>
           </div>

           <div className="lg:col-span-7 pt-6 md:pt-12 order-2 lg:order-2 px-1 md:px-2 h-auto text-center lg:text-left">
             <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gold/10 border border-gold/30 text-gold text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] mb-6 md:mb-10 shadow-sm leading-none">
               {lang === 'en' ? 'Official Lending Credentials' : 'Credenciales Oficiales'}
             </div>
             
             <h2 className={`text-[clamp(1.5rem,6vw,4.5rem)] font-black mb-6 md:mb-10 uppercase tracking-tight leading-[1.15] md:leading-[1.1] ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
               {lang === 'en' ? 'Strategic &' : 'Financiamiento'} <br/>
               <span className="bg-gradient-to-r from-gold to-gold2 bg-clip-text text-transparent italic inline-block pr-4 pb-2">
                {lang === 'en' ? 'Regulated Capital.' : 'Estratégico y Regulado.'}
               </span>
             </h2>

             <div className={`space-y-6 md:space-y-8 text-sm md:text-xl leading-relaxed ${theme === 'dark' ? 'text-slate2' : 'text-slate-600'}`}>
               <div className={`font-black text-base md:text-2xl border-l-4 border-gold pl-4 md:pl-8 py-2 md:py-4 leading-[1.5] md:leading-[1.6] whitespace-pre-line text-left ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                 {lang === 'en' 
                   ? 'Raudel Bonne/Branch Manager\nBC Prime Lending Solutions\n(DBA of Ultimate Financing Solutions Corp)\nNMLS: 2616069\nCompany NMLS: 2805990\nLicensed Mortgage Broker in Florida' 
                   : 'Raudel Bonne/Branch Manager\nBC Prime Lending Solutions\n(DBA of Ultimate Financing Solutions Corp)\nNMLS: 2616069\nCompany NMLS: 2805990\nLicensed Mortgage Broker in Florida'}
               </div>
               
               <p className={`text-xs md:text-lg leading-relaxed text-left ${theme === 'dark' ? 'text-white/80' : 'text-slate-700'}`}>
                 {lang === 'en' 
                   ? 'As the Branch Manager of BC Prime Lending Solutions (a DBA of Ultimate Financing Solutions Corp), Raudel Bonne (NMLS 2616069) ensures institutional-grade oversight for every residential and commercial transaction. Under Company NMLS 2805990, Raudel Bonne provides transparent, regulated, and highly efficient capital solutions tailored to Florida real estate.' 
                   : 'Como Branch Manager de BC Prime Lending Solutions (un DBA de Ultimate Financing Solutions Corp), Raudel Bonne (NMLS 2616069) garantiza una supervisión de grado institucional en cada transacción residencial y comercial. Bajo el NMLS corporativo 2805990, Raudel Bonne ofrece soluciones de capital transparentes y altamente eficientes para el mercado inmobiliario de Florida.'}
               </p>

               <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-6 md:mt-10">
                  <button 
                    onClick={() => setShowFullBio(true)}
                    className="flex-1 py-4 md:py-5 rounded-xl md:rounded-2xl bg-gold text-ink font-black text-[9px] md:text-xs uppercase tracking-widest shadow-goldglow active:scale-95 transition-all leading-none text-center"
                  >
                    {lang === 'en' ? 'View Profile' : 'Ver Perfil'}
                  </button>
                  <Link 
                    to="/contact"
                    className={`flex-1 py-4 md:py-5 rounded-xl md:rounded-2xl border-2 font-black text-[9px] md:text-xs uppercase tracking-widest transition-all active:bg-gold active:text-ink leading-none flex items-center justify-center ${
                      theme === 'dark' ? 'border-white/10 text-white' : 'border-slate-200 text-slate-900'
                    }`}
                  >
                    {lang === 'en' ? 'Contact Directly' : 'Contacto Directo'}
                  </Link>
               </div>

               <div className={`grid grid-cols-1 xs:grid-cols-2 gap-6 md:gap-10 py-8 md:py-12 border-y my-8 md:my-12 h-auto text-left ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
                 <div className="space-y-2 md:space-y-4">
                    <div className="h-8 w-8 md:h-12 md:w-12 rounded-lg md:rounded-2xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h4 className={`font-black uppercase text-[8px] md:text-xs tracking-widest leading-none mt-1 md:mt-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {lang === 'en' ? 'FL Licensed Broker' : 'Broker Licenciado en FL'}
                    </h4>
                    <p className={`text-[10px] md:text-xs leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>
                      {lang === 'en' ? 'Full regulatory compliance.' : 'Cumplimiento normativo total.'}
                    </p>
                 </div>
                 <div className="space-y-2 md:space-y-4">
                    <div className="h-8 w-8 md:h-12 md:w-12 rounded-lg md:rounded-2xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h4 className={`font-black uppercase text-[8px] md:text-xs tracking-widest leading-none mt-1 md:mt-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {lang === 'en' ? 'Company NMLS' : 'NMLS de Compañía'}
                    </h4>
                    <p className={`text-[10px] md:text-xs leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>
                      <strong>2805990</strong>
                    </p>
                 </div>
               </div>

               <div className={`pt-8 md:pt-12 flex flex-col sm:flex-row flex-wrap gap-6 md:gap-12 border-t mt-8 md:mt-12 h-auto text-left ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
                  <div className="space-y-1 md:space-y-3">
                     <div className={`text-[7px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black leading-none ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>
                       {lang === 'en' ? 'Strategic Desk' : 'Atención Estratégica'}
                     </div>
                     <a href="tel:7867101976" className="text-lg md:text-2xl font-black text-gold hover:text-white transition-colors tracking-tight block leading-none">(786) 710-1976</a>
                  </div>
                  <div className="space-y-1 md:space-y-3">
                     <div className={`text-[7px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black leading-none ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>
                       {lang === 'en' ? 'Direct Inquiries' : 'Consultas Directas'}
                     </div>
                     <div className="flex flex-col gap-2">
                       <a href="mailto:ufinancings@bcprimelendingsolutions.com" className={`text-xs md:text-lg font-black hover:text-gold transition-colors underline decoration-gold/30 block leading-tight break-all ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>ufinancings@bcprimelendingsolutions.com</a>
                       <a href="mailto:raudel.bonne@bcprimelendingsolutions.com" className={`text-xs md:text-lg font-black hover:text-gold transition-colors underline decoration-gold/30 block leading-tight break-all ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>raudel.bonne@bcprimelendingsolutions.com</a>
                     </div>
                  </div>
                  <div className="space-y-1 md:space-y-3">
                     <div className={`text-[7px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black leading-none ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>
                       Instagram
                     </div>
                     <a 
                       href="https://www.instagram.com/bcprimelending?igsh=YzBwYjRjM3Nhdmph" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className={`text-xs md:text-lg font-black hover:text-gold transition-colors underline decoration-gold/30 block leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
                     >
                       @bcprimelending
                     </a>
                  </div>
               </div>
             </div>
           </div>

         </div>
       </div>

       {showFullBio && (
         <BioModal lang={lang} theme={theme} onClose={() => setShowFullBio(false)} />
       )}
    </section>
  );
};

export default OwnerBio;

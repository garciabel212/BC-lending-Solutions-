
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Language, Theme } from '../types';

interface OwnerBioProps {
  lang: Language;
  theme: Theme;
}

const BioModal = ({ lang, theme, onClose }: { lang: Language, theme: Theme, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <div 
        className="absolute inset-0 bg-ink/90 backdrop-blur-xl transition-opacity animate-in fade-in duration-500"
        onClick={onClose}
      />
      
      <div className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[48px] border-2 shadow-goldglow transition-all animate-in zoom-in duration-500 h-auto ${
        theme === 'dark' ? 'bg-midnight border-gold/20' : 'bg-white border-slate-200'
      }`}>
        <button 
          onClick={onClose}
          className={`absolute top-8 right-8 h-12 w-12 rounded-full border flex items-center justify-center transition-all hover:scale-110 active:scale-90 leading-none z-20 ${
            theme === 'dark' ? 'border-white/10 text-white hover:bg-white/5' : 'border-slate-200 text-slate-900 hover:bg-slate-50'
          }`}
        >
          ✕
        </button>

        <div className="p-8 md:p-16">
          <div className="flex flex-col md:flex-row gap-10 items-start mb-12">
            <div className={`h-24 w-24 rounded-3xl border flex items-center justify-center shrink-0 overflow-hidden ${
              theme === 'dark' ? 'bg-white/5 border-gold/30' : 'bg-slate-50 border-gold/40'
            }`}>
              <img src="https://i.postimg.cc/tqt7FjYj/1a4a47a3-2c5c-4727-8546-7272ea1fba3f.jpg" alt="Raudel Bonne" className="w-full h-full object-cover object-top" />
            </div>
            <div>
              <div className="text-gold font-black text-xs uppercase tracking-[0.4em] mb-4 leading-none">
                {lang === 'en' ? 'Professional Profile' : 'Perfil Profesional'}
              </div>
              <h2 className={`text-[clamp(1.75rem,5vw,3.5rem)] font-black uppercase tracking-tight leading-[1.15] md:leading-[1.1] ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Raudel Bonne
              </h2>
              <p className="text-gold font-bold text-sm mt-2">NMLS 2616069</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-10">
              <section>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold mb-5 leading-none">
                  {lang === 'en' ? 'Strategic Background' : 'Trayectoria Estratégica'}
                </h4>
                <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-slate2' : 'text-slate-600'}`}>
                  {lang === 'en' 
                    ? "With over a decade of navigating the intricate Miami real estate landscape, Raudel Bonne has established himself as a premier facilitator of capital. His career is built on the pillars of absolute discretion and institutional precision."
                    : "Con más de una década navegando por el intrincado panorama inmobiliario de Miami, Raudel Bonne se ha consolidado como un facilitador de capital de primer nivel. Su carrera se basa en los pilares de la discreción absoluta y la precisión institucional."}
                </p>
              </section>

              <section>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold mb-5 leading-none">
                  {lang === 'en' ? 'Market Commitment' : 'Compromiso con el Mercado'}
                </h4>
                <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-slate2' : 'text-slate-600'}`}>
                  {lang === 'en'
                    ? "Based in the heart of Brickell, Raudel's focus remains on high-leverage residential assets and strategic commercial developments that define the Florida skyline."
                    : "Con sede en el corazón de Brickell, el enfoque de Raudel se centra en activos residenciales de alto apalancamiento y desarrollos comerciales estratégicos que definen el panorama de Florida."}
                </p>
              </section>

              <section className={`p-8 rounded-[32px] border h-auto ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold mb-5 leading-none">
                  {lang === 'en' ? 'Professional Philosophy' : 'Filosofía Profesional'}
                </h4>
                <p className={`text-sm italic leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-slate-500'}`}>
                  {lang === 'en'
                    ? "\"Capital is a tool for legacy. My role is to ensure that tool is sharp, accessible, and deployed with surgical precision for every client.\""
                    : "\"El capital es una herramienta para el legado. Mi función es asegurar que esa herramienta sea precisa, accesible y se despliegue con rigor quirúrgico para cada cliente.\""}
                </p>
              </section>
            </div>

            <div className="space-y-10">
              <section>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold mb-6 leading-none">
                  {lang === 'en' ? 'Core Expertise' : 'Experiencia Principal'}
                </h4>
                <ul className="space-y-4">
                  {[
                    lang === 'en' ? "High-Net-Worth Residential Debt" : "Financiamiento Residencial para Patrimonios Elevados",
                    lang === 'en' ? "Complex Commercial Asset Acquisition" : "Adquisición de Activos Comerciales Complejos",
                    lang === 'en' ? "Bespoke Portfolio Restructuring" : "Reestructuración de Portafolios a Medida",
                    lang === 'en' ? "Institutional Lender Relations" : "Relaciones con Prestamistas Institucionales"
                  ].map((b, i) => (
                    <li key={i} className="flex items-center gap-4 group">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0"></span>
                      <span className={`text-base font-bold leading-snug ${theme === 'dark' ? 'text-white/80' : 'text-slate-700'}`}>{b}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold mb-6 leading-none">
                  {lang === 'en' ? 'Regulatory Compliance' : 'Cumplimiento Regulatorio'}
                </h4>
                <ul className="space-y-4">
                  {[
                    lang === 'en' ? "Branch Manager (BC Prime)" : "Gerente de Sucursal (BC Prime)",
                    lang === 'en' ? "Ind. NMLS 2616069" : "NMLS Ind. 2616069",
                    lang === 'en' ? "Co. NMLS 2805990" : "NMLS Co. 2805990",
                    lang === 'en' ? "Licensed in the State of Florida" : "Licenciado en el Estado de Florida"
                  ].map((r, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="mt-1 text-gold leading-none">✓</span>
                      <span className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>{r}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="pt-6">
                 <Link 
                   to="/contact" 
                   onClick={onClose}
                   className="flex items-center justify-center w-full py-6 rounded-2xl bg-gold text-ink font-black shadow-goldglow transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-[0.2em] text-xs leading-none text-center"
                 >
                   {lang === 'en' ? 'Schedule Private Consultation' : 'Programar Consulta Privada'}
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
    <section id="owner-bio" className={`py-20 lg:py-24 relative overflow-hidden transition-colors duration-500 border-t h-auto ${
      theme === 'dark' ? 'bg-ink border-white/5' : 'bg-slate-50 border-slate-200'
    }`}>
       <div className="mx-auto max-w-7xl px-6">
         <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
           
           <div className="lg:col-span-5 order-2 lg:order-1">
             <div className="relative group h-auto">
               <div className="absolute -inset-6 bg-gold/15 rounded-[60px] blur-3xl opacity-50 group-hover:opacity-80 transition duration-1000"></div>
               
               <div className={`relative aspect-[3/4.2] rounded-[48px] lg:rounded-[56px] overflow-hidden border-4 shadow-2xl transition-all duration-500 group-hover:border-gold/30 ${
                 theme === 'dark' ? 'border-white/10 bg-midnight' : 'border-white bg-slate-200'
               }`}>
                 <img 
                   src="https://i.postimg.cc/tqt7FjYj/1a4a47a3-2c5c-4727-8546-7272ea1fba3f.jpg" 
                   alt="Raudel Bonne" 
                   className="w-full h-full object-cover object-top hover:scale-105 transition-all duration-700" 
                 />
                 <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark' ? 'from-blue-900/80' : 'from-blue-900/40'} via-transparent to-transparent`}></div>
                 
                 <div className={`absolute bottom-8 left-8 right-8 lg:bottom-12 lg:left-10 lg:right-10 p-8 lg:p-10 rounded-[36px] backdrop-blur-xl border shadow-2xl h-auto ${
                   theme === 'dark' ? 'bg-black/70 border-white/20' : 'bg-white/80 border-slate-200'
                 }`}>
                    <div className={`font-black text-2xl lg:text-3xl mb-3 uppercase tracking-tighter leading-[1.1] ${theme === 'dark' ? 'text-gold' : 'text-blue-900'}`}>Raudel Bonne</div>
                    <div className={`font-black text-[10px] flex flex-col gap-2 uppercase tracking-widest opacity-80 ${theme === 'dark' ? 'text-white' : 'text-slate-600'}`}>
                       <div className="flex items-center gap-3">
                         <span className="leading-none">{lang === 'en' ? 'Branch Manager' : 'Gerente de Sucursal'}</span>
                         <span className={`h-3 w-[1.5px] shrink-0 ${theme === 'dark' ? 'bg-gold/40' : 'bg-gold/60'}`}></span>
                         <span className="text-gold leading-none">NMLS: 2616069</span>
                       </div>
                       <div className="text-[9px] opacity-60 leading-none mt-1">
                         {lang === 'en' ? 'BC Prime Lending Solutions' : 'BC Prime Lending Solutions'}
                       </div>
                    </div>
                 </div>
               </div>
               
               <div className={`absolute -top-6 -right-6 h-32 w-32 lg:h-40 lg:w-40 rounded-full bg-gradient-to-br from-gold to-gold2 shadow-goldglow flex flex-col items-center justify-center text-center p-5 transform -rotate-12 border-4 z-20 leading-none ${
                 theme === 'dark' ? 'border-midnight' : 'border-white'
               }`}>
                  <div className="text-ink font-black text-xs uppercase leading-none mb-2">{lang === 'en' ? 'Verified' : 'Verificado'}</div>
                  <div className="text-ink font-bold text-[8px] uppercase tracking-tighter opacity-70 leading-tight">
                    {lang === 'en' ? 'Licensed in Florida' : 'Licenciado en Florida'}
                  </div>
                  <div className="mt-3 text-ink text-2xl lg:text-3xl font-black leading-none">2024</div>
               </div>
             </div>
           </div>

           <div className="lg:col-span-7 pt-4 lg:pt-12 order-1 lg:order-2 px-2 h-auto">
             <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-sm leading-none">
               {lang === 'en' ? 'Official Lending Credentials' : 'Credenciales Oficiales'}
             </div>
             
             <h2 className={`text-[clamp(2.25rem,6vw,4.5rem)] font-black mb-10 uppercase tracking-tight leading-[1.15] md:leading-[1.1] ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
               {lang === 'en' ? 'Strategic &' : 'Financiamiento'} <br/>
               <span className="bg-gradient-to-r from-gold to-gold2 bg-clip-text text-transparent italic inline-block pr-6 pb-2">
                {lang === 'en' ? 'Regulated Capital.' : 'Estratégico y Regulado.'}
               </span>
             </h2>

             <div className={`space-y-8 text-lg lg:text-xl leading-relaxed ${theme === 'dark' ? 'text-slate2' : 'text-slate-600'}`}>
               <div className={`font-black text-xl lg:text-2xl border-l-4 border-gold pl-8 py-4 leading-[1.6] whitespace-pre-line ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                 {lang === 'en' 
                   ? 'Raudel Bonne/Branch Manager\nBC Prime Lending Solutions\nIndividual NMLS: 2616069\nCompany NMLS: 2805990\nLicensed Mortgage Broker in Florida' 
                   : 'Raudel Bonne/Branch Manager\nBC Prime Lending Solutions\nIndividual NMLS: 2616069\nCompany NMLS: 2805990\nLicensed Mortgage Broker in Florida'}
               </div>
               
               <p className={`text-base lg:text-lg leading-relaxed ${theme === 'dark' ? 'text-white/80' : 'text-slate-700'}`}>
                 {lang === 'en' 
                   ? 'As the Branch Manager of BC Prime Lending Solutions, Raudel Bonne (NMLS 2616069) ensures institutional-grade oversight for every residential and commercial transaction. Under Company NMLS 2805990, we provide transparent, regulated, and highly efficient capital solutions tailored to Florida real estate.' 
                   : 'Como Branch Manager de BC Prime Lending Solutions, Raudel Bonne (NMLS 2616069) garantiza una supervisión de grado institucional en cada transacción residencial y comercial. Bajo el NMLS corporativo 2805990, ofrecemos soluciones de capital transparentes y altamente eficientes para el mercado inmobiliario de Florida.'}
               </p>

               <div className="flex flex-col sm:flex-row gap-6 mt-10">
                  <button 
                    onClick={() => setShowFullBio(true)}
                    className="flex-1 py-5 rounded-2xl bg-gold text-ink font-black text-xs uppercase tracking-widest shadow-goldglow hover:scale-[1.02] active:scale-95 transition-all leading-none text-center"
                  >
                    {lang === 'en' ? 'Read Full Professional Profile' : 'Ver Perfil Profesional Completo'}
                  </button>
                  <Link 
                    to="/contact"
                    className={`flex-1 py-5 rounded-2xl border-2 font-black text-xs uppercase tracking-widest transition-all hover:bg-gold hover:text-ink hover:border-gold leading-none flex items-center justify-center ${
                      theme === 'dark' ? 'border-white/10 text-white' : 'border-slate-200 text-slate-900'
                    }`}
                  >
                    {lang === 'en' ? 'Contact Directly' : 'Contacto Directo'}
                  </Link>
               </div>

               <div className={`grid md:grid-cols-2 gap-10 py-12 border-y my-12 h-auto ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
                 <div className="space-y-4">
                    <div className="h-12 w-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h4 className={`font-black uppercase text-xs tracking-widest leading-none mt-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {lang === 'en' ? 'Florida Licensed Broker' : 'Corredor Licenciado en Florida'}
                    </h4>
                    <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>
                      {lang === 'en' 
                        ? 'Full regulatory compliance as a Licensed Mortgage Broker in the State of Florida.' 
                        : 'Cumplimiento normativo total como Corredor Hipotecario Licenciado en el Estado de Florida.'}
                    </p>
                 </div>
                 <div className="space-y-4">
                    <div className="h-12 w-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h4 className={`font-black uppercase text-xs tracking-widest leading-none mt-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {lang === 'en' ? 'Company NMLS' : 'NMLS de la Compañía'}
                    </h4>
                    <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>
                      BC Prime Lending Solutions <br/>
                      <strong>Co. NMLS: 2805990</strong>
                    </p>
                 </div>
               </div>

               <div className={`pt-12 flex flex-wrap gap-12 border-t mt-12 h-auto ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
                  <div className="space-y-3">
                     <div className={`text-[10px] uppercase tracking-[0.4em] font-black leading-none ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>
                       {lang === 'en' ? 'Strategic Desk' : 'Atención Estratégica'}
                     </div>
                     <a href="tel:7867101976" className="text-2xl font-black text-gold hover:text-white transition-colors tracking-tight block leading-none">(786) 710-1976</a>
                  </div>
                  <div className="space-y-3">
                     <div className={`text-[10px] uppercase tracking-[0.4em] font-black leading-none ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>
                       {lang === 'en' ? 'Direct Inquiries' : 'Consultas Directas'}
                     </div>
                     <a href="mailto:bonnecapitalgroup@gmail.com" className={`text-lg font-black hover:text-gold transition-colors underline decoration-gold/30 block leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>bonnecapitalgroup@gmail.com</a>
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

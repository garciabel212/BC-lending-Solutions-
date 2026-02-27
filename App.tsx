
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
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
    
    {/* Process Section */}
    <section className="py-16 md:py-32 relative overflow-hidden px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12 md:mb-20 px-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] mb-6 md:mb-8 leading-tight">
            {lang === 'en' ? 'Our Strategic Funding Journey' : 'Nuestra Trayectoria de Financiamiento Estratégico'}
          </div>
          <h2 className={`text-[clamp(1.75rem,6vw,4rem)] font-black mb-4 uppercase tracking-tighter leading-[1.1] ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {lang === 'en' ? 'The Path to Capital' : 'La Ruta hacia el Capital'}
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6 md:gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gold/10 -translate-y-1/2 z-0" />
          
          {[
            { step: '01', title: lang === 'en' ? 'Analysis' : 'Análisis', desc: lang === 'en' ? 'Comprehensive review of your financial profile.' : 'Revisión exhaustiva de su perfil financiero y objetivos.' },
            { step: '02', title: lang === 'en' ? 'Structuring' : 'Estructuración', desc: lang === 'en' ? 'Designing your custom yield and debt strategy.' : 'Diseño de su estrategia personalizada de rendimiento y deuda.' },
            { step: '03', title: lang === 'en' ? 'Validation' : 'Validación', desc: lang === 'en' ? 'Underwriting approval, subject to final review.' : 'Aprobación del comité de crédito, sujeta a revisión final.' },
            { step: '04', title: lang === 'en' ? 'Deployment' : 'Despliegue', desc: lang === 'en' ? 'Seamless capital funding for your asset.' : 'Financiamiento ágil de capital para la adquisición de su activo.' }
          ].map((item, idx) => (
            <div key={idx} className={`relative z-10 p-8 md:p-10 rounded-3xl md:rounded-[48px] border transition-all duration-500 hover:translate-y-[-5px] group h-auto ${theme === 'dark' ? 'bg-midnight/80 border-white/10 hover:border-gold/30' : 'bg-white border-slate-200 shadow-xl'}`}>
               <div className="text-gold font-black text-[clamp(2rem,5vw,3.5rem)] mb-4 md:mb-6 opacity-20 group-hover:opacity-100 transition-opacity leading-[1.1] px-1">{item.step}</div>
               <h4 className={`text-lg md:text-xl font-black mb-3 md:mb-4 uppercase tracking-tight leading-[1.2] ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
               <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate2' : 'text-slate-600'}`}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Refined CTA Section */}
    <section className="py-16 md:py-32 relative px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className={`relative group overflow-hidden rounded-3xl md:rounded-[48px] border-2 transition-all duration-700 hover:shadow-glow h-auto ${
          theme === 'dark' 
            ? 'bg-midnight/80 border-white/10' 
            : 'bg-white border-slate-200 shadow-2xl'
        }`}>
          <div className="absolute inset-0 pointer-events-none">
            <div className={`absolute top-0 right-0 w-2/3 h-full opacity-30 transition-opacity duration-1000 ${
              theme === 'dark' ? 'bg-gradient-to-l from-gold/20 to-transparent' : 'bg-gradient-to-l from-gold/10 to-transparent'
            }`} />
            <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-gold/10 blur-[120px] rounded-full group-hover:bg-gold/20 transition-all duration-1000" />
          </div>

          <div className="relative z-10 grid lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 p-8 md:p-20 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] mb-8 md:mb-10 w-fit leading-tight">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse shrink-0"></span>
                {lang === 'en' ? 'Smart Loan, Strong Future' : 'Crédito Inteligente, Futuro Sólido'}
              </div>
              
              <h2 className={`text-[clamp(2rem,7vw,4.5rem)] font-black mb-8 md:mb-10 uppercase tracking-tighter leading-[1.15] md:leading-[1.1] px-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'en' ? 'Accelerate Your' : 'Acelere sus'}<br/>
                <span className="text-gold italic drop-shadow-sm inline-block pr-6 pb-2">{lang === 'en' ? 'Ambitions' : 'Ambiciones'}</span>
              </h2>
              
              <p className={`text-base md:text-xl leading-relaxed mb-10 md:mb-12 max-w-xl px-1 ${theme === 'dark' ? 'text-slate2' : 'text-slate-600'}`}>
                {lang === 'en' 
                  ? 'Secure your financial future with our strategic approach to lending. We specialize in bespoke financing solutions for Florida’s most prestigious property assets.' 
                  : 'Asegure su futuro financiero con nuestro enfoque estratégico de financiamiento. Nos especializamos en soluciones hipotecarias a medida para los activos inmobiliarios más prestigiosos de Florida.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center px-1">
                <Link 
                  to="/contact" 
                  className="w-full sm:w-auto relative px-10 py-5 md:px-12 md:py-6 rounded-2xl bg-gradient-to-br from-gold to-gold2 text-ink font-black shadow-goldglow hover:scale-105 active:scale-95 transition-all uppercase tracking-[0.2em] text-[10px] md:text-xs overflow-hidden group/btn text-center"
                >
                  <span className="relative z-10">{lang === 'en' ? 'Secure My Future' : 'Asegurar mi Futuro'}</span>
                  <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                </Link>
                
                <div className="flex items-center gap-6">
                  <div className={`h-12 w-[1px] ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-200'}`}></div>
                  <div className="flex flex-col">
                    <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-1.5 leading-none ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>
                      {lang === 'en' ? 'Direct Advisory' : 'Asesoría Directa'}
                    </span>
                    <a href="tel:7867101976" className={`text-lg md:text-xl font-black transition-colors hover:text-gold leading-none ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      (786) 710-1976
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className={`hidden lg:block lg:col-span-5 relative overflow-hidden border-l transition-colors duration-500 h-auto ${theme === 'dark' ? 'border-white/10' : 'border-slate-100'}`}>
              <div className="absolute inset-0 bg-ink/20 group-hover:bg-transparent transition-all duration-700 z-10" />
              <img 
                src="https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80" 
                alt="Miami Wealth Management" 
                className="w-full h-full object-cover grayscale transition-all duration-[2000ms] group-hover:grayscale-0 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${theme === 'dark' ? 'from-midnight via-transparent' : 'from-white via-transparent'} to-transparent z-20`} />
              
              <div className="absolute top-12 right-12 z-30 animate-float">
                 <div className={`p-8 rounded-[32px] backdrop-blur-2xl border border-white/20 shadow-2xl ${theme === 'dark' ? 'bg-black/40' : 'bg-white/80'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-2 w-2 rounded-full bg-teal-400 animate-pulse"></div>
                      <span className="text-gold font-black text-[10px] uppercase tracking-widest leading-none">{lang === 'en' ? 'Active Status' : 'Estatus Activo'}</span>
                    </div>
                    <div className={`text-xl font-black leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{lang === 'en' ? 'Capital Available' : 'Capital Disponible'}</div>
                 </div>
              </div>

              <div className="absolute bottom-12 left-12 right-12 z-30 flex gap-6">
                 <div className={`p-8 rounded-[32px] backdrop-blur-xl border border-white/10 flex-1 transition-transform duration-500 group-hover:-translate-y-2 ${theme === 'dark' ? 'bg-black/60' : 'bg-white/90 shadow-xl'}`}>
                   <div className="text-gold font-black text-3xl mb-2 leading-none">10Y+</div>
                   <div className={`text-[10px] uppercase font-black tracking-widest leading-tight ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>
                     {lang === 'en' ? 'Asset Experience' : 'Experiencia en Activos'}
                   </div>
                 </div>
                 <div className={`p-8 rounded-[32px] backdrop-blur-xl border border-white/10 flex-1 transition-transform duration-500 group-hover:-translate-y-4 delay-75 ${theme === 'dark' ? 'bg-black/60' : 'bg-white/90 shadow-xl'}`}>
                   <div className="text-gold font-black text-3xl mb-2 leading-none">100%</div>
                   <div className={`text-[10px] uppercase font-black tracking-widest leading-tight ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>
                     {lang === 'en' ? 'Private Equity' : 'Capital Privado'}
                   </div>
                 </div>
              </div>
            </div>
          </div>
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
    
    const timer = setTimeout(() => setIsLoading(false), 2500);
    
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
        
        {/* Ambient Blobs */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div 
            className={`absolute top-0 left-1/4 w-[1000px] h-[1000px] blur-[160px] rounded-full transition-all duration-1000 ${
              theme === 'dark' ? 'bg-gold/5' : 'bg-gold/10'
            }`}
            style={{ transform: `translateY(${scrollY * -0.15}px)` }}
          />
          <div 
            className={`absolute bottom-0 right-0 w-[800px] h-[800px] blur-[140px] rounded-full transition-all duration-1000 ${
              theme === 'dark' ? 'bg-blue-900/10' : 'bg-blue-100/50'
            }`}
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          />
          <div className={`absolute inset-0 grain ${theme === 'dark' ? 'opacity-[0.04]' : 'opacity-[0.02]'}`} />
        </div>

        <Navbar 
          isScrolled={scrollY > 50} 
          lang={lang} 
          setLang={setLang} 
          theme={theme} 
          toggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} 
        />

        <main className={`relative z-10 pt-20 md:pt-24 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <Routes>
            <Route path="/" element={<HomePage lang={lang} theme={theme} />} />
            <Route path="/about" element={<div className="pb-16 md:pb-24 h-auto"><OwnerBio lang={lang} theme={theme} /></div>} />
            <Route path="/services" element={<div className="pb-16 md:pb-24 h-auto"><Services lang={lang} theme={theme} /></div>} />
            <Route path="/team" element={<div className="pb-16 md:pb-24 h-auto"><Team lang={lang} theme={theme} /></div>} />
            <Route path="/calculator" element={
              <div className="py-12 md:py-24 h-auto">
                <LoanCalculator lang={lang} theme={theme} />
                
                {/* Additional Bio Image + Timeline Section */}
                <section className="py-16 md:py-32 relative overflow-hidden px-4 md:px-6">
                  <div className="mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-12 gap-12 md:gap-20 items-center">
                      {/* Image Slot */}
                      <div className="lg:col-span-5 order-2 lg:order-1">
                        <div className={`relative group rounded-3xl md:rounded-[48px] overflow-hidden border-2 transition-all duration-700 aspect-[4/5] shadow-2xl ${theme === 'dark' ? 'border-white/10 bg-midnight/80' : 'border-slate-200 bg-white'}`}>
                          <img 
                            src="https://i.postimg.cc/XY0TfTZ0/13ae571e-7cf5-48c6-b78b-354617dd708f.jpg" 
                            alt="Raudel Bonne" 
                            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[2000ms] group-hover:scale-110 grayscale group-hover:grayscale-0"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark' ? 'from-ink via-ink/20' : 'from-white via-white/20'} to-transparent opacity-80 group-hover:opacity-60 transition-opacity`} />
                          
                          <div className="absolute inset-x-0 bottom-0 p-8 md:p-14 text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 text-gold text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-4 md:mb-6 backdrop-blur-md">
                              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse"></span>
                              {lang === 'en' ? 'Direct Access' : 'Acceso Directo'}
                            </div>
                            <h3 className={`text-2xl md:text-4xl font-black uppercase tracking-tighter mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                              {lang === 'en' ? 'Come With Me' : 'Ven Conmigo'}
                            </h3>
                            <p className={`text-xs md:text-sm font-bold uppercase tracking-widest text-gold italic`}>
                              — Raudel Bonne
                            </p>
                            
                            <div className="mt-6 md:mt-8 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                              <Link 
                                to="/contact" 
                                className="inline-flex px-8 py-4 rounded-xl bg-gold text-ink font-black text-[9px] md:text-[10px] uppercase tracking-widest shadow-goldglow hover:scale-105 transition-all"
                              >
                                {lang === 'en' ? 'Start Your Journey' : 'Inicie su Viaje'}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="lg:col-span-7 order-1 lg:order-2">
                        <div className="mb-10 md:mb-16 text-center lg:text-left">
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] mb-6 md:mb-8 leading-tight">
                            {lang === 'en' ? 'Our Strategic Funding Journey' : 'Nuestra Trayectoria de Financiamiento Estratégico'}
                          </div>
                          <h2 className={`text-[clamp(1.75rem,5vw,3.5rem)] font-black mb-4 uppercase tracking-tighter leading-[1.1] ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            {lang === 'en' ? 'The Path to Capital' : 'La Ruta hacia el Capital'}
                          </h2>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6 md:gap-8 relative">
                          {[
                            { step: '01', title: lang === 'en' ? 'Analysis' : 'Análisis', desc: lang === 'en' ? 'Comprehensive review of your financial profile.' : 'Revisión exhaustiva de su perfil financiero y objetivos.' },
                            { step: '02', title: lang === 'en' ? 'Structuring' : 'Estructuración', desc: lang === 'en' ? 'Designing your custom yield and debt strategy.' : 'Diseño de su estrategia personalizada de rendimiento y deuda.' },
                            { step: '03', title: lang === 'en' ? 'Validation' : 'Validación', desc: lang === 'en' ? 'Underwriting approval, subject to final review.' : 'Aprobación del comité de crédito, sujeta a revisión final.' },
                            { step: '04', title: lang === 'en' ? 'Deployment' : 'Despliegue', desc: lang === 'en' ? 'Seamless capital funding for your asset.' : 'Financiamiento ágil de capital para la adquisición de su activo.' }
                          ].map((item, idx) => (
                            <div key={idx} className={`relative z-10 p-8 md:p-10 rounded-2xl md:rounded-[40px] border transition-all duration-500 hover:translate-y-[-5px] group h-auto ${theme === 'dark' ? 'bg-midnight/80 border-white/10 hover:border-gold/30' : 'bg-white border-slate-200 shadow-xl'}`}>
                               <div className="text-gold font-black text-3xl md:text-4xl mb-4 md:mb-6 opacity-20 group-hover:opacity-100 transition-opacity leading-[1.1] px-1">{item.step}</div>
                               <h4 className={`text-lg md:text-xl font-black mb-2 md:mb-4 uppercase tracking-tight leading-[1.2] ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                               <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate2' : 'text-slate-600'}`}>{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            } />
            <Route path="/contact" element={<div className="pb-16 md:pb-24 h-auto"><Contact lang={lang} theme={theme} /></div>} />
          </Routes>
        </main>

        {/* Sticky Mobile CTA */}
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-3rem)] max-w-sm animate-in fade-in slide-in-from-bottom-6 duration-500">
          <Link 
            to="/contact"
            className="flex items-center justify-center w-full py-4.5 rounded-2xl bg-gold text-ink font-black shadow-goldglow uppercase tracking-[0.2em] text-[11px] leading-none active:scale-95 transition-transform"
          >
            {lang === 'en' ? 'Apply Now' : 'Solicitar Ahora'}
          </Link>
        </div>

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

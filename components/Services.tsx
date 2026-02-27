
import React, { useState } from 'react';
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
      ? 'Sophisticated financing for primary residences and seasonal estates.' 
      : 'Financiamiento sofisticado para residencias principales y propiedades estacionales.', 
    icon: '🏠', 
    tag: lang === 'en' ? 'Residential' : 'Residencial',
    details: {
      overview: lang === 'en' 
        ? "Bespoke mortgage solutions designed for the acquisition of primary residences, vacation homes, or high-end investment properties in Florida's most desirable markets."
        : "Soluciones hipotecarias a medida diseñadas para la adquisición de residencias principales, casas de vacaciones o propiedades de inversión de alto nivel.",
      whoItIsFor: lang === 'en'
        ? "Sophisticated borrowers, including first-time homeowners, move-up buyers, and high-net-worth individuals expanding their real estate portfolio."
        : "Prestatarios sofisticados, incluidos compradores por primera vez y personas de alto patrimonio que expanden su cartera inmobiliaria.",
      benefits: lang === 'en'
        ? ["Bespoke yield structures", "Absolute privacy and discretion", "Rapid pre-qualification for competitive markets", "Flexible asset-based options"]
        : ["Estructuras de rendimiento a medida", "Privacidad y discreción absolutas", "Pre-calificación rápida", "Opciones flexibles basadas en activos"],
      requirements: lang === 'en'
        ? ["Full credit profile assessment", "Income and liquidity verification", "Property appraisal subject to guidelines", "Final underwriting approval"]
        : ["Evaluación del perfil crediticio", "Verificación de ingresos y liquidez", "Tasación sujeta a pautas", "Aprobación final de crédito"],
      scenarios: lang === 'en'
        ? "Ideal for securing your dream home in the Brickell district or acquiring a coastal estate with strategic debt structuring."
        : "Ideal para asegurar la casa de sus sueños en el distrito de Brickell o adquirir una propiedad costera.",
      ctaText: lang === 'en' ? "Start Purchase Application" : "Iniciar Solicitud de Compra"
    }
  },
  { 
    id: 'refi', 
    title: lang === 'en' ? 'Refinance & Cash Out' : 'Refinanciamiento y Cash Out', 
    description: lang === 'en' 
      ? 'Optimize your debt structure or unlock capital for growth.' 
      : 'Optimice su estructura de deuda o libere capital para el crecimiento.', 
    icon: '🔄', 
    tag: lang === 'en' ? 'Refinance' : 'Refinanciamiento',
    details: {
      overview: lang === 'en'
        ? "Strategic restructuring of existing mortgage debt to secure improved rates or extract liquid equity for new investment opportunities."
        : "Reestructuración estratégica de la deuda hipotecaria existente para asegurar mejores tasas o extraer capital líquido.",
      whoItIsFor: lang === 'en'
        ? "Current property owners looking to consolidate high-interest debt, lower monthly liabilities, or fund secondary acquisitions."
        : "Propietarios actuales que buscan consolidar deudas, reducir pasivos mensuales o financiar adquisiciones secundarias.",
      benefits: lang === 'en'
        ? ["Access to dormant property equity", "Consolidation of non-mortgage debt", "Strategic rate optimization", "Enhanced monthly cash flow"]
        : ["Acceso al capital inactivo", "Consolidación de deudas", "Optimización estratégica de tasas", "Mejor flujo de caja"],
      requirements: lang === 'en'
        ? ["Minimum equity position verified", "Updated property valuation", "Credit and income verification", "Subject to program guidelines"]
        : ["Posición de capital mínima verificada", "Valoración de la propiedad actualizada", "Verificación de crédito", "Sujeto a pautas"],
      scenarios: lang === 'en'
        ? "Utilize your home's appreciation to fund a business expansion or capitalize on a temporary market dip with liquid equity."
        : "Utilice la apreciación de su hogar para financiar una expansión comercial o capitalizar oportunidades.",
      ctaText: lang === 'en' ? "Analyze Refinance Options" : "Analizar Opciones de Refi"
    }
  },
  { 
    id: 'jumbo', 
    title: lang === 'en' ? 'Jumbo & Investment' : 'Jumbo e Inversión', 
    description: lang === 'en' 
      ? 'High-limit capital for Florida’s premier luxury assets.' 
      : 'Capital de alto límite para los principales activos de lujo de Florida.', 
    icon: '🏰', 
    tag: lang === 'en' ? 'High-Limit' : 'Alto Límite',
    details: {
      overview: lang === 'en'
        ? "Exclusive financing exceeding standard conforming limits, tailored specifically for luxury residential acquisitions and multi-unit portfolios."
        : "Financiamiento exclusivo que supera los límites estándar, diseñado para adquisiciones residenciales de lujo.",
      whoItIsFor: lang === 'en'
        ? "Luxury homebuyers and institutional-grade investors looking for capital beyond $766,550 (varies by county)."
        : "Compradores de lujo e inversores institucionales que buscan capital de alto nivel.",
      benefits: lang === 'en'
        ? ["Large-scale capital deployment", "Customized interest-only options", "Flexible reserve requirements", "Competitive premium rates"]
        : ["Despliegue de capital a gran escala", "Opciones de solo interés", "Requisitos de reserva flexibles", "Tasas premium"],
      requirements: lang === 'en'
        ? ["Strong liquid asset reserves", "Consistent income documentation", "Higher credit thresholds typically apply", "Verification of sophisticated profiles"]
        : ["Fuertes reservas de activos líquidos", "Documentación de ingresos constante", "Mayores umbrales de crédito", "Verificación de perfiles"],
      scenarios: lang === 'en'
        ? "Acquiring a multi-million dollar penthouse or consolidating several rental assets into one strategic debt structure."
        : "Adquirir un penthouse de millones de dólares o consolidar varios activos de alquiler.",
      ctaText: lang === 'en' ? "Request Jumbo Quote" : "Solicitar Cotización Jumbo"
    }
  },
  { 
    id: 'fha-va', 
    title: lang === 'en' ? 'FHA | VA | Conventional' : 'FHA | VA | Convencional', 
    description: lang === 'en' 
      ? 'Core programs for diverse financial profiles and credit ranges.' 
      : 'Programas básicos para diversos perfiles financieros y rangos de crédito.', 
    icon: '📜', 
    tag: lang === 'en' ? 'Programs' : 'Programas',
    details: {
      overview: lang === 'en'
        ? "Essential lending programs provided through government-backed (FHA/VA) or private secondary market (Conventional) channels."
        : "Programas de préstamos esenciales proporcionados a través de canales respaldados por el gobierno o privados.",
      whoItIsFor: lang === 'en'
        ? "Veterans (VA), buyers needing lower down payments (FHA), and borrowers with established credit (Conventional)."
        : "Veteranos (VA), compradores con pagos iniciales bajos (FHA) y prestatarios con crédito establecido.",
      benefits: lang === 'en'
        ? ["Standardized qualification paths", "Options for low initial equity", "Government-backed security", "Flexible debt-to-income ratios"]
        : ["Caminos de calificación estándar", "Opciones de capital inicial bajo", "Seguridad del gobierno", "Ratios DTI flexibles"],
      requirements: lang === 'en'
        ? ["Credit verification (FICO 580+ for FHA)", "Employment history review", "Property safety inspection", "Subject to specific program limits"]
        : ["Verificación de crédito", "Revisión de historial laboral", "Inspección de propiedad", "Sujeto a límites del programa"],
      scenarios: lang === 'en'
        ? "Ideal for families entering the market or veterans utilizing their hard-earned benefits for zero-down financing."
        : "Ideal para familias que ingresan al mercado o veteranos que utilizan sus beneficios.",
      ctaText: lang === 'en' ? "Check Program Eligibility" : "Verificar Elegibilidad"
    }
  },
  { 
    id: 'nationwide', 
    title: lang === 'en' ? 'Nationwide Lending' : 'Préstamos Nacionales', 
    description: lang === 'en' 
      ? 'Capital deployment across all 50 states for strategic growth.' 
      : 'Despliegue de capital en los 50 estados para crecimiento estratégico.', 
    icon: '🗺️', 
    tag: lang === 'en' ? 'Flexible' : 'Flexible',
    details: {
      overview: lang === 'en'
        ? "Broad-spectrum financing availability for property assets located anywhere within the United States, managed from our Miami hub."
        : "Disponibilidad de financiamiento de amplio espectro para activos ubicados en cualquier lugar de los EE. UU.",
      whoItIsFor: lang === 'en'
        ? "Multi-state investors and relocating professionals who value a single point of contact for their nationwide needs."
        : "Inversores multi-estado y profesionales que valoran un único punto de contacto.",
      benefits: lang === 'en'
        ? ["Centralized management of multi-state deals", "Consistent closing process", "Access to various state markets", "Strategic expansion support"]
        : ["Gestión centralizada", "Proceso de cierre constante", "Acceso a varios mercados", "Apoyo a la expansión"],
      requirements: lang === 'en'
        ? ["Location-specific guidelines apply", "Financial profile verification", "Subject to state-level regulations", "Standard underwriting approval"]
        : ["Se aplican pautas específicas de ubicación", "Verificación financiera", "Sujeto a regulaciones estatales", "Aprobación estándar"],
      scenarios: lang === 'en'
        ? "A Miami-based investor acquiring an industrial facility in Texas or a retail center in the Northeast."
        : "Un inversor con sede en Miami que adquiere una instalación industrial en Texas o un centro comercial.",
      ctaText: lang === 'en' ? "Explore National Options" : "Explorar Opciones Nacionales"
    }
  },
  { 
    id: 'dscr', 
    title: lang === 'en' ? 'DSCR Loans' : 'Préstamos DSCR', 
    description: lang === 'en' 
      ? 'Investor financing based on asset cash flow vs. personal income.' 
      : 'Financiamiento basado en el flujo de caja del activo vs ingresos personales.', 
    icon: '📊', 
    tag: lang === 'en' ? 'Investor' : 'Inversionista',
    details: {
      overview: lang === 'en'
        ? "Debt Service Coverage Ratio (DSCR) loans prioritize the property's rental income over the borrower's personal tax returns."
        : "Los préstamos DSCR priorizan los ingresos por alquiler de la propiedad sobre las declaraciones de impuestos personales.",
      whoItIsFor: lang === 'en'
        ? "Real estate investors looking to scale their portfolio without the constraints of traditional DTI calculations."
        : "Inversores que buscan escalar su cartera sin las restricciones de los cálculos de DTI tradicionales.",
      benefits: lang === 'en'
        ? ["No personal income verification", "Close in an LLC or Corporate name", "Unlimited number of properties possible", "Simplified closing process"]
        : ["Sin verificación de ingresos personales", "Cierre en nombre de LLC", "Propiedades ilimitadas posibles", "Proceso de cierre simple"],
      requirements: lang === 'en'
        ? ["Rent must cover mortgage liabilities (1.0x+ ratio)", "Minimum credit score typically 620-680", "Liquid reserves for 3-6 months", "Subject to asset valuation"]
        : ["El alquiler debe cubrir la hipoteca", "Puntaje de crédito mínimo 620-680", "Reservas líquidas de 3-6 meses", "Sujeto a tasación"],
      scenarios: lang === 'en'
        ? "Perfect for a serial investor acquiring a turnkey rental property where the cash flow justifies the debt autonomously."
        : "Perfecto para un inversor que adquiere una propiedad de alquiler llave en mano.",
      ctaText: lang === 'en' ? "Run My DSCR Ratio" : "Calcular mi Ratio DSCR"
    }
  },
  { 
    id: 'self-employed', 
    title: lang === 'en' ? 'Bank Statement Loans' : 'Préstamos de Extractos', 
    description: lang === 'en' 
      ? 'Alternative qualification for Florida’s entrepreneurs.' 
      : 'Calificación alternativa para los emprendedores de Florida.', 
    icon: '📁', 
    tag: lang === 'en' ? 'Specialized' : 'Especializado',
    details: {
      overview: lang === 'en'
        ? "Qualification based on 12 to 24 months of business or personal bank statements, designed for those with significant tax deductions."
        : "Calificación basada en 12 a 24 meses de extractos bancarios, diseñada para aquellos con deducciones fiscales significativas.",
      whoItIsFor: lang === 'en'
        ? "Self-employed professionals, business owners, and gig-economy entrepreneurs who show high cash flow but low taxable income."
        : "Profesionales independientes, dueños de negocios y emprendedores con alto flujo de caja.",
      benefits: lang === 'en'
        ? ["Tax returns not required for income", "Recognition of real business revenue", "Loan amounts up to multi-millions", "Flexible expense ratios"]
        : ["No se requieren declaraciones de impuestos", "Reconocimiento de ingresos reales", "Montos de hasta millones", "Ratios flexibles"],
      requirements: lang === 'en'
        ? ["Verified 2-year business tenure", "Clean bank statement history", "Sufficient liquidity for down payment", "Subject to underwriting audit"]
        : ["Tenencia comercial de 2 años verificada", "Historial de extractos bancarios limpio", "Liquidez suficiente", "Sujeto a auditoría"],
      scenarios: lang === 'en'
        ? "An entrepreneur who reinvests heavily into their business and wants to purchase a home based on their actual revenue intake."
        : "Un emprendedor que reinvierte mucho en su negocio y quiere comprar una casa basada en sus ingresos reales.",
      ctaText: lang === 'en' ? "Verify My Statements" : "Verificar mis Extractos"
    }
  },
  { 
    id: 'commercial', 
    title: lang === 'en' ? 'Commercial Loans' : 'Préstamos Comerciales', 
    description: lang === 'en' 
      ? 'Institutional capital for office, retail, and industrial.' 
      : 'Capital institucional para oficinas, locales e industriales.', 
    icon: '🏢', 
    tag: lang === 'en' ? 'Business' : 'Negocios',
    details: {
      overview: lang === 'en'
        ? "Structured debt solutions for non-residential assets, focusing on property performance and commercial viability."
        : "Soluciones de deuda estructuradas para activos no residenciales, enfocándose en el rendimiento de la propiedad.",
      whoItIsFor: lang === 'en'
        ? "Business owners, commercial developers, and investment firms acquiring income-producing non-residential property."
        : "Dueños de negocios, desarrolladores comerciales y firmas de inversión.",
      benefits: lang === 'en'
        ? ["High-leverage acquisition options", "Bridge to permanent financing", "Bespoke commercial terms", "SBA and Conventional pathways"]
        : ["Opciones de adquisición de alto apalancamiento", "Financiamiento puente", "Términos comerciales a medida", "Vías SBA y Convencionales"],
      requirements: lang === 'en'
        ? ["Rent roll and P&L verification", "Asset type must meet guidelines", "Environmental and structural reports", "Strategic business plan review"]
        : ["Verificación de rentas y P&L", "El tipo de activo debe cumplir pautas", "Informes estructurales", "Revisión del plan de negocios"],
      scenarios: lang === 'en'
        ? "Expanding your retail footprint with a new storefront or acquiring a multi-tenant office building for your headquarters."
        : "Expandir su presencia minorista con una nueva tienda o adquirir un edificio de oficinas.",
      ctaText: lang === 'en' ? "Submit Commercial Inquiry" : "Consulta Comercial"
    }
  },
  { 
    id: 'hard-money', 
    title: lang === 'en' ? 'Hard Money Loans' : 'Préstamos Hard Money', 
    description: lang === 'en' 
      ? 'Ultra-fast bridge financing for urgent opportunities.' 
      : 'Financiamiento puente ultra rápido para oportunidades urgentes.', 
    icon: '⚡', 
    tag: lang === 'en' ? 'Speed' : 'Rapidez',
    details: {
      overview: lang === 'en'
        ? "Short-term, asset-based financing used to secure property quickly when speed is more critical than low rates."
        : "Financiamiento a corto plazo basado en activos, utilizado para asegurar propiedades rápidamente.",
      whoItIsFor: lang === 'en'
        ? "Fix-and-flip investors, developers, and buyers needing to close in days rather than weeks."
        : "Inversores de compra-venta, desarrolladores y compradores que necesitan cerrar en días.",
      benefits: lang === 'en'
        ? ["Closing in as little as 5-10 days", "Focus on asset equity over credit", "Funding for distressed properties", "No prepayment penalties often available"]
        : ["Cierre en tan solo 5-10 días", "Enfoque en el capital del activo", "Financiamiento para propiedades deterioradas", "Sin penalizaciones"],
      requirements: lang === 'en'
        ? ["Significant equity or down payment (20-30%)", "Clear exit strategy required", "Property valuation assessment", "Subject to private lender review"]
        : ["Capital o pago inicial significativo", "Estrategia de salida clara", "Evaluación de valoración", "Sujeto a revisión privada"],
      scenarios: lang === 'en'
        ? "Winning a bidding war at a foreclosure auction or securing a property that needs immediate renovation before traditional refi."
        : "Ganar una subasta de ejecución hipotecaria o asegurar una propiedad que necesita renovación inmediata.",
      ctaText: lang === 'en' ? "Get Fast Funding" : "Obtener Fondos Rápidos"
    }
  }
];

const ServiceModal = ({ service, lang, theme, onClose }: { service: ServiceItem, lang: Language, theme: Theme, onClose: () => void }) => {
  if (!service) return null;
  const d = service.details;

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
            <div className={`h-24 w-24 rounded-3xl border flex items-center justify-center text-5xl shrink-0 ${
              theme === 'dark' ? 'bg-white/5 border-gold/30' : 'bg-slate-50 border-gold/40'
            }`}>
              {service.icon}
            </div>
            <div>
              <div className="text-gold font-black text-xs uppercase tracking-[0.4em] mb-4 leading-none">{service.tag}</div>
              <h2 className={`text-[clamp(1.75rem,5vw,3.5rem)] font-black uppercase tracking-tight leading-[1.15] md:leading-[1.1] ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {service.title}
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-10">
              <section>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold mb-5 leading-none">{lang === 'en' ? 'Asset Overview' : 'Descripción del Activo'}</h4>
                <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-slate2' : 'text-slate-600'}`}>{d.overview}</p>
              </section>

              <section>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold mb-5 leading-none">{lang === 'en' ? 'Target Audience' : 'Público Objetivo'}</h4>
                <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-slate2' : 'text-slate-600'}`}>{d.whoItIsFor}</p>
              </section>

              <section className={`p-8 rounded-[32px] border h-auto ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold mb-5 leading-none">{lang === 'en' ? 'Strategic Scenario' : 'Escenario Estratégico'}</h4>
                <p className={`text-sm italic leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-slate-500'}`}>"{d.scenarios}"</p>
              </section>
            </div>

            <div className="space-y-10">
              <section>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold mb-6 leading-none">{lang === 'en' ? 'Strategic Benefits' : 'Beneficios Estratégicos'}</h4>
                <ul className="space-y-4">
                  {d.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-4 group">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0 group-hover:scale-150 transition-transform"></span>
                      <span className={`text-base font-bold leading-snug ${theme === 'dark' ? 'text-white/80' : 'text-slate-700'}`}>{b}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold mb-6 leading-none">{lang === 'en' ? 'General Guidelines' : 'Pautas Generales'}</h4>
                <ul className="space-y-4">
                  {d.requirements.map((r, i) => (
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
                   {d.ctaText}
                 </Link>
                 <p className="mt-5 text-[9px] text-center uppercase tracking-widest text-slate-500 italic leading-relaxed px-4">
                   {lang === 'en' ? 'All programs subject to underwriting approval.' : 'Programas sujetos a aprobación de crédito.'}
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Services: React.FC<ServicesProps> = ({ lang, theme }) => {
  const services = getServices(lang);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className={`py-24 transition-colors duration-500 h-auto ${theme === 'dark' ? 'bg-ink' : 'bg-white'}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div className="max-w-2xl">
            <h2 className={`text-[clamp(2.25rem,6vw,3.5rem)] font-black mb-6 uppercase tracking-tight leading-[1.1] ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'en' ? 'Our Solutions' : 'Nuestras Soluciones'}
            </h2>
            <p className={`text-lg md:text-xl font-medium leading-relaxed ${theme === 'dark' ? 'text-slate2' : 'text-slate-600'}`}>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item) => (
            <div key={item.id} className={`group relative border rounded-[48px] p-10 overflow-hidden transition-all duration-500 hover:translate-y-[-10px] h-auto ${
              theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/[0.08]' : 'bg-slate-50 border-slate-200 hover:bg-white hover:shadow-2xl'
            }`}>
              <div className={`absolute top-0 right-0 p-8 text-9xl transition-all duration-700 pointer-events-none leading-none ${
                theme === 'dark' ? 'opacity-[0.03] group-hover:opacity-[0.08]' : 'opacity-[0.05] group-hover:opacity-[0.1]'
              }`}>
                {item.icon}
              </div>
              
              <div className="flex items-start justify-between mb-12 relative z-10">
                <div className={`h-16 w-16 rounded-2xl border flex items-center justify-center text-4xl shadow-sm ${
                  theme === 'dark' ? 'bg-black/40 border-gold/30' : 'bg-white border-gold/50'
                }`}>
                  {item.icon}
                </div>
                <span className="px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-[9px] font-black text-gold uppercase tracking-[0.2em] leading-none">
                  {item.tag}
                </span>
              </div>

              <h3 className={`text-2xl font-black mb-5 group-hover:text-gold transition-colors tracking-tight uppercase leading-[1.15] ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
              <p className={`leading-relaxed mb-12 text-base ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>{item.description}</p>
              
              <div className="flex flex-col gap-4 relative z-10">
                <button 
                  onClick={() => setSelectedService(item)}
                  className={`w-full py-5 rounded-2xl border font-black text-[10px] uppercase tracking-widest transition-all leading-none ${
                    theme === 'dark' 
                      ? 'border-white/10 text-white hover:bg-white/10 hover:border-gold/30' 
                      : 'border-slate-200 text-slate-900 hover:bg-slate-50 hover:border-gold/40'
                  }`}
                >
                  {lang === 'en' ? 'Learn More' : 'Más Información'}
                </button>
                <Link 
                  to="/contact" 
                  className={`flex items-center justify-center gap-3 py-5 rounded-2xl bg-gold text-ink font-black text-[10px] uppercase tracking-widest shadow-lg transition-all hover:scale-[1.02] active:scale-95 leading-none`}
                >
                  {lang === 'en' ? 'Inquire Now' : 'Consultar Ahora'} <span className="text-sm">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {selectedService && (
          <ServiceModal 
            service={selectedService} 
            lang={lang} 
            theme={theme} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </div>
    </section>
  );
};

export default Services;

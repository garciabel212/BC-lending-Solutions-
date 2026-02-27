
import React, { useState } from 'react';
import { Language, Theme } from '../types';

interface ContactProps {
  lang: Language;
  theme: Theme;
}

interface FormErrors {
  [key: string]: string;
}

const Contact: React.FC<ContactProps> = ({ lang, theme }) => {
  const [step, setStep] = useState(1);
  const [formState, setFormState] = useState({ 
    fullName: '', email: '', phone: '', zip: '',
    loanType: 'purchase', loanAmount: '', downPayment: '',
    creditScore: 'good', message: '',
    consent: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\+?(\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(phone);
  };

  const validateZip = (zip: string) => {
    return /^\d{5}(-\d{4})?$/.test(zip);
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: FormErrors = {};

    if (currentStep === 1) {
      if (formState.fullName.trim().length < 3) {
        newErrors.fullName = lang === 'en' ? 'Full name is required (min 3 chars).' : 'Se requiere el nombre completo (mín. 3 caracteres).';
      }
      if (!validateEmail(formState.email)) {
        newErrors.email = lang === 'en' ? 'A valid email is required.' : 'Se requiere un correo electrónico válido.';
      }
      if (!validatePhone(formState.phone)) {
        newErrors.phone = lang === 'en' ? 'A valid phone number is required.' : 'Se requiere un número de teléfono válido.';
      }
      if (!validateZip(formState.zip)) {
        newErrors.zip = lang === 'en' ? 'Valid 5-digit zip code required.' : 'Se requiere un código postal de 5 dígitos.';
      }
    }

    if (currentStep === 2) {
      if (!formState.loanAmount || Number(formState.loanAmount) <= 0) {
        newErrors.loanAmount = lang === 'en' ? 'Valid loan amount required.' : 'Se requiere un monto de crédito válido.';
      }
      if (!formState.downPayment || Number(formState.downPayment) < 0) {
        newErrors.downPayment = lang === 'en' ? 'Target amount required.' : 'Se requiere el monto objetivo.';
      }
    }

    if (currentStep === 3) {
      if (formState.message.trim().length < 10) {
        newErrors.message = lang === 'en' ? 'Please provide more details (min 10 chars).' : 'Proporcione más detalles (mín. 10 caracteres).';
      }
      if (!formState.consent) {
        newErrors.consent = lang === 'en' ? 'You must consent to proceed.' : 'Debe otorgar su consentimiento para proceder.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error('Failed to send application');
      }

      setToast({
        message: lang === 'en' 
          ? 'Inquiry received. Raudel Bonne will review your asset profile and contact you shortly.' 
          : 'Solicitud recibida. Raudel Bonne revisará el perfil de su activo y se pondrá en contacto con usted a la brevedad.',
        type: 'success'
      });

      setFormState({ 
        fullName: '', email: '', phone: '', zip: '',
        loanType: 'purchase', loanAmount: '', downPayment: '',
        creditScore: 'good', message: '',
        consent: false
      });
      setStep(1);

      setTimeout(() => {
        setToast(null);
      }, 5000);
    } catch (error) {
      console.error('Submission error:', error);
      setToast({
        message: lang === 'en' ? 'Failed to send application. Please try again or call us directly.' : 'Error al enviar la solicitud. Inténtelo de nuevo o llámenos directamente.',
        type: 'error'
      });
      setTimeout(() => {
        setToast(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    setErrors({});
  };

  const inputClass = (fieldName: string) => `w-full border rounded-2xl px-6 py-5 focus:outline-none focus:border-gold/50 transition-colors h-auto ${
    errors[fieldName] ? 'border-red-500 bg-red-500/5' : theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
  }`;

  const labelClass = `text-[10px] uppercase font-black tracking-widest mb-3 leading-none px-1 ${
    theme === 'dark' ? 'text-white/40' : 'text-slate-500'
  }`;

  const ErrorMsg = ({ name }: { name: string }) => errors[name] ? (
    <span className="text-[10px] text-red-500 mt-2 font-bold animate-in fade-in slide-in-from-top-1 px-1">
      {errors[name]}
    </span>
  ) : null;

  const Toast = () => toast ? (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[300] animate-in fade-in slide-in-from-bottom-10 duration-500">
      <div className={`px-8 py-4 rounded-2xl shadow-2xl border flex items-center gap-4 backdrop-blur-xl ${
        toast.type === 'success' 
          ? (theme === 'dark' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-green-50 border-green-200 text-green-700')
          : (theme === 'dark' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-red-50 border-red-200 text-red-700')
      }`}>
        <span className="text-xl">{toast.type === 'success' ? '✓' : '✕'}</span>
        <span className="text-sm font-bold tracking-tight">{toast.message}</span>
      </div>
    </div>
  ) : null;

  return (
    <section id="apply" className="py-24 h-auto">
      <Toast />
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-16 px-2">
           <h2 className={`text-[clamp(2rem,6vw,3.5rem)] font-black mb-6 uppercase tracking-tight leading-[1.1] ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
             {lang === 'en' ? 'Asset Financing Intake' : 'Solicitud de Financiamiento'}
           </h2>
           <p className={`text-lg ${theme === 'dark' ? 'text-slate2' : 'text-slate-600'}`}>
             {lang === 'en' 
               ? 'Confidential review for residential or commercial property financing.' 
               : 'Revisión confidencial para el financiamiento de activos residenciales o comerciales.'}
           </p>
        </div>

        <div className={`border rounded-[48px] p-10 md:p-14 shadow-2xl relative overflow-visible transition-colors duration-500 h-auto ${
          theme === 'dark' ? 'bg-midnight border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div className="absolute top-0 left-0 right-0 h-2 overflow-hidden rounded-t-[48px]">
            <div className="h-full bg-gold transition-all duration-500" style={{ width: `${(step/3)*100}%` }} />
          </div>
          
          <form onSubmit={handleSubmit} noValidate className="h-auto">
            {step === 1 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-500">
                <h3 className="text-2xl font-black text-gold flex items-center gap-4 leading-none">
                   <span className="h-10 w-10 rounded-full border border-gold flex items-center justify-center text-sm shrink-0">1</span>
                   {lang === 'en' ? 'Entity / Identity' : 'Identificación / Entidad'}
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3 flex flex-col">
                    <label className={labelClass}>
                      {lang === 'en' ? 'Full Legal Name' : 'Nombre Legal Completo'}
                    </label>
                    <input 
                      placeholder={lang === 'en' ? "Full name or LLC name" : "Nombre completo o de su LLC"}
                      value={formState.fullName}
                      onChange={e => setFormState(prev => ({...prev, fullName: e.target.value}))}
                      className={inputClass('fullName')} 
                    />
                    <ErrorMsg name="fullName" />
                  </div>
                  <div className="space-y-3 flex flex-col">
                    <label className={labelClass}>
                      {lang === 'en' ? 'Email Address' : 'Correo Electrónico'}
                    </label>
                    <input 
                      type="email"
                      placeholder="principal@correo.com"
                      value={formState.email}
                      onChange={e => setFormState(prev => ({...prev, email: e.target.value}))}
                      className={inputClass('email')} 
                    />
                    <ErrorMsg name="email" />
                  </div>
                  <div className="space-y-3 flex flex-col">
                    <label className={labelClass}>
                      {lang === 'en' ? 'Contact Phone' : 'Teléfono de Contacto'}
                    </label>
                    <input 
                      type="tel"
                      placeholder="(786) 000-0000"
                      value={formState.phone}
                      onChange={e => setFormState(prev => ({...prev, phone: e.target.value}))}
                      className={inputClass('phone')} 
                    />
                    <ErrorMsg name="phone" />
                  </div>
                  <div className="space-y-3 flex flex-col">
                    <label className={labelClass}>
                      {lang === 'en' ? 'Zip Code' : 'Código Postal'}
                    </label>
                    <input 
                      placeholder="33131"
                      value={formState.zip}
                      onChange={e => setFormState(prev => ({...prev, zip: e.target.value}))}
                      className={inputClass('zip')} 
                    />
                    <ErrorMsg name="zip" />
                  </div>
                </div>
                <button type="button" onClick={nextStep} className="w-full py-6 rounded-2xl bg-gold text-ink font-black shadow-xl hover:scale-[1.01] transition-all uppercase tracking-widest text-xs leading-none">
                  {lang === 'en' ? 'CONTINUE TO ASSET DETAILS' : 'CONTINUAR A DETALLES DEL ACTIVO'}
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-500">
                <h3 className="text-2xl font-black text-gold flex items-center gap-4 leading-none">
                   <span className="h-10 w-10 rounded-full border border-gold flex items-center justify-center text-sm shrink-0">2</span>
                   {lang === 'en' ? 'Asset Requirements' : 'Requerimientos de Financiamiento'}
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3 flex flex-col">
                    <label className={labelClass}>
                      {lang === 'en' ? 'Asset Category' : 'Categoría del Activo'}
                    </label>
                    <select 
                      value={formState.loanType}
                      onChange={e => setFormState(prev => ({...prev, loanType: e.target.value}))}
                      className={inputClass('loanType')}
                    >
                      <option className={theme === 'dark' ? "bg-midnight" : "bg-white"} value="commercial_acquisition">{lang === 'en' ? 'Commercial Acquisition' : 'Adquisición Comercial'}</option>
                      <option className={theme === 'dark' ? "bg-midnight" : "bg-white"} value="commercial_refi">{lang === 'en' ? 'Commercial Refinance' : 'Refinanciamiento Comercial'}</option>
                      <option className={theme === 'dark' ? "bg-midnight" : "bg-white"} value="purchase">{lang === 'en' ? 'Residential Purchase' : 'Compra Residencial'}</option>
                      <option className={theme === 'dark' ? "bg-midnight" : "bg-white"} value="fha">{lang === 'en' ? 'Residential FHA' : 'FHA Residencial'}</option>
                    </select>
                  </div>
                  <div className="space-y-3 flex flex-col">
                    <label className={labelClass}>
                      {lang === 'en' ? 'Estimated Asset Value' : 'Valor Estimado de la Propiedad'}
                    </label>
                    <input 
                      type="number"
                      placeholder="$1,000,000"
                      value={formState.loanAmount}
                      onChange={e => setFormState(prev => ({...prev, loanAmount: e.target.value}))}
                      className={inputClass('loanAmount')} 
                    />
                    <ErrorMsg name="loanAmount" />
                  </div>
                  <div className="space-y-3 flex flex-col">
                    <label className={labelClass}>
                      {lang === 'en' ? 'Target Loan Amount' : 'Monto de Crédito Objetivo'}
                    </label>
                    <input 
                      type="number"
                      placeholder="$750,000"
                      value={formState.downPayment}
                      onChange={e => setFormState(prev => ({...prev, downPayment: e.target.value}))}
                      className={inputClass('downPayment')} 
                    />
                    <ErrorMsg name="downPayment" />
                  </div>
                  <div className="space-y-3 flex flex-col">
                    <div className="flex items-center gap-2">
                      <label className={labelClass}>
                        {lang === 'en' ? 'Credit / Liquid Assets' : 'Perfil de Crédito / Liquidez'}
                      </label>
                      <div className="group relative">
                        <div className="cursor-help h-4 w-4 rounded-full border border-gold/40 flex items-center justify-center text-[10px] text-gold/60 hover:text-gold hover:border-gold transition-all">
                          i
                        </div>
                        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-5 rounded-[32px] border shadow-2xl backdrop-blur-xl z-[100] opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-y-2 group-hover:translate-y-0 ${
                          theme === 'dark' ? 'bg-midnight/95 border-white/10 text-white/80' : 'bg-white/95 border-slate-200 text-slate-600'
                        }`}>
                          <div className="text-[10px] space-y-3 leading-relaxed">
                            <p><strong className="text-gold">{lang === 'en' ? 'High Liquid / 740+' : 'Alta Liquidez / 740+'}</strong>: {lang === 'en' ? 'Significant cash reserves and excellent credit scores.' : 'Reservas significativas y excelentes puntajes de crédito.'}</p>
                            <p><strong className="text-gold">{lang === 'en' ? 'Stable / 670+' : 'Estable / 670+'}</strong>: {lang === 'en' ? 'Consistent income and good credit history.' : 'Ingresos constantes y buen historial crediticio.'}</p>
                            <p><strong className="text-gold">{lang === 'en' ? 'Standard' : 'Estándar'}</strong>: {lang === 'en' ? 'Standard financial profiles or specialized asset-based needs.' : 'Perfiles estándar o necesidades especializadas basadas en activos.'}</p>
                          </div>
                          <div className={`absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent ${
                            theme === 'dark' ? 'border-t-white/10' : 'border-t-slate-200'
                          }`} />
                        </div>
                      </div>
                    </div>
                    <select 
                      value={formState.creditScore}
                      onChange={e => setFormState(prev => ({...prev, creditScore: e.target.value}))}
                      className={inputClass('creditScore')}
                    >
                      <option className={theme === 'dark' ? "bg-midnight" : "bg-white"} value="excellent">{lang === 'en' ? 'High Liquid / 740+' : 'Alta Liquidez / 740+'}</option>
                      <option className={theme === 'dark' ? "bg-midnight" : "bg-white"} value="good">{lang === 'en' ? 'Stable / 670+' : 'Estable / 670+'}</option>
                      <option className={theme === 'dark' ? "bg-midnight" : "bg-white"} value="fair">{lang === 'en' ? 'Standard' : 'Estándar'}</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-6">
                  <button type="button" onClick={prevStep} className={`flex-1 py-6 rounded-2xl border font-black transition-all leading-none uppercase tracking-widest text-[10px] ${
                    theme === 'dark' ? 'border-white/10 text-white hover:bg-white/5' : 'border-slate-200 text-slate-900 hover:bg-slate-50'
                  }`}>
                    {lang === 'en' ? 'BACK' : 'ATRÁS'}
                  </button>
                  <button type="button" onClick={nextStep} className="flex-[2] py-6 rounded-2xl bg-gold text-ink font-black shadow-xl hover:scale-[1.01] transition-all uppercase tracking-widest text-[10px] leading-none">
                    {lang === 'en' ? 'FINAL STEP' : 'PASO FINAL'}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-500">
                <h3 className="text-2xl font-black text-gold flex items-center gap-4 leading-none">
                   <span className="h-10 w-10 rounded-full border border-gold flex items-center justify-center text-sm shrink-0">3</span>
                   {lang === 'en' ? 'Project Overview' : 'Descripción del Proyecto'}
                </h3>
                <div className="space-y-8">
                  <div className="space-y-3 flex flex-col">
                    <label className={labelClass}>
                      {lang === 'en' ? 'Additional Details' : 'Detalles Adicionales'}
                    </label>
                    <textarea 
                      rows={5}
                      placeholder={lang === 'en' ? "Property address, commercial use case, etc." : "Dirección de la propiedad, caso de uso comercial, etc."}
                      value={formState.message}
                      onChange={e => setFormState(prev => ({...prev, message: e.target.value}))}
                      className={inputClass('message') + " resize-none min-h-[120px]"} 
                    />
                    <ErrorMsg name="message" />
                  </div>
                  <div className={`p-6 rounded-3xl border flex items-start gap-5 ${
                    errors.consent ? 'border-red-500 bg-red-500/5' : theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                  }`}>
                     <input 
                      type="checkbox" 
                      className="mt-1 h-6 w-6 accent-gold cursor-pointer shrink-0" 
                      checked={formState.consent}
                      onChange={e => setFormState(prev => ({...prev, consent: e.target.checked}))}
                    />
                     <div className="flex flex-col">
                        <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate2/60' : 'text-slate-500'}`}>
                          {lang === 'en' 
                            ? 'I consent to BC Prime contacting me regarding this financing inquiry. Discretion is guaranteed.' 
                            : 'Doy mi consentimiento para que BC Prime se comunique conmigo respecto a esta solicitud de financiamiento. Se garantiza absoluta discreción.'}
                        </p>
                        <ErrorMsg name="consent" />
                     </div>
                  </div>
                </div>
                <div className="flex gap-6">
                  <button type="button" onClick={prevStep} className={`flex-1 py-6 rounded-2xl border font-black transition-all leading-none uppercase tracking-widest text-[10px] ${
                    theme === 'dark' ? 'border-white/10 text-white hover:bg-white/5' : 'border-slate-200 text-slate-900 hover:bg-slate-50'
                  }`}>
                    {lang === 'en' ? 'BACK' : 'ATRÁS'}
                  </button>
                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="flex-[2] py-6 rounded-2xl bg-gold text-ink font-black shadow-xl hover:scale-[1.01] transition-all disabled:opacity-50 uppercase tracking-widest text-[10px] leading-none"
                  >
                    {isSubmitting 
                      ? (lang === 'en' ? 'SENDING INQUIRY...' : 'ENVIANDO SOLICITUD...') 
                      : (lang === 'en' ? 'SUBMIT FINANCING REQUEST' : 'ENVIAR SOLICITUD DE FINANCIAMIENTO')}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;


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
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setStep(1);
        setFormState({ 
          fullName: '', email: '', phone: '', zip: '',
          loanType: 'purchase', loanAmount: '', downPayment: '',
          creditScore: 'good', message: '',
          consent: false
        });
      }, 5000);
    }, 2000);
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

  return (
    <section id="apply" className="py-24 h-auto">
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

        <div className={`border rounded-[48px] p-10 md:p-14 shadow-2xl relative overflow-hidden transition-colors duration-500 h-auto ${
          theme === 'dark' ? 'bg-midnight border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div className="absolute top-0 left-0 h-2 bg-gold transition-all duration-500" style={{ width: `${(step/3)*100}%` }} />
          
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
                    <label className={labelClass}>
                      {lang === 'en' ? 'Credit / Liquid Assets' : 'Perfil de Crédito / Liquidez'}
                    </label>
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

                {isSuccess && (
                  <div className="p-8 rounded-[32px] bg-green-500/20 border border-green-500/40 text-green-400 text-center font-bold animate-in zoom-in duration-300 leading-relaxed text-sm">
                    {lang === 'en' 
                      ? 'Inquiry received. Raudel Bonne will review your asset profile and contact you shortly.' 
                      : 'Solicitud recibida. Raudel Bonne revisará el perfil de su activo y se pondrá en contacto con usted a la brevedad.'}
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

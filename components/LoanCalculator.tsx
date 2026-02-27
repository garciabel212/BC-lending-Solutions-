
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  LoanParameters, AmortizationData, Language, Theme, 
  ExtraPaymentParams, RefinanceParams, AffordabilityParams 
} from '../types';

interface LoanCalculatorProps {
  lang: Language;
  theme: Theme;
}

type CalculatorTab = 'purchase' | 'affordability' | 'refinance' | 'extra';

const formatNumberWithCommas = (val: number | string) => {
  if (val === undefined || val === null || val === '') return '';
  const str = val.toString();
  const parts = str.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join('.');
};

const stripCommas = (val: string) => val.toString().replace(/,/g, '');

const TooltipIcon = ({ text }: { text: string }) => (
  <div className="group relative inline-block ml-1">
    <span className="cursor-help text-gold/60 text-[10px] bg-gold/10 w-4 h-4 rounded-full inline-flex items-center justify-center border border-gold/20 leading-none">?</span>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-4 rounded-2xl bg-midnight border border-gold/20 text-[11px] text-white opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1 pointer-events-none z-50 shadow-2xl backdrop-blur-xl leading-relaxed">
      {text}
    </div>
  </div>
);

const StrategicInput = ({ id, label, value, onChange, min, max, step, isCurrency = false, suffix = "", useCommas = false, tooltip = "", theme, unitToggle }: any) => {
  const [localValue, setLocalValue] = useState(useCommas ? formatNumberWithCommas(value) : value.toString());
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setLocalValue(useCommas ? formatNumberWithCommas(value) : value.toString());
    }
  }, [value, isFocused, useCommas]);

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = stripCommas(e.target.value).replace(/[^0-9.]/g, '');
    setLocalValue(raw); 
    
    const num = parseFloat(raw);
    if (!isNaN(num)) onChange(num);
    else if (raw === '') onChange(0);
  };

  const handleBlur = () => {
    setIsFocused(false);
    const num = parseFloat(stripCommas(localValue));
    const validated = isNaN(num) ? min : Math.min(max, Math.max(min, num));
    setLocalValue(useCommas ? formatNumberWithCommas(validated) : validated.toString());
    onChange(validated);
  };

  const handleStep = (dir: number) => {
    const next = Math.round((value + (step * dir)) * 1000) / 1000;
    const final = Math.min(max, Math.max(min, next));
    onChange(final);
    setLocalValue(useCommas ? formatNumberWithCommas(final) : final.toString());
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="group space-y-3 md:space-y-4 h-auto">
      <div className="flex justify-between items-center px-1">
        <label htmlFor={id} className={`text-[9px] md:text-[10px] uppercase font-black tracking-widest leading-none ${theme === 'dark' ? 'text-white/40 group-focus-within:text-gold' : 'text-slate-400 group-focus-within:text-gold'}`}>
          {label} {tooltip && <TooltipIcon text={tooltip} />}
        </label>
        {unitToggle}
      </div>
      
      <div className="relative flex items-center gap-2 md:gap-4">
        <button 
          type="button"
          onClick={() => handleStep(-1)}
          className={`h-10 w-10 md:h-12 md:w-12 shrink-0 rounded-xl md:rounded-2xl flex items-center justify-center font-black transition-all active:scale-90 leading-none ${
            theme === 'dark' 
              ? 'bg-white/5 border border-white/10 text-white active:bg-gold active:text-ink' 
              : 'bg-slate-100 border border-slate-200 text-slate-900 active:bg-gold active:text-ink'
          }`}
        >
          −
        </button>

        <div className="relative flex-1 h-10 md:h-12">
          {isCurrency && <span className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gold font-bold pointer-events-none select-none text-sm md:text-base">$</span>}
          <input 
            id={id} 
            type="text" 
            inputMode="decimal" 
            value={localValue} 
            onChange={handleManualInput}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            autoComplete="off"
            className={`w-full h-full rounded-xl md:rounded-2xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 transition-all ${isCurrency ? 'pl-7 md:pl-9 pr-3 md:pr-4' : 'px-4 md:px-5'} ${theme === 'dark' ? 'bg-midnight border border-white/10 text-white' : 'bg-white border border-slate-200 text-slate-900'}`}
          />
          {suffix && <span className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-[9px] md:text-[10px] font-black uppercase text-gold/40 leading-none">{suffix}</span>}
        </div>

        <button 
          type="button"
          onClick={() => handleStep(1)}
          className={`h-10 w-10 md:h-12 md:w-12 shrink-0 rounded-xl md:rounded-2xl flex items-center justify-center font-black transition-all active:scale-90 leading-none ${
            theme === 'dark' 
              ? 'bg-white/5 border border-white/10 text-white active:bg-gold active:text-ink' 
              : 'bg-slate-100 border border-slate-200 text-slate-900 active:bg-gold active:text-ink'
          }`}
        >
          +
        </button>
      </div>
      
      <div className="px-1 pt-1 md:pt-2">
        <input 
          type="range" 
          min={min} 
          max={max} 
          step={step} 
          value={value}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            onChange(val);
            if (!isFocused) setLocalValue(useCommas ? formatNumberWithCommas(val) : val.toString());
          }}
          className="w-full h-1.5 md:h-2 rounded-lg appearance-none cursor-pointer accent-gold bg-transparent relative"
          style={{
            background: `linear-gradient(to right, #D8B66A 0%, #D8B66A ${percentage}%, ${theme === 'dark' ? '#ffffff10' : '#e2e8f0'} ${percentage}%, ${theme === 'dark' ? '#ffffff10' : '#e2e8f0'} 100%)`
          }}
        />
      </div>
    </div>
  );
};

const LoanCalculator: React.FC<LoanCalculatorProps> = ({ lang, theme }) => {
  const [activeTab, setActiveTab] = useState<CalculatorTab>('purchase');
  const [showAmortization, setShowAmortization] = useState(false);
  const [amortizationPeriod, setAmortizationPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [dpType, setDpType] = useState<'dollar' | 'percent'>('dollar');
  const [termUnit, setTermUnit] = useState<'years' | 'months'>('years');

  const [purchaseParams, setPurchaseParams] = useState<LoanParameters>({
    amount: 650000,
    downPayment: 130000,
    termYears: 30,
    interestRate: 6.75,
    loanType: 'conventional',
    mode: 'fixed',
    propertyTaxes: 8400,
    insurance: 2400,
    pmi: 0.5,
    hoa: 0,
  });

  const [extraParams, setExtraParams] = useState<ExtraPaymentParams>({
    monthlyExtra: 0,
    oneTimeExtra: 0,
    oneTimeMonth: 12
  });

  const [refiParams, setRefiParams] = useState<RefinanceParams>({
    currentBalance: 450000,
    currentRate: 7.25,
    currentRemainingTerm: 22,
    newRate: 6.125,
    newTerm: 30,
    closingCosts: 6500
  });

  const [affordParams, setAffordParams] = useState<AffordabilityParams>({
    annualIncome: 150000,
    monthlyDebts: 800,
    downPayment: 100000,
    interestRate: 6.75,
    termYears: 30
  });

  const dpPercent = (purchaseParams.downPayment / purchaseParams.amount) * 100;

  const formatCurrency = useCallback((val: number) => 
    new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'es-US', { 
      style: 'currency', currency: 'USD', maximumFractionDigits: 0 
    }).format(val), [lang]);

  const purchaseResults = useMemo(() => {
    const { amount, downPayment, termYears, interestRate, propertyTaxes, insurance, hoa, pmi, loanType } = purchaseParams;
    let financed = Math.max(0, amount - downPayment);
    if (loanType === 'fha') financed *= 1.0175; 
    
    const r = (interestRate / 100) / 12;
    const n = termYears * 12;
    
    let monthlyPI = (financed * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    if (isNaN(monthlyPI) || !isFinite(monthlyPI)) monthlyPI = financed / (n || 1);

    const monthlyTax = propertyTaxes / 12;
    const monthlyIns = insurance / 12;
    
    let monthlyPMI = 0;
    const ltv = (financed / amount) * 100;
    if (loanType === 'fha') {
      monthlyPMI = (financed * 0.0055) / 12;
    } else if (ltv > 80 && loanType === 'conventional') {
      monthlyPMI = (financed * (pmi / 100)) / 12;
    }

    const totalMonthly = monthlyPI + monthlyTax + monthlyIns + monthlyPMI + hoa;
    
    const schedule: AmortizationData[] = [];
    let balance = financed;
    let totalInt = 0;
    let monthCount = 0;
    const today = new Date();

    while (balance > 0.01 && monthCount < 600) {
      monthCount++;
      const intPart = balance * r;
      let princPart = Math.min(balance, monthlyPI - intPart);
      let extra = extraParams.monthlyExtra;
      if (monthCount === extraParams.oneTimeMonth) extra += extraParams.oneTimeExtra;
      const actualPrinc = Math.min(balance, princPart + extra);
      balance -= actualPrinc;
      totalInt += intPart;

      const date = new Date(today);
      date.setMonth(today.getMonth() + monthCount);

      schedule.push({
        month: monthCount,
        date: date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' }),
        payment: monthlyPI + extra,
        principal: actualPrinc,
        interest: intPart,
        remainingBalance: Math.max(0, balance),
        extraPayment: extra
      });
    }

    return { monthlyPI, monthlyTax, monthlyIns, monthlyPMI, totalMonthly, totalInt, schedule, financed, monthCount };
  }, [purchaseParams, extraParams]);

  const refiResults = useMemo(() => {
    const { currentBalance, currentRate, currentRemainingTerm, newRate, newTerm, closingCosts } = refiParams;
    const rCurr = (currentRate / 100) / 12;
    const nCurr = currentRemainingTerm * 12;
    const currPMT = (currentBalance * rCurr * Math.pow(1 + rCurr, nCurr)) / (Math.pow(1 + rCurr, nCurr) - 1);

    const rNew = (newRate / 100) / 12;
    const nNew = newTerm * 12;
    const newPMT = (currentBalance * rNew * Math.pow(1 + rNew, nNew)) / (Math.pow(1 + rNew, nNew) - 1);

    const monthlySavings = currPMT - newPMT;
    const totalSavingsOverTerm = (currPMT * nCurr) - (newPMT * nNew) - closingCosts;

    return { currPMT, newPMT, monthlySavings, totalSavingsOverTerm };
  }, [refiParams]);

  const affordResults = useMemo(() => {
    const { annualIncome, monthlyDebts, downPayment, interestRate, termYears } = affordParams;
    const monthlyGross = annualIncome / 12;
    const backEndLimit = monthlyGross * 0.43; 
    const availableForPITI = Math.max(0, backEndLimit - monthlyDebts);
    
    const r = (interestRate / 100) / 12;
    const n = termYears * 12;
    const factor = (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const taxInsFactor = 0.015 / 12; 
    
    const estimatedLoan = availableForPITI / (factor + taxInsFactor);
    const estimatedPrice = estimatedLoan + downPayment;
    
    return { estimatedPrice, estimatedLoan, availableForPITI, backEndDTI: (backEndLimit / monthlyGross) * 100 };
  }, [affordParams]);

  const activeResults = useMemo(() => {
    if (activeTab === 'purchase' || activeTab === 'extra') return purchaseResults;
    
    // Generate temporary schedule for Refi or Affordability to keep charts alive
    const targetLoan = activeTab === 'refinance' ? refiParams.currentBalance : affordResults.estimatedLoan;
    const targetRate = activeTab === 'refinance' ? refiParams.newRate : affordParams.interestRate;
    const targetTerm = activeTab === 'refinance' ? refiParams.newTerm : affordParams.termYears;
    
    const r = (targetRate / 100) / 12;
    const n = targetTerm * 12;
    let monthlyPI = (targetLoan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    if (isNaN(monthlyPI) || !isFinite(monthlyPI)) monthlyPI = targetLoan / (n || 1);

    const schedule: AmortizationData[] = [];
    let balance = targetLoan;
    const today = new Date();

    for (let i = 1; i <= Math.min(n, 600); i++) {
      const intPart = balance * r;
      const princPart = Math.min(balance, monthlyPI - intPart);
      balance -= princPart;
      const date = new Date(today);
      date.setMonth(today.getMonth() + i);
      schedule.push({
        month: i,
        date: date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' }),
        payment: monthlyPI,
        principal: princPart,
        interest: intPart,
        remainingBalance: Math.max(0, balance),
        extraPayment: 0
      });
    }

    return { 
      ...purchaseResults, 
      schedule, 
      financed: targetLoan, 
      monthlyPI,
      totalMonthly: monthlyPI + (activeTab === 'refinance' ? 0 : (purchaseParams.propertyTaxes + purchaseParams.insurance)/12)
    };
  }, [activeTab, purchaseResults, refiParams, affordResults, affordParams, purchaseParams]);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 h-auto">
      <div className="text-center mb-8 md:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] mb-4 md:mb-8 leading-none">
          {lang === 'en' ? 'Capital Intelligence Hub' : 'Centro de Inteligencia de Capital'}
        </div>
        <h2 className={`text-[clamp(1.5rem,6vw,4rem)] font-black mb-3 md:mb-6 uppercase tracking-tighter leading-[1.1] ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {lang === 'en' ? 'Strategic Analysis' : 'Análisis Estratégico'}
        </h2>
        <p className={`max-w-2xl mx-auto text-xs md:text-lg font-medium leading-relaxed ${theme === 'dark' ? 'text-slate2' : 'text-slate-600'}`}>
          {lang === 'en' 
            ? 'Sophisticated tools to model your real estate wealth. Move beyond basic estimates into precise strategic planning.'
            : 'Herramientas sofisticadas para modelar su patrimonio inmobiliario. Vaya más allá de las estimaciones básicas hacia una planificación estratégica precisa.'}
        </p>
      </div>

      <div className="flex justify-center mb-8 md:mb-16 overflow-x-auto pb-2 scrollbar-hide">
        <div className={`inline-flex p-1 md:p-2 rounded-xl md:rounded-[32px] border h-auto whitespace-nowrap ${theme === 'dark' ? 'bg-midnight border-white/10' : 'bg-slate-100 border-slate-200'}`}>
          {[
            { id: 'purchase', en: 'New Asset', es: 'Nuevo Activo' },
            { id: 'affordability', en: 'Affordability', es: 'Capacidad' },
            { id: 'refinance', en: 'Refinance', es: 'Refi' },
            { id: 'extra', en: 'Extra Savings', es: 'Ahorro Extra' },
          ].map(t => (
            <button 
              key={t.id} onClick={() => setActiveTab(t.id as any)}
              className={`px-3 py-2 md:px-6 md:py-3.5 rounded-lg md:rounded-[26px] text-[8px] md:text-[10px] whitespace-nowrap font-black uppercase tracking-widest transition-all leading-none border ${
                activeTab === t.id 
                  ? 'bg-gold text-ink shadow-goldglow scale-105 border-gold' 
                  : theme === 'dark' 
                    ? 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10' 
                    : 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {lang === 'en' ? t.en : t.es}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 md:gap-10 items-start">
        <div className={`lg:col-span-4 space-y-6 md:space-y-10 p-5 md:p-12 rounded-2xl md:rounded-[48px] border backdrop-blur-3xl shadow-glow h-auto ${theme === 'dark' ? 'bg-midnight/60 border-white/10' : 'bg-white border-slate-200'}`}>
          
          {activeTab === 'purchase' && (
            <div className="space-y-6 md:space-y-10">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <button 
                  onClick={() => setPurchaseParams(p => ({...p, loanType: 'conventional'}))}
                  className={`p-3.5 md:p-5 rounded-xl md:rounded-2xl border text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all leading-none ${
                    purchaseParams.loanType === 'conventional' 
                      ? 'bg-gold/20 border-gold text-gold shadow-md' 
                      : theme === 'dark' 
                        ? 'border-white/5 text-white/30 hover:text-white/50' 
                        : 'border-slate-200 text-slate-500 hover:text-slate-900'
                  }`}
                >Conventional</button>
                <button 
                  onClick={() => setPurchaseParams(p => ({...p, loanType: 'fha'}))}
                  className={`p-3.5 md:p-5 rounded-xl md:rounded-2xl border text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all leading-none ${
                    purchaseParams.loanType === 'fha' 
                      ? 'bg-gold/20 border-gold text-gold shadow-md' 
                      : theme === 'dark' 
                        ? 'border-white/5 text-white/30 hover:text-white/50' 
                        : 'border-slate-200 text-slate-500 hover:text-slate-900'
                  }`}
                >FHA Program</button>
              </div>

              <StrategicInput 
                label={lang === 'en' ? "Property Market Value" : "Valor de Mercado del Activo"} value={purchaseParams.amount} min={100000} max={10000000} step={10000} isCurrency useCommas theme={theme}
                onChange={(v: any) => setPurchaseParams(p => ({...p, amount: v}))}
              />

              <StrategicInput 
                label={lang === 'en' ? "Equity Contribution (Down)" : "Inversión Inicial (Pago Inicial)"}
                value={dpType === 'dollar' ? purchaseParams.downPayment : dpPercent} 
                min={0} max={dpType === 'dollar' ? purchaseParams.amount : 100} step={dpType === 'dollar' ? 1000 : 0.1} 
                isCurrency={dpType === 'dollar'} 
                suffix={dpType === 'dollar' ? "" : "%"} 
                useCommas={dpType === 'dollar'} 
                theme={theme}
                unitToggle={
                  <div className={`flex rounded-lg p-0.5 border text-[9px] font-black leading-none ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                    <button onClick={()=>setDpType('dollar')} className={`px-2 py-1 rounded-md transition-all ${dpType === 'dollar' ? 'bg-gold text-ink' : 'text-slate-500'}`}>$</button>
                    <button onClick={()=>setDpType('percent')} className={`px-2 py-1 rounded-md transition-all ${dpType === 'percent' ? 'bg-gold text-ink' : 'text-slate-500'}`}>%</button>
                  </div>
                }
                onChange={(v: any) => setPurchaseParams(p => ({...p, downPayment: dpType === 'dollar' ? v : (v / 100) * p.amount}))}
              />

              <StrategicInput 
                label={lang === 'en' ? "Anticipated Yield (APR)" : "Tasa de Interés Estimada (APR)"} value={purchaseParams.interestRate} min={1} max={15} step={0.125} suffix="%" theme={theme}
                onChange={(v: any) => setPurchaseParams(p => ({...p, interestRate: v}))}
              />

              <StrategicInput 
                label={lang === 'en' ? "Duration Strategy" : "Plazo del Financiamiento"} value={termUnit === 'years' ? purchaseParams.termYears : purchaseParams.termYears * 12} 
                min={1} max={termUnit === 'years' ? 50 : 600} step={1} 
                suffix={termUnit === 'years' ? (lang === 'en' ? 'Years' : 'Años') : 'Mo'} 
                theme={theme}
                unitToggle={
                  <div className={`flex rounded-lg p-0.5 border text-[9px] font-black leading-none ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                    <button onClick={()=>setTermUnit('years')} className={`px-2 py-1 rounded-md transition-all ${termUnit === 'years' ? 'bg-gold text-ink' : 'text-slate-500'}`}>Y</button>
                    <button onClick={()=>setTermUnit('months')} className={`px-2 py-1 rounded-md transition-all ${termUnit === 'months' ? 'bg-gold text-ink' : 'text-slate-500'}`}>M</button>
                  </div>
                }
                onChange={(v: any) => setPurchaseParams(p => ({...p, termYears: termUnit === 'years' ? v : v / 12}))}
              />

              <div className={`p-6 md:p-8 rounded-3xl md:rounded-[40px] border space-y-6 md:space-y-8 h-auto ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200 shadow-sm'}`}>
                 <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-500 mb-2 leading-none">{lang === 'en' ? 'Escrow & Fixed Liabilities' : 'Fideicomiso y Obligaciones Fijas'}</h4>
                 <StrategicInput label={lang === 'en' ? "Property Tax (Annual)" : "Impuesto (Anual)"} value={purchaseParams.propertyTaxes} min={0} max={100000} step={100} isCurrency useCommas theme={theme} onChange={(v:any)=>setPurchaseParams(p=>({...p, propertyTaxes:v}))} />
                 <StrategicInput label={lang === 'en' ? "Ins. Policy (Annual)" : "Seguro (Anual)"} value={purchaseParams.insurance} min={0} max={30000} step={100} isCurrency useCommas theme={theme} onChange={(v:any)=>setPurchaseParams(p=>({...p, insurance:v}))} />
                 <StrategicInput label={lang === 'en' ? "HOA/Fees (Monthly)" : "Asociación (Mensual)"} value={purchaseParams.hoa} min={0} max={10000} step={50} isCurrency useCommas theme={theme} onChange={(v:any)=>setPurchaseParams(p=>({...p, hoa:v}))} />
              </div>
            </div>
          )}

          {activeTab === 'affordability' && (
            <div className="space-y-8 md:space-y-10">
              <StrategicInput label={lang === 'en' ? "Household Gross Income" : "Ingresos Brutos (Anual)"} value={affordParams.annualIncome} min={30000} max={2000000} step={5000} isCurrency useCommas theme={theme} onChange={(v:any)=>setAffordParams(p=>({...p, annualIncome:v}))} />
              <StrategicInput label={lang === 'en' ? "Monthly Debt Obligations" : "Deudas Mensuales"} value={affordParams.monthlyDebts} min={0} max={25000} step={100} isCurrency useCommas theme={theme} tooltip={lang === 'en' ? "Auto loans, cards, other mortgages." : "Préstamos, tarjetas, otras hipotecas."} onChange={(v:any)=>setAffordParams(p=>({...p, monthlyDebts:v}))} />
              <StrategicInput label={lang === 'en' ? "Liquid Capital (Down)" : "Capital Líquido (Down)"} value={affordParams.downPayment} min={0} max={5000000} step={5000} isCurrency useCommas theme={theme} onChange={(v:any)=>setAffordParams(p=>({...p, downPayment:v}))} />
            </div>
          )}

          {activeTab === 'refinance' && (
            <div className="space-y-8 md:space-y-10">
              <StrategicInput label={lang === 'en' ? "Remaining Principal" : "Saldo de Principal"} value={refiParams.currentBalance} min={50000} max={10000000} step={5000} isCurrency useCommas theme={theme} onChange={(v:any)=>setRefiParams(p=>({...p, currentBalance:v}))} />
              <div className="grid grid-cols-2 gap-4">
                <StrategicInput label={lang === 'en' ? "Current APR" : "Tasa Actual"} value={refiParams.currentRate} min={1} max={15} step={0.1} suffix="%" theme={theme} onChange={(v:any)=>setRefiParams(p=>({...p, currentRate:v}))} />
                <StrategicInput label={lang === 'en' ? "Target APR" : "Nueva Tasa"} value={refiParams.newRate} min={1} max={15} step={0.1} suffix="%" theme={theme} onChange={(v:any)=>setRefiParams(p=>({...p, newRate:v}))} />
              </div>
              <StrategicInput label={lang === 'en' ? "Closing Costs" : "Costos de Cierre"} value={refiParams.closingCosts} min={1000} max={100000} step={500} isCurrency useCommas theme={theme} onChange={(v:any)=>setRefiParams(p=>({...p, closingCosts:v}))} />
            </div>
          )}

          {activeTab === 'extra' && (
            <div className="space-y-8 md:space-y-10">
              <StrategicInput label={lang === 'en' ? "Extra Monthly" : "Pago Extra Mensual"} value={extraParams.monthlyExtra} min={0} max={20000} step={100} isCurrency useCommas theme={theme} onChange={(v:any)=>setExtraParams(p=>({...p, monthlyExtra:v}))} />
              <StrategicInput label={lang === 'en' ? "One-Time Injection" : "Pago Único Especial"} value={extraParams.oneTimeExtra} min={0} max={1000000} step={5000} isCurrency useCommas theme={theme} onChange={(v:any)=>setExtraParams(p=>({...p, oneTimeExtra:v}))} />
              <StrategicInput label={lang === 'en' ? "Injection Month" : "Mes del Pago"} value={extraParams.oneTimeMonth} min={1} max={360} step={1} suffix="Mo" theme={theme} onChange={(v:any)=>setExtraParams(p=>({...p, oneTimeMonth:v}))} />
            </div>
          )}
        </div>

        <div className="lg:col-span-8 space-y-8 md:space-y-12">
          
          <div className={`p-6 md:p-16 rounded-2xl md:rounded-[56px] border relative overflow-hidden shadow-2xl transition-all duration-700 h-auto ${theme === 'dark' ? 'bg-midnight/40 border-white/10' : 'bg-white border-slate-200'}`}>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[140px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10">
              {activeTab === 'purchase' && (
                <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-center">
                  <div className="md:col-span-7 space-y-8 md:space-y-12">
                    <div className="space-y-3 md:space-y-5 px-1">
                       <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.5em] text-gold block leading-none">{lang === 'en' ? 'Estimated PITI Commitment' : 'Compromiso Mensual Estimado'}</span>
                       <span className={`text-[clamp(1.75rem,8vw,6rem)] font-black tracking-tighter leading-[1.15] md:leading-[1.1] block ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{formatCurrency(purchaseResults.totalMonthly)}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 md:gap-10 pt-6 md:pt-10 border-t border-white/10 px-1">
                       <div className="group">
                         <span className="text-[8px] md:text-[10px] uppercase font-black text-slate-500 block mb-1.5 md:mb-3 tracking-[0.1em] md:tracking-[0.2em] group-hover:text-gold transition-colors leading-none">{lang === 'en' ? 'Principal & Int.' : 'P. e Interés'}</span>
                         <span className={`text-lg md:text-3xl font-black leading-none ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{formatCurrency(purchaseResults.monthlyPI)}</span>
                       </div>
                       <div className="group">
                         <span className="text-[8px] md:text-[10px] uppercase font-black text-slate-500 block mb-1.5 md:mb-3 tracking-[0.1em] md:tracking-[0.2em] group-hover:text-gold transition-colors leading-none">{lang === 'en' ? 'Other Fees' : 'Otros Gastos'}</span>
                         <span className={`text-lg md:text-3xl font-black leading-none ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{formatCurrency(purchaseResults.monthlyTax + purchaseResults.monthlyIns + purchaseResults.monthlyPMI + purchaseParams.hoa)}</span>
                       </div>
                    </div>

                    <div className={`p-5 md:p-8 rounded-xl md:rounded-[40px] border flex items-center justify-between transition-all hover:bg-gold/5 h-auto ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200 shadow-sm'}`}>
                      <div>
                        <span className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.1em] md:tracking-[0.3em] text-slate-400 block mb-1 md:mb-2 leading-none">{lang === 'en' ? 'Total Financed Debt' : 'Deuda Total Financiada'}</span>
                        <span className="text-base md:text-2xl font-black text-gold leading-none">{formatCurrency(purchaseResults.financed)}</span>
                      </div>
                      <div className="h-8 w-8 md:h-12 md:w-12 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/20 shadow-inner shrink-0 text-xs md:text-base">🏦</div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-5 relative flex items-center justify-center overflow-visible min-h-[280px] md:min-h-[340px] w-full">
                    <div className="absolute inset-0 p-2 md:p-4 overflow-visible">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                          <Pie 
                            data={[
                              { name: 'P&I', value: purchaseResults.monthlyPI, color: '#D8B66A' },
                              { name: 'Taxes', value: purchaseResults.monthlyTax, color: '#F2D49C' },
                              { name: 'Ins.', value: purchaseResults.monthlyIns, color: '#19F2D6' },
                              { name: 'Fees', value: purchaseResults.monthlyPMI + purchaseParams.hoa, color: '#334155' },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius="68%" 
                            outerRadius="82%" 
                            paddingAngle={0} 
                            cornerRadius={0}
                            startAngle={90}
                            endAngle={-270}
                            dataKey="value" 
                            stroke="none"
                            strokeWidth={0}
                            isAnimationActive={true}
                          >
                            {[0,1,2,3].map((_, index) => (
                              <Cell key={`cell-${index}`} fill={['#D8B66A', '#F2D49C', '#19F2D6', '#334155'][index]} stroke="none" />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              borderRadius: '24px', 
                              background: theme === 'dark' ? '#0B1220' : '#FFF', 
                              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)', 
                              fontSize: '10px', 
                              fontWeight: 'bold', 
                              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                              padding: '12px 16px',
                              color: theme === 'dark' ? '#FFF' : '#0F172A'
                            }} 
                            itemStyle={{ padding: '2px 0', color: theme === 'dark' ? '#FFF' : '#0F172A' }}
                            formatter={(v: any) => formatCurrency(v)}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                       <span className="text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] md:tracking-[0.4em] leading-none">{lang === 'en' ? 'Liability Split' : 'Distribución'}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'affordability' && (
                <div className="space-y-8 md:space-y-12 text-center px-1">
                  <div>
                    <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.6em] text-gold block mb-3 md:mb-6 leading-none">{lang === 'en' ? 'Strategic Acquisition Limit' : 'Límite de Compra'}</span>
                    <span className={`text-[clamp(1.5rem,8vw,7rem)] font-black tracking-tighter leading-[1.1] block ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{formatCurrency(affordResults.estimatedPrice)}</span>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 md:gap-8">
                    <div className={`p-6 md:p-10 rounded-2xl md:rounded-[48px] border text-center transition-all hover:scale-105 shadow-sm h-auto ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                       <span className="text-[8px] md:text-[10px] uppercase font-black text-slate-400 block mb-1.5 md:mb-3 tracking-[0.1em] md:tracking-[0.2em] leading-none">{lang === 'en' ? 'Asset Leverage' : 'Apalancamiento'}</span>
                       <span className="text-lg md:text-3xl font-black text-gold leading-none">{formatCurrency(affordResults.estimatedLoan)}</span>
                    </div>
                    <div className={`p-6 md:p-10 rounded-2xl md:rounded-[48px] border text-center transition-all hover:scale-105 shadow-sm h-auto ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                       <span className="text-[8px] md:text-[10px] uppercase font-black text-slate-400 block mb-1.5 md:mb-3 tracking-[0.1em] md:tracking-[0.2em] leading-none">{lang === 'en' ? 'DTI Risk' : 'Riesgo DTI'}</span>
                       <span className={`text-lg md:text-3xl font-black leading-none ${affordResults.backEndDTI > 43 ? 'text-red-500' : 'text-tealn'}`}>{affordResults.backEndDTI.toFixed(1)}%</span>
                    </div>
                    <div className={`p-6 md:p-10 rounded-2xl md:rounded-[48px] border text-center transition-all hover:scale-105 shadow-sm h-auto ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                       <span className="text-[8px] md:text-[10px] uppercase font-black text-slate-400 block mb-1.5 md:mb-3 tracking-[0.1em] md:tracking-[0.2em] leading-none">{lang === 'en' ? 'Max PITI' : 'PITI Máximo'}</span>
                       <span className={`text-lg md:text-3xl font-black leading-none ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{formatCurrency(affordResults.availableForPITI)}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'refinance' && (
                <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                   <div className="space-y-10 md:space-y-12 px-1 text-center md:text-left">
                      <div className="space-y-4 md:space-y-6">
                        <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-gold block leading-none">{lang === 'en' ? 'Monthly Yield Optimization' : 'Optimización Mensual'}</span>
                        <span className={`text-[clamp(1.75rem,8vw,5rem)] font-black tracking-tighter leading-[1.1] block ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{formatCurrency(refiResults.monthlySavings)}</span>
                      </div>
                      <div className={`p-8 md:p-10 rounded-2xl md:rounded-[40px] border flex items-center justify-between shadow-sm h-auto ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                        <div>
                          <span className="text-[9px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-slate-400 block mb-2 leading-none">{lang === 'en' ? 'Lifetime Savings' : 'Ahorro de por Vida'}</span>
                          <span className="text-xl md:text-3xl font-black text-tealn leading-none">{formatCurrency(refiResults.totalSavingsOverTerm)}</span>
                        </div>
                      </div>
                   </div>
                   <div className={`p-10 md:p-16 rounded-3xl md:rounded-[56px] border text-center relative overflow-hidden shadow-goldglow h-auto ${theme === 'dark' ? 'bg-gradient-to-br from-midnight to-blue-900/40 border-gold/20' : 'bg-slate-100 border-slate-300'}`}>
                      <h5 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-gold mb-8 md:mb-10 leading-none">{lang === 'en' ? 'Break-Even' : 'Punto de Equilibrio'}</h5>
                      <div className={`text-[clamp(2.5rem,8vw,5rem)] font-black mb-4 md:mb-5 leading-none ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {refiResults.monthlySavings > 0 ? (refiParams.closingCosts / refiResults.monthlySavings).toFixed(0) : '∞'}
                      </div>
                      <div className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] leading-tight ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>{lang === 'en' ? 'Months to Strategic Recoup' : 'Meses para Recuperar Inversión'}</div>
                   </div>
                </div>
              )}

              {activeTab === 'extra' && (
                <div className="space-y-10 md:space-y-12 text-center px-1">
                  <div>
                     <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-gold block mb-6 leading-none">{lang === 'en' ? 'Interest Mitigation' : 'Mitigación de Intereses'}</span>
                     <span className={`text-[clamp(1.75rem,8vw,6rem)] font-black tracking-tighter leading-[1.1] block ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{formatCurrency(Math.max(0, (purchaseParams.amount - purchaseParams.downPayment) * ((purchaseParams.interestRate/100)/12) * (purchaseParams.termYears * 12) - purchaseResults.totalInt))}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    <div className={`p-8 md:p-12 rounded-2xl md:rounded-[48px] border text-center shadow-sm h-auto ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                       <span className="text-[9px] md:text-[10px] uppercase font-black text-slate-400 block mb-3 md:mb-4 tracking-[0.2em] leading-none">{lang === 'en' ? 'Years Eliminated' : 'Años Eliminados'}</span>
                       <span className="text-[clamp(1.5rem,5vw,3.5rem)] font-black text-tealn leading-none">{Math.floor((purchaseParams.termYears * 12 - purchaseResults.monthCount)/12)} {lang === 'en' ? 'Y' : 'A'}</span>
                    </div>
                    <div className={`p-8 md:p-12 rounded-2xl md:rounded-[48px] border text-center shadow-sm h-auto ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                       <span className="text-[9px] md:text-[10px] uppercase font-black text-slate-400 block mb-3 md:mb-4 tracking-[0.2em] leading-none">{lang === 'en' ? 'New Term' : 'Nuevo Plazo'}</span>
                       <span className={`text-[clamp(1.5rem,5vw,3.5rem)] font-black leading-none ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{purchaseResults.monthCount} Mo</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={`p-6 md:p-16 rounded-3xl md:rounded-[56px] border h-auto ${theme === 'dark' ? 'bg-black/40 border-white/10 shadow-glow' : 'bg-white border-slate-200 shadow-xl'}`}>
            <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-slate-500 mb-10 md:mb-12 leading-none">
              {activeTab === 'affordability' ? (lang === 'en' ? 'Purchasing Power Projection' : 'Proyección de Poder de Compra') : (lang === 'en' ? 'Equity Projection' : 'Proyección de Capital')}
            </h4>
            <div className="h-[240px] md:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activeResults.schedule.filter((_, i) => i % 12 === 0)}>
                  <defs>
                    <linearGradient id="colorBal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D8B66A" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#D8B66A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} />
                  <XAxis dataKey="date" hide />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '24px', 
                      background: theme === 'dark' ? '#0B1220' : '#FFF', 
                      border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)', 
                      fontSize: '10px', 
                      fontWeight: 'bold', 
                      boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
                      color: theme === 'dark' ? '#FFF' : '#0F172A'
                    }} 
                    itemStyle={{ color: theme === 'dark' ? '#FFF' : '#0F172A' }}
                    formatter={(v: any) => formatCurrency(v)}
                  />
                  <Area type="monotone" dataKey="remainingBalance" stroke="#D8B66A" strokeWidth={3} fillOpacity={1} fill="url(#colorBal)" name={lang === 'en' ? 'Balance' : 'Saldo'} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
            <button 
              onClick={() => setShowAmortization(!showAmortization)}
              className={`flex-1 py-5 md:py-6 rounded-2xl md:rounded-[28px] border text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all leading-none ${theme === 'dark' ? 'border-white/10 bg-white/5 active:bg-white/10' : 'border-slate-200 bg-slate-50 active:bg-slate-100'}`}
            >
              {showAmortization ? (lang === 'en' ? 'Hide Details' : 'Ocultar') : (lang === 'en' ? 'Full Amortization' : 'Amortización')}
            </button>
            <button 
              onClick={() => {
                const { schedule } = activeResults;
                const headers = ["Month,Date,Payment,Principal,Interest,Extra,Balance"];
                const rows = schedule.map(s => `${s.month},${s.date},${s.payment.toFixed(2)},${s.principal.toFixed(2)},${s.interest.toFixed(2)},${(s.extraPayment||0).toFixed(2)},${s.remainingBalance.toFixed(2)}`);
                const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", `BC_Prime_${activeTab}_Analysis.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="flex-1 py-5 md:py-6 rounded-2xl md:rounded-[28px] border border-gold/30 bg-gold/10 text-[10px] md:text-[11px] font-black text-gold uppercase tracking-[0.2em] md:tracking-[0.3em] active:bg-gold/20 transition-all shadow-goldglow leading-none"
            >
              {lang === 'en' ? 'Generate CSV' : 'Generar CSV'}
            </button>
          </div>

          {showAmortization && (
            <div className={`overflow-hidden rounded-3xl md:rounded-[48px] border animate-in fade-in slide-in-from-top-4 duration-500 shadow-2xl h-auto ${theme === 'dark' ? 'bg-midnight border-white/10' : 'bg-white border-slate-200'}`}>
              <div className={`p-6 md:p-10 border-b flex flex-col sm:flex-row gap-6 md:gap-8 justify-between items-center ${theme === 'dark' ? 'border-white/5 bg-white/5' : 'bg-slate-50 border-slate-100'}`}>
                 <h5 className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] leading-none ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{lang === 'en' ? 'Timeline' : 'Cronograma'}</h5>
                 <div className="flex gap-2">
                    <button onClick={()=>setAmortizationPeriod('monthly')} className={`px-4 py-2 md:px-5 md:py-3 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black uppercase transition-all leading-none ${amortizationPeriod==='monthly' ? 'bg-gold text-ink shadow-md' : 'text-slate-500'}`}>{lang === 'en' ? 'Mo' : 'Mes'}</button>
                    <button onClick={()=>setAmortizationPeriod('yearly')} className={`px-4 py-2 md:px-5 md:py-3 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black uppercase transition-all leading-none ${amortizationPeriod==='yearly' ? 'bg-gold text-ink shadow-md' : 'text-slate-500'}`}>{lang === 'en' ? 'Yr' : 'Año'}</button>
                 </div>
              </div>
              <div className="max-h-[400px] md:max-h-[640px] overflow-y-auto scrollbar-hide">
                <table className="w-full text-left text-[9px] md:text-[11px] uppercase font-bold tracking-[0.1em]">
                  <thead className={`sticky top-0 z-10 ${theme === 'dark' ? 'bg-midnight' : 'bg-slate-100'}`}>
                    <tr className="border-b border-white/5 text-slate-500">
                      <th className="p-4 md:p-8">{lang === 'en' ? 'Date' : 'Fecha'}</th>
                      <th className="p-4 md:p-8">Princ.</th>
                      <th className="p-4 md:p-8">{lang === 'en' ? 'Int.' : 'Int.'}</th>
                      <th className="p-4 md:p-8">{lang === 'en' ? 'Balance' : 'Saldo'}</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${theme === 'dark' ? 'divide-white/5' : 'divide-slate-200'}`}>
                    {activeResults.schedule
                      .filter((_, i) => amortizationPeriod === 'monthly' ? true : i % 12 === 0)
                      .map((s, idx) => (
                      <tr key={idx} className="hover:bg-gold/5 transition-colors group active:bg-gold/10">
                        <td className={`p-4 md:p-8 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{s.date}</td>
                        <td className="p-4 md:p-8 text-slate-400">{formatCurrency(s.principal)}</td>
                        <td className="p-4 md:p-8 text-gold group-hover:scale-105 transition-transform origin-left">{formatCurrency(s.interest)}</td>
                        <td className={`p-4 md:p-8 font-mono ${theme === 'dark' ? 'text-white/60' : 'text-slate-500'}`}>{formatCurrency(s.remainingBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={`mt-16 md:mt-24 pt-10 md:pt-16 border-t text-center ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'}`}>
         <div className="flex flex-col sm:flex-row justify-center gap-6 md:gap-20 mb-8 md:mb-12 opacity-40 grayscale items-center">
            <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] leading-none">{lang === 'en' ? 'Equal Housing Lender' : 'Vivienda Equitativa'}</span>
            <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] leading-none">NMLS 2616069 | 2805990</span>
         </div>
         <p className="max-w-3xl mx-auto text-[8px] md:text-[10px] leading-relaxed uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-500 italic px-4 md:px-8">
           {lang === 'en' 
             ? 'Analysis provided by BC Prime Lending Solutions. Raudel Bonne (NMLS 2616069) is a Licensed Mortgage Broker in Florida. All calculations are non-binding estimates and do not constitute a commitment to lend. Individual terms are subject to credit verification, asset valuation, and lender underwriting protocols.'
             : 'Análisis proporcionado por BC Prime Lending Solutions. Raudel Bonne (NMLS 2616069) es un Corredor Hipotecario Licenciado en Florida. Todos los cálculos son estimaciones no vinculantes y no constituyen un compromiso de préstamo. Los términos individuales están sujetos a verificación de crédito, valoración de activos y protocolos de suscripción del prestamista.'}
         </p>
      </div>
    </div>
  );
};

export default LoanCalculator;

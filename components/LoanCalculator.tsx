
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { LoanParameters, AmortizationData, Language, Theme } from '../types';

interface LoanCalculatorProps {
  lang: Language;
  theme: Theme;
}

type CalcMode = 'payment' | 'term';

const LoanCalculator: React.FC<LoanCalculatorProps> = ({ lang, theme }) => {
  const [mode, setMode] = useState<CalcMode>('payment');
  const [params, setParams] = useState<LoanParameters>({
    amount: 500000,
    termYears: 30,
    interestRate: 6.5,
  });
  const [targetPayment, setTargetPayment] = useState<number>(3500);
  const [showTable, setShowTable] = useState(false);

  const calculation = useMemo(() => {
    const P = params.amount;
    const r = (params.interestRate / 100) / 12;
    
    let n: number;
    let monthlyPayment: number;

    if (mode === 'payment') {
      n = params.termYears * 12;
      monthlyPayment = r === 0 ? P / n : (P * r) / (1 - Math.pow(1 + r, -n));
    } else {
      // Solve for n: M = (P*r) / (1 - (1+r)^-n)
      // (1 - (1+r)^-n) = (P*r)/M
      // (1+r)^-n = 1 - (P*r)/M
      // -n * ln(1+r) = ln(1 - (P*r)/M)
      // n = -ln(1 - (P*r)/M) / ln(1+r)
      
      const M = targetPayment;
      const interestOnly = P * r;

      if (M <= interestOnly) {
        // Payment doesn't even cover interest
        return { 
          monthlyPayment: M, 
          totalPayment: 0, 
          totalInterest: 0, 
          schedule: [], 
          pieData: [], 
          error: lang === 'en' ? 'Payment too low to cover interest.' : 'El pago es demasiado bajo para cubrir el interés.',
          calculatedTermYears: 0 
        };
      }

      n = -Math.log(1 - (P * r) / M) / Math.log(1 + r);
      monthlyPayment = M;
    }

    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - P;
    const calculatedTermYears = n / 12;

    const schedule: AmortizationData[] = [];
    let currentBalance = P;
    let cumulativeInterest = 0;
    let cumulativePrincipal = 0;

    // Use rounded n for schedule display
    const iterations = Math.ceil(n);
    for (let i = 1; i <= iterations; i++) {
      const interestForMonth = currentBalance * r;
      const principalForMonth = Math.min(currentBalance, monthlyPayment - interestForMonth);
      currentBalance -= principalForMonth;
      cumulativeInterest += interestForMonth;
      cumulativePrincipal += principalForMonth;

      if (i % 12 === 0 || i === iterations) {
        schedule.push({
          month: i,
          principal: cumulativePrincipal,
          interest: cumulativeInterest,
          remainingBalance: Math.max(0, currentBalance),
        });
      }
    }

    const pieData = [
      { name: lang === 'en' ? 'Principal' : 'Capital', value: P, color: '#D8B66A' },
      { name: lang === 'en' ? 'Total Interest' : 'Interés Total', value: totalInterest, color: '#19F2D6' },
    ];

    return { monthlyPayment, totalPayment, totalInterest, schedule, pieData, calculatedTermYears, error: null };
  }, [params, targetPayment, mode, lang]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'es-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-bold uppercase tracking-widest mb-6">
          {lang === 'en' ? 'Advanced Analytics' : 'Analítica Avanzada'}
        </div>
        <h2 className={`text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {lang === 'en' ? 'Capital Planning' : 'Planeación de Capital'}
        </h2>
        <p className={`max-w-2xl mx-auto text-lg ${theme === 'dark' ? 'text-slate2' : 'text-slate-600'}`}>
          {lang === 'en' 
            ? 'Estimate your debt service or find the perfect loan duration for your budget.' 
            : 'Estime su servicio de deuda o encuentre la duración perfecta del préstamo para su presupuesto.'}
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <div className={`inline-flex p-1 rounded-2xl border ${theme === 'dark' ? 'bg-midnight border-white/10' : 'bg-slate-100 border-slate-200'}`}>
          <button 
            onClick={() => setMode('payment')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              mode === 'payment' ? 'bg-gold text-ink shadow-lg' : theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {lang === 'en' ? 'Solve for Payment' : 'Calcular Pago'}
          </button>
          <button 
            onClick={() => setMode('term')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              mode === 'term' ? 'bg-gold text-ink shadow-lg' : theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {lang === 'en' ? 'Solve for Term' : 'Calcular Plazo'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className={`lg:col-span-4 space-y-8 p-8 rounded-[32px] border backdrop-blur-xl ${
          theme === 'dark' ? 'bg-midnight/60 border-white/10' : 'bg-slate-50 border-slate-200 shadow-xl'
        }`}>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className={`text-[10px] uppercase font-bold tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>
                {lang === 'en' ? 'Loan Amount' : 'Monto del Préstamo'}
              </label>
              <span className="text-xl font-bold text-gold">{formatCurrency(params.amount)}</span>
            </div>
            <input 
              type="range" 
              min="50000" 
              max="5000000" 
              step="10000"
              value={params.amount}
              onChange={(e) => setParams(prev => ({ ...prev, amount: Number(e.target.value) }))}
              className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-gold"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className={`text-[10px] uppercase font-bold tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>
                {lang === 'en' ? 'Interest Rate (%)' : 'Tasa de Interés (%)'}
              </label>
              <span className="text-xl font-bold text-gold">{params.interestRate}%</span>
            </div>
            <input 
              type="range" 
              min="2.0" 
              max="18.0" 
              step="0.125"
              value={params.interestRate}
              onChange={(e) => setParams(prev => ({ ...prev, interestRate: Number(e.target.value) }))}
              className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-gold"
            />
          </div>

          {mode === 'payment' ? (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex justify-between items-end">
                <label className={`text-[10px] uppercase font-bold tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>
                  {lang === 'en' ? 'Amortization (Years)' : 'Amortización (Años)'}
                </label>
                <span className="text-xl font-bold text-gold">{params.termYears} {lang === 'en' ? 'Yrs' : 'Años'}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="40" 
                step="1"
                value={params.termYears}
                onChange={(e) => setParams(prev => ({ ...prev, termYears: Number(e.target.value) }))}
                className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-gold"
              />
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex justify-between items-end">
                <label className={`text-[10px] uppercase font-bold tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>
                  {lang === 'en' ? 'Target Monthly Payment' : 'Pago Mensual Objetivo'}
                </label>
                <span className="text-xl font-bold text-gold">{formatCurrency(targetPayment)}</span>
              </div>
              <input 
                type="range" 
                min="500" 
                max="50000" 
                step="100"
                value={targetPayment}
                onChange={(e) => setTargetPayment(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-gold"
              />
            </div>
          )}

          <div className={`pt-8 border-t space-y-6 ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
            <div className="flex justify-between items-center">
              <span className={`text-sm font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>
                {mode === 'payment' ? (lang === 'en' ? 'Monthly Payment' : 'Pago Mensual') : (lang === 'en' ? 'Required Term' : 'Plazo Requerido')}
              </span>
              <span className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {mode === 'payment' 
                  ? formatCurrency(calculation.monthlyPayment) 
                  : calculation.error ? '—' : `${calculation.calculatedTermYears.toFixed(1)} ${lang === 'en' ? 'Yrs' : 'Años'}`}
              </span>
            </div>
            
            {calculation.error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">
                {calculation.error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
               <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-100'}`}>
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">{lang === 'en' ? 'Total Interest' : 'Interés Total'}</div>
                  <div className="text-sm font-bold text-teal-400">{calculation.error ? '—' : formatCurrency(calculation.totalInterest)}</div>
               </div>
               <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-100'}`}>
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">{lang === 'en' ? 'Total Cost' : 'Costo Total'}</div>
                  <div className="text-sm font-bold text-gold">{calculation.error ? '—' : formatCurrency(calculation.totalPayment)}</div>
               </div>
            </div>

            <Link to="/contact" className="block w-full text-center py-5 rounded-2xl bg-gold text-ink font-black shadow-goldglow hover:scale-[1.02] transition-all uppercase tracking-widest text-xs">
              {lang === 'en' ? 'Request Official Terms' : 'Solicitar Términos Oficiales'}
            </Link>
          </div>
        </div>

        {/* Visuals */}
        <div className="lg:col-span-8 space-y-8">
          <div className={`rounded-[32px] border p-8 shadow-2xl transition-colors duration-500 min-h-[400px] flex items-center justify-center ${
            theme === 'dark' ? 'bg-black/40 border-white/10' : 'bg-white border-slate-200'
          }`}>
            {calculation.error ? (
              <div className="text-center">
                 <div className="text-6xl mb-4">⚠️</div>
                 <h3 className={`text-xl font-bold uppercase tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                   {lang === 'en' ? 'Invalid Configuration' : 'Configuración Inválida'}
                 </h3>
                 <p className="text-slate-400 text-sm mt-2">{calculation.error}</p>
              </div>
            ) : (
              <div className="w-full flex flex-col md:flex-row gap-8">
                {/* Amortization Area Chart */}
                <div className="flex-1">
                  <h3 className={`text-sm font-black uppercase tracking-widest mb-6 ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>
                    {lang === 'en' ? 'Equity Growth Over Time' : 'Crecimiento del Capital'}
                  </h3>
                  <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={calculation.schedule}>
                        <defs>
                          <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#D8B66A" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#D8B66A" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#19F2D6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#19F2D6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? "#ffffff0a" : "#0000000a"} />
                        <XAxis dataKey="month" hide />
                        <YAxis hide />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: theme === 'dark' ? '#0B1220' : '#ffffff', 
                            borderColor: theme === 'dark' ? '#ffffff1a' : '#e2e8f0', 
                            borderRadius: '16px', fontSize: '11px',
                            color: theme === 'dark' ? '#ffffff' : '#0f172a'
                          }}
                          formatter={(value: number) => formatCurrency(value)}
                        />
                        <Area type="monotone" dataKey="principal" stroke="#D8B66A" fillOpacity={1} fill="url(#colorPrincipal)" strokeWidth={3} name={lang === 'en' ? "Total Principal Paid" : "Capital Total Pagado"} />
                        <Area type="monotone" dataKey="interest" stroke="#19F2D6" fillOpacity={1} fill="url(#colorInterest)" strokeWidth={3} name={lang === 'en' ? "Total Interest Paid" : "Interés Total Pagado"} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Pie Chart Breakdown */}
                <div className="md:w-64 flex flex-col items-center">
                  <h3 className={`text-sm font-black uppercase tracking-widest mb-6 text-center ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>
                    {lang === 'en' ? 'Total Breakdown' : 'Desglose Total'}
                  </h3>
                  <div className="w-full h-[220px]">
                     <ResponsiveContainer width="100%" height="100%">
                       <PieChart>
                         <Pie
                          data={calculation.pieData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                         >
                           {calculation.pieData.map((entry: any, index: number) => (
                             <Cell key={`cell-${index}`} fill={entry.color} />
                           ))}
                         </Pie>
                         <Tooltip 
                          contentStyle={{ 
                            backgroundColor: theme === 'dark' ? '#0B1220' : '#ffffff', 
                            borderRadius: '12px',
                            border: 'none',
                            fontSize: '11px'
                          }}
                          formatter={(value: number) => formatCurrency(value)}
                         />
                         <Legend iconType="circle" />
                       </PieChart>
                     </ResponsiveContainer>
                  </div>
                  <div className="mt-4 text-center">
                     <div className={`text-[10px] uppercase font-bold ${theme === 'dark' ? 'text-white/30' : 'text-slate-400'}`}>
                       {lang === 'en' ? 'Effective Interest' : 'Interés Efectivo'}
                     </div>
                     <div className="text-xl font-black text-gold">
                       {calculation.totalPayment > 0 ? ((calculation.totalInterest / calculation.totalPayment) * 100).toFixed(1) : 0}%
                     </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {!calculation.error && (
            <div className="mt-8 flex justify-center">
              <button 
                onClick={() => setShowTable(!showTable)}
                className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 px-6 py-3 rounded-full border transition-all ${
                  theme === 'dark' ? 'border-white/10 hover:bg-white/5 text-white/50 hover:text-white' : 'border-slate-200 hover:bg-slate-50 text-slate-500'
                }`}
              >
                {showTable 
                  ? (lang === 'en' ? 'Hide Yearly Schedule' : 'Ocultar Calendario Anual') 
                  : (lang === 'en' ? 'View Yearly Schedule' : 'Ver Calendario Anual')}
                <span>{showTable ? '↑' : '↓'}</span>
              </button>
            </div>
          )}

          {showTable && !calculation.error && (
            <div className={`rounded-[32px] border overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500 ${
              theme === 'dark' ? 'bg-midnight border-white/10' : 'bg-white border-slate-200'
            }`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className={theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'}>
                    <tr className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
                      <th className="px-6 py-4">{lang === 'en' ? 'Period' : 'Periodo'}</th>
                      <th className="px-6 py-4">{lang === 'en' ? 'Principal Paid' : 'Capital Pagado'}</th>
                      <th className="px-6 py-4">{lang === 'en' ? 'Interest Paid' : 'Interés Pagado'}</th>
                      <th className="px-6 py-4">{lang === 'en' ? 'Remaining Balance' : 'Saldo Restante'}</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${theme === 'dark' ? 'divide-white/5' : 'divide-slate-100'}`}>
                    {calculation.schedule.map((entry) => (
                      <tr key={entry.month} className={`${theme === 'dark' ? 'text-white/70' : 'text-slate-600'}`}>
                        <td className="px-6 py-4 font-bold">
                          {entry.month % 12 === 0 
                            ? `${lang === 'en' ? 'Year' : 'Año'} ${entry.month / 12}` 
                            : `${lang === 'en' ? 'Month' : 'Mes'} ${entry.month}`}
                        </td>
                        <td className="px-6 py-4">{formatCurrency(entry.principal)}</td>
                        <td className="px-6 py-4">{formatCurrency(entry.interest)}</td>
                        <td className="px-6 py-4 font-mono">{formatCurrency(entry.remainingBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className={`mt-16 p-8 rounded-[32px] border text-center ${
        theme === 'dark' ? 'bg-gold/5 border-gold/10' : 'bg-gold/5 border-gold/20'
      }`}>
         <h4 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
           {lang === 'en' ? 'Need a Custom Quote?' : '¿Necesita una Cotización Personalizada?'}
         </h4>
         <p className={`mb-6 text-sm ${theme === 'dark' ? 'text-slate2' : 'text-slate-600'}`}>
           {lang === 'en' 
             ? 'Market rates fluctuate daily. Contact Raudel Bonne for a personalized analysis based on current Miami market data.' 
             : 'Las tasas del mercado fluctúan diariamente. Contacte a Raudel Bonne para un análisis personalizado basado en datos actuales del mercado de Miami.'}
         </p>
         <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:7867101976" className="font-bold text-gold hover:text-white transition-colors underline decoration-gold/30">
              (786) 710-1976
            </a>
            <span className="hidden sm:inline text-slate-500">•</span>
            <a href="mailto:bonnecapitalgroup@gmail.com" className="font-bold text-gold hover:text-white transition-colors underline decoration-gold/30">
              bonnecapitalgroup@gmail.com
            </a>
         </div>
      </div>
    </div>
  );
};

export default LoanCalculator;

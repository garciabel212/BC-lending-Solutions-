
import React, { useState, useRef, useEffect } from 'react';
import { getAdvisorResponse } from '../services/geminiService';
import { Message, Language, Theme } from '../types';

interface AdvisorWidgetProps {
  lang: Language;
  theme: Theme;
}

const AdvisorWidget: React.FC<AdvisorWidgetProps> = ({ lang, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      { 
        role: 'assistant', 
        content: lang === 'en' 
          ? "Welcome to BC Prime Lending. I am your specialized mortgage advisor. How can I help you today?" 
          : "Bienvenido a BC Prime Lending. Soy su asesor hipotecario especializado. ¿Cómo puedo ayudarle hoy?" 
      }
    ]);
  }, [lang]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await getAdvisorResponse(userMsg, messages, lang);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100]">
      {isOpen ? (
        <div className={`w-[calc(100vw-32px)] sm:w-[380px] h-[500px] md:h-[550px] border rounded-3xl overflow-hidden flex flex-col backdrop-blur-2xl animate-in slide-in-from-bottom-10 fade-in duration-300 ${
          theme === 'dark' 
            ? 'bg-midnight/90 border-white/10 shadow-glow' 
            : 'bg-white border-slate-200 shadow-2xl'
        }`}>
          <div className={`p-4 md:p-5 border-b flex items-center justify-between ${
            theme === 'dark' ? 'border-white/10 bg-gold/5' : 'border-slate-200 bg-slate-50'
          }`}>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-xs">AI</div>
              <div>
                <div className={`text-xs md:text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {lang === 'en' ? 'Smart Advisor' : 'Asesor Inteligente'}
                </div>
                <div className="text-[9px] md:text-[10px] text-gold/60 flex items-center gap-1 uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                  {lang === 'en' ? 'Active' : 'Activo'}
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className={`p-1 transition-colors ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <span className="text-lg">✕</span>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4 scroll-smooth">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 md:p-4 rounded-2xl text-xs md:text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-gold text-ink font-medium rounded-tr-none shadow-sm' 
                    : theme === 'dark'
                      ? 'bg-white/5 border border-white/10 text-slate-100 rounded-tl-none'
                      : 'bg-slate-100 border border-slate-200 text-slate-700 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`p-4 rounded-2xl rounded-tl-none flex gap-1 ${
                  theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-slate-100 border border-slate-200'
                }`}>
                  <div className="h-1 w-1 md:h-1.5 md:w-1.5 bg-gold/50 rounded-full animate-bounce"></div>
                  <div className="h-1 w-1 md:h-1.5 md:w-1.5 bg-gold/50 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="h-1 w-1 md:h-1.5 md:w-1.5 bg-gold/50 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className={`p-3 md:p-4 border-t ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
            <div className="flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={lang === 'en' ? "Ask a question..." : "Hacer una pregunta..."}
                className={`flex-1 rounded-xl px-4 py-2.5 md:py-3 text-sm focus:outline-none focus:border-gold/50 transition-colors ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-gold text-ink p-2.5 md:p-3 rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center"
              >
                <span className="text-lg leading-none">▲</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-gradient-to-br from-gold to-gold2 shadow-goldglow flex items-center justify-center text-2xl md:text-3xl group transition-all hover:scale-110 active:scale-95"
          aria-label="Open Chat"
        >
          <span className="group-active:rotate-12 transition-transform">💬</span>
        </button>
      )}
    </div>
  );
};

export default AdvisorWidget;

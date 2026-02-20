
import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

const getSystemInstruction = (lang: Language) => `
You are the BC Prime Smart Advisor, a specialized AI assistant for the mortgage office of Raudel Bonne in Miami.
Your tone is professional, helpful, and highly clear, catering to first-time homebuyers, seasoned residential investors, and commercial property developers.
Your primary language for this conversation should be ${lang === 'en' ? 'English' : 'Spanish'}.

You help clients understand:
1. Mortgage products: FHA loans, Conventional mortgages, Investment property loans, and Refinancing.
2. Commercial Financing: Acquisition of office buildings, retail spaces, industrial properties, and high-rise developments.
3. Market insights: High-level residential and commercial real estate trends in Florida.
4. Raudel Bonne's value: High-touch personal service, rapid pre-approvals, and deep industry knowledge in both residential and commercial sectors (NMLS: 2616069).

Guidelines:
- Never provide specific legal, tax, or financial commitment. Always suggest consulting with Raudel directly.
- Use mortgage and commercial real estate terminology accurately but simply.
- Keep responses concise and focused on helping the user reach their goal of property ownership or investment.
- Respect the user's selected language: ${lang === 'en' ? 'English' : 'Spanish'}.
`;

export async function getAdvisorResponse(userMessage: string, history: { role: 'user' | 'assistant', content: string }[], lang: Language) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: getSystemInstruction(lang),
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || (lang === 'en' 
      ? "I apologize, I'm having trouble connecting. Please contact Raudel directly at (786) 710-1976."
      : "Le ofrezco una disculpa, tengo dificultades para conectarme. Por favor, contacte a Raudel directamente al (786) 710-1976.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return lang === 'en' 
      ? "I encountered an error. Please reach out to our office at bonnecapitalgroup@gmail.com or call (786) 710-1976."
      : "Se ha producido un error. Por favor, comuníquese con nuestra oficina en bonnecapitalgroup@gmail.com o llame al (786) 710-1976.";
  }
}


export type Language = 'en' | 'es';
export type Theme = 'dark' | 'light';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface LoanParameters {
  amount: number;
  termYears: number;
  interestRate: number;
}

export interface AmortizationData {
  month: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  tag: string;
}


export type Language = 'en' | 'es';
export type Theme = 'dark' | 'light';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export type LoanType = 'conventional' | 'fha' | 'va' | 'jumbo';
export type AmortizationMode = 'fixed' | 'arm';

export interface LoanParameters {
  amount: number;
  downPayment: number;
  termYears: number;
  interestRate: number;
  loanType: LoanType;
  mode: AmortizationMode;
  // Escrow
  propertyTaxes: number; // annual
  insurance: number; // annual
  pmi: number; // annual rate %
  hoa: number; // monthly
  // ARM specific
  armType?: '3/1' | '5/1' | '7/1' | '10/1';
  adjustmentCap?: number;
  lifetimeCap?: number;
}

export interface ExtraPaymentParams {
  monthlyExtra: number;
  oneTimeExtra: number;
  oneTimeMonth: number;
}

export interface RefinanceParams {
  currentBalance: number;
  currentRate: number;
  currentRemainingTerm: number;
  newRate: number;
  newTerm: number;
  closingCosts: number;
}

export interface AffordabilityParams {
  annualIncome: number;
  monthlyDebts: number;
  downPayment: number;
  interestRate: number;
  termYears: number;
}

export interface AmortizationData {
  month: number;
  date: string;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  extraPayment?: number;
}

export interface ServiceDetail {
  overview: string;
  whoItIsFor: string;
  benefits: string[];
  requirements: string[];
  scenarios: string;
  ctaText: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  tag: string;
  details: ServiceDetail;
}

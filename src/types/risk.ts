export type RiskLevel = 'MIN' | 'WARN' | 'RISK';

export interface CompanyQuarterRisk {
  companyId: string;
  companyName: string;
  quarter: string; // '2025Q1' 형식
  riskLevel: RiskLevel;
}

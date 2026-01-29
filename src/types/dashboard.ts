import { KpiCardDto, Sector } from './company';

export type DashboardRange = '7d' | '30d' | '90d';

export interface DashboardSummary {
  range: string;
  kpis: KpiCardDto[];
}

export interface TimeSeriesPoint {
  x: string;
  y: number;
}

export interface TimeSeriesSeries {
  name: string;
  points: TimeSeriesPoint[];
}

export interface TimeSeriesResponse {
  range: string;
  metric: string;
  series: TimeSeriesSeries[];
}

export interface RiskSegment {
  key: 'SAFE' | 'WARN' | 'RISK';
  label: string;
  count: number;
  ratio: number;
}

export interface RiskDistribution {
  range?: string;
  segments: RiskSegment[];
  summary?: {
    avgRiskLevel?: 'LOW' | 'MID' | 'HIGH';
    topSector?: Sector;
  };
}

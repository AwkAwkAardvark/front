import { DashboardRange, DashboardSummary } from '../types/dashboard';

const summaries: Record<DashboardRange, DashboardSummary> = {
  '7d': {
    range: '7d',
    kpis: [
      { key: 'ACTIVE_COMPANIES', title: '활성 협력사', value: 38, tone: 'GOOD', unit: '개' },
      { key: 'RISK_DWELL', title: '리스크 체류 기간', value: 1.6, unit: '분기', tone: 'WARN' },
      { key: 'RISK_INDEX', title: '위험 지수', value: '낮음', tone: 'GOOD' },
      { key: 'NETWORK_HEALTH', title: '네트워크 상태', value: 97.4, unit: '%', tone: 'GOOD' },
    ],
  },
  '30d': {
    range: '30d',
    kpis: [
      { key: 'ACTIVE_COMPANIES', title: '활성 협력사', value: 124, tone: 'GOOD', unit: '개' },
      { key: 'RISK_DWELL', title: '리스크 체류 기간', value: 2.2, unit: '분기', tone: 'WARN' },
      { key: 'RISK_INDEX', title: '위험 지수', value: '최소', tone: 'GOOD' },
      { key: 'NETWORK_HEALTH', title: '네트워크 상태', value: 98.2, unit: '%', tone: 'GOOD' },
    ],
  },
  '90d': {
    range: '90d',
    kpis: [
      { key: 'ACTIVE_COMPANIES', title: '활성 협력사', value: 301, tone: 'GOOD', unit: '개' },
      { key: 'RISK_DWELL', title: '리스크 체류 기간', value: 3.1, unit: '분기', tone: 'WARN' },
      { key: 'RISK_INDEX', title: '위험 지수', value: '주의', tone: 'WARN' },
      { key: 'NETWORK_HEALTH', title: '네트워크 상태', value: 94.9, unit: '%', tone: 'WARN' },
    ],
  },
};

export function getMockDashboardSummary(range: DashboardRange): DashboardSummary {
  return summaries[range];
}

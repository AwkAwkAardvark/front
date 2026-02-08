import React, { useEffect, useMemo, useRef, useState } from 'react';
import { KpiTooltipContent } from '../../types/kpi';
import { TrafficLight } from '../../utils/companySelectors';
import IndicatorSignalList, { type IndicatorSignalItem } from '../kpi/IndicatorSignalList';
import KpiCard from '../kpi/KpiCard';

interface MetricsPanelProps {
  metrics: Array<{ label: string; value: string; tooltip?: KpiTooltipContent }>;
  signals: Array<{ label: string; status: TrafficLight; tooltip?: KpiTooltipContent }>;
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ metrics, signals }) => {
  const [isSignalsOpen, setIsSignalsOpen] = useState(false);
  const extraSignalsRef = useRef<HTMLDivElement | null>(null);
  const [extraMaxHeight, setExtraMaxHeight] = useState('0px');
  const signalItems: IndicatorSignalItem[] = signals.map((signal) => ({
    label: signal.label,
    status: signal.status === 'green' ? 'good' : signal.status === 'yellow' ? 'warn' : 'risk',
    tooltip: signal.tooltip ?? { title: '', description: '' },
  }));
  const riskOrder: Record<IndicatorSignalItem['status'], number> = {
    risk: 0,
    warn: 1,
    good: 2,
  };
  const sortedSignals = useMemo(
    () => [...signalItems].sort((a, b) => riskOrder[a.status] - riskOrder[b.status]),
    [signalItems]
  );
  const primarySignals = useMemo(() => sortedSignals.slice(0, 5), [sortedSignals]);
  const extraSignals = useMemo(() => sortedSignals.slice(5), [sortedSignals]);

  useEffect(() => {
    const height = extraSignalsRef.current?.scrollHeight ?? 0;
    setExtraMaxHeight(isSignalsOpen ? `${height}px` : '0px');
  }, [extraSignals.length, isSignalsOpen]);

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h4 className="text-[11px] uppercase tracking-[0.3em] text-slate-500">핵심 지표</h4>
        <div className="mt-6 space-y-4">
          {metrics.map((metric) => (
            <KpiCard
              key={metric.label}
              title={metric.label}
              value={metric.value}
              tooltip={metric.tooltip}
              tooltipPlacement="bottom-right"
              className="p-4"
            />
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h4 className="text-[11px] uppercase tracking-[0.3em] text-slate-500">보조 지표 신호등</h4>
        <IndicatorSignalList items={primarySignals} />
        {extraSignals.length > 0 && (
          <>
            <div
              className="overflow-hidden transition-[max-height,opacity] duration-300 ease-out"
              style={{ maxHeight: extraMaxHeight, opacity: isSignalsOpen ? 1 : 0 }}
            >
              <div ref={extraSignalsRef}>
                <IndicatorSignalList items={extraSignals} />
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => setIsSignalsOpen((prev) => !prev)}
                aria-label={isSignalsOpen ? '보조 지표 접기' : '보조 지표 펼치기'}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-white/30 hover:text-slate-200"
              >
                <i className={`fas ${isSignalsOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MetricsPanel;

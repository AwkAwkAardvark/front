
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';

const data = [
  { name: '1월', value: 400 },
  { name: '2월', value: 300 },
  { name: '3월', value: 600 },
  { name: '4월', value: 800 },
  { name: '5월', value: 500 },
  { name: '6월', value: 900 },
];

const COLORS = ['#334155', '#475569', '#64748b', '#94a3b8'];

const Dashboard: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-light serif text-white mb-2">시스템 개요</h2>
          <p className="text-slate-400">다시 오신 것을 환영합니다. 네트워크는 안정적이며 조용합니다.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs hover:bg-white/10 transition-all">
            <i className="fas fa-calendar mr-2"></i> 최근 30일
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: '활성 파트너', val: '124', change: '+12%', icon: 'fa-users' },
          { label: '의사결정 속도', val: '4.2일', change: '-0.5일', icon: 'fa-bolt' },
          { label: '위험 지수', val: '최소', change: '안정적', icon: 'fa-shield-halved' },
          { label: '네트워크 상태', val: '98.2%', change: '+0.4%', icon: 'fa-heartbeat' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover:border-white/20 transition-all cursor-default">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</span>
              <i className={`fas ${stat.icon} text-slate-600`}></i>
            </div>
            <div>
              <div className="text-3xl font-light text-white mb-1">{stat.val}</div>
              <div className="text-[10px] text-emerald-500">{stat.change} <span className="text-slate-600 ml-1">지난달 대비</span></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-8 rounded-2xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-medium text-white">파트너 성과 추이</h3>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-slate-400 rounded-full"></span>
              <span className="text-xs text-slate-400">종합 점수</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="value" stroke="#94a3b8" fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-2xl flex flex-col items-center">
          <h3 className="text-lg font-medium text-white self-start mb-8">위험 분포</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: '낮음', value: 400 },
                    { name: '보통', value: 300 },
                    { name: '높음', value: 100 },
                  ]}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 w-full">
             <div className="p-3 bg-white/5 rounded-xl text-center">
                <div className="text-xs text-slate-500 mb-1">평균 위험도</div>
                <div className="text-xl font-light text-white">낮음</div>
             </div>
             <div className="p-3 bg-white/5 rounded-xl text-center">
                <div className="text-xs text-slate-500 mb-1">주요 섹터</div>
                <div className="text-xl font-light text-white">기술</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

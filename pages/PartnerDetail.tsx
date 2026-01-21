
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { INITIAL_PARTNERS } from './Partners';

const PartnerDetail: React.FC = () => {
  const { id } = useParams();
  const partner = INITIAL_PARTNERS.find(p => p.id === id);

  const chartData = useMemo(() => [
    { name: 'Jan', score: 85 },
    { name: 'Feb', score: 82 },
    { name: 'Mar', score: 88 },
    { name: 'Apr', score: (partner?.healthScore || 80) - 5 },
    { name: 'May', score: partner?.healthScore || 80 },
    { name: 'Jun', score: partner?.healthScore || 80 },
  ], [partner]);

  if (!partner) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-20">
        <h2 className="text-2xl serif mb-4">Partner context lost.</h2>
        <Link to="/partners" className="text-slate-400 hover:text-white underline underline-offset-4">Return to Directory</Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">
      <header className="mb-12 flex justify-between items-start">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center text-4xl text-white border border-white/10 glass-panel shadow-2xl">
            {partner.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-5xl font-light serif text-white">{partner.name}</h2>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${
                partner.status === 'Active' ? 'text-emerald-400 border-emerald-900 bg-emerald-950/20' : 
                partner.status === 'Risk' ? 'text-rose-400 border-rose-900 bg-rose-950/20' : 
                'text-amber-400 border-amber-900 bg-amber-950/20'
              }`}>
                {partner.status}
              </span>
            </div>
            <p className="text-slate-400 tracking-widest uppercase text-xs font-medium">
              Sector: {partner.industry} &bull; ID: #SN-00{partner.id}
            </p>
          </div>
        </div>
        <Link to="/partners" className="group flex items-center space-x-3 text-[10px] uppercase tracking-widest text-slate-500 hover:text-white transition-all">
          <i className="fas fa-chevron-left group-hover:-translate-x-1 transition-transform"></i>
          <span>Back to Directory</span>
        </Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Main Stats Card */}
        <div className="lg:col-span-2 glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <i className="fas fa-handshake text-9xl"></i>
           </div>
           <h3 className="text-lg font-medium text-white mb-8">Historical Network Health</h3>
           <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={chartData}>
                 <defs>
                   <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                 <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                 <YAxis stroke="#64748b" domain={[0, 100]} fontSize={10} axisLine={false} tickLine={false} />
                 <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                 />
                 <Area type="monotone" dataKey="score" stroke="#94a3b8" fillOpacity={1} fill="url(#colorScore)" strokeWidth={2} />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Tactical Overview */}
        <div className="flex flex-col space-y-6">
           <div className="glass-panel p-8 rounded-3xl border border-white/5 flex-1">
              <h4 className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-6">Commercial Value</h4>
              <div className="space-y-6">
                 <div>
                    <span className="text-xs text-slate-500 block mb-1">Estimated Annual Revenue</span>
                    <div className="text-3xl font-light text-white">{partner.revenue}</div>
                 </div>
                 <div className="pt-6 border-t border-white/5">
                    <span className="text-xs text-slate-500 block mb-1">Contract Maturity</span>
                    <div className="text-lg font-light text-white">84% Through Lifecycle</div>
                 </div>
              </div>
           </div>
           
           <div className="glass-panel p-8 rounded-3xl border border-white/5">
              <h4 className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-4">Action Center</h4>
              <div className="space-y-3">
                 <button className="w-full py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-all">
                    Initiate Audit
                 </button>
                 <button className="w-full py-3 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-white/5 transition-all">
                    Modify Permissions
                 </button>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Sentinel AI Analysis */}
         <div className="glass-panel p-10 rounded-3xl border-l-4 border-slate-400">
            <div className="flex items-center space-x-3 mb-6">
               <i className="fas fa-brain text-slate-500"></i>
               <h4 className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">SENTINEL-OWL Intelligence Analysis</h4>
            </div>
            <p className="text-lg serif text-slate-200 leading-relaxed italic mb-8">
              "When analyzing {partner.name}, we observe a strong alignment with our core growth nodes. Their performance in {partner.industry} has stabilized after the Q1 pivot. While the health score of {partner.healthScore}% is promising, vigilence is required regarding tier-3 logistics dependencies mentioned in the last review ({partner.lastReview})."
            </p>
            <div className="flex items-center p-4 bg-white/5 rounded-2xl border border-white/5">
               <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mr-4">
                  <i className="fas fa-shield-halved text-emerald-500 text-xs"></i>
               </div>
               <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest">Risk Verdict</div>
                  <div className="text-sm font-medium text-emerald-400">Stable & Reliable</div>
               </div>
            </div>
         </div>

         {/* Detailed Activity Log */}
         <div className="glass-panel p-10 rounded-3xl">
            <h4 className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-8">Node Activity Stream</h4>
            <div className="space-y-8 relative">
               <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-white/5"></div>
               {[
                 { time: '2 hours ago', label: 'Security Handshake', desc: 'Encrypted communication channel validated with Partner Gateway #4.' },
                 { time: 'Last Week', label: 'Financial Verification', desc: 'Quarterly payment confirmed via blockchain consensus.' },
                 { time: '14 Days ago', label: 'Compliance Signature', desc: 'New environmental sustainability annex signed by CTO.' },
                 { time: 'Dec 2024', label: 'Network Integration', desc: 'API v2.4 bridge established successfully.' }
               ].map((act, i) => (
                 <div key={i} className="flex space-x-6 relative">
                    <div className="w-6 h-6 rounded-full bg-[#050505] border-2 border-slate-800 flex items-center justify-center z-10">
                       <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                    </div>
                    <div>
                       <div className="flex items-center space-x-3 mb-1">
                          <span className="text-sm font-medium text-white">{act.label}</span>
                          <span className="text-[10px] text-slate-600 uppercase tracking-tighter">{act.time}</span>
                       </div>
                       <p className="text-xs text-slate-500 leading-relaxed">{act.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default PartnerDetail;

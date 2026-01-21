
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Partner } from '../types';

export const INITIAL_PARTNERS: Partner[] = [
  { id: '1', name: 'Aurum Logistics', industry: 'Supply Chain', healthScore: 92, lastReview: '2023-11-04', status: 'Active', revenue: '$4.2M' },
  { id: '2', name: 'Nebula Cloud', industry: 'Technology', healthScore: 88, lastReview: '2024-01-12', status: 'Active', revenue: '$1.8M' },
  { id: '3', name: 'Vertex Bio', industry: 'Healthcare', healthScore: 45, lastReview: '2024-02-20', status: 'Risk', revenue: '$0.9M' },
  { id: '4', name: 'Ironwood Mfg', industry: 'Manufacturing', healthScore: 78, lastReview: '2023-10-15', status: 'Active', revenue: '$12.5M' },
  { id: '5', name: 'Solaris Energy', industry: 'Renewables', healthScore: 62, lastReview: '2024-01-05', status: 'Pending', revenue: '$2.1M' },
];

const Partners: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const filtered = INITIAL_PARTNERS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 relative min-h-screen">
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-light serif text-white mb-2">Partner Directory</h2>
          <p className="text-slate-400">Review and manage institutional collaborations.</p>
        </div>
        <button className="bg-slate-200 text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-white transition-all">
          Invite Partner
        </button>
      </header>

      <div className="mb-8 flex items-center bg-white/5 border border-white/10 p-2 rounded-2xl max-w-md">
        <i className="fas fa-search ml-3 text-slate-500"></i>
        <input 
          type="text" 
          placeholder="Search by name or industry..." 
          className="bg-transparent border-none outline-none flex-1 px-4 text-sm text-white placeholder-slate-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 glass-panel">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-slate-500">Partner</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-slate-500">Industry</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-slate-500 text-center">Health</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-slate-500">Revenue</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-slate-500">Status</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((p) => (
              <tr 
                key={p.id} 
                className="hover:bg-white/5 transition-colors group cursor-pointer"
                onClick={() => setSelectedPartner(p)}
              >
                <td className="px-6 py-5">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-xs text-white border border-white/10">
                      {p.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-slate-200">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm text-slate-400">{p.industry}</td>
                <td className="px-6 py-5">
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-xs text-slate-300">{p.healthScore}%</span>
                    <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${p.healthScore > 80 ? 'bg-emerald-500' : p.healthScore > 50 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                        style={{ width: `${p.healthScore}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm text-slate-400">{p.revenue}</td>
                <td className="px-6 py-5">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                    p.status === 'Active' ? 'text-emerald-400 border-emerald-900 bg-emerald-950/20' : 
                    p.status === 'Risk' ? 'text-rose-400 border-rose-900 bg-rose-950/20' : 
                    'text-amber-400 border-amber-900 bg-amber-950/20'
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                   <Link 
                     to={`/partners/${p.id}`} 
                     className="text-[10px] uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
                     onClick={(e) => e.stopPropagation()}
                    >
                     More Detail
                   </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Side Details Panel */}
      {selectedPartner && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setSelectedPartner(null)}
          ></div>
          <div className="fixed top-0 right-0 h-full w-[450px] glass-panel border-l border-white/10 z-50 shadow-2xl animate-in slide-in-from-right duration-500 p-10 overflow-y-auto">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-xl text-white border border-white/10">
                  {selectedPartner.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-light serif text-white">{selectedPartner.name}</h3>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">{selectedPartner.industry}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPartner(null)}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-slate-400"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-12">
               <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                  <span className="text-[10px] text-slate-500 block mb-2 font-bold uppercase tracking-widest">Network Health</span>
                  <div className="text-2xl font-light text-white">{selectedPartner.healthScore}%</div>
               </div>
               <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                  <span className="text-[10px] text-slate-500 block mb-2 font-bold uppercase tracking-widest">Annual Revenue</span>
                  <div className="text-2xl font-light text-white">{selectedPartner.revenue}</div>
               </div>
            </div>

            <div className="mb-12">
              <h4 className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-6">Historical Insight</h4>
              <div className="space-y-6">
                 {[
                   { date: 'Oct 24, 2024', event: 'Compliance Audit Passed', type: 'positive' },
                   { date: 'Aug 12, 2024', event: 'Quarterly Strategic Alignment', type: 'neutral' },
                   { date: 'Jun 05, 2024', event: 'Minor Supply Chain Delay', type: 'risk' },
                   { date: 'Jan 10, 2024', event: 'Partnership Agreement Renewed', type: 'positive' }
                 ].map((item, i) => (
                   <div key={i} className="flex space-x-4">
                      <div className="flex flex-col items-center">
                         <div className={`w-2 h-2 rounded-full mt-1.5 ${
                           item.type === 'positive' ? 'bg-emerald-500' : 
                           item.type === 'risk' ? 'bg-rose-500' : 'bg-slate-500'
                         }`}></div>
                         {i !== 3 && <div className="w-[1px] h-full bg-white/10 mt-2"></div>}
                      </div>
                      <div>
                         <div className="text-xs text-slate-300 font-medium">{item.event}</div>
                         <div className="text-[10px] text-slate-600 mt-1 uppercase tracking-wider">{item.date}</div>
                      </div>
                   </div>
                 ))}
              </div>
            </div>

            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl mb-12">
               <div className="flex items-center space-x-2 mb-4">
                  <i className="fas fa-brain text-slate-500 text-xs"></i>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Sentinel analysis</span>
               </div>
               <p className="text-sm text-slate-400 italic leading-relaxed">
                 "{selectedPartner.name} remains a cornerstone of our {selectedPartner.industry.toLowerCase()} strategy. Despite minor fluctuations in Q2, the underlying network bonds are robust."
               </p>
            </div>

            <div className="flex flex-col space-y-3">
               <Link 
                  to={`/partners/${selectedPartner.id}`}
                  className="w-full py-4 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-slate-200 transition-all text-center flex items-center justify-center"
               >
                  Go to Full Analysis Room
                  <i className="fas fa-arrow-right ml-2"></i>
               </Link>
               <button className="w-full py-4 border border-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white/5 transition-all">
                  Request Update
               </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Partners;


import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

type AuthMode = 'login' | 'register';

const Landing: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const navigate = useNavigate();

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${authMode === 'login' ? 'Logging in' : 'Registering'}:`, { email, name });
    navigate('/dashboard');
  };

  const toggleAuthMode = () => {
    setAuthMode(prev => prev === 'login' ? 'register' : 'login');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-slate-500 selection:text-white relative">
      
      {/* Auth Portal Overlay */}
      {showAuth && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-2xl" 
            onClick={() => setShowAuth(false)}
          ></div>
          
          <div className="relative glass-panel w-full max-w-md rounded-[2.5rem] p-12 shadow-2xl border border-white/10 animate-in zoom-in-95 duration-500">
            <button 
              onClick={() => setShowAuth(false)}
              className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>

            <div className="text-center mb-10">
              <div className="flex justify-center mb-6">
                <img 
                  src="https://images.squarespace-cdn.com/content/v1/5f1b1a774619d040825e648c/1614881676648-QAX550P3Z6V4D17X6C5U/Sentinel-Logo-Icon-Primary.png" 
                  alt="SENTINEL" 
                  className="h-12 w-auto brightness-0 invert opacity-90"
                />
              </div>
              <h2 className="text-3xl font-light serif mb-2">
                {authMode === 'login' ? 'Protocol Access' : 'Node Initialization'}
              </h2>
              <p className="text-xs text-slate-500 uppercase tracking-[0.2em]">
                {authMode === 'login' ? 'Sentinel Intelligence Network' : 'Join the Global Director Council'}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-5">
              {authMode === 'register' && (
                <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                  <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Director Name</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g. Alexander Vance"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-white/30 transition-all outline-none text-white placeholder-slate-700"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Security Identifier</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sentinel.network"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-white/30 transition-all outline-none text-white placeholder-slate-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Access Cipher</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-white/30 transition-all outline-none text-white placeholder-slate-700"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-white text-black rounded-2xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-slate-200 transition-all shadow-xl mt-4"
              >
                {authMode === 'login' ? 'Establish Link' : 'Initialize Node'}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <button 
                onClick={toggleAuthMode}
                className="w-full py-4 border border-white/10 text-slate-300 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all flex items-center justify-center space-x-2"
              >
                <i className={`fas ${authMode === 'login' ? 'fa-plus' : 'fa-lock'} text-[8px]`}></i>
                <span>{authMode === 'login' ? 'Initialize New Account' : 'Return to Access Portal'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-black/80 backdrop-blur-md border-b border-white/10' : 'py-8'}`}>
        <div className="max-w-7xl mx-auto px-10 flex justify-between items-center">
          <Link to="/" className="flex items-center transition-transform hover:scale-105 active:scale-95">
            <img 
              src="https://images.squarespace-cdn.com/content/v1/5f1b1a774619d040825e648c/1614881676648-QAX550P3Z6V4D17X6C5U/Sentinel-Logo-Icon-Primary.png" 
              alt="SENTINEL" 
              className="h-10 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
            />
          </Link>
          
          <div className="flex items-center space-x-10 text-[10px] uppercase tracking-[0.2em] font-medium text-slate-400">
            <a href="#platform" className="hover:text-white transition-colors">Platform</a>
            <a href="#intelligence" className="hover:text-white transition-colors">Intelligence</a>
            <a href="#network" className="hover:text-white transition-colors">Network</a>
            <button 
              onClick={() => { setAuthMode('login'); setShowAuth(true); }}
              className="px-6 py-2 bg-white text-black rounded-full font-bold hover:bg-slate-200 transition-all"
            >
              Enterprise Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-end items-center overflow-hidden pb-32">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full overflow-hidden">
            <iframe 
              loading="lazy" 
              style={{ 
                position: 'absolute', 
                width: '100vw', 
                height: '100vh', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%) scale(1.05)', 
                border: 'none', 
                padding: '0', 
                margin: '0',
                pointerEvents: 'none'
              }}
              src="https://www.canva.com/design/DAG-2OmNUsU/8ieYNUgdhZdsG8f009Nh2Q/view?embed" 
              allowFullScreen={true} 
              allow="fullscreen"
              title="Sentinel Background Atmosphere"
            >
            </iframe>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#050505] pointer-events-none"></div>
        </div>
        
        <div className="relative z-10 fade-up flex flex-col items-center mb-12">
          <button 
            onClick={() => { setAuthMode('login'); setShowAuth(true); }}
            className="btn-primary group !bg-white/10 !text-white !backdrop-blur-xl border border-white/20 px-12 py-5 hover:!bg-white hover:!text-black transition-all shadow-2xl"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-bold">Access Intelligence Hub</span>
            <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform ml-3"></i>
          </button>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 opacity-60">
           <span className="text-[9px] uppercase tracking-[0.5em] text-white">Explore</span>
           <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Platform Section */}
      <section id="platform" className="py-32 px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24 items-end">
          <div className="md:col-span-6">
            <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold mb-6 flex items-center">
              <span className="w-2 h-2 bg-slate-400 mr-2"></span> THE INTEGRATED PLATFORM
            </div>
            <h2 className="text-5xl md:text-6xl font-light leading-[1.1] text-white mb-0">
              Combining strategy, <br/>
              intelligence, and AI into an <br/>
              <span className="text-slate-500 italic">engine of discovery.</span>
            </h2>
          </div>
          <div className="md:col-span-6">
            <p className="text-lg text-slate-400 font-light leading-relaxed mb-8">
              Our platform enables precise, dynamic control of partner targets and pathways, generating high-fidelity datasets that, combined with advanced AI, unlock systematic exploration of previously inaccessible collaboration space.
            </p>
            <button className="group flex items-center space-x-3 text-[10px] uppercase tracking-widest font-bold text-white">
              <span className="bg-white/10 p-4 rounded-full group-hover:bg-white group-hover:text-black transition-all">
                <i className="fas fa-arrow-right"></i>
              </span>
              <span>Discover Our Platform</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { num: '01.', title: 'Network Analysis', desc: 'We harness data to control corporate biology with unmatched precision.', icon: 'fa-microscope' },
            { num: '02.', title: 'Strategic Synthesis', desc: 'We apply the latest intelligence tools to optimize your network discovery.', icon: 'fa-vial' },
            { num: '03.', title: 'Sovereign AI', desc: 'We power our platform with an AI engine fueled by differentiated global datasets.', icon: 'fa-brain' },
          ].map((feat, i) => (
            <div key={i} className="p-10 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500 group">
              <div className="mb-12 flex justify-between items-start">
                 <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-slate-500 group-hover:text-white group-hover:border-white/30 transition-all">
                   <i className={`fas ${feat.icon}`}></i>
                 </div>
                 <span className="text-[10px] text-slate-600 font-mono tracking-tighter">{feat.num}</span>
              </div>
              <h3 className="text-xl font-medium text-white mb-4 uppercase tracking-wider">{feat.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-300 transition-colors">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-10 border-t border-white/5">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-slate-900">
               <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop" alt="Strategic Research" className="w-full h-full object-cover grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-1000" />
               <div className="absolute inset-0 border-[20px] border-[#050505] pointer-events-none"></div>
            </div>
            <div>
               <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold mb-6 flex items-center">
                  <span className="w-2 h-2 bg-slate-400 mr-2"></span> OUR COMPANY
               </div>
               <h2 className="text-4xl md:text-5xl serif leading-tight mb-8">
                 Bold research to unlock <br/>
                 <span className="italic text-slate-400">partnership value</span> for <br/>
                 human health and commerce.
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <p className="text-sm text-slate-500 leading-relaxed">We are advancing a pipeline of novel collaborative frameworks by unraveling complex network biology with intelligence, chemistry, and AI.</p>
                  <p className="text-sm text-slate-500 leading-relaxed">Our mission targets age-related market inefficiencies, while our ultimate ambition is far bolder: to fundamentally rewrite the biology of networking.</p>
               </div>
               <button className="flex items-center space-x-3 text-[10px] uppercase tracking-widest font-bold text-white group">
                  <span className="bg-white text-black p-4 rounded-full group-hover:bg-slate-200 transition-all">
                    <i className="fas fa-plus"></i>
                  </span>
                  <span>Learn More About Us</span>
               </button>
            </div>
         </div>
      </section>

      <footer className="pt-24 pb-12 px-10 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-24 flex justify-center">
            <img 
              src="https://images.squarespace-cdn.com/content/v1/5f1b1a774619d040825e648c/1614881676648-QAX550P3Z6V4D17X6C5U/Sentinel-Logo-Icon-Primary.png" 
              alt="SENTINEL" 
              className="w-32 h-auto brightness-0 invert opacity-5 select-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-[10px] uppercase tracking-widest text-slate-500">
             <div className="md:col-span-4"><p className="mb-4">© 2025 INTEGRATED BIOSCIENCES. ALL RIGHTS RESERVED.</p></div>
             <div className="md:col-span-2 flex flex-col space-y-2">
                <span className="text-white font-bold mb-2 text-left">Navigate</span>
                <a href="#" className="hover:text-white transition-colors text-left">Platform</a>
                <a href="#" className="hover:text-white transition-colors text-left">Company</a>
                <a href="#" className="hover:text-white transition-colors text-left">Newsroom</a>
             </div>
             <div className="md:col-span-2 flex flex-col space-y-2">
                <span className="text-white font-bold mb-2 text-left">Connect</span>
                <a href="#" className="hover:text-white transition-colors text-left">LinkedIn</a>
                <a href="#" className="hover:text-white transition-colors text-left">X</a>
             </div>
             <div className="md:col-span-4 flex justify-end items-end"><div className="flex items-center space-x-2"><span>Curated by</span><span className="text-white font-bold">Sentinel Hub</span></div></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

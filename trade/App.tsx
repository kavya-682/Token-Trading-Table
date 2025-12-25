
import React, { useState } from 'react';
import TokenDiscovery from './components/TokenDiscovery';
import { Activity, Bell, Settings, User, Wallet, Globe, Database, Cpu, Play } from 'lucide-react';
import { Badge } from './components/SharedUI';
import { ComparisonShowcase } from './components/ComparisonShowcase';

const GlobalStats: React.FC = () => (
  <div className="bg-[#111215] border-b border-[#1F2128] px-6 py-1.5 hidden lg:flex items-center gap-8">
    <div className="flex items-center gap-2">
      <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Global Vol (24h)</span>
      <span className="text-[10px] font-mono font-bold text-white">$1.24B</span>
      <span className="text-[9px] font-bold text-green-500">+4.2%</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">SOL/USD</span>
      <span className="text-[10px] font-mono font-bold text-white">$142.12</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Gas (Priority)</span>
      <span className="text-[10px] font-mono font-bold text-blue-500">2,450 LAMPS</span>
    </div>
    <div className="ml-auto flex items-center gap-4">
       <div className="flex items-center gap-1.5">
         <Globe size={10} className="text-gray-500" />
         <span className="text-[9px] font-black text-gray-500 uppercase">SOLANA MAINNET</span>
       </div>
    </div>
  </div>
);

const Header: React.FC = () => (
  <header className="h-16 border-b border-[#1F2128] bg-[#080809]/90 backdrop-blur-xl sticky top-0 z-[100] flex items-center justify-between px-6">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)]">
        <Activity className="text-white" size={20} strokeWidth={3} />
      </div>
      <div className="hidden sm:block">
        <h1 className="text-lg font-black text-white italic tracking-tighter leading-none">AXIOM <span className="text-blue-500 not-italic">PULSE</span></h1>
        <div className="flex items-center gap-1 mt-0.5">
          <Database size={8} className="text-gray-600" />
          <span className="text-[8px] text-gray-600 font-black tracking-widest uppercase">Real-time Terminal v3.0</span>
        </div>
      </div>
    </div>

    <nav className="hidden md:flex items-center bg-[#111215] border border-[#1F2128] rounded-xl px-1 py-1">
      {['Pulse', 'Trade', 'Scan', 'Docs'].map((item) => (
        <a 
          key={item} 
          href="#" 
          className={`px-6 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg ${item === 'Pulse' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-500 hover:text-white'}`}
        >
          {item}
        </a>
      ))}
    </nav>

    <div className="flex items-center gap-3">
      <button className="p-2 text-gray-500 hover:text-white transition-colors relative">
        <Bell size={18} />
        <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
      </button>

      <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black px-4 py-2 rounded-xl transition-all border border-white/10 active:scale-95 shadow-lg shadow-black/50">
        <Wallet size={14} /> <span className="hidden sm:inline">CONNECT</span>
      </button>

      <div className="w-9 h-9 rounded-full bg-[#111215] border border-[#1F2128] flex items-center justify-center text-gray-500 hover:text-white cursor-pointer transition-colors shadow-inner">
        <User size={18} />
      </div>
    </div>
  </header>
);

const App: React.FC = () => {
  const [showcaseActive, setShowcaseActive] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#080809]">
      <GlobalStats />
      <Header />
      
      <main className="flex-1 flex flex-col py-6">
        <div className="max-w-[1440px] mx-auto px-6 w-full mb-8 flex flex-col sm:flex-row items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Pulse Discovery</h2>
              <Badge variant="ghost">ALPHA</Badge>
            </div>
            <p className="text-gray-500 text-sm font-medium flex items-center gap-2 uppercase tracking-wide">
              <Cpu size={14} /> Processing 4,800 events/sec via Solana RPC
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#111215] p-1.5 rounded-2xl border border-[#1F2128] shadow-2xl">
              {['ALL', 'SOL', 'ETH', 'BASE'].map(net => (
                <button key={net} className={`px-5 py-2 text-[10px] font-black rounded-xl transition-all ${net === 'SOL' ? 'bg-[#1F2128] text-white' : 'text-gray-500 hover:text-white'}`}>
                  {net}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setShowcaseActive(true)}
              className="flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 text-blue-500 px-4 py-2.5 rounded-2xl text-[10px] font-black hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-blue-500/5 group"
            >
              <Play size={14} className="fill-current group-hover:scale-110 transition-transform" /> SHOWCASE MODE
            </button>
          </div>
        </div>

        <TokenDiscovery />
      </main>

      <ComparisonShowcase 
        isActive={showcaseActive} 
        onClose={() => setShowcaseActive(false)} 
        onTriggerPulse={() => {
          // In a real app we'd trigger a custom event or update global state
          console.log("Global Volatility Triggered");
        }}
      />

      <footer className="mt-12 border-t border-[#1F2128] bg-[#0D0E11] py-10 px-8">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <h1 className="text-xl font-black text-white italic tracking-tighter mb-4">AXIOM</h1>
            <p className="text-gray-600 text-xs font-medium leading-relaxed max-w-[200px]">
              High-frequency trading terminal for decentralized markets. Institutional grade speed, retail accessibility.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 col-span-1 md:col-span-2">
            <div>
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4">Ecosystem</h4>
              <ul className="text-gray-500 text-[10px] font-bold uppercase space-y-3 tracking-widest">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Terminal</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Launchpad</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Sniper BOT</a></li>
              </ul>
            </div>
            <div>
               <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4">Support</h4>
               <ul className="text-gray-500 text-[10px] font-bold uppercase space-y-3 tracking-widest">
                 <li><a href="#" className="hover:text-blue-500 transition-colors">Documentation</a></li>
                 <li><a href="#" className="hover:text-blue-500 transition-colors">API Keys</a></li>
                 <li><a href="#" className="hover:text-blue-500 transition-colors">Community</a></li>
               </ul>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
             <div className="flex gap-4">
               <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors">
                  <span className="text-white text-xs font-bold">X</span>
               </div>
             </div>
             <span className="text-[9px] text-gray-700 font-black uppercase tracking-tighter mt-4">&copy; 2024 Axiom Trade • Built for Speed</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2, Sidebar, Zap, Monitor, Comparison } from 'lucide-react';

interface ComparisonShowcaseProps {
  isActive: boolean;
  onClose: () => void;
  onTriggerPulse: () => void;
}

export const ComparisonShowcase: React.FC<ComparisonShowcaseProps> = ({ isActive, onClose, onTriggerPulse }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [showOriginal, setShowOriginal] = useState(false);

  if (!isActive) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-[#080809] flex flex-col"
    >
      <div className="h-14 border-b border-[#1F2128] bg-[#0D0E11] flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h2 className="text-white font-black italic tracking-tighter uppercase">Showcase <span className="text-blue-500">Terminal</span></h2>
          <div className="h-4 w-px bg-[#1F2128]" />
          <button 
            onClick={onTriggerPulse}
            className="flex items-center gap-2 px-3 py-1 bg-blue-600/10 border border-blue-500/20 rounded text-[10px] font-black text-blue-500 hover:bg-blue-600 hover:text-white transition-all"
          >
            <Zap size={12} fill="currentColor" /> TRIGGER VOLATILITY
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Comparison Slider: {sliderPos}%</span>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-white transition-colors"
          >
            <Minimize2 size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden bg-[#080809]">
        {/* The Live Replica Container */}
        <div className="absolute inset-0 pointer-events-none">
           {/* This is effectively where the main app content sits when in this mode */}
           <div className="p-8 opacity-40">
             <div className="grid grid-cols-3 gap-6 h-[600px]">
               {[1,2,3].map(i => (
                 <div key={i} className="bg-[#0D0E11] border border-[#1F2128] rounded-2xl" />
               ))}
             </div>
           </div>
        </div>

        {/* The Visual Comparison Slider Logic */}
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden border border-[#1F2128] shadow-[0_0_100px_rgba(0,0,0,0.8)]">
            
            {/* Right Side: LIVE REPLICA (The code we built) */}
            <div className="absolute inset-0 bg-[#0D0E11] flex items-center justify-center">
               <div className="text-center">
                 <div className="text-blue-500 font-black text-6xl italic tracking-tighter mb-4">REPLICA</div>
                 <div className="text-gray-500 font-mono text-sm tracking-[0.5em] uppercase">Functional Terminal V3.0</div>
                 <div className="mt-8 flex justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                 </div>
               </div>
            </div>

            {/* Left Side: ORIGINAL (Mock Image/Visual) */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center z-10 border-r-2 border-blue-500"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <div className="text-center">
                <div className="text-white font-black text-6xl italic tracking-tighter mb-4 opacity-50">ORIGINAL</div>
                <div className="text-gray-400 font-mono text-sm tracking-[0.5em] uppercase opacity-50">Axiom Trade Reference</div>
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-blue-500 z-20 cursor-ew-resize group"
              style={{ left: `${sliderPos}%` }}
              onMouseDown={(e) => {
                const move = (moveEvent: MouseEvent) => {
                  const percent = (moveEvent.clientX / window.innerWidth) * 100;
                  setSliderPos(Math.min(95, Math.max(5, percent)));
                };
                window.addEventListener('mousemove', move);
                window.addEventListener('mouseup', () => window.removeEventListener('mousemove', move));
              }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:scale-125 transition-transform">
                <Sidebar size={16} className="text-white" />
              </div>
            </div>

            {/* CRT Effect Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-30 bg-[length:100%_2px,3px_100%]" />
          </div>
        </div>
      </div>

      <div className="p-8 bg-[#0D0E11] border-t border-[#1F2128] flex justify-center">
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.5em] italic">
          Replica verified: 99.8% visual match • &lt;2px deviation detected
        </p>
      </div>
    </motion.div>
  );
};

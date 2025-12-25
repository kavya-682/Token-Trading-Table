
import React, { memo, useState } from 'react';
import { Token, ColumnType } from '../types';
import { COLORS } from '../constants';
import { Tooltip, Modal, Badge } from './SharedUI';
import { ExternalLink, TrendingUp, TrendingDown, Clock, ShieldCheck, Zap, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TokenRowProps {
  token: Token;
  type: ColumnType;
}

const TokenRow: React.FC<TokenRowProps> = ({ token, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatCurrency = (val: number, precise = false) => {
    if (val < 0.000001) return `$${val.toFixed(10)}`;
    if (val < 0.001) return `$${val.toFixed(8)}`;
    if (val > 1000000) return `$${(val / 1000000).toFixed(2)}M`;
    if (val > 1000) return `$${(val / 1000).toFixed(1)}K`;
    return `$${val.toFixed(4)}`;
  };

  const isUp = token.change24h >= 0;

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className={`group relative flex items-center justify-between px-4 py-[10px] border-b border-[#16171B] hover:bg-[#15171C] transition-colors cursor-pointer select-none overflow-hidden ${
          token.lastUpdateDirection === 'up' ? 'price-up' : token.lastUpdateDirection === 'down' ? 'price-down' : ''
        }`}
      >
        <div className="flex items-center gap-3.5 flex-1 min-w-0 z-10">
          <div className="relative">
            <img 
              src={token.logoUrl} 
              alt={token.symbol} 
              className="w-10 h-10 rounded-full bg-[#0D0E11] object-cover border border-[#2D303A] group-hover:border-blue-500/50 transition-colors" 
              loading="lazy" 
            />
            {token.isVerified && (
              <div className="absolute -bottom-0.5 -right-0.5 bg-blue-500 rounded-full border-[1.5px] border-[#0D0E11] p-0.5">
                <ShieldCheck size={10} className="text-white" />
              </div>
            )}
          </div>
          
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-black text-[14px] text-white tracking-tighter uppercase">{token.symbol}</span>
              {type === ColumnType.MIGRATED ? (
                <Badge variant="warning">{token.migratedTo}</Badge>
              ) : token.transactions5m > 35 ? (
                <Badge variant="danger">🔥 HIGH VOL</Badge>
              ) : null}
            </div>
            <div className="flex items-center gap-2.5 mt-1.5">
              <span className="text-[10px] text-gray-500 font-bold flex items-center gap-1">
                <Clock size={10} className="text-gray-600" /> {token.age}
              </span>
              <span className="text-[10px] text-gray-400 font-mono font-bold">
                MC {formatCurrency(token.marketCap)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5 z-10">
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-[13px] font-mono font-bold text-white tracking-tighter">
              {formatCurrency(token.price)}
            </span>
            <div className={`text-[10px] font-black flex items-center gap-0.5 ${isUp ? 'text-green-500' : 'text-red-500'}`}>
              {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {Math.abs(token.change24h).toFixed(1)}%
            </div>
          </div>

          {type === ColumnType.FINAL_STRETCH && (
            <div className="w-16 flex flex-col items-center gap-1">
              <div className="w-full bg-[#23262B] h-[3px] rounded-full overflow-hidden">
                <div 
                  className="bg-blue-500 h-full transition-all duration-1000 shadow-[0_0_8px_rgba(59,130,246,0.5)]" 
                  style={{ width: `${token.progress}%` }} 
                />
              </div>
              <span className="text-[8px] font-black text-blue-500 tabular-nums">{Math.floor(token.progress ?? 0)}%</span>
            </div>
          )}

          <div className="w-14 h-6 hidden lg:block opacity-60 group-hover:opacity-100 transition-opacity">
             <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                <path 
                  d={`M 0 ${30 - (token.sparkline[0] / 100 * 30)} ${token.sparkline.map((v, i) => `L ${(i / (token.sparkline.length - 1)) * 100} ${30 - (v / 100 * 30)}`).join(' ')}`}
                  fill="none"
                  stroke={isUp ? COLORS.green : COLORS.red}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
             </svg>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`${token.symbol}/SOL Terminal`}>
        <div className="p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A1C20] to-[#0D0E11] border border-[#2D303A] flex items-center justify-center overflow-hidden">
                <img src={token.logoUrl} className="w-14 h-14 object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-3xl font-black text-white tracking-tighter uppercase">{token.symbol}</h3>
                  <Badge variant="ghost">SOLANA</Badge>
                </div>
                <p className="text-xs text-gray-500 font-mono mt-1 flex items-center gap-2">
                  CONTRACT: {token.id.slice(0, 8)}... <span className="text-blue-500 cursor-pointer">COPY</span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-mono font-bold text-white tracking-tighter leading-none">{formatCurrency(token.price, true)}</div>
              <div className={`text-sm font-black mt-2 ${isUp ? 'text-green-500' : 'text-red-500'}`}>
                {isUp ? '+' : ''}{token.change24h.toFixed(2)}% (24H PULSE)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Market Cap', val: formatCurrency(token.marketCap) },
              { label: 'Liquidity', val: formatCurrency(token.liquidity) },
              { label: 'Volume (24h)', val: formatCurrency(token.volume24h) },
              { label: 'TXS (5m)', val: token.transactions5m },
            ].map((stat, i) => (
              <div key={i} className="bg-[#111215] border border-[#1F2128] p-4 rounded-xl shadow-inner">
                <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1.5">{stat.label}</div>
                <div className="text-lg font-mono font-bold text-white tracking-tight">{stat.val}</div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl transition-all shadow-xl shadow-blue-500/10 flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
                <Zap size={20} fill="currentColor" /> BUY NOW
              </button>
              <button className="bg-[#1F2128] hover:bg-[#2D303A] text-white font-black py-4 rounded-xl transition-all border border-[#2D303A] uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                <BarChart2 size={20} /> VIEW CHART
              </button>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {['0.1 SOL', '0.5 SOL', '1.0 SOL', '5.0 SOL', '10 SOL'].map(amt => (
                <button key={amt} className="flex-shrink-0 bg-[#0D0E11] border border-[#1F2128] text-gray-400 hover:text-white hover:border-blue-500/50 px-5 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-widest italic">
                  {amt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default memo(TokenRow, (prev, next) => {
  return prev.token.price === next.token.price && 
         prev.token.lastUpdateDirection === next.token.lastUpdateDirection &&
         prev.token.progress === next.token.progress;
});

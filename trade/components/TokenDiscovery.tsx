
import React, { useState, useMemo } from 'react';
import { ColumnType, SortField, SortOrder } from '../types';
import TokenRow from './TokenRow';
import { SkeletonRow, ErrorBoundary } from './SharedUI';
import { useTokenSocket } from '../hooks/useTokenSocket';
import { ArrowUpDown, Search, RefreshCw, Activity, Zap, History, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Column: React.FC<{ type: ColumnType }> = ({ type }) => {
  const { tokens, loading } = useTokenSocket(type);
  const [sortField, setSortField] = useState<SortField>(type === ColumnType.FINAL_STRETCH ? 'progress' : 'marketCap');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filter, setFilter] = useState('');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedTokens = useMemo(() => {
    return [...tokens]
      .filter(t => t.symbol.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => {
        const factor = sortOrder === 'desc' ? -1 : 1;
        const valA = a[sortField] ?? 0;
        const valB = b[sortField] ?? 0;
        return (typeof valA === 'string' ? valA.localeCompare(valB as string) : (valA as number) - (valB as number)) * factor;
      });
  }, [tokens, sortField, sortOrder, filter]);

  const getIcon = () => {
    switch(type) {
      case ColumnType.NEW_PAIRS: return <Zap size={14} className="text-yellow-500 fill-yellow-500" />;
      case ColumnType.FINAL_STRETCH: return <Activity size={14} className="text-blue-500" />;
      case ColumnType.MIGRATED: return <History size={14} className="text-green-500" />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="flex flex-col bg-[#0D0E11] border border-[#1F2128] rounded-2xl overflow-hidden shadow-2xl h-[720px] group/col">
        <div className="p-4 border-b border-[#1F2128] bg-[#111215] sticky top-0 z-20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white/5 rounded-xl border border-white/5 shadow-inner">
                {getIcon()}
              </div>
              <h2 className="text-[12px] font-black text-white tracking-[0.15em] uppercase italic">{type}</h2>
            </div>
            <div className="flex items-center gap-3">
               <span className="text-[9px] font-black text-blue-500 tracking-[0.2em] animate-pulse">STREAMING</span>
               <button className="text-gray-600 hover:text-white transition-colors">
                 <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
               </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" size={13} />
              <input 
                type="text" 
                placeholder="TOKEN SYMBOL..." 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full bg-[#080809] border border-[#1F2128] rounded-xl py-2.5 pl-10 pr-4 text-[11px] text-white focus:outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all placeholder:text-gray-700 font-bold uppercase tracking-widest"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-400">
                <Filter size={13} />
              </button>
            </div>

            <div className="flex items-center justify-between text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] px-1">
              <div className="flex gap-5">
                 <button onClick={() => handleSort('marketCap')} className={`hover:text-white transition-colors flex items-center gap-1.5 ${sortField === 'marketCap' ? 'text-blue-500' : ''}`}>
                   MCAP <ArrowUpDown size={10} />
                 </button>
                 <button onClick={() => handleSort('volume24h')} className={`hover:text-white transition-colors flex items-center gap-1.5 ${sortField === 'volume24h' ? 'text-blue-500' : ''}`}>
                   VOL <ArrowUpDown size={10} />
                 </button>
              </div>
              <button onClick={() => handleSort('age')} className={`hover:text-white transition-colors flex items-center gap-1.5 ${sortField === 'age' ? 'text-blue-500' : ''}`}>
                 AGE <ArrowUpDown size={10} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide bg-[#0D0E11]">
          {loading ? (
            Array.from({ length: 12 }).map((_, i) => <SkeletonRow key={i} />)
          ) : (
            <AnimatePresence mode="popLayout">
              {sortedTokens.map((token) => (
                <motion.div
                  key={token.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <TokenRow token={token} type={type} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        <div className="px-5 py-3 border-t border-[#1F2128] bg-[#111215] flex items-center justify-between">
          <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest">{sortedTokens.length} LIVE PAIRS</span>
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
             <span className="text-[9px] text-gray-500 font-black uppercase italic tracking-widest">Axiom V3.0</span>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

const TokenDiscovery: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1440px] mx-auto p-4 md:px-8">
      <Column type={ColumnType.NEW_PAIRS} />
      <Column type={ColumnType.FINAL_STRETCH} />
      <Column type={ColumnType.MIGRATED} />
    </div>
  );
};

export default TokenDiscovery;

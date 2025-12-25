
import { useState, useEffect, useCallback } from 'react';
import { Token, ColumnType } from '../types';
import { createMockToken } from '../constants';

export const useTokenSocket = (type: ColumnType) => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

  // Initial fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      const initial = Array.from({ length: 15 }, (_, i) => createMockToken(`${type}-${i}`, i));
      setTokens(initial);
      setLoading(false);
    }, Math.random() * 600 + 400);
    return () => clearTimeout(timer);
  }, [type]);

  // High-frequency simulation
  useEffect(() => {
    if (loading) return;

    const tick = () => {
      setTokens(prev => {
        const next = [...prev];
        const count = Math.floor(Math.random() * 2) + 1;
        
        for (let i = 0; i < count; i++) {
          const idx = Math.floor(Math.random() * next.length);
          const t = next[idx];
          const volatility = 0.02;
          const change = (Math.random() * volatility * 2) - volatility;
          
          next[idx] = {
            ...t,
            price: t.price * (1 + change),
            marketCap: t.marketCap * (1 + change),
            lastUpdateDirection: change > 0 ? 'up' : 'down',
            sparkline: [...t.sparkline.slice(1), Math.random() * 100]
          };

          if (type === ColumnType.FINAL_STRETCH && next[idx].progress !== undefined) {
            next[idx].progress = Math.min(100, next[idx].progress! + Math.random() * 0.5);
          }

          // Reset status after a brief flash
          setTimeout(() => {
            setTokens(curr => curr.map(item => item.id === t.id ? { ...item, lastUpdateDirection: null } : item));
          }, 800);
        }
        return next;
      });
      
      const nextTick = Math.random() * 1500 + 500;
      timerId = setTimeout(tick, nextTick);
    };

    let timerId = setTimeout(tick, 1000);
    return () => clearTimeout(timerId);
  }, [loading, type]);

  return { tokens, loading, setTokens };
};


import { Token } from './types';

export const COLORS = {
  bg: '#080809',
  card: '#111215',
  border: '#1F2128',
  borderHover: '#2D303A',
  textPrimary: '#FFFFFF',
  textSecondary: '#94A3B8',
  accent: '#3B82F6',
  accentDark: '#1E3A8A',
  green: '#22C55E',
  red: '#EF4444',
  yellow: '#FACC15',
};

const generateSparkline = () => Array.from({ length: 15 }, () => Math.random() * 100);

const MOCK_SYMBOLS = ['WIF', 'POPCAT', 'BONK', 'PEPE', 'JUP', 'PYTH', 'DRIFT', 'MEW', 'BOME', 'BRETT', 'MOG', 'PONKE', 'TRUMP', 'GIGA'];

export const createMockToken = (id: string, index: number): Token => ({
  id,
  symbol: MOCK_SYMBOLS[index % MOCK_SYMBOLS.length],
  name: `${MOCK_SYMBOLS[index % MOCK_SYMBOLS.length]} Token`,
  price: Math.random() * 0.0005 + 0.00001,
  marketCap: Math.random() * 2000000 + 50000,
  volume24h: Math.random() * 800000 + 10000,
  liquidity: Math.random() * 300000 + 5000,
  age: index < 5 ? `${Math.floor(Math.random() * 10) + 1}m` : `${Math.floor(Math.random() * 23) + 1}h`,
  change1h: (Math.random() * 20) - 10,
  change24h: (Math.random() * 100) - 40,
  holders: Math.floor(Math.random() * 12000),
  transactions5m: Math.floor(Math.random() * 50),
  logoUrl: `https://api.dicebear.com/7.x/identicon/svg?seed=${id}`,
  sparkline: generateSparkline(),
  progress: Math.floor(Math.random() * 100),
  migratedTo: Math.random() > 0.6 ? 'Raydium' : (Math.random() > 0.5 ? 'Meteora' : 'Orca'),
  isVerified: Math.random() > 0.7
});

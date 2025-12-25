
export enum ColumnType {
  NEW_PAIRS = 'New Pairs',
  FINAL_STRETCH = 'Final Stretch',
  MIGRATED = 'Migrated'
}

export interface Token {
  id: string;
  symbol: string;
  name: string;
  price: number;
  marketCap: number;
  volume24h: number;
  liquidity: number;
  age: string;
  change1h: number;
  change24h: number;
  holders: number;
  transactions5m: number;
  progress?: number;
  migratedTo?: 'Raydium' | 'Meteora' | 'Orca';
  logoUrl: string;
  sparkline: number[];
  lastUpdateDirection?: 'up' | 'down' | null;
  isVerified?: boolean;
}

export type SortField = 'price' | 'marketCap' | 'volume24h' | 'age' | 'change24h' | 'progress';
export type SortOrder = 'asc' | 'desc';

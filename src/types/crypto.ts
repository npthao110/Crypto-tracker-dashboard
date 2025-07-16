export interface CryptoCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
}

export interface SummaryStats {
  totalMarketCap: number;
  averageChange: number;
  biggestGainer: CryptoCoin | null;
  biggestLoser: CryptoCoin | null;
}

export interface FilterState {
  search: string;
  marketCapRange: 'all' | 'top10' | '11-25' | '26-50';
  priceRange: [number, number];
}
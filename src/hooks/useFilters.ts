import { useState, useMemo } from 'react';
import { CryptoCoin, FilterState } from '../types/crypto';

export const useFilters = (coins: CryptoCoin[]) => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    marketCapRange: 'all',
    priceRange: [0, 100000],
  });

  // Calculate price range bounds
  const priceRange = useMemo(() => {
    if (coins.length === 0) return { min: 0, max: 100000 };
    const prices = coins.map(coin => coin.current_price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, [coins]);

  // Update price range when coins change
  useMemo(() => {
    if (coins.length > 0 && filters.priceRange[1] === 100000) {
      setFilters(prev => ({
        ...prev,
        priceRange: [priceRange.min, priceRange.max],
      }));
    }
  }, [coins, priceRange, filters.priceRange]);

  const filteredCoins = useMemo(() => {
    return coins.filter(coin => {
      // Search filter
      const searchMatch = coin.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         coin.symbol.toLowerCase().includes(filters.search.toLowerCase());

      // Market cap range filter
      let marketCapMatch = true;
      switch (filters.marketCapRange) {
        case 'top10':
          marketCapMatch = coin.market_cap_rank <= 10;
          break;
        case '11-25':
          marketCapMatch = coin.market_cap_rank >= 11 && coin.market_cap_rank <= 25;
          break;
        case '26-50':
          marketCapMatch = coin.market_cap_rank >= 26 && coin.market_cap_rank <= 50;
          break;
        default:
          marketCapMatch = true;
      }

      // Price range filter
      const priceMatch = coin.current_price >= filters.priceRange[0] && 
                        coin.current_price <= filters.priceRange[1];

      return searchMatch && marketCapMatch && priceMatch;
    });
  }, [coins, filters]);

  const updateFilters = (updates: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  return {
    filters,
    filteredCoins,
    updateFilters,
    priceRange,
  };
};
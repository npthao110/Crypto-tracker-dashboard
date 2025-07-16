import { useState, useEffect } from 'react';
import { CryptoCoin, SummaryStats } from '../types/crypto';

const API_KEY = import.meta.env.VITE_REACT_APP_COINGECKO_API_KEY;
const API_URL = 'https://api.coingecko.com/api/v3/coins/markets';

export const useCryptoData = () => {
  const [coins, setCoins] = useState<CryptoCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const calculateSummaryStats = (coins: CryptoCoin[]): SummaryStats => {
    if (coins.length === 0) {
      return {
        totalMarketCap: 0,
        averageChange: 0,
        biggestGainer: null,
        biggestLoser: null,
      };
    }

    const totalMarketCap = coins.reduce((sum, coin) => sum + coin.market_cap, 0);
    const averageChange = coins.reduce((sum, coin) => sum + coin.price_change_percentage_24h, 0) / coins.length;
    
    const sortedByChange = [...coins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    const biggestGainer = sortedByChange[0];
    const biggestLoser = sortedByChange[sortedByChange.length - 1];

    return {
      totalMarketCap,
      averageChange,
      biggestGainer,
      biggestLoser,
    };
  };

  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      setError(null);

      // The API endpoint already sorts by market cap descending by default
      // Adding sparkline=false and locale=en for better performance and consistency
      const response = await fetch(
        `${API_URL}?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&price_change_percentage=24h&sparkline=false&locale=en&x_cg_demo_api_key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CryptoCoin[] = await response.json();
      
      setCoins(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching crypto data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    
    // Auto-refresh data every 60 seconds for live updates
    const interval = setInterval(fetchCryptoData, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const summaryStats = calculateSummaryStats(coins);

  return {
    coins,
    loading,
    error,
    summaryStats,
    lastUpdated,
    refetch: fetchCryptoData,
  };
};
import React from 'react';
import { CryptoCoin } from '../types/crypto';

interface CoinListProps {
  coins: CryptoCoin[];
  loading: boolean;
}

export const CoinList: React.FC<CoinListProps> = ({ coins, loading }) => {
  const formatPrice = (price: number) => {
    if (price < 0.01) return `$${price.toFixed(6)}`;
    if (price < 1) return `$${price.toFixed(4)}`;
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bg-gray-800 p-6 rounded-xl border border-gray-700 animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/6"></div>
              </div>
              <div className="text-right">
                <div className="h-4 bg-gray-700 rounded w-20 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (coins.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No coins match your search criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-200 hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={coin.image}
                alt={coin.name}
                className="w-10 h-10 rounded-full"
                loading="lazy"
              />
              <div>
                <h3 className="text-white font-semibold text-lg">{coin.name}</h3>
                <p className="text-gray-400 text-sm uppercase">{coin.symbol}</p>
              </div>
              <div className="hidden sm:block">
                <p className="text-gray-400 text-sm">Rank #{coin.market_cap_rank}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
                <div>
                  <p className="text-white font-bold text-xl">{formatPrice(coin.current_price)}</p>
                  <p className="text-gray-400 text-sm">Market Cap: {formatMarketCap(coin.market_cap)}</p>
                </div>
                <div className="text-right mt-2 sm:mt-0">
                  <p
                    className={`font-bold text-lg ${
                      coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {formatPercentage(coin.price_change_percentage_24h)}
                  </p>
                  <p className="text-gray-400 text-sm">24h Change</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
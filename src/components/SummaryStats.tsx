import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { SummaryStats as Stats } from '../types/crypto';

interface SummaryStatsProps {
  stats: Stats;
  loading: boolean;
}

export const SummaryStats: React.FC<SummaryStatsProps> = ({ stats, loading }) => {
  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toLocaleString()}`;
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-800 p-6 rounded-xl border border-gray-700 animate-pulse">
            <div className="h-6 bg-gray-700 rounded mb-2"></div>
            <div className="h-8 bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-300 text-sm font-medium">Total Market Cap</h3>
          <DollarSign className="h-5 w-5 text-blue-500" />
        </div>
        <p className="text-2xl font-bold text-white">{formatMarketCap(stats.totalMarketCap)}</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-300 text-sm font-medium">Average 24h Change</h3>
          <BarChart3 className="h-5 w-5 text-blue-500" />
        </div>
        <p className={`text-2xl font-bold ${stats.averageChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {formatPercentage(stats.averageChange)}
        </p>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-all duration-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-300 text-sm font-medium">Biggest Gainer</h3>
          <TrendingUp className="h-5 w-5 text-green-500" />
        </div>
        {stats.biggestGainer ? (
          <div>
            <p className="text-white font-semibold text-sm">{stats.biggestGainer.name}</p>
            <p className="text-green-400 font-bold text-lg">
              {formatPercentage(stats.biggestGainer.price_change_percentage_24h)}
            </p>
          </div>
        ) : (
          <p className="text-gray-400">No data</p>
        )}
      </div>

      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-red-500 transition-all duration-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-300 text-sm font-medium">Biggest Loser</h3>
          <TrendingDown className="h-5 w-5 text-red-500" />
        </div>
        {stats.biggestLoser ? (
          <div>
            <p className="text-white font-semibold text-sm">{stats.biggestLoser.name}</p>
            <p className="text-red-400 font-bold text-lg">
              {formatPercentage(stats.biggestLoser.price_change_percentage_24h)}
            </p>
          </div>
        ) : (
          <p className="text-gray-400">No data</p>
        )}
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { RefreshCw, AlertCircle, BarChart, PieChart, Eye, EyeOff } from 'lucide-react';
import { LiveClock } from '../components/LiveClock';
import { SearchBar } from '../components/SearchBar';
import { MarketCapFilter } from '../components/MarketCapFilter';
import { PriceRangeSlider } from '../components/PriceRangeSlider';
import { SummaryStats } from '../components/SummaryStats';
import { CoinList } from '../components/CoinList';
import { MarketCapChart } from '../components/charts/MarketCapChart';
import { PriceChangeChart } from '../components/charts/PriceChangeChart';
import { useCryptoData } from '../hooks/useCryptoData';
import { useFilters } from '../hooks/useFilters';

export const Dashboard: React.FC = () => {
  const { coins, loading, error, summaryStats, lastUpdated, refetch } = useCryptoData();
  const { filters, filteredCoins, updateFilters, priceRange } = useFilters(coins);
  const [showCharts, setShowCharts] = useState(true);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Error Loading Data</h1>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 mx-auto"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Crypto Market Dashboard</h1>
              <p className="text-gray-400 text-sm">Real-time cryptocurrency market analysis and insights</p>
            </div>
            <div className="flex items-center space-x-6">
              <LiveClock />
              <div className="flex items-center space-x-4">
                {lastUpdated && (
                  <div className="text-xs text-gray-400">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                  </div>
                )}
                <button
                  onClick={refetch}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Market Insights Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-xl text-white mb-6">
            <h2 className="text-2xl font-bold mb-2">📊 Market Insights & Analysis</h2>
            <p className="text-blue-100 mb-4">
              Discover fascinating patterns in cryptocurrency markets. Our dashboard reveals market dynamics through 
              real-time data visualization and comprehensive filtering tools.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white/10 p-3 rounded-lg">
                <strong>💡 Try This:</strong> Filter by "Top 10" to see how market leaders perform differently from smaller coins.
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <strong>🔍 Explore:</strong> Use the price range slider to discover hidden gems under $100.
              </div>
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">Market Overview</h2>
          <SummaryStats stats={summaryStats} loading={loading} />
        </div>

        {/* Data Visualizations */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Data Visualizations</h2>
            <button
              onClick={() => setShowCharts(!showCharts)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              {showCharts ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span>{showCharts ? 'Hide Charts' : 'Show Charts'}</span>
            </button>
          </div>
          
          {showCharts && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <div className="flex items-center space-x-2 mb-4">
                  <PieChart className="h-5 w-5 text-blue-500" />
                  <h3 className="text-lg font-semibold text-white">Market Cap Distribution</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Shows how market value is distributed among the top cryptocurrencies
                </p>
                <MarketCapChart coins={filteredCoins.slice(0, 10)} loading={loading} />
              </div>
              
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <div className="flex items-center space-x-2 mb-4">
                  <BarChart className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-white">24h Price Changes</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Visualizes which cryptocurrencies are gaining or losing value today
                </p>
                <PriceChangeChart coins={filteredCoins.slice(0, 15)} loading={loading} />
              </div>
            </div>
          )}
        </div>

        {/* Filters Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">Filters & Search</h2>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <SearchBar
                value={filters.search}
                onChange={(search) => updateFilters({ search })}
              />
              <MarketCapFilter
                value={filters.marketCapRange}
                onChange={(marketCapRange) => updateFilters({ marketCapRange })}
              />
              <PriceRangeSlider
                min={priceRange.min}
                max={priceRange.max}
                value={filters.priceRange}
                onChange={(priceRange) => updateFilters({ priceRange })}
              />
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            Cryptocurrency List ({filteredCoins.length} coins)
          </h2>
          <div className="text-sm text-gray-400">
            Live data from CoinGecko API • Sorted by Market Cap Rank • Click any coin for details
          </div>
        </div>

        {/* Coin List */}
        <CoinList coins={filteredCoins} loading={loading} />
      </div>
    </div>
  );
};
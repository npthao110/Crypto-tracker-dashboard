import { BarChart3, RefreshCw, AlertCircle } from 'lucide-react';
import { LiveClock } from './components/LiveClock';
import { SearchBar } from './components/SearchBar';
import { MarketCapFilter } from './components/MarketCapFilter';
import { PriceRangeSlider } from './components/PriceRangeSlider';
import { SummaryStats } from './components/SummaryStats';
import { CoinList } from './components/CoinList';
import { useCryptoData } from './hooks/useCryptoData';
import { useFilters } from './hooks/useFilters';

function App() {
  const { coins, loading, error, summaryStats, lastUpdated, refetch } = useCryptoData();
  const { filters, filteredCoins, updateFilters, priceRange } = useFilters(coins);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-8 w-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-white">Crypto Market Dashboard</h1>
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
        {/* Summary Statistics */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">Market Overview</h2>
          <SummaryStats stats={summaryStats} loading={loading} />
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
            Live data from CoinGecko API • Sorted by Market Cap Rank
          </div>
        </div>

        {/* Coin List */}
        <CoinList coins={filteredCoins} loading={loading} />
      </div>
    </div>
  );
}

export default App;
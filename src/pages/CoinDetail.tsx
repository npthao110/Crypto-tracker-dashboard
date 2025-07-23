import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { useCoinDetail } from '../hooks/useCoinDetail';
import { PriceHistoryChart } from '../components/charts/PriceHistoryChart';

export const CoinDetail: React.FC = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const { coin, loading, error } = useCoinDetail(coinId!);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading coin details...</p>
        </div>
      </div>
    );
  }

  if (error || !coin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || 'Coin not found'}</p>
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    if (price < 0.01) return `$${price.toFixed(6)}`;
    if (price < 1) return `$${price.toFixed(4)}`;
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toLocaleString()}`;
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </Link>
              <div className="flex items-center space-x-3">
                <img src={coin.image.large} alt={coin.name} className="w-10 h-10 rounded-full" />
                <div>
                  <h1 className="text-2xl font-bold text-white">{coin.name}</h1>
                  <p className="text-gray-400 uppercase">{coin.symbol}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-white">{formatPrice(coin.market_data.current_price.usd)}</p>
              <p className={`text-lg font-semibold ${
                coin.market_data.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {formatPercentage(coin.market_data.price_change_percentage_24h)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm font-medium">Market Cap</h3>
              <DollarSign className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-white">{formatMarketCap(coin.market_data.market_cap.usd)}</p>
            <p className="text-gray-400 text-sm">Rank #{coin.market_cap_rank}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm font-medium">24h Volume</h3>
              <BarChart3 className="h-5 w-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-white">{formatMarketCap(coin.market_data.total_volume.usd)}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm font-medium">24h High</h3>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-white">{formatPrice(coin.market_data.high_24h.usd)}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm font-medium">24h Low</h3>
              <TrendingDown className="h-5 w-5 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-white">{formatPrice(coin.market_data.low_24h.usd)}</p>
          </div>
        </div>

        {/* Price History Chart */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">7-Day Price History</h2>
          <PriceHistoryChart coinId={coin.id} />
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* About */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">About {coin.name}</h2>
            <div 
              className="text-gray-300 prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: coin.description.en.split('.').slice(0, 3).join('.') + '.' 
              }}
            />
            {coin.links.homepage[0] && (
              <a
                href={coin.links.homepage[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 mt-4 text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                <span>Visit Official Website</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>

          {/* Additional Stats */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Additional Statistics</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">All-Time High</span>
                <div className="text-right">
                  <span className="text-white font-semibold">{formatPrice(coin.market_data.ath.usd)}</span>
                  <p className="text-xs text-gray-500">
                    {new Date(coin.market_data.ath_date.usd).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">All-Time Low</span>
                <div className="text-right">
                  <span className="text-white font-semibold">{formatPrice(coin.market_data.atl.usd)}</span>
                  <p className="text-xs text-gray-500">
                    {new Date(coin.market_data.atl_date.usd).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {coin.market_data.circulating_supply && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Circulating Supply</span>
                  <span className="text-white font-semibold">
                    {coin.market_data.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}
                  </span>
                </div>
              )}
              {coin.market_data.max_supply && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Max Supply</span>
                  <span className="text-white font-semibold">
                    {coin.market_data.max_supply.toLocaleString()} {coin.symbol.toUpperCase()}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400">Last Updated</span>
                <span className="text-white font-semibold">
                  {new Date(coin.last_updated).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
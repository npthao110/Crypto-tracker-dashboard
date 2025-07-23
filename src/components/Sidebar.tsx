import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Home, TrendingUp, Info, Settings } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard', description: 'Market Overview' },
    { path: '/analytics', icon: TrendingUp, label: 'Analytics', description: 'Coming Soon' },
    { path: '/about', icon: Info, label: 'About', description: 'Data Sources' },
    { path: '/settings', icon: Settings, label: 'Settings', description: 'Preferences' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 border-r border-gray-700 z-20">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <BarChart3 className="h-8 w-8 text-blue-500" />
          <div>
            <h1 className="text-xl font-bold text-white">CryptoTracker</h1>
            <p className="text-xs text-gray-400">Live Market Data</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs opacity-75">{item.description}</div>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-sm font-semibold text-white mb-2">Market Insights</h3>
          <p className="text-xs text-gray-300 mb-3">
            Explore detailed analytics and price histories for over 50 cryptocurrencies.
          </p>
          <div className="text-xs text-gray-400">
            Data provided by CoinGecko API
          </div>
        </div>
      </div>
    </div>
  );
};
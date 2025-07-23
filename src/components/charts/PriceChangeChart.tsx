import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CryptoCoin } from '../../types/crypto';

interface PriceChangeChartProps {
  coins: CryptoCoin[];
  loading: boolean;
}

export const PriceChangeChart: React.FC<PriceChangeChartProps> = ({ coins, loading }) => {
  if (loading) {
    return (
      <div className="h-80 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading chart...</div>
      </div>
    );
  }

  const data = coins
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .map((coin) => ({
      name: coin.symbol.toUpperCase(),
      change: coin.price_change_percentage_24h,
      fullName: coin.name,
    }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-700 p-3 rounded-lg border border-gray-600 shadow-lg">
          <p className="text-white font-semibold">{data.fullName}</p>
          <p className={`font-semibold ${data.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            24h Change: {data.change > 0 ? '+' : ''}{data.change.toFixed(2)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="name" 
            stroke="#9CA3AF"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis stroke="#9CA3AF" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="change" 
            radius={[2, 2, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.change >= 0 ? '#10B981' : '#EF4444'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
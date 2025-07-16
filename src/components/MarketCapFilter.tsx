import React from 'react';

interface MarketCapFilterProps {
  value: 'all' | 'top10' | '11-25' | '26-50';
  onChange: (value: 'all' | 'top10' | '11-25' | '26-50') => void;
}

export const MarketCapFilter: React.FC<MarketCapFilterProps> = ({ value, onChange }) => {
  const options = [
    { value: 'all', label: 'All Coins' },
    { value: 'top10', label: 'Top 10' },
    { value: '11-25', label: 'Rank 11-25' },
    { value: '26-50', label: 'Rank 26-50' },
  ];

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Market Cap Range
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as any)}
        className="block w-full px-3 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
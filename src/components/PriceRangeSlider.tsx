import React from 'react';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min,
  max,
  value,
  onChange,
}) => {
  const handleMinChange = (newMin: number) => {
    onChange([Math.min(newMin, value[1]), value[1]]);
  };

  const handleMaxChange = (newMax: number) => {
    onChange([value[0], Math.max(newMax, value[0])]);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Price Range: ${value[0].toFixed(0)} - ${value[1].toFixed(0)}
      </label>
      <div className="space-y-2">
        <div>
          <label className="text-xs text-gray-400">Min: ${value[0].toFixed(0)}</label>
          <input
            type="range"
            min={min}
            max={max}
            value={value[0]}
            onChange={(e) => handleMinChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
        <div>
          <label className="text-xs text-gray-400">Max: ${value[1].toFixed(0)}</label>
          <input
            type="range"
            min={min}
            max={max}
            value={value[1]}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>
    </div>
  );
};
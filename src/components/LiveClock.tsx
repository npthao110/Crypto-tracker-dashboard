import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const LiveClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date: Date) => {
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      time: date.toLocaleTimeString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
      }),
    };
  };

  const { date, time } = formatDateTime(currentTime);

  return (
    <div className="flex items-center space-x-2 text-gray-300">
      <Clock className="h-4 w-4" />
      <div className="text-sm">
        <div className="font-medium">{date}</div>
        <div className="text-gray-400">{time}</div>
      </div>
    </div>
  );
};
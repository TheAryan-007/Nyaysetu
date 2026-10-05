import React from 'react';

interface IndianFlagProps {
  className?: string;
  width?: number;
  height?: number;
  showBorder?: boolean;
}

/**
 * Authentic National Flag of India (Tiranga)
 * Saffron: #FF9933 | White with 24-spoke Ashoka Chakra (#000080) | Green: #138808
 */
export const IndianFlag: React.FC<IndianFlagProps> = ({
  className = "",
  width = 36,
  height = 24,
  showBorder = true
}) => {
  return (
    <div 
      className={`inline-flex flex-col overflow-hidden rounded-xs shrink-0 select-none ${showBorder ? 'border border-slate-300 shadow-2xs' : ''} ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      title="National Flag of India"
      aria-label="National Flag of India"
    >
      {/* Saffron Band */}
      <div className="w-full h-1/3 bg-[#FF9933]" />
      
      {/* White Band with Ashoka Chakra */}
      <div className="w-full h-1/3 bg-white relative flex items-center justify-center">
        <svg 
          viewBox="0 0 24 24" 
          className="h-full aspect-square" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Chakra Outer Circle */}
          <circle cx="12" cy="12" r="10" fill="none" stroke="#000080" strokeWidth="1.2" />
          <circle cx="12" cy="12" r="2.2" fill="#000080" />
          {/* 24 Spokes */}
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={i}
              x1="12"
              y1="12"
              x2={12 + 9.5 * Math.cos((i * 15 * Math.PI) / 180)}
              y2={12 + 9.5 * Math.sin((i * 15 * Math.PI) / 180)}
              stroke="#000080"
              strokeWidth="0.75"
            />
          ))}
        </svg>
      </div>

      {/* India Green Band */}
      <div className="w-full h-1/3 bg-[#138808]" />
    </div>
  );
};

import React from 'react';

interface LionStambhProps {
  className?: string;
  size?: number;
  monochrome?: boolean;
}

/**
 * Official State Emblem of India (Ashoka Lion Capital with Satyameva Jayate)
 * Authentic vector emblem used across official Republic of India institutions.
 */
export const LionStambh: React.FC<LionStambhProps> = ({ 
  className = "", 
  size = 52,
  monochrome = false 
}) => {
  return (
    <div className={`inline-flex flex-col items-center justify-center select-none shrink-0 ${className}`}>
      <img 
        src="/emblem.svg" 
        alt="State Emblem of India" 
        style={{ 
          height: `${size}px`, 
          width: 'auto',
          filter: monochrome ? 'brightness(0) invert(1)' : undefined
        }}
        className="object-contain drop-shadow-xs"
        loading="eager"
      />
    </div>
  );
};

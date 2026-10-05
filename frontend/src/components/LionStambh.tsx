import React from 'react';

interface LionStambhProps {
  className?: string;
  size?: number;
  monochrome?: boolean;
}

/**
 * State Emblem of India (Ashoka Lion Capital)
 * Authentic representation featuring the three visible lions, abacus with Ashoka Chakra,
 * and the national motto 'सत्यमेव जयते' (Satyameva Jayate).
 */
export const LionStambh: React.FC<LionStambhProps> = ({ 
  className = "h-14 w-auto", 
  size = 56,
  monochrome = false 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <svg 
        width={size} 
        height={Math.round(size * 1.35)} 
        viewBox="0 0 120 162" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-xs"
        aria-label="State Emblem of India - Ashoka Lion Stambh"
      >
        <g fill={monochrome ? "currentColor" : "#0C2340"} stroke={monochrome ? "currentColor" : "#0C2340"} strokeWidth="0.5">
          {/* Central Lion Head */}
          <path d="M60 12 C52 12, 48 18, 48 26 C48 35, 52 42, 60 46 C68 42, 72 35, 72 26 C72 18, 68 12, 60 12 Z" />
          {/* Central Lion Snout & Muzzle */}
          <ellipse cx="60" cy="27" rx="5" ry="4" fill={monochrome ? "currentColor" : "#1A365D"} />
          <path d="M57 26 Q60 29 63 26" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
          <circle cx="56" cy="22" r="1.5" fill="#FFFFFF" />
          <circle cx="64" cy="22" r="1.5" fill="#FFFFFF" />
          {/* Central Crown / Crest */}
          <path d="M55 10 Q60 5 65 10 Q60 8 55 10 Z" fill={monochrome ? "currentColor" : "#D4AF37"} />

          {/* Left Lion Profile */}
          <path d="M48 22 C42 16, 30 18, 28 28 C26 38, 34 46, 46 48 C43 40, 43 30, 48 22 Z" />
          <circle cx="34" cy="25" r="1.5" fill="#FFFFFF" />
          <path d="M30 30 Q33 32 36 30" stroke="#FFFFFF" strokeWidth="1" fill="none" />

          {/* Right Lion Profile */}
          <path d="M72 22 C78 16, 90 18, 92 28 C94 38, 86 46, 74 48 C77 40, 77 30, 72 22 Z" />
          <circle cx="86" cy="25" r="1.5" fill="#FFFFFF" />
          <path d="M90 30 Q87 32 84 30" stroke="#FFFFFF" strokeWidth="1" fill="none" />

          {/* Lion Torso and Manes */}
          <path d="M42 46 C34 52, 32 68, 36 82 C42 86, 78 86, 84 82 C88 68, 86 52, 78 46 C70 54, 50 54, 42 46 Z" fill={monochrome ? "currentColor" : "#0F284E"} />
          
          {/* Detailed Mane Waves */}
          <path d="M46 54 Q40 64 45 74 M52 52 Q48 64 53 76 M60 50 Q60 65 60 78 M68 52 Q72 64 67 76 M74 54 Q80 64 75 74" 
                stroke={monochrome ? "#FFFFFF" : "#E2E8F0"} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.75" />

          {/* Front Paws */}
          <path d="M46 80 L44 94 C44 97, 50 97, 51 94 L53 82" />
          <path d="M74 80 L76 94 C76 97, 70 97, 69 94 L67 82" />
          <path d="M57 82 L58 95 C58 97, 62 97, 62 95 L63 82" />

          {/* Abacus Platform (Circular Drum) */}
          <rect x="20" y="96" width="80" height="18" rx="3" fill={monochrome ? "currentColor" : "#0A192F"} stroke={monochrome ? "currentColor" : "#D4AF37"} strokeWidth="1" />
          
          {/* Ashoka Chakra in Center of Abacus */}
          <circle cx="60" cy="105" r="7" fill="#FFFFFF" stroke="#000080" strokeWidth="1" />
          <circle cx="60" cy="105" r="1.5" fill="#000080" />
          {/* 12 radial spokes (representing 24 spokes at scale) */}
          <path d="M60 98 L60 112 M53 105 L67 105 M55 100 L65 110 M55 110 L65 100 M53.5 102 L66.5 108 M53.5 108 L66.5 102" 
                stroke="#000080" strokeWidth="0.6" />

          {/* Bull motif on left of abacus */}
          <path d="M30 102 C28 100, 25 103, 26 106 C28 108, 33 108, 35 105 Z" fill={monochrome ? "#FFFFFF" : "#D4AF37"} />
          
          {/* Horse motif on right of abacus */}
          <path d="M85 102 C87 100, 90 103, 89 106 C87 108, 82 108, 80 105 Z" fill={monochrome ? "#FFFFFF" : "#D4AF37"} />

          {/* Inverted Lotus Pedestal Base */}
          <path d="M26 114 Q60 118 94 114 C98 126, 88 132, 60 132 C32 132, 22 126, 26 114 Z" fill={monochrome ? "currentColor" : "#1E293B"} />
          {/* Lotus Petal Details */}
          <path d="M38 116 Q45 128 48 116 M48 116 Q54 130 57 116 M57 116 Q60 130 63 116 M63 116 Q66 130 72 116 M72 116 Q75 128 82 116" 
                stroke={monochrome ? "#FFFFFF" : "#94A3B8"} strokeWidth="1" fill="none" opacity="0.6" />

          {/* Base Plinth */}
          <rect x="16" y="132" width="88" height="6" rx="1.5" fill={monochrome ? "currentColor" : "#0A192F"} />
        </g>

        {/* National Motto: सत्यमेव जयते */}
        <text 
          x="60" 
          y="152" 
          textAnchor="middle" 
          fontFamily="'Noto Serif Devanagari', 'Mangal', 'Georgia', serif" 
          fontSize="11" 
          fontWeight="bold" 
          letterSpacing="0.05em"
          fill={monochrome ? "currentColor" : "#0C2340"}
        >
          सत्यमेव जयते
        </text>
        <text 
          x="60" 
          y="160" 
          textAnchor="middle" 
          fontFamily="'Inter', sans-serif" 
          fontSize="6" 
          fontWeight="700" 
          letterSpacing="0.15em"
          fill={monochrome ? "currentColor" : "#64748B"}
        >
          SATYAMEVA JAYATE
        </text>
      </svg>
    </div>
  );
};

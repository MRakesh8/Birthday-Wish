export function DiamondRing({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Sparkles */}
      <div className="absolute top-[-20px] diamond-sparkle text-white opacity-80" style={{ animationDelay: '0s', fontSize: '1.5rem' }}>✨</div>
      <div className="absolute top-[10px] right-[-10px] diamond-sparkle text-white opacity-60" style={{ animationDelay: '0.5s', fontSize: '1rem' }}>✨</div>
      <div className="absolute top-[10px] left-[-10px] diamond-sparkle text-white opacity-70" style={{ animationDelay: '1s', fontSize: '1.2rem' }}>✨</div>
      
      <svg
        width="100"
        height="120"
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_15px_rgba(255,200,220,0.8)]"
        style={{ transformStyle: 'preserve-3d', animation: 'spin-ring 10s infinite linear' }}
      >
        <style>
          {`
            @keyframes spin-ring {
              from { transform: rotateY(0deg); }
              to { transform: rotateY(360deg); }
            }
          `}
        </style>
        
        {/* Ring Band */}
        <ellipse cx="50" cy="70" rx="40" ry="30" stroke="url(#goldGrad)" strokeWidth="6" fill="transparent" />
        <ellipse cx="50" cy="70" rx="36" ry="26" stroke="url(#goldGradLight)" strokeWidth="2" fill="transparent" />
        
        {/* Diamond Base */}
        <polygon points="50,55 35,35 65,35" fill="url(#diamondGrad)" stroke="#fff" strokeWidth="0.5" />
        
        {/* Diamond Top */}
        <polygon points="35,35 40,25 60,25 65,35" fill="url(#diamondTopGrad)" stroke="#fff" strokeWidth="0.5" />
        <polygon points="40,25 50,30 60,25" fill="#fff" opacity="0.6" />
        <polygon points="35,35 50,30 50,55" fill="#e0f7fa" opacity="0.4" />
        <polygon points="65,35 50,30 50,55" fill="#b2ebf2" opacity="0.4" />
        
        <defs>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="100" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F9D423" />
            <stop offset="50%" stopColor="#FF4E50" />
            <stop offset="100%" stopColor="#F9D423" />
          </linearGradient>
          <linearGradient id="goldGradLight" x1="0" y1="0" x2="100" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="50%" stopColor="#FFB2B2" />
            <stop offset="100%" stopColor="#FFF2B2" />
          </linearGradient>
          <linearGradient id="diamondGrad" x1="50" y1="35" x2="50" y2="55" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#b2ebf2" />
          </linearGradient>
          <linearGradient id="diamondTopGrad" x1="35" y1="25" x2="65" y2="35" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#e0f7fa" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

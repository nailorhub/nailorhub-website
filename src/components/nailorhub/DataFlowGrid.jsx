import React from "react";

export default function DataFlowGrid() {
  const gridSize = 60; // Grid cell size
  const packetSize = 3;
  
  // Create paths in 4 directions
  const horizontalPaths = Array.from({ length: 6 }, (_, i) => ({
    id: `h-${i}`,
    y: (i + 1) * gridSize + gridSize / 2,
    duration: 12 + Math.random() * 2,
    delay: Math.random() * 2,
  }));

  const verticalPaths = Array.from({ length: 6 }, (_, i) => ({
    id: `v-${i}`,
    x: (i + 1) * gridSize + gridSize / 2,
    duration: 12 + Math.random() * 2,
    delay: Math.random() * 2,
  }));

  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-40"
      style={{ mixBlendMode: "screen", filter: "blur(1px)" }}
      preserveAspectRatio="none"
    >
      <defs>
        <style>{`
          @media (prefers-reduced-motion: reduce) {
            .packet { animation: none !important; }
          }
          
          .grid-line {
            stroke: rgba(26, 111, 181, 0.15);
            stroke-width: 1;
          }
          
          .packet {
            fill: rgba(26, 111, 181, 0.8);
            filter: blur(0.5px);
          }
        `}</style>
        
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(26, 111, 181, 0)" />
          <stop offset="50%" stopColor="rgba(26, 111, 181, 0.8)" />
          <stop offset="100%" stopColor="rgba(26, 111, 181, 0)" />
        </linearGradient>
      </defs>



      {/* Animated packets on horizontal paths (East-West) */}
      <g>
        {horizontalPaths.map((path) => (
          <g key={path.id}>
            {/* Left to right */}
            {Array.from({ length: 2 }).map((_, idx) => {
              const staggerDelay = path.delay + (idx * (path.duration / 2));
              return (
                <circle
                  key={`${path.id}-e-${idx}`}
                  cx="0"
                  cy={path.y}
                  r={packetSize / 2}
                  className="packet"
                  style={{
                    animation: `flowEast ${path.duration}s linear ${staggerDelay}s infinite`,
                  }}
                />
              );
            })}
            {/* Right to left */}
            {Array.from({ length: 2 }).map((_, idx) => {
              const staggerDelay = path.delay + (idx * (path.duration / 2));
              return (
                <circle
                  key={`${path.id}-w-${idx}`}
                  cx="100%"
                  cy={path.y}
                  r={packetSize / 2}
                  className="packet"
                  style={{
                    animation: `flowWest ${path.duration}s linear ${staggerDelay}s infinite`,
                  }}
                />
              );
            })}
          </g>
        ))}
      </g>

      {/* Animated packets on vertical paths (North-South) */}
      <g>
        {verticalPaths.map((path) => (
          <g key={path.id}>
            {/* Top to bottom */}
            {Array.from({ length: 2 }).map((_, idx) => {
              const staggerDelay = path.delay + (idx * (path.duration / 2));
              return (
                <circle
                  key={`${path.id}-s-${idx}`}
                  cx={path.x}
                  cy="0"
                  r={packetSize / 2}
                  className="packet"
                  style={{
                    animation: `flowSouth ${path.duration}s linear ${staggerDelay}s infinite`,
                  }}
                />
              );
            })}
            {/* Bottom to top */}
            {Array.from({ length: 2 }).map((_, idx) => {
              const staggerDelay = path.delay + (idx * (path.duration / 2));
              return (
                <circle
                  key={`${path.id}-n-${idx}`}
                  cx={path.x}
                  cy="100%"
                  r={packetSize / 2}
                  className="packet"
                  style={{
                    animation: `flowNorth ${path.duration}s linear ${staggerDelay}s infinite`,
                  }}
                />
              );
            })}
          </g>
        ))}
      </g>

      {/* CSS Animations */}
      <style>{`
        @keyframes flowEast {
          0% {
            cx: -20;
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            cx: calc(100% + 20px);
            opacity: 0;
          }
        }

        @keyframes flowWest {
          0% {
            cx: calc(100% + 20px);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            cx: -20;
            opacity: 0;
          }
        }

        @keyframes flowSouth {
          0% {
            cy: -20;
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            cy: calc(100% + 20px);
            opacity: 0;
          }
        }

        @keyframes flowNorth {
          0% {
            cy: calc(100% + 20px);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            cy: -20;
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .packet {
            opacity: 0.5;
          }
        }
      `}</style>
    </svg>
  );
}
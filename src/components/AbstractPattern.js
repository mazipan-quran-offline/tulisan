import React from 'react';

// Seeded LCG random number generator (no browser APIs needed — SSR-safe)
class RNG {
  constructor(seed) {
    this.state = (seed | 0) >>> 0 || 1;
  }

  next() {
    this.state = ((this.state * 1664525 + 1013904223) & 0xffffffff) >>> 0;
    return this.state / 4294967295;
  }

  float(min, max) {
    return this.next() * (max - min) + min;
  }

  int(min, max) {
    return Math.floor(this.float(min, max + 0.999));
  }

  bool() {
    return this.next() > 0.5;
  }
}

function strToSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (((h << 5) - h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h) || 42;
}

// 8 professional colorful palettes (gradient bg + shape colors)
const PALETTES = [
  { bg1: '#312e81', bg2: '#4f46e5', shapes: ['#818cf8', '#c7d2fe', '#e0e7ff'] },
  { bg1: '#064e3b', bg2: '#065f46', shapes: ['#34d399', '#6ee7b7', '#a7f3d0'] },
  { bg1: '#7f1d1d', bg2: '#991b1b', shapes: ['#f87171', '#fca5a5', '#fecaca'] },
  { bg1: '#0c4a6e', bg2: '#075985', shapes: ['#38bdf8', '#7dd3fc', '#bae6fd'] },
  { bg1: '#4c1d95', bg2: '#5b21b6', shapes: ['#a78bfa', '#c4b5fd', '#ddd6fe'] },
  { bg1: '#78350f', bg2: '#92400e', shapes: ['#fbbf24', '#fcd34d', '#fde68a'] },
  { bg1: '#831843', bg2: '#9d174d', shapes: ['#f472b6', '#f9a8d4', '#fbcfe8'] },
  { bg1: '#134e4a', bg2: '#115e59', shapes: ['#2dd4bf', '#5eead4', '#99f6e4'] },
];

const PATTERN_COUNT = 6;
const W = 400;
const H = 156;

function Circles({ shapes, rng }) {
  return Array.from({ length: 9 }, (_, i) => (
    <circle
      key={i}
      cx={rng.float(0, W)}
      cy={rng.float(-10, H + 10)}
      r={rng.float(12, 58)}
      fill={shapes[i % shapes.length]}
      opacity={rng.float(0.1, 0.42)}
    />
  ));
}

function Rings({ shapes, rng }) {
  return Array.from({ length: 8 }, (_, i) => (
    <circle
      key={i}
      cx={rng.float(0, W)}
      cy={rng.float(-10, H + 10)}
      r={rng.float(14, 52)}
      fill="none"
      stroke={shapes[i % shapes.length]}
      strokeWidth={rng.float(2, 6)}
      opacity={rng.float(0.15, 0.5)}
    />
  ));
}

function Triangles({ shapes, rng }) {
  return Array.from({ length: 7 }, (_, i) => {
    const cx = rng.float(10, W - 10);
    const cy = rng.float(5, H - 5);
    const s = rng.float(22, 64);
    const rot = rng.float(0, 360);
    const h = s * 0.866;
    const pts = [
      [cx, cy - h / 2].join(','),
      [cx - s / 2, cy + h / 2].join(','),
      [cx + s / 2, cy + h / 2].join(','),
    ].join(' ');
    return (
      <polygon
        key={i}
        points={pts}
        fill={shapes[i % shapes.length]}
        opacity={rng.float(0.1, 0.4)}
        transform={`rotate(${rot},${cx},${cy})`}
      />
    );
  });
}

function Diamonds({ shapes, rng }) {
  return Array.from({ length: 9 }, (_, i) => {
    const cx = rng.float(10, W - 10);
    const cy = rng.float(5, H - 5);
    const s = rng.float(16, 50);
    return (
      <rect
        key={i}
        x={cx - s / 2}
        y={cy - s / 2}
        width={s}
        height={s}
        fill={shapes[i % shapes.length]}
        opacity={rng.float(0.1, 0.4)}
        transform={`rotate(45,${cx},${cy})`}
      />
    );
  });
}

function Crosses({ shapes, rng }) {
  return Array.from({ length: 12 }, (_, i) => {
    const cx = rng.float(15, W - 15);
    const cy = rng.float(8, H - 8);
    const s = rng.float(10, 26);
    const t = s * 0.28;
    const rot = rng.float(0, 45);
    const color = shapes[i % shapes.length];
    const op = rng.float(0.15, 0.48);
    return (
      <g key={i} opacity={op} transform={`rotate(${rot},${cx},${cy})`}>
        <rect x={cx - s / 2} y={cy - t / 2} width={s} height={t} fill={color} />
        <rect x={cx - t / 2} y={cy - s / 2} width={t} height={s} fill={color} />
      </g>
    );
  });
}

function Hexagons({ shapes, rng }) {
  const pts = (cx, cy, r) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = ((i * 60 - 30) * Math.PI) / 180;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)].join(',');
    }).join(' ');

  return Array.from({ length: 7 }, (_, i) => {
    const cx = rng.float(15, W - 15);
    const cy = rng.float(8, H - 8);
    const r = rng.float(14, 40);
    const filled = rng.bool();
    const color = shapes[i % shapes.length];
    const op = rng.float(0.1, 0.42);
    return (
      <polygon
        key={i}
        points={pts(cx, cy, r)}
        fill={filled ? color : 'none'}
        stroke={filled ? 'none' : color}
        strokeWidth={rng.float(1.5, 4)}
        opacity={op}
      />
    );
  });
}

const RENDERERS = [Circles, Rings, Triangles, Diamonds, Crosses, Hexagons];

const AbstractPattern = ({ slug }) => {
  const seed = strToSeed(slug || 'default');
  const palette = PALETTES[Math.abs(seed) % PALETTES.length];
  const PatternEl = RENDERERS[Math.abs(seed >> 3) % PATTERN_COUNT];

  // Fresh RNG for shape placement to keep it independent of palette selection
  const rng = new RNG(seed + 1000);
  const gradId = `apg-${seed}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.bg1} />
          <stop offset="100%" stopColor={palette.bg2} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${gradId})`} />
      <PatternEl shapes={palette.shapes} rng={rng} />
    </svg>
  );
};

export default AbstractPattern;

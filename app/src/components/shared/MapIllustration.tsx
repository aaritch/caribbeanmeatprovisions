// Lightweight illustrated map of the Caribbean. Static SVG so it's instant.
// v2 can swap this for an interactive map per spec §15.

export function MapIllustration() {
  return (
    <svg
      role="img"
      aria-label="Map illustration of the Caribbean"
      viewBox="0 0 800 500"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full rounded-lg border border-neutral-200 bg-[#0f3a52]"
    >
      <defs>
        <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1" fill="#1d6b8a" />
        </pattern>
      </defs>
      <rect width="800" height="500" fill="url(#dots)" opacity="0.5" />
      {/* Generic landmasses — illustrative, not geographically accurate */}
      <g fill="#3b6f4a" stroke="#225c34" strokeWidth="1">
        <ellipse cx="120" cy="120" rx="110" ry="40" />
        <ellipse cx="280" cy="180" rx="90" ry="28" />
        <ellipse cx="430" cy="180" rx="80" ry="22" />
        <ellipse cx="560" cy="200" rx="55" ry="18" />
        <circle cx="640" cy="240" r="14" />
        <circle cx="680" cy="280" r="10" />
        <circle cx="700" cy="320" r="9" />
        <circle cx="690" cy="360" r="9" />
        <circle cx="660" cy="400" r="9" />
        <ellipse cx="380" cy="430" rx="120" ry="22" />
      </g>
      <g fill="#C9A961" fontFamily="Georgia, serif" fontSize="13" textAnchor="middle">
        <text x="120" y="70">Cuba</text>
        <text x="280" y="155">Hispaniola</text>
        <text x="430" y="155">Puerto Rico</text>
        <text x="560" y="180">Lesser Antilles</text>
        <text x="380" y="470">South America</text>
      </g>
      <g fill="#fff">
        {[
          [120, 120],
          [280, 180],
          [430, 180],
          [560, 200],
          [640, 240],
          [680, 280],
          [700, 320],
          [690, 360],
          [660, 400],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" />
        ))}
      </g>
    </svg>
  );
}

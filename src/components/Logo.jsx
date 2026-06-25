// Logo SportClub en SVG inline. El color se adapta según el contexto (prop color).
function Logo({ color = "#2E1A47", height = 36 }) {
  return (
    <svg
      width={height * 4.4}
      height={height}
      viewBox="0 0 320 70"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="SportClub"
    >
      <circle cx="35" cy="35" r="27" fill="none" stroke={color} strokeWidth="5.5" />
      <path
        d="M18 35 Q35 15 52 35 Q35 55 18 35 Z"
        fill="none"
        stroke={color}
        strokeWidth="3.5"
      />
      <line x1="35" y1="9" x2="35" y2="61" stroke={color} strokeWidth="2.5" opacity="0.5" />
      <text
        x="75"
        y="46"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="32"
        fill={color}
      >
        SportClub
      </text>
    </svg>
  )
}

export default Logo

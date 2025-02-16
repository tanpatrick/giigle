export const MarkerIcon = ({ isSelected }: { isSelected?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
    <g fill={isSelected ? "#22ccff" : "#008CBA"}>
      <path d="M15 1C22.2843 1 28 7.2843 28 14C28 20.7157 15 30 15 30C15 30 2 20.7157 2 14C2 7.2843 7.7157 1 15 1Z" />
    </g>

    <g fill="white">
      <rect x="11" y="11" width="8" height="6" rx="1" />

      <rect x="12.5" y="9" width="5" height="2" rx="1" />

      <circle cx="12" cy="15" r="1" />
      <circle cx="18" cy="15" r="1" />
    </g>
  </svg>
);

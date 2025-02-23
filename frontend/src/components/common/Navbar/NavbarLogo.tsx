export function NavbarLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="58" height="58" fill="none">
      {/* Location Pin */}
      <circle cx="50" cy="50" r="30" fill="#FF6347" />
      {/* Magnifying Glass */}
      <circle cx="50" cy="50" r="15" fill="#FFD700" stroke="#1E90FF" strokeWidth="4" />
      <rect x="60" y="55" width="12" height="5" rx="3" fill="#4CAF50" />
      <path d="M65 60 L75 70" stroke="#1E90FF" strokeWidth="4" strokeLinecap="round" />
      <circle cx="75" cy="70" r="4" fill="#1E90FF" />
    </svg>
  );
}

import { Navbar as HeroNavbar, NavbarBrand, NavbarContent } from "@heroui/navbar";

import { NavbarItem } from "./NavbarItem";
import { navbarItems } from "./navbarItems";

export const Logo = () => {
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
};

export function Narbar() {
  return (
    <HeroNavbar isBordered>
      <NavbarBrand>
        <Logo />
        <p className="font-bold text-inherit">giigle</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navbarItems.map(({ href, label }) => (
          <NavbarItem key={label} href={href} label={label} />
        ))}
      </NavbarContent>
    </HeroNavbar>
  );
}

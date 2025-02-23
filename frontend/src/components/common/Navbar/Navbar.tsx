"use client";

import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import {
  Navbar as HeroNavbar,
  NavbarBrand as HeroNavbarBrand,
  NavbarContent as HeroNavbarContent,
  NavbarMenu,
  NavbarMenuToggle as HeroNavbarMenuToggle,
} from "@heroui/navbar";
import { usePathname } from "next/navigation";

import { Input } from "@/ui-library/Input";

import { NavbarItem } from "./NavbarItem";
import { navbarItems } from "./navbarItems";
import { NavbarLogo } from "./NavbarLogo";
import { UserMenuItem } from "./UserMenuItem";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <HeroNavbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <HeroNavbarContent justify="center">
        <HeroNavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />

        <HeroNavbarBrand>
          <NavbarLogo />
          <p className="font-bold text-inherit">giigle</p>
        </HeroNavbarBrand>

        <HeroNavbarContent className="gap-3 hidden ml-5 sm:flex">
          {navbarItems.map((item) => (
            <NavbarItem key={item.href} {...item} />
          ))}
        </HeroNavbarContent>

        <NavbarMenu>
          {navbarItems.map((item) => (
            <NavbarItem key={item.href} {...item} onClick={() => setIsMenuOpen(false)} />
          ))}
        </NavbarMenu>
      </HeroNavbarContent>

      <HeroNavbarContent as="div" className="items-center" justify="end">
        {pathname === "/" && (
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<BiSearch />}
            type="search"
          />
        )}
        <UserMenuItem />
      </HeroNavbarContent>
    </HeroNavbar>
  );
}

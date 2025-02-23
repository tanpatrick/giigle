"use client";

import { NavbarItem as HeroNavbarItem } from "@heroui/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavbarItemProps = {
  href: string;
  label: string;
  onClick?: () => void;
};

export function NavbarItem({ href, label, onClick }: NavbarItemProps) {
  const pathname = usePathname();

  return (
    <HeroNavbarItem isActive={href === pathname} key={href} onClick={onClick}>
      <Link color="foreground" href={href}>
        {label}
      </Link>
    </HeroNavbarItem>
  );
}

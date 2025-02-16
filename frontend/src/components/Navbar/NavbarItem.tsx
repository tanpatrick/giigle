"use client";

import { Link } from "@heroui/link";
import { NavbarItem as HeroNavbarItem } from "@heroui/navbar";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export type NavbarItemProps = {
  href: string;
  label: string;
};

export function NavbarItem({ href, label }: NavbarItemProps) {
  const pathname = usePathname();
  return (
    <HeroNavbarItem key={label} isActive={href === pathname}>
      <Link as={NextLink} href={href}>
        {label}
      </Link>
    </HeroNavbarItem>
  );
}

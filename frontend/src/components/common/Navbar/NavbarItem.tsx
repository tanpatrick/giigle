"use client";

import { useUser } from "@auth0/nextjs-auth0";
import { NavbarItem as HeroNavbarItem } from "@heroui/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavbarItemProps = {
  href: string;
  isAuthenticated?: boolean;
  label: string;
  onClick?: () => void;
};

export function NavbarItem({ href, isAuthenticated, label, onClick }: NavbarItemProps) {
  const pathname = usePathname();

  const { user } = useUser();

  return (
    <HeroNavbarItem
      isActive={href === pathname}
      key={href}
      onClick={() => {
        if (isAuthenticated && !user?.email) {
          window.location.href = "/auth/login";
          return;
        }

        onClick?.();
      }}
    >
      <Link color="foreground" href={href}>
        {label}
      </Link>
    </HeroNavbarItem>
  );
}

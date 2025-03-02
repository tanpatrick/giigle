import { NavbarItemProps } from "./NavbarItem";

export const navbarItems: NavbarItemProps[] = [
  {
    href: "/",
    label: "Gigs",
  },
  {
    href: "/gigs/new",
    isAuthenticated: true,
    label: "Got a Gig? Post It Here!",
  },
];

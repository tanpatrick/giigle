import { Metadata } from "next";

import { GigsResponse } from "@/types/Gigs";

import { HomePage } from "./HomePage";

export const metadata: Metadata = {
  title: "giigle - Jobs",
};

export default async function Page() {
  const response = await fetch("https://dummyjson.com/c/f0b2-6c22-4776-b5a0?delay=1000");
  const { items: gigs = [] }: GigsResponse = await response.json();

  return <HomePage gigs={gigs} />;
}

import { Metadata } from "next";

import { GigsResponse } from "@/types/Gigs";

import { HomePage } from "./HomePage";

export const metadata: Metadata = {
  title: "giigle - Jobs",
};

export default async function Page() {
  const response = await fetch(`${process.env.BACKEND_ENDPOINT}/gigs`, {
    cache: "no-store",
  });
  const gigs: GigsResponse = await response.json();
  return <HomePage gigs={gigs} />;
}

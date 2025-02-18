import { Metadata } from "next";

import { PostGigPage } from "./PostGigPage";

export const metadata: Metadata = {
  title: "giigle - Got a Gig? Post It Here!",
};

export default function Page() {
  return <PostGigPage />;
}

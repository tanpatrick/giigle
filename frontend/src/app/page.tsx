import { Metadata } from "next";

import { HomePage } from "./HomePage";

export const metadata: Metadata = {
  title: "giigle - Jobs",
};

export default function Page() {
  return <HomePage />;
}

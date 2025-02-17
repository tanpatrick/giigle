import { Metadata } from "next";

import { NewJobPage } from "./NewJobPage";

export const metadata: Metadata = {
  title: "giigle - New Job",
};

export default function Page() {
  return <NewJobPage />;
}

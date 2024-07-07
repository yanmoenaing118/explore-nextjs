import { Metadata } from "next";
import AppEditor from "../components/editor/AppEditor";

export const metadata: Metadata = {
  title: "Hello",
  description: "Hello",
};

export default function page() {
  return <AppEditor />;
}

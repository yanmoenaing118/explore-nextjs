import { Metadata } from "next";
import AppEditor from "../components/editor/AppEditor";

export const metadata: Metadata = {
  title: "Hello",
  description: "Hello",
};


export default function page() {
  return (
    <div className="max-w-[1220px] mx-auto">
      <AppEditor />
      {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque iusto iste expedita, veritatis et blanditiis magnam at aperiam cupiditate ab nesciunt harum minus eius in nihil impedit sit quas. Nisi! */}
    </div>
  );
}

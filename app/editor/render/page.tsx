import "../../components/editor/nodes/blockquote/Blockquote.css"
import "../../components/editor/nodes/PageBreakNode.css"

import { editorHTML } from "@/app/components/editor/editorState";

export default function page() {
  return (
    <div className="max-w-[1220px] mx-auto">
      <div dangerouslySetInnerHTML={{ __html: editorHTML }}></div>
      {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque iusto iste expedita, veritatis et blanditiis magnam at aperiam cupiditate ab nesciunt harum minus eius in nihil impedit sit quas. Nisi! */}
    </div>
  );
}

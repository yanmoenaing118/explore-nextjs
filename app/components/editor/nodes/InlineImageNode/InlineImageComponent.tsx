import { Position } from "./InlineImageNode";

export default function InlineImageComponent({
  src,
  altText,
  position,
  width,
  height,
}: {
  src: string;
  altText: string;
  position: Position;
  width?: "inherit" | number;
  height?: "inherit" | number;
}) {
  return (
    <span>
      <img src={src} alt={altText} />
    </span>
  );
}

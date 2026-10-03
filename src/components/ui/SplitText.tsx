import type { ElementType, ReactNode } from "react";

type Props = {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  intro?: boolean;
  id?: string;
};

// Divide cada línea en palabras enmascaradas para animarlas desde abajo.
export function SplitText({
  as: Tag = "h2",
  lines,
  className,
  lineClassName,
  intro,
  id,
}: Props) {
  return (
    <Tag
      id={id}
      className={className}
      data-split=""
      data-intro={intro ? "" : undefined}
    >
      {lines.map((line, i) => (
        <span key={i} className={`split-line ${lineClassName ?? ""}`}>
          {typeof line === "string"
            ? line.split(" ").map((word, j, words) => (
                <span key={j} className="split-word">
                  {word}
                  {j < words.length - 1 ? " " : ""}
                </span>
              ))
            : <span className="split-word">{line}</span>}
        </span>
      ))}
    </Tag>
  );
}

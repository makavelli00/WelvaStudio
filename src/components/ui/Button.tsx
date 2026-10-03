import Link from "next/link";
import { Magnetic } from "./Magnetic";

type Props = {
  href: string;
  children: string;
  variant?: "primary" | "ghost";
  arrow?: boolean;
  className?: string;
};

export function RollText({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  arrow = true,
  className = "",
}: Props) {
  const isExternal = href.startsWith("mailto:") || href.startsWith("http");
  const inner = (
    <>
      <RollText>{children}</RollText>
      {arrow && (
        <span className="arrow" aria-hidden>
          →
        </span>
      )}
    </>
  );
  const classes = `btn btn-${variant} ${className}`;

  return (
    <Magnetic>
      {isExternal ? (
        <a href={href} className={classes} data-cursor="hover">
          {inner}
        </a>
      ) : (
        <Link href={href} className={classes} data-cursor="hover">
          {inner}
        </Link>
      )}
    </Magnetic>
  );
}

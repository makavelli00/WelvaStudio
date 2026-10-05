import {
  BRACKETS,
  COMPACT_MESH,
  COMPACT_NODE_SCALE,
  COMPACT_STROKE,
  MESH,
  NODES,
  PRIMARY,
  STROKE,
  VIEWBOX,
  W_GRADIENT,
  segmentPath,
} from "./geometry.mjs";

type Props = {
  // Id único por instancia (useId): lo necesita la máscara del recorte.
  id: string;
  className?: string;
  // Variante simplificada para tamaños muy pequeños (favicon).
  compact?: boolean;
  // Multiplica grosores y nodos de la variante completa: >1 para que la red
  // siga leyéndose a tamaño cabecera.
  weight?: number;
  // "brand": la W en degradado azul de la marca. "current": del color del texto.
  wPaint?: "brand" | "current";
  title?: string;
};

// Logo vectorial: la red usa currentColor, la W el azul de la marca y los
// corchetes el color de acento.
// Una máscara recorta la red alrededor de los corchetes, así funciona sobre
// cualquier fondo. Las clases logo-* y data-node son los ganchos de AnimatedLogo.
export function LogoMark({
  id,
  className = "",
  compact = false,
  weight = 1,
  wPaint = "brand",
  title,
}: Props) {
  const gradientId = `${id}-w`;
  const wColor = wPaint === "brand" ? `url(#${gradientId})` : "currentColor";
  const base = compact ? COMPACT_STROKE : STROKE;
  const w = compact ? 1 : weight;
  const stroke = {
    primary: base.primary * w,
    mesh: base.mesh * w,
    // Los corchetes crecen menos para no tapar la red.
    bracket: base.bracket * (1 + (w - 1) * 0.5),
    knockout: base.knockout * (1 + (w - 1) * 0.6),
  };
  const mesh = compact ? COMPACT_MESH : MESH;
  const nodes = Object.entries(NODES).filter(([, n]) => !compact || n.hub);
  const nodeScale = compact ? COMPACT_NODE_SCALE : w;
  const maskId = `${id}-knockout`;

  return (
    <svg
      viewBox={VIEWBOX}
      className={`logo-mark overflow-visible ${className}`}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0" y1="10" x2="0" y2="210">
          <stop offset="0" stopColor={W_GRADIENT.top} />
          <stop offset="1" stopColor={W_GRADIENT.bottom} />
        </linearGradient>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-20" y="-20" width="340" height="260">
          <rect x="-20" y="-20" width="340" height="260" fill="white" />
          {(["left", "right"] as const).map((side) => (
            <path
              key={side}
              className={`logo-knockout logo-knockout-${side}`}
              d={BRACKETS[side]}
              fill="none"
              stroke="black"
              strokeWidth={stroke.knockout}
            />
          ))}
        </mask>
      </defs>

      <g mask={`url(#${maskId})`}>
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          {mesh.map((seg) => (
            <path key={seg.join("-")} className="logo-mesh" d={segmentPath(seg)} strokeWidth={stroke.mesh} />
          ))}
          {PRIMARY.map((seg) => (
            <path
              key={seg.join("-")}
              className="logo-primary"
              d={segmentPath(seg)}
              stroke={wColor}
              strokeWidth={stroke.primary}
            />
          ))}
        </g>
        <g fill="currentColor">
          {nodes.map(([key, n]) => (
            <circle
              key={key}
              data-node={key}
              className="logo-node"
              fill={n.hub ? wColor : undefined}
              cx={n.x}
              cy={n.y}
              r={n.r * nodeScale}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            />
          ))}
        </g>
      </g>

      <g className="logo-packets" />

      <g fill="none" stroke="var(--accent)" strokeLinecap="butt" strokeLinejoin="miter" strokeWidth={stroke.bracket}>
        <path className="logo-bracket logo-bracket-left" d={BRACKETS.left} />
        <path className="logo-bracket logo-bracket-right" d={BRACKETS.right} />
      </g>
    </svg>
  );
}

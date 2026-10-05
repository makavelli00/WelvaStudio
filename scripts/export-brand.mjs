// Genera los SVG estáticos del logo a partir de la misma geometría que usa la web.
// Uso: node scripts/export-brand.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  BRACKETS,
  BRAND,
  COMPACT_MESH,
  COMPACT_NODE_SCALE,
  COMPACT_STROKE,
  MESH,
  NODES,
  PRIMARY,
  STROKE,
  segmentPath,
} from "../src/components/brand/geometry.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function mark({ color, accent, compact = false, background, padding = 0, radius = 0, title = "Welva Studio" }) {
  const stroke = compact ? COMPACT_STROKE : STROKE;
  const mesh = compact ? COMPACT_MESH : MESH;
  const nodes = Object.values(NODES).filter((n) => !compact || n.hub);
  const [w, h] = [300 + padding * 2, 220 + padding * 2];
  const size = Math.max(w, h);
  // Lienzo cuadrado si hay fondo (favicon), ajustado al logo si no.
  const [vw, vh] = background ? [size, size] : [w, h];
  const ox = (vw - 300) / 2;
  const oy = (vh - 220) / 2;

  const lines = (segs, width) =>
    segs.map((s) => `<path d="${segmentPath(s)}" stroke-width="${width}"/>`).join("");
  const circles = nodes
    .map((n) => `<circle cx="${n.x}" cy="${n.y}" r="${+(compact ? n.r * COMPACT_NODE_SCALE : n.r).toFixed(2)}"/>`)
    .join("");
  const knock = ["left", "right"]
    .map((side) => `<path d="${BRACKETS[side]}" fill="none" stroke="#000" stroke-width="${stroke.knockout}"/>`)
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vw} ${vh}" role="img" aria-label="${title}">
<title>${title}</title>
<defs><mask id="k" maskUnits="userSpaceOnUse" x="-20" y="-20" width="340" height="260"><rect x="-20" y="-20" width="340" height="260" fill="#fff"/>${knock}</mask></defs>
${background ? `<rect width="${vw}" height="${vh}" rx="${radius}" fill="${background}"/>` : ""}
<g transform="translate(${ox} ${oy})">
<g mask="url(#k)"><g fill="none" stroke="${color}" stroke-linecap="round">${lines(mesh, stroke.mesh)}${lines(PRIMARY, stroke.primary)}</g><g fill="${color}">${circles}</g></g>
<g fill="none" stroke="${accent}" stroke-width="${stroke.bracket}" stroke-linejoin="miter"><path d="${BRACKETS.left}"/><path d="${BRACKETS.right}"/></g>
</g>
</svg>
`;
}

const files = {
  // Para fondos claros, con los colores originales de la marca.
  "public/brand/welva-mark.svg": mark({ color: BRAND.navy, accent: BRAND.cyan }),
  // Para fondos oscuros (como la web).
  "public/brand/welva-mark-white.svg": mark({ color: "#eeece5", accent: BRAND.cyan }),
  // Versión simplificada para tamaños pequeños (redes sociales, avatares).
  "public/brand/welva-mark-compact.svg": mark({ color: BRAND.navy, accent: BRAND.cyan, compact: true }),
  // Icono de la pestaña del navegador (Next.js lo detecta en app/icon.svg).
  "src/app/icon.svg": mark({
    color: "#eeece5",
    accent: BRAND.cyan,
    compact: true,
    background: "#0b0b0a",
    padding: 40,
    radius: 72,
  }),
};

for (const [path, svg] of Object.entries(files)) {
  const out = join(root, path);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, svg);
  console.log("✓", path);
}

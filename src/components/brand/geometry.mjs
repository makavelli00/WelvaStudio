// Geometría única del logo de Welva Studio. La usan el componente animado
// (LogoMark.tsx) y el script que exporta los SVG estáticos (scripts/export-brand.mjs).
// Simétrica respecto a x = 150, viewBox 0 0 300 220.

export const VIEWBOX = "0 0 300 220";

export const BRAND = {
  navy: "#1f437f",
  cyan: "#10e8e3",
  gray: "#545453",
};

// Color de la W: degradado vertical del azul de la marca, más claro arriba
// para que destaque sobre fondo oscuro y parezca iluminada desde arriba.
export const W_GRADIENT = { top: "#6a9bff", bottom: "#2a55b0" };
// Caras laterales de la W en 3D (de la cara frontal hacia el fondo).
export const W_EXTRUSION = { near: "#1f437f", far: "#0a1630" };

/** @typedef {{ x: number, y: number, r: number, hub?: boolean }} LogoNode */

// Nodos: r = radio. "hub" son los vértices de la W.
/** @type {Record<string, LogoNode>} */
export const NODES = {
  tc: { x: 150, y: 22, r: 10, hub: true },
  otl: { x: 22, y: 44, r: 10, hub: true },
  otr: { x: 278, y: 44, r: 10, hub: true },
  bl: { x: 108, y: 198, r: 10, hub: true },
  br: { x: 192, y: 198, r: 10, hub: true },
  itl: { x: 74, y: 44, r: 6.5 },
  itr: { x: 226, y: 44, r: 6.5 },
  ul: { x: 126, y: 70, r: 5.5 },
  ur: { x: 174, y: 70, r: 5.5 },
  sl: { x: 62, y: 116, r: 6.5 },
  sr: { x: 238, y: 116, r: 6.5 },
  c: { x: 150, y: 116, r: 6.5 },
  ll: { x: 121, y: 160, r: 5.5 },
  lr: { x: 179, y: 160, r: 5.5 },
  // Puntas extra de la corona.
  tl: { x: 100, y: 30, r: 5 },
  tr: { x: 200, y: 30, r: 5 },
  // Estaciones sobre las patas exteriores de la W (están sobre la línea).
  o1l: { x: 42, y: 80, r: 4.5 },
  o1r: { x: 258, y: 80, r: 4.5 },
  ol: { x: 88, y: 162, r: 4.5 },
  or: { x: 212, y: 162, r: 4.5 },
};

// La W principal (trazo grueso), en orden de dibujo desde el centro.
export const PRIMARY = [
  ["tc", "bl"],
  ["tc", "br"],
  ["bl", "otl"],
  ["br", "otr"],
];

// La red interior (trazo fino).
export const MESH = [
  ["tc", "c"],
  ["tc", "ul"],
  ["tc", "ur"],
  ["ul", "itl"],
  ["ur", "itr"],
  ["itl", "otl"],
  ["itr", "otr"],
  ["itl", "sl"],
  ["itr", "sr"],
  ["ul", "sl"],
  ["ur", "sr"],
  ["ul", "c"],
  ["ur", "c"],
  ["sl", "c"],
  ["sr", "c"],
  ["c", "ll"],
  ["c", "lr"],
  ["ll", "lr"],
  ["sl", "ll"],
  ["sr", "lr"],
  ["itl", "tl"],
  ["itr", "tr"],
  ["tl", "tc"],
  ["tr", "tc"],
  ["tl", "ul"],
  ["tr", "ur"],
  ["o1l", "itl"],
  ["o1r", "itr"],
  ["ol", "ll"],
  ["or", "lr"],
];

// Grafo por el que corren los paquetes de datos: la red más la W, con las
// patas exteriores partidas en tramos para que pasen por sus estaciones.
export const GRAPH = [
  ...MESH,
  ["tc", "bl"],
  ["tc", "br"],
  ["otl", "o1l"],
  ["o1l", "sl"],
  ["sl", "ol"],
  ["ol", "bl"],
  ["otr", "o1r"],
  ["o1r", "sr"],
  ["sr", "or"],
  ["or", "br"],
];

// Corchetes de código < > (en cian).
export const BRACKETS = {
  left: "M121 87 L87 116 L121 145",
  right: "M179 87 L213 116 L179 145",
};

export const STROKE = { primary: 9, mesh: 3.5, bracket: 11, knockout: 23 };

// A tamaño pequeño (≤ 64 px) la red fina se vuelve un borrón: la variante
// compacta conserva solo la W, el arco superior de la corona y los corchetes.
export const COMPACT_STROKE = { primary: 18, mesh: 11, bracket: 20, knockout: 38 };
export const COMPACT_MESH = [
  ["otl", "itl"],
  ["itr", "otr"],
  ["itl", "ul"],
  ["itr", "ur"],
  ["ul", "tc"],
  ["ur", "tc"],
];
export const COMPACT_NODE_SCALE = 1.7;
export const COMPACT_GRAPH = [...COMPACT_MESH, ...PRIMARY];

/** @param {string[]} segment Par de ids de nodo [origen, destino]. */
export const segmentPath = ([a, b]) =>
  `M${NODES[a].x} ${NODES[a].y} L${NODES[b].x} ${NODES[b].y}`;

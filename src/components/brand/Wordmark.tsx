// Nombre de marca con el contraste de peso del logo original: "Welva" en negrita
// y "Studio" en regular, juntos en una sola palabra.
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`tracking-tight ${className}`}>
      <span className="font-bold">Welva</span>
      <span className="font-normal">Studio</span>
    </span>
  );
}

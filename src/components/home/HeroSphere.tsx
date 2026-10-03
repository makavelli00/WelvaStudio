"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const ACCENT = [200, 255, 61];

// Esfera de partículas en canvas 2D que gira y reacciona al cursor.
export function HeroSphere({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = prefersReducedMotion();
    const count = window.innerWidth < 768 ? 700 : 1300;

    // Distribución uniforme de puntos en la esfera (espiral de Fibonacci).
    const points = Array.from({ length: count }, (_, i) => {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r, accent: i % 23 === 0 };
    });

    let width = 0;
    let height = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    };
    resize();

    const mouse = { x: 0, y: 0, tx: 0, ty: 0, active: 0, tActive: 0 };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.ty = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouse.tActive = 1;
    };
    const onLeave = () => (mouse.tActive = 0);

    let rotY = 0;
    let rotX = 0.35;
    let raf = 0;
    let visible = true;
    let start = performance.now();

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      mouse.active += (mouse.tActive - mouse.active) * 0.05;

      rotY += 0.0022 + mouse.x * 0.004 * mouse.active;
      rotX += (0.35 + mouse.y * 0.5 * mouse.active - rotX) * 0.04;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const radius = Math.min(width, height) * 0.42;
      const cx = width / 2;
      const cy = height / 2;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      // "Respiración" de la esfera y deformación hacia el cursor.
      const breathe = 1 + Math.sin(t * 0.8) * 0.02;

      for (const p of points) {
        let x = p.x * cosY - p.z * sinY;
        let z = p.x * sinY + p.z * cosY;
        let y = p.y * cosX - z * sinX;
        z = p.y * sinX + z * cosX;

        const wave = 1 + Math.sin(p.y * 6 + t * 1.6) * 0.025;
        const pull =
          mouse.active * 0.12 * Math.max(0, x * mouse.x + y * mouse.y) * (z > 0 ? 1 : 0.3);
        const s = breathe * wave + pull;
        x *= s;
        y *= s;

        const depth = (z + 1) / 2;
        const scale = 0.6 + depth * 0.7;
        const px = cx + x * radius;
        const py = cy + y * radius;
        const size = (p.accent ? 2.2 : 1.2) * scale;
        const alpha = 0.12 + depth * 0.75;

        ctx.fillStyle = p.accent
          ? `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${alpha})`
          : `rgba(238,236,229,${alpha * 0.8})`;
        ctx.fillRect(px - size / 2, py - size / 2, size, size);
      }

      if (!reduced && visible) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduced) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      }
    });
    io.observe(canvas);

    start = performance.now();
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}

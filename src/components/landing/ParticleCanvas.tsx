"use client";

import { useEffect, useRef } from "react";

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const dots = Array.from({ length: 60 }, (_, index) => ({
      x: Math.random(),
      y: Math.random(),
      speed: 0.00008 + Math.random() * 0.00016,
      drift: (Math.random() - 0.5) * 0.00018,
      radius: 0.7 + (index % 3) * 0.35,
    }));

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      dots.forEach((dot) => {
        dot.y -= dot.speed;
        dot.x += dot.drift;
        if (dot.y < -0.02) dot.y = 1.02;
        if (dot.x < -0.02) dot.x = 1.02;
        if (dot.x > 1.02) dot.x = -0.02;

        ctx.fillStyle = "rgba(16, 185, 129, 0.35)";
        ctx.beginPath();
        ctx.arc(dot.x * width, dot.y * height, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i];
          const b = dots[j];
          const dx = (a.x - b.x) * width;
          const dy = (a.y - b.y) * height;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.strokeStyle = `rgba(16, 185, 129, ${(1 - dist / 140) * 0.08})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x * width, a.y * height);
            ctx.lineTo(b.x * width, b.y * height);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      className="pointer-events-none fixed inset-0 z-0 opacity-40"
    />
  );
}

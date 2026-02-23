"use client";

import { useEffect, useRef } from "react";

const HEADER_HEIGHT = 56;

export function HeaderWaveform({
  accentColor = "99, 102, 241",
}: {
  accentColor?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = HEADER_HEIGHT;
    };

    const draw = () => {
      ctx.fillStyle = "rgba(248, 248, 248, 0.95)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const lineCount = 16;
      const segmentCount = 80;
      const height = canvas.height / 2;

      for (let i = 0; i < lineCount; i++) {
        ctx.beginPath();
        const progress = i / lineCount;
        const colorIntensity = Math.sin(progress * Math.PI);
        ctx.strokeStyle = `rgba(${accentColor}, ${colorIntensity * 0.3})`;
        ctx.lineWidth = 1;

        for (let j = 0; j < segmentCount + 1; j++) {
          const x = (j / segmentCount) * canvas.width;

          const noise = Math.sin(j * 0.1 + time + i * 0.2) * 4;
          const spike =
            Math.cos(j * 0.2 + time + i * 0.1) *
            Math.sin(j * 0.05 + time) *
            7;
          const y = height + noise + spike;

          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      time += 0.005;
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [accentColor]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 w-full h-full bg-background/95"
      aria-hidden
    />
  );
}

"use client";

import React from "react";
import { ReactTyped } from "react-typed";

import { cn } from "../../lib/utils";

type TColorProp = string | string[];

interface TypeWriterProps {
  strings: string[];
}

interface ShineBorderProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: TColorProp;
  className?: string;
  children: React.ReactNode;
}

type NodePoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

let ctx: CanvasRenderingContext2D | null = null;
let huePhase = 0;
let pointer = { x: 0, y: 0 };
let lines: Array<Array<NodePoint>> = [];

export const renderCanvas = function () {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
  if (!canvas) return;

  ctx = canvas.getContext("2d");
  if (!ctx) return;

  pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  lines = Array.from({ length: 80 }, () =>
    Array.from({ length: 50 }, () => ({
      x: pointer.x,
      y: pointer.y,
      vx: 0,
      vy: 0,
    })),
  );

  const resizeCanvas = () => {
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight;
  };

  const movePointer = (event: MouseEvent | TouchEvent) => {
    const touch = "touches" in event ? event.touches[0] : null;
    pointer = {
      x: touch ? touch.pageX : (event as MouseEvent).clientX,
      y: touch ? touch.pageY : (event as MouseEvent).clientY,
    };
  };

  const render = () => {
    if (!ctx) return;
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";
    huePhase += 0.15;

    lines.forEach((nodes, lineIndex) => {
      let spring = 0.45 + (lineIndex / lines.length) * 0.025;
      nodes.forEach((node, index) => {
        const target = index === 0 ? pointer : nodes[index - 1];
        node.vx += (target.x - node.x) * spring;
        node.vy += (target.y - node.y) * spring;
        node.vx *= 0.5;
        node.vy *= 0.5;
        node.x += node.vx;
        node.y += node.vy;
        spring *= 0.99;
      });

      ctx!.beginPath();
      ctx!.moveTo(nodes[0].x, nodes[0].y);
      for (let i = 1; i < nodes.length - 2; i += 1) {
        ctx!.quadraticCurveTo(
          nodes[i].x,
          nodes[i].y,
          (nodes[i].x + nodes[i + 1].x) / 2,
          (nodes[i].y + nodes[i + 1].y) / 2,
        );
      }
      ctx!.strokeStyle = `hsla(${Math.round(285 + huePhase)}, 100%, 50%, 0.025)`;
      ctx!.lineWidth = 10;
      ctx!.stroke();
    });

    window.requestAnimationFrame(render);
  };

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  document.addEventListener("mousemove", movePointer);
  document.addEventListener("touchmove", movePointer);
  render();
};

const TypeWriter = ({ strings }: TypeWriterProps) => {
  return (
    <ReactTyped
      loop
      typeSpeed={80}
      backSpeed={20}
      strings={strings}
      smartBackspace
      backDelay={1000}
      loopCount={0}
      showCursor
      cursorChar="|"
    />
  );
};

function ShineBorder({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  color = "#000000",
  className,
  children,
}: ShineBorderProps) {
  return (
    <div
      style={{ "--border-radius": `${borderRadius}px` } as React.CSSProperties}
      className={cn(
        "relative grid h-full w-full place-items-center rounded-3xl bg-white p-3 text-black dark:bg-black dark:text-white",
        className,
      )}
    >
      <div
        style={
          {
            "--border-width": `${borderWidth}px`,
            "--border-radius": `${borderRadius}px`,
            "--shine-pulse-duration": `${duration}s`,
            "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            "--background-radial-gradient": `radial-gradient(transparent,transparent, ${
              color instanceof Array ? color.join(",") : color
            },transparent,transparent)`,
          } as React.CSSProperties
        }
        className={`before:bg-shine-size before:absolute before:inset-0 before:aspect-square before:size-full before:rounded-3xl before:p-[--border-width] before:will-change-[background-position] before:content-[""] before:![-webkit-mask-composite:xor] before:[background-image:--background-radial-gradient] before:[background-size:300%_300%] before:![mask-composite:exclude] before:[mask:--mask-linear-gradient] motion-safe:before:animate-[shine-pulse_var(--shine-pulse-duration)_infinite_linear]`}
      />
      {children}
    </div>
  );
}

export { TypeWriter, ShineBorder };

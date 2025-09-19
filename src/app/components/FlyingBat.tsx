"use client";
import { useEffect, useRef } from "react";

export default function FlyingBat() {
  const batRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = batRef.current;
    if (!el) return;

    const BAT_W = 48;
    const BAT_H = 48;

    // Start somewhere random
    let x = Math.random() * (window.innerWidth - BAT_W);
    let y = Math.random() * (window.innerHeight - BAT_H);

    // Cursor target (center of screen initially)
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;

    let vx = 0;
    let vy = 0;

    let t = Math.random() * 1000; // time seed for bobbing
    let lastTime = performance.now();
    let lastMouseMoveTime = performance.now();
    let isIdle = false;
    let idleStartTime = 0;
    let idlePhase: "moving" | "stopping" | "curious" | "returning" = "moving";
    let originalTargetX = 0;
    let originalTargetY = 0;

    // Track mouse - adjust target to keep bat away from edges
    const handleMouse = (e: MouseEvent) => {
      const edgeBuffer = 50;

      const newTargetX = Math.max(
        edgeBuffer,
        Math.min(e.clientX - BAT_W / 2, window.innerWidth - BAT_W - edgeBuffer)
      );
      const newTargetY = Math.max(
        edgeBuffer,
        Math.min(e.clientY - BAT_H / 2, window.innerHeight - BAT_H - edgeBuffer)
      );

      const moved =
        Math.abs(newTargetX - targetX) > 5 ||
        Math.abs(newTargetY - targetY) > 5;

      if (moved) {
        targetX = newTargetX;
        targetY = newTargetY;
        lastMouseMoveTime = performance.now();
        idlePhase = "moving";
        isIdle = false;
      }
    };
    window.addEventListener("mousemove", handleMouse);

    const handleResize = () => {
      x = Math.min(x, window.innerWidth - BAT_W);
      y = Math.min(y, window.innerHeight - BAT_H);
    };
    window.addEventListener("resize", handleResize);

    const loop = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTime) / 16.67, 2);
      lastTime = currentTime;

      t += 0.016 * deltaTime;

      const timeSinceMouseMove = currentTime - lastMouseMoveTime;

      if (timeSinceMouseMove > 2000 && idlePhase === "moving") {
        idlePhase = "stopping";
        idleStartTime = currentTime;
        originalTargetX = targetX;
        originalTargetY = targetY;
        isIdle = true;
      }

      let dx = targetX - x;
      let dy = targetY - y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (isIdle) {
        const idleTime = (currentTime - idleStartTime) / 1000;

        if (idlePhase === "stopping" && distance < 20) {
          idlePhase = "curious";
          idleStartTime = currentTime;
        }

        if (idlePhase === "curious") {
          if (idleTime > 3) {
            idlePhase = "returning";
            targetX = originalTargetX;
            targetY = originalTargetY;
          } else {
            dx = 0;
            dy = 0;
            distance = 0;
          }
        }

        if (idlePhase === "returning" && distance < 30) {
          isIdle = false;
          idlePhase = "moving";
        }
      }

      let accelFactor = 0.015;

      if (idlePhase === "curious") {
        accelFactor = 0;
      } else if (idlePhase === "stopping") {
        accelFactor = 0.005;
      } else if (!isIdle) {
        if (distance < 50) accelFactor = 0.005;
        else if (distance > 200) accelFactor = 0.025;
      }

      const ax = dx * accelFactor;
      const ay = dy * accelFactor;

      vx += ax * deltaTime;
      vy += ay * deltaTime;

      const maxSpeed = 12;
      const currentSpeed = Math.sqrt(vx * vx + vy * vy);
      if (currentSpeed > maxSpeed) {
        vx = (vx / currentSpeed) * maxSpeed;
        vy = (vy / currentSpeed) * maxSpeed;
      }

      const dampingFactor = distance > 30 ? 0.98 : 0.92;
      vx *= dampingFactor;
      vy *= dampingFactor;

      x += vx * deltaTime;
      y += vy * deltaTime;

      const edgeBuffer = 50;
      if (x < edgeBuffer) vx += (edgeBuffer - x) * 0.002;
      if (x > window.innerWidth - BAT_W - edgeBuffer)
        vx -= (x - (window.innerWidth - BAT_W - edgeBuffer)) * 0.002;
      if (y < edgeBuffer) vy += (edgeBuffer - y) * 0.002;
      if (y > window.innerHeight - BAT_H - edgeBuffer)
        vy -= (y - (window.innerHeight - BAT_H - edgeBuffer)) * 0.002;

      x = Math.max(10, Math.min(x, window.innerWidth - BAT_W - 10));
      y = Math.max(10, Math.min(y, window.innerHeight - BAT_H - 10));

      const hoverAmplitude = Math.max(3, Math.min(6, currentSpeed * 0.3));
      const hoverY = Math.sin(t * 3) * hoverAmplitude;

      const facing =
        vx < -0.5
          ? "scaleX(-1)"
          : vx > 0.5
          ? "scaleX(1)"
          : el.style.transform.includes("scaleX(-1)")
          ? "scaleX(-1)"
          : "scaleX(1)";

      const tilt = Math.max(-15, Math.min(15, vx * 2));

      el.style.transform = `translate(${x}px, ${
        y + hoverY
      }px) ${facing} rotate(${tilt}deg)`;

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="pixel-bat-wrapper">
      <div ref={batRef} className="pixel-bat" />
    </div>
  );
}

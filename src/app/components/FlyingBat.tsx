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
    let lookDirection = 0; // -1 left, 1 right, 0 center
    let idlePhase = "moving"; // 'moving', 'stopping', 'curious', 'returning'
    let originalTargetX = 0;
    let originalTargetY = 0;

    // Track mouse - adjust target to keep bat away from edges
    const handleMouse = (e: MouseEvent) => {
      const edgeBuffer = 50;

      // Clamp target position to stay within safe zone
      const newTargetX = Math.max(
        edgeBuffer,
        Math.min(e.clientX - BAT_W / 2, window.innerWidth - BAT_W - edgeBuffer)
      );
      const newTargetY = Math.max(
        edgeBuffer,
        Math.min(e.clientY - BAT_H / 2, window.innerHeight - BAT_H - edgeBuffer)
      );

      // Only update target if mouse actually moved
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

    // Handle window resize
    const handleResize = () => {
      // Keep bat in bounds
      x = Math.min(x, window.innerWidth - BAT_W);
      y = Math.min(y, window.innerHeight - BAT_H);
    };
    window.addEventListener("resize", handleResize);

    const loop = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTime) / 16.67, 2); // Cap at 2x normal speed
      lastTime = currentTime;

      t += 0.016 * deltaTime;

      // Check if mouse hasn't moved for 2 seconds
      const timeSinceMouseMove = currentTime - lastMouseMoveTime;

      if (timeSinceMouseMove > 2000 && idlePhase === "moving") {
        // Start idle sequence - first stop where you are
        idlePhase = "stopping";
        idleStartTime = currentTime;
        originalTargetX = targetX; // Remember where mouse was
        originalTargetY = targetY;
        isIdle = true;
      }

      // Distance to target
      let dx = targetX - x;
      let dy = targetY - y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      // Idle behavior phases
      if (isIdle) {
        const idleTime = (currentTime - idleStartTime) / 1000;

        if (idlePhase === "stopping" && distance < 20) {
          // Once stopped, start being curious
          idlePhase = "curious";
          idleStartTime = currentTime; // Reset timer for curious phase
        }

        if (idlePhase === "curious") {
          // Stay put and look around for 2-3 seconds
          if (idleTime > 3) {
            idlePhase = "returning";
            // Set target back to original mouse position
            targetX = originalTargetX;
            targetY = originalTargetY;
          } else {
            // Look around curiously - don't move, just face directions
            const lookChangeInterval = 0.8; // Change look every 0.8 seconds
            const lookCycle = Math.floor(idleTime / lookChangeInterval) % 3;
            if (lookCycle === 0) lookDirection = 0; // Forward
            else if (lookCycle === 1) lookDirection = -1; // Left
            else lookDirection = 1; // Right

            // Don't change target position, just look
            dx = 0;
            dy = 0;
            distance = 0;
          }
        }

        if (idlePhase === "returning" && distance < 30) {
          // Finished returning, ready for next cycle
          isIdle = false;
          idlePhase = "moving";
        }
      }

      // Stronger acceleration for better following
      let accelFactor = 0.015;

      if (idlePhase === "curious") {
        // Don't move during curious phase
        accelFactor = 0;
      } else if (idlePhase === "stopping") {
        // Slow down when stopping
        accelFactor = 0.005;
      } else if (!isIdle) {
        if (distance < 50) {
          // Gentle approach when very close
          accelFactor = 0.005;
        } else if (distance > 200) {
          // Much stronger acceleration when far
          accelFactor = 0.025;
        }
      }

      // Compute acceleration toward cursor
      const ax = dx * accelFactor;
      const ay = dy * accelFactor;

      // Apply acceleration to velocity
      vx += ax * deltaTime;
      vy += ay * deltaTime;

      // Higher speed limits for better following
      const maxSpeed = 12;
      const currentSpeed = Math.sqrt(vx * vx + vy * vy);
      if (currentSpeed > maxSpeed) {
        vx = (vx / currentSpeed) * maxSpeed;
        vy = (vy / currentSpeed) * maxSpeed;
      }

      // Less aggressive damping
      const dampingFactor = distance > 30 ? 0.98 : 0.92;
      vx *= dampingFactor;
      vy *= dampingFactor;

      // Update position
      x += vx * deltaTime;
      y += vy * deltaTime;

      // Gentle avoidance of screen edges with buffer zone
      const edgeBuffer = 50; // Stay at least 50px from edge

      // Add repulsion force from edges
      if (x < edgeBuffer) {
        const pushForce = (edgeBuffer - x) * 0.002;
        vx += pushForce;
      }
      if (x > window.innerWidth - BAT_W - edgeBuffer) {
        const pushForce =
          (x - (window.innerWidth - BAT_W - edgeBuffer)) * 0.002;
        vx -= pushForce;
      }
      if (y < edgeBuffer) {
        const pushForce = (edgeBuffer - y) * 0.002;
        vy += pushForce;
      }
      if (y > window.innerHeight - BAT_H - edgeBuffer) {
        const pushForce =
          (y - (window.innerHeight - BAT_H - edgeBuffer)) * 0.002;
        vy -= pushForce;
      }

      // Hard boundaries as backup (bat shouldn't reach here with buffer)
      x = Math.max(10, Math.min(x, window.innerWidth - BAT_W - 10));
      y = Math.max(10, Math.min(y, window.innerHeight - BAT_H - 10));

      // Smoother hover / bobbing
      const hoverAmplitude = Math.max(3, Math.min(6, currentSpeed * 0.3));
      const hoverY = Math.sin(t * 3) * hoverAmplitude;

      // Smoother direction changes with rotation
      const targetRotation = Math.atan2(vy, vx) * (180 / Math.PI);
      const facing =
        vx < -0.5
          ? "scaleX(-1)"
          : vx > 0.5
          ? "scaleX(1)"
          : el.style.transform.includes("scaleX(-1)")
          ? "scaleX(-1)"
          : "scaleX(1)";

      // Subtle tilt based on movement
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

<script lang="ts">
  import { onMount } from "svelte";

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // still bail for reduced-motion users; on touch/no-keyboard devices keep
    // him alive on autopilot (he wanders and hops on his own) since there's no
    // way to drive him there.
    if (reducedMotion) return;
    const autopilot = !finePointer;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ---- sprite ------------------------------------------------------------
    // All sheets are 64px-grid, 8 frames of 64x64. idle.png is 896 wide with
    // the art in the last 8 of 14 cells (first frame at x = 384); running.png
    // and jumping.png are 512 wide with the 8 frames packed from x = 0.
    const FRAME_W = 64;
    const FRAME_H = 64;
    const FRAME_COUNT = 8;
    const IDLE_FPS = 8;
    const RUN_FRAME0_X = 0;
    const IDLE_FRAME0_X = 384;
    const JUMP_FRAME0_X = 0;
    // jump frames map to the arc: 0 stand, 1 crouch, 2 launch, 3 tuck-up,
    // 4-5 apex, 6 legs-extend (falling), 7 land. Mid-air poses are picked by
    // vertical velocity; 7 plays briefly on touchdown.
    const JUMP_LAND_FRAME = 7;
    const jumpFrameForVy = (vy: number) =>
      vy < -250 ? 3 : vy < 0 ? 4 : vy < 250 ? 5 : 6;

    // visible character bounds within each 64x64 cell (rest is transparent pad)
    const CONTENT_X = 5;
    const CONTENT_Y = 3;
    const BODY_W = 53;
    const BODY_H = 56;

    // bump to 2 for a larger mascot (keep it an integer to stay crisp)
    const DRAW_SCALE = 1;
    const PW = BODY_W * DRAW_SCALE;
    const PH = BODY_H * DRAW_SCALE;

    const idleSheet = new Image();
    const runSheet = new Image();
    const jumpSheet = new Image();
    idleSheet.src = "/idle.png";
    runSheet.src = "/running.png";
    jumpSheet.src = "/jumping.png";
    const sheetReady = (img: HTMLImageElement) =>
      img.complete && img.naturalWidth > 0;

    // draw one 64x64 cell, flipped to face `facing`, with the visible content
    // (not the cell) aligned to the collision box at player.x / player.y
    const drawSprite = (
      img: HTMLImageElement,
      frame0X: number,
      frame: number,
      facing: number,
    ) => {
      if (!sheetReady(img)) return;
      const sx = frame0X + frame * FRAME_W;
      const destX = Math.round(player.x) - CONTENT_X * DRAW_SCALE;
      const destY = Math.round(player.y) - CONTENT_Y * DRAW_SCALE;
      const destW = FRAME_W * DRAW_SCALE;
      const destH = FRAME_H * DRAW_SCALE;
      if (facing < 0) {
        ctx.save();
        ctx.translate(destX + destW, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(img, sx, 0, FRAME_W, FRAME_H, 0, destY, destW, destH);
        ctx.restore();
      } else {
        ctx.drawImage(img, sx, 0, FRAME_W, FRAME_H, destX, destY, destW, destH);
      }
    };

    let idlePhase = 0;
    let runPhase = 0;
    let landTimer = 0;

    // ---- world -------------------------------------------------------------
    let viewW = window.innerWidth;
    let viewH = window.innerHeight;

    const resize = () => {
      viewW = window.innerWidth;
      viewH = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = viewW * dpr;
      canvas.height = viewH * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
    };
    resize();
    window.addEventListener("resize", resize);

    type Platform = { x: number; y: number; w: number; el: Element | null };

    let platformEls: Element[] = [];
    const collectEls = () => {
      platformEls = Array.from(
        document.querySelectorAll("h1, h2, .row, [data-platform]"),
      );
    };
    collectEls();
    const collectTimer = setInterval(collectEls, 2000);

    const getPlatforms = (): Platform[] => {
      const plats: Platform[] = [
        { x: -1e6, y: viewH, w: 2e6, el: null }, // viewport floor
      ];
      for (const el of platformEls) {
        const r = el.getBoundingClientRect();
        if (r.width >= 60 && r.top > 50 && r.top < viewH - 4) {
          plats.push({ x: r.left, y: r.top, w: r.width, el });
        }
      }
      return plats;
    };

    // ---- physics -----------------------------------------------------------
    const GRAV = 1800;
    const MOVE = 250;
    const JUMP_V = -560;
    const MAX_FALL = 900;

    const player = {
      x: 48,
      y: viewH - PH,
      vx: 0,
      vy: 0,
      grounded: true,
      groundEl: null as Element | null,
      facing: 1,
    };

    const keys = { left: false, right: false, jump: false, down: false };
    let engaged = false;
    let engagedAt = 0;
    let engagedEver = false;
    let jumpBuffer = 0;
    let coyote = 0;
    let jumpCutDone = true;
    let dropTimer = 0;
    let elapsed = 0;

    // idle wandering + self-triggered hops when the user isn't driving
    let wanderDir = 0;
    let wanderDur = 0;
    let wanderWait = 2;
    let hopWait = 2.5 + Math.random() * 5;

    // occasional chatter above the head
    const PHRASES = [
      "it's dangerous to scroll alone!",
      "ship it ✦",
      "nice portfolio, huh?",
      "wanna see my projects?",
      "press ↑ to jump!",
      "404? not on my watch",
      "watch out for goblins!",
      "built with Svelte btw",
      "i live in this footer",
      "hire this guy →",
      "pixels assemble!",
      "down well, up code",
      "stack overflow? i don't fall",
      "brb, fighting a bug",
      "ahhhh~",
      "let him cook 🔥",
      "weeee~",
    ];
    let sayText = "";
    let sayTimer = 0; // seconds the current line stays up
    let sayWait = 5 + Math.random() * 6; // until the next line
    let lastPhrase = -1;

    // ---- input -------------------------------------------------------------
    const ENGAGE_KEYS = new Set(["arrowleft", "arrowright", "a", "d", "w"]);
    const SCROLL_KEYS = new Set([
      "arrowleft",
      "arrowright",
      "arrowup",
      "arrowdown",
      " ",
    ]);

    const isEditable = (t: EventTarget | null) =>
      t instanceof HTMLElement &&
      (t.isContentEditable ||
        t.tagName === "INPUT" ||
        t.tagName === "TEXTAREA" ||
        t.tagName === "SELECT");

    const onKeyDown = (e: KeyboardEvent) => {
      if (isEditable(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();

      if (k === "escape" && engaged) {
        engaged = false;
        keys.left = keys.right = keys.jump = keys.down = false;
        return;
      }

      if (!engaged) {
        if (!ENGAGE_KEYS.has(k)) return;
        engaged = true;
        engagedEver = true;
        engagedAt = elapsed;
      }
      if (SCROLL_KEYS.has(k)) e.preventDefault();

      if (k === "arrowleft" || k === "a") keys.left = true;
      else if (k === "arrowright" || k === "d") keys.right = true;
      else if (k === "arrowdown" || k === "s") keys.down = true;
      else if (k === "arrowup" || k === "w" || k === " ") {
        if (!e.repeat) {
          jumpBuffer = 0.12;
          jumpCutDone = false;
        }
        keys.jump = true;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "arrowleft" || k === "a") keys.left = false;
      else if (k === "arrowright" || k === "d") keys.right = false;
      else if (k === "arrowdown" || k === "s") keys.down = false;
      else if (k === "arrowup" || k === "w" || k === " ") keys.jump = false;
    };

    const onBlur = () => {
      keys.left = keys.right = keys.jump = keys.down = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);

    // ---- loop --------------------------------------------------------------
    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      elapsed += dt;

      const plats = getPlatforms();

      // direction input: user keys, or idle wander
      let dir = 0;
      if (engaged) {
        dir = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
      } else {
        wanderWait -= dt;
        if (wanderDur > 0) {
          wanderDur -= dt;
          dir = wanderDir;
        } else if (wanderWait <= 0) {
          wanderDir = Math.random() < 0.5 ? -1 : 1;
          wanderDur = 0.4 + Math.random() * 0.8;
          wanderWait = 2 + Math.random() * 3.5;
        }
        if (player.x < 24) wanderDir = 1;
        if (player.x > viewW - 24 - PW) wanderDir = -1;

        // occasionally hop on its own (keeps the touch/autopilot view lively)
        hopWait -= dt;
        if (hopWait <= 0 && player.grounded) {
          jumpBuffer = 0.12;
          jumpCutDone = true; // full-height hop, no variable cut
          hopWait = 2.5 + Math.random() * 5;
        }
      }

      // chatter: cycle a random line on, then off, then wait
      if (sayTimer > 0) {
        sayTimer -= dt;
        if (sayTimer <= 0) {
          sayText = "";
          sayWait = 6 + Math.random() * 7;
        }
      } else {
        sayWait -= dt;
        if (sayWait <= 0) {
          let i = Math.floor(Math.random() * PHRASES.length);
          if (i === lastPhrase) i = (i + 1) % PHRASES.length;
          lastPhrase = i;
          sayText = PHRASES[i];
          sayTimer = 2.6;
        }
      }

      const targetVx = dir * MOVE;
      player.vx += (targetVx - player.vx) * Math.min(1, dt * 18);
      if (dir !== 0) player.facing = dir;

      // ride the platform we're standing on (page scroll moves it)
      if (player.grounded) {
        const ground = plats.find((p) => p.el === player.groundEl);
        if (
          ground &&
          player.x + PW - 4 > ground.x &&
          player.x + 4 < ground.x + ground.w
        ) {
          player.y = ground.y - PH;
        } else {
          player.grounded = false;
        }
      }

      // drop through DOM platforms
      dropTimer = Math.max(0, dropTimer - dt);
      if (player.grounded && keys.down && player.groundEl) {
        dropTimer = 0.25;
        player.grounded = false;
        player.y += 2;
      }

      coyote = player.grounded ? 0.08 : Math.max(0, coyote - dt);
      jumpBuffer = Math.max(0, jumpBuffer - dt);

      if (jumpBuffer > 0 && (player.grounded || coyote > 0)) {
        player.vy = JUMP_V;
        player.grounded = false;
        player.groundEl = null;
        coyote = 0;
        jumpBuffer = 0;
      }
      // jump cut for variable height
      if (!keys.jump && !jumpCutDone && player.vy < -150) {
        player.vy *= 0.45;
        jumpCutDone = true;
      }

      const prevFeet = player.y + PH;

      if (!player.grounded) {
        player.vy = Math.min(player.vy + GRAV * dt, MAX_FALL);
      }

      player.x += player.vx * dt;
      player.y += player.vy * dt;

      // wrap horizontally
      if (player.x > viewW) player.x = -PW + 1;
      if (player.x + PW < 0) player.x = viewW - 1;

      // one-way platform landing
      if (!player.grounded && player.vy >= 0) {
        const feet = player.y + PH;
        let best: Platform | null = null;
        for (const p of plats) {
          if (dropTimer > 0 && p.el) continue;
          if (prevFeet <= p.y + 1 && feet >= p.y) {
            if (player.x + PW - 4 > p.x && player.x + 4 < p.x + p.w) {
              if (!best || p.y < best.y) best = p;
            }
          }
        }
        if (best) {
          if (player.vy > 250) landTimer = 0.1;
          player.y = best.y - PH;
          player.vy = 0;
          player.grounded = true;
          player.groundEl = best.el;
        }
      }

      // ---- draw ------------------------------------------------------------
      ctx.clearRect(0, 0, viewW, viewH);

      idlePhase += dt;
      landTimer = Math.max(0, landTimer - dt);
      if (!player.grounded) {
        // airborne pose tracks the jump arc via vertical velocity
        drawSprite(
          jumpSheet,
          JUMP_FRAME0_X,
          jumpFrameForVy(player.vy),
          player.facing,
        );
      } else if (landTimer > 0) {
        drawSprite(jumpSheet, JUMP_FRAME0_X, JUMP_LAND_FRAME, player.facing);
      } else if (Math.abs(player.vx) > 20) {
        // step rate tracks actual speed so footfalls match movement
        runPhase += dt * (8 + 6 * (Math.abs(player.vx) / MOVE));
        const frame = Math.floor(runPhase) % FRAME_COUNT;
        drawSprite(runSheet, RUN_FRAME0_X, frame, player.facing);
      } else {
        runPhase = 0;
        const frame = Math.floor(idlePhase * IDLE_FPS) % FRAME_COUNT;
        drawSprite(idleSheet, IDLE_FRAME0_X, frame, player.facing);
      }

      // hint text takes priority over chatter (skip keyboard hints on touch)
      let hint = "";
      if (autopilot) hint = "";
      else if (!engagedEver) hint = "← → to walk";
      else if (engaged && elapsed - engagedAt < 6)
        hint = "↑ jump · ↓ drop through · esc to let go";

      if (hint && player.grounded) {
        ctx.font = "500 12px 'Instrument Sans', system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(244, 241, 244, 0.5)";
        const tx = Math.min(Math.max(player.x + PW / 2, 110), viewW - 110);
        ctx.fillText(hint, tx, player.y - 10);
      } else if (sayText && player.grounded) {
        // fade the bubble in at the start and out at the end of its life
        const alpha = Math.max(
          0,
          Math.min(1, sayTimer / 0.3, (2.6 - sayTimer) / 0.2),
        );
        ctx.font = "500 12px 'Instrument Sans', system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const padX = 9;
        const padY = 6;
        const tw = ctx.measureText(sayText).width;
        const bw = tw + padX * 2;
        const bh = 12 + padY * 2;
        const cx = Math.min(
          Math.max(player.x + PW / 2, bw / 2 + 6),
          viewW - bw / 2 - 6,
        );
        const by = player.y - 14 - bh; // bubble bottom sits above the head
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "rgba(18, 16, 23, 0.92)";
        ctx.strokeStyle = "rgba(233, 159, 199, 0.55)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(cx - bw / 2, by, bw, bh, 7);
        ctx.fill();
        // little tail pointing down toward the head
        ctx.beginPath();
        ctx.moveTo(cx - 5, by + bh - 0.5);
        ctx.lineTo(cx, by + bh + 6);
        ctx.lineTo(cx + 5, by + bh - 0.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "rgba(244, 241, 244, 0.92)";
        ctx.fillText(sayText, cx, by + bh / 2 + 1);
        ctx.globalAlpha = 1;
        ctx.textBaseline = "alphabetic";
      }

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(collectTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
  });
</script>

<canvas bind:this={canvas} class="pixel-pal" aria-hidden="true"></canvas>

<style>
  .pixel-pal {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 80;
    image-rendering: pixelated;
  }
</style>

import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

type Viewer = { lastSeen: number; path: string; isOwner?: boolean };

const ACTIVE_TTL_MS = 45_000;
const OWNER_TTL_MS = 60_000;

const viewers = new Map<string, Viewer>();
const pageViews = new Map<string, number>();

function cleanup(now: number) {
  for (const [id, v] of viewers) {
    const ttl = v.isOwner ? OWNER_TTL_MS : ACTIVE_TTL_MS;
    if (now - v.lastSeen > ttl) viewers.delete(id);
  }
}

function isOwnerOnline(now: number) {
  for (const v of viewers.values()) {
    if (v.isOwner && now - v.lastSeen <= OWNER_TTL_MS) return true;
  }
  return false;
}

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json().catch(() => ({}));

  const path = typeof body.path === "string" ? body.path : "/";
  const viewerId =
    typeof body.viewerId === "string" && body.viewerId.length > 0
      ? body.viewerId
      : crypto.randomUUID();

  const now = Date.now();
  cleanup(now);

  const isOwner = body.isOwner === true;
  viewers.set(viewerId, { lastSeen: now, path, isOwner });

  if (body.shouldCountView === true) {
    pageViews.set(path, (pageViews.get(path) ?? 0) + 1);
  }

  let activeThisPage = 0;
  for (const v of viewers.values()) if (v.path === path) activeThisPage++;

  return json({
    viewerId,
    activeSiteWide: viewers.size,
    activeThisPage,
    totalViewsThisPage: pageViews.get(path) ?? 0,
    ownerOnline: isOwnerOnline(now),
  });
};

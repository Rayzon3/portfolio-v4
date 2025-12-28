import type { RequestHandler } from "./$types";

type RssItem = {
  title: string;
  description?: string;
  link: string; // absolute URL
  pubDate: string; // RFC-822 / GMT string
};

const SITE_URL = "https://rahulbhardwaj.codes"; // ✅ change if needed
const SITE_TITLE = "rahulbhardwaj.codes";
const SITE_DESCRIPTION =
  "Rahul's blog — dev, systems, and things I’m building.";

function escapeXml(str: string) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

// ✅ Replace this with your real blog source (see next section)
function getItems(): RssItem[] {
  return [
    {
      title: "Hello, world!",
      description: "My introduction post.",
      link: `${SITE_URL}/blog/hello-world`,
      pubDate: new Date("2025-12-28T08:29:00+05:30").toUTCString(),
    },
  ];
}

function renderRss(items: RssItem[]) {
  const now = new Date().toUTCString();

  const itemXml = items
    .map(
      (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid isPermaLink="true">${escapeXml(item.link)}</guid>
      <pubDate>${escapeXml(item.pubDate)}</pubDate>
      ${
        item.description
          ? `<description>${escapeXml(item.description)}</description>`
          : ""
      }
    </item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${escapeXml(SITE_URL)}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${escapeXml(now)}</lastBuildDate>
    ${itemXml}
  </channel>
</rss>`;
}

export const GET: RequestHandler = async () => {
  const items = getItems();

  return new Response(renderRss(items), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "max-age=0, s-maxage=3600",
    },
  });
};

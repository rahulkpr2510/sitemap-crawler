import { getSitemapUrls } from "../services/sitemap.services.js";
import { crawlPage } from "../services/crawler.services.js";
import { buildIncomingLinks } from "../services/incoming.services.js";

export async function crawlWebsite(req, res) {
  // Limit to 500 pages for fast deterministic runs
  const urls = (await getSitemapUrls()).slice(0, 500);

  for (const url of urls) {
    try {
      await crawlPage(url);
    } catch (err) {
      console.error("Skipped:", url, err.message);
    }
  }

  // Rebuild link graph
  await buildIncomingLinks();

  res.json({ status: "ok", pages: urls.length });
}

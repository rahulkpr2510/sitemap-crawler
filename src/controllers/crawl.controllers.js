import { getSitemapUrls } from "../services/sitemap.services.js";
import { crawlPage } from "../services/crawler.services.js";
import { buildIncomingLinks } from "../services/incoming.services.js";

export async function crawlWebsite(req, res) {
  const urls = await getSitemapUrls();

  for (const url of urls) {
    try {
      await crawlPage(url);
    } catch {
      console.log("Skipped:", url);
    }
  }

  await buildIncomingLinks();
  res.json({ status: "ok", pages: urls.length });
}

import { getSitemapUrls } from "../services/sitemap.services.js";
import { crawlPage } from "../services/crawler.services.js";
import { buildIncomingLinks } from "../services/incoming.services.js";

export const crawlWebsite = async (req, res) => {
  const urls = await getSitemapUrls();
  for (const url of urls) {
    try {
      await crawlPage(url);
    } catch (error) {
      console.log("Skipped:", url);
    }
  }
  await buildIncomingLinks();
  res.json({ message: "Crawl completed", pages: urls.length });
};

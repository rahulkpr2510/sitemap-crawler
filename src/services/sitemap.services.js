import axios from "axios";
import { load } from "cheerio";
import { normalizeUrl } from "../utils/normalize.js";

export async function getSitemapUrls() {
  const { data } = await axios.get("https://www.edzy.ai/sitemap.xml", {
    timeout: 10000,
  });

  const $ = load(data, { xmlMode: true });
  const urls = [];

  $("url > loc").each((_, el) => {
    const raw = $(el).text().trim();
    const clean = normalizeUrl(raw);
    if (clean) urls.push(clean);
  });

  return urls;
}

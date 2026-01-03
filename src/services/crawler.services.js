import axios from "axios";
import { load } from "cheerio";
import { Page } from "../models/page.models.js";
import { normalizeUrl } from "../utils/normalize.js";

const BASE = "https://www.edzy.ai";

export async function crawlPage(url) {
  const clean = normalizeUrl(url);
  if (!clean) return;

  const { data } = await axios.get(clean, {
    timeout: 15000,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; EdzyCrawler/1.0; +https://www.edzy.ai)",
      Accept: "text/html",
    },
  });

  const $ = load(data);

  const outgoingLinks = [];

  $("a[href]").each((_, el) => {
    let link = $(el).attr("href")?.trim();
    if (!link) return;

    if (link.startsWith("/")) link = BASE + link;
    if (!link.startsWith("http")) return;

    link = normalizeUrl(link);
    if (!link) return;

    outgoingLinks.push({
      url: link,
      type: link.startsWith(BASE) ? "internal" : "external",
    });
  });

  if (outgoingLinks.length === 0) {
    console.warn("⚠️ No links extracted from", clean);
  }

  await Page.findOneAndUpdate(
    { url: clean },
    {
      url: clean,
      html: data,
      outgoingLinks,
      outgoingCount: outgoingLinks.length,
      crawledAt: new Date(),
    },
    { upsert: true }
  );
}

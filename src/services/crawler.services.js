import { chromium } from "playwright";
import { load } from "cheerio";
import { Page } from "../models/page.models.js";
import { normalizeUrl } from "../utils/normalize.js";

const BASE = "https://www.edzy.ai";

export async function crawlPage(url) {
  const clean = normalizeUrl(url);
  if (!clean) return;

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(clean, { waitUntil: "networkidle" });

  const html = await page.content();
  const $ = load(html);

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

  await browser.close();

  await Page.findOneAndUpdate(
    { url: clean },
    {
      url: clean,
      html,
      outgoingLinks,
      outgoingCount: outgoingLinks.length,
      crawledAt: new Date(),
    },
    { upsert: true }
  );
}

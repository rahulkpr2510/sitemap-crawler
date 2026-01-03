import axios from "axios";
import { load } from "cheerio";
import { Page } from "../models/page.models.js";

const BASE = "https://www.edzy.ai";

export const crawlPage = async (url) => {
  const response = await axios.get(url);
  const html = response.data;
  const $ = load(html);

  const outgoingLinks = [];
  $("a[href]").each((_, e) => {
    let link = $(e).attr("href");

    if (link.startsWith("/")) {
      link = BASE + link;
    }
    if (!link.startsWith("http")) return;

    outgoingLinks.push({
      url: link,
      type: link.startsWith(BASE) ? "internal" : "external",
    });
  });

  await Page.findOneAndUpdate(
    { url },
    { url, html, outgoingLinks, crawledAt: new Date() },
    { upsert: true }
  );
};

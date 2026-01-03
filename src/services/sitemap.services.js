import axios from "axios";
import { load } from "cheerio";

export const getSitemapUrls = async () => {
  const response = await axios.get("https://www.edzy.ai/sitemap.xml");
  const $ = load(response.data, { xmlMode: true });
  const urls = [];

  $("url > loc").each((_, e) => {
    const pageUrl = $(e).text().trim();
    urls.push(pageUrl);
  });
  return urls;
};

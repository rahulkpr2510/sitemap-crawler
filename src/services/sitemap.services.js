import axios from "axios";
import { load } from "cheerio";

export async function getSitemapUrls() {
  const { data } = await axios.get("https://www.edzy.ai/sitemap.xml");
  const $ = load(data, { xmlMode: true });

  const urls = [];
  $("url > loc").each((_, el) => urls.push($(el).text().trim()));
  return urls;
}

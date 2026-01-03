import { Page } from "../models/page.models.js";

export async function buildIncomingLinks() {
  // Reset old graph to avoid ghost edges
  await Page.updateMany({}, { $set: { incomingLinks: [], incomingCount: 0 } });

  const pages = await Page.find({}, { url: 1, outgoingLinks: 1 });

  const graph = {};

  for (const page of pages) {
    for (const link of page.outgoingLinks) {
      if (!graph[link.url]) graph[link.url] = [];
      graph[link.url].push(page.url);
    }
  }

  for (const [url, sources] of Object.entries(graph)) {
    const unique = [...new Set(sources)];

    await Page.updateOne(
      { url },
      { incomingLinks: unique, incomingCount: unique.length },
      { upsert: true }
    );
  }
}

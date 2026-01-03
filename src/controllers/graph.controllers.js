import { Page } from "../models/page.models.js";
import { normalizeUrl } from "../utils/normalize.js";

export async function getIncoming(req, res) {
  const url = normalizeUrl(req.body.url);
  if (!url) return res.status(400).json({ error: "Invalid URL" });

  const page = await Page.findOne({ url });
  res.json(page?.incomingLinks || []);
}

export async function getOutgoing(req, res) {
  const url = normalizeUrl(req.body.url);
  if (!url) return res.status(400).json({ error: "Invalid URL" });

  const page = await Page.findOne({ url });
  res.json(page?.outgoingLinks || []);
}

export async function getTopPages(req, res) {
  const n = Math.min(Number(req.body.n || 10), 100);
  const pages = await Page.find({}, { url: 1, incomingCount: 1 })
    .sort({ incomingCount: -1 })
    .limit(n);

  res.json(pages);
}

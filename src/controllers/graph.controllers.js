import { Page } from "../models/page.models.js";

export const getIncoming = async (req, res) => {
  const page = await Page.findOne({ url: req.body.url });
  res.json(page?.incomingLinks || []);
};

export const getOutgoing = async (req, res) => {
  const page = await Page.findOne({ url: req.body.url });
  res.json(page?.outgoingLinks || []);
};

export const getTopPages = async (req, res) => {
  const n = parseInt(req.query.n) > 100 ? 100 : parseInt(req.query.n);
  const pages = await Page.aggregate([
    {
      $project: {
        url: 1,
        count: { $size: { $ifNull: ["$incomingLinks", []] } },
      },
    },
    { $sort: { count: -1 } },
    { $limit: n },
  ]);

  res.json(pages);
};

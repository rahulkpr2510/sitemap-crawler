import { Router } from "express";
import { crawlWebsite } from "../controllers/crawl.controllers.js";
import {
  getIncoming,
  getOutgoing,
  getTopPages,
} from "../controllers/graph.controllers.js";

const router = Router();

router.post("/crawl", crawlWebsite);

router.post("/incoming", getIncoming);
router.post("/outgoing", getOutgoing);
router.post("/top", getTopPages);

router.post("/build-incoming", async (req, res) => {
  try {
    await buildIncomingLinks();
    res.json({
      status: "ok",
      message: "Incoming link graph built successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Graph build failed" });
  }
});

export default router;

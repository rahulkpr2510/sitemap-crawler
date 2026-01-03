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

export default router;

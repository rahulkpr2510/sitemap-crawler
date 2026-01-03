import express from "express";
import graphRoutes from "./routes/graph.routes.js";

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
  res.json({ status: "OK", service: "Edzy Sitemap Crawler", time: new Date() });
});

app.use("/api", graphRoutes);

export default app;

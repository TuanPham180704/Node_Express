import express from "express";
import logger from "./logger.js";
import client from "prom-client";

const app = express();
app.use(express.json());
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ prefix: "observability_demo_" });
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests received",
});

app.use((req, res, next) => {
  httpRequestCounter.inc();
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.get("/", (req, res) => res.send("Hello from Tuấn Dev!"));

app.get("/error", (req, res) => {
  throw new Error("Simulated error for testing logger!");
});

app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ error: err.message });
});

const PORT = 3000;
app.listen(PORT, () => logger.info(`✅ Server running on port ${PORT}`));

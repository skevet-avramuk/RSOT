const express = require("express");
const { createClient } = require("redis");

const app = express();

const PORT = process.env.PORT || 8081;
const GREETING = process.env.GREETING || "Hello from Express+Redis!";
const REDIS_HOST = process.env.REDIS_HOST || "redis";
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redis = createClient({ url: `redis://${REDIS_HOST}:${REDIS_PORT}` });

redis.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  await redis.connect();
})();

// Главный маршрут с подсчётом визитов
app.get("/", async (req, res) => {
  await redis.incr("visits");
  const visits = await redis.get("visits");
  res.send(`${GREETING}\nVisits: ${visits}\n`);
});

// Healthcheck endpoint
app.get("/health", async (req, res) => {
  try {
    await redis.ping();
    res.json({ status: "ok" });
  } catch {
    res.status(500).json({ status: "unhealthy" });
  }
});

// Graceful shutdown
const server = app.listen(PORT, () => console.log(`Server on port ${PORT}`));

process.on("SIGTERM", async () => {
  console.log("SIGTERM received: shutting down gracefully");
  server.close(async () => {
    await redis.quit();
    console.log("Shutdown complete");
    process.exit(0);
  });
});

import express from "express";
import process from "process";

const app = express();

// Конфигурация через ENV
const PORT = process.env.PORT || 8081;
const STU_ID = process.env.STU_ID || "1";
const STU_GROUP = process.env.STU_GROUP || "feis";
const STU_VARIANT = process.env.STU_VARIANT || "v01";

// Health endpoint
app.get("/health", (req, res) => res.status(200).send("OK"));

// Readiness endpoint (можно добавить, если потребуется)
app.get("/ready", (req, res) => res.status(200).send("READY"));

// Пример простого логирования запроса
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Запуск сервера
const server = app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
  console.log(`Student ID: ${STU_ID}, Group: ${STU_GROUP}, Variant: ${STU_VARIANT}`);
});

// Graceful shutdown
const shutdown = () => {
  console.log("⚡ SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("✅ Server closed.");
    process.exit(0);
  });

  // Форсированный выход через 5 секунд
  setTimeout(() => {
    console.error("❌ Force exit.");
    process.exit(1);
  }, 5000);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

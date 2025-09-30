import http from "http";

const options = {
  hostname: "127.0.0.1",
  port: process.env.PORT || 8081,
  path: "/health",
  method: "GET",
};

const req = http.request(options, (res) => process.exit(res.statusCode === 200 ? 0 : 1));
req.on("error", () => process.exit(1));
req.end();

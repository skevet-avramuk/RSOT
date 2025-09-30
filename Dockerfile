# Stage: deps
FROM node:20-alpine AS deps
WORKDIR /app
COPY src/package*.json ./     
RUN npm ci --omit=dev

# Stage: build
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY src/ .                   

# Stage: final
FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /app
USER 65532:65532
COPY --from=build /app /app
ENV PORT=8081
ENV REDIS_HOST=redis
ENV REDIS_PORT=6379
EXPOSE 8081
ENTRYPOINT ["/usr/local/bin/node","server.js"]     
# syntax=docker/dockerfile:1
#########################
# Stage 1: dependencies
#########################
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

#########################
# Stage 2: build
#########################
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

#########################
# Stage 3: final
#########################
FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /app
USER 65532:65532

# Копируем готовый билд
COPY --from=build /app /app

# Экспонируем порт из задания
EXPOSE 8081

# Метаданные студента
LABEL org.bstu.student.fullname="Vashchuk Anatoli Valerevich" \
    org.bstu.student.id="1" \
    org.bstu.group="feis" \
    org.bstu.variant="v01" \
    org.bstu.course="RSIOT"

# ENV переменные
ENV STU_ID=1 \
    STU_GROUP=feis \
    STU_VARIANT=v01 \
    PORT=8081

# Healthcheck через Node.js скрипт
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD ["node", "src/healthcheck.js"]

# Запуск сервера
ENTRYPOINT ["node", "src/server.js"]

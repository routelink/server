FROM node:20-alpine3.19 as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN set -eux; \
    npm ci

COPY . .

RUN set -eux; \
    npm run build

FROM node:20-alpine3.19

LABEL org.opencontainers.image.authors="RouteLink <support@routelink.ru>" \
    org.opencontainers.image.licenses="MIT" \
    org.opencontainers.image.title="RouteLink Server" \
    org.opencontainers.image.description="Express.js based server application"

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/config ./config
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/seeders ./seeders
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env /app/.sequelizerc ./

RUN set -eux; \
    npm i -g pm2; \
    npm ci --only=production

EXPOSE 80

HEALTHCHECK CMD curl --fail http://localhost/healthz || exit 1  

ENTRYPOINT ["pm2-runtime"]

CMD ["dist/index.js"]
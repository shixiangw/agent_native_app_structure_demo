FROM node:20-alpine AS base
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./
RUN npm ci
COPY backend/ .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --only=production
COPY --from=base /app/dist ./dist
COPY --from=base /app/prisma ./prisma
COPY --from=base /app/node_modules/.prisma ./node_modules/.prisma
EXPOSE 3000
CMD ["node", "dist/index.js"]

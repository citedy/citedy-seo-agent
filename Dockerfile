FROM node:22-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY index.js ./

FROM node:22-alpine
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["node", "index.js"]

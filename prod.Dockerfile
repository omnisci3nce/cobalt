# Stage 1 - Typecheck and compile source code to JS
FROM node:16-alpine as builder

# update host packages
RUN apk update

WORKDIR /server

COPY server/*.json ./
COPY server/db/ ./
COPY server/src ./src

RUN npm ci
RUN npm run build

# Stage 2 - Install production packages and run
FROM node:16-alpine

WORKDIR /usr

COPY server/package.json server/package-lock.json ./
RUN npm ci --production

COPY --from=builder /server/build .
# COPY server/.prod.env ./.env
# COPY server/uploads/ ./uploads
# RUN npm i pm2 -g
EXPOSE 8000
CMD ["npm", "run", "server"]

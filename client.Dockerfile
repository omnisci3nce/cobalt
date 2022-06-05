FROM node:16-alpine as builder

WORKDIR /client

COPY client/package.json client/package-lock.json ./

RUN npm i

COPY client/src ./src
COPY client/index.html client/*.json client/vite.config.ts client/.eslintrc.js ./

RUN npm run build

FROM nginx:1.21-alpine

COPY --from=builder /client/dist /usr/share/nginx/html
COPY client/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

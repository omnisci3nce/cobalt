FROM node:16-alpine

WORKDIR /server

COPY server/*.json ./
COPY server/db/ ./

RUN npm install

COPY server/src ./src

EXPOSE 8000

CMD npm run start

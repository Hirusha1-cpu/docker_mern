# Dockerfile for the client
FROM node:22-alpine

WORKDIR /app

COPY package.json .

COPY . .

RUN npm install

EXPOSE 3003

CMD ["npm","run" ,"start"]
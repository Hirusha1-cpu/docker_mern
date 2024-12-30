# Dockerfile for the API service
FROM node:22-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5001

CMD ["npm","run" ,"start"]


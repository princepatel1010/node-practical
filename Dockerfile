FROM node:20

WORKDIR /usr/src/node-app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn seed

EXPOSE 8000


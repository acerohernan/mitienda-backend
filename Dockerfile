#stage 1 building the code
FROM node:16.18-alpine as builder
WORKDIR /usr/app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

#stage 2 setup the app
FROM node:16.18-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN yarn install --production

COPY --from=builder /usr/app/dist ./dist

EXPOSE 3000
CMD yarn start:prod



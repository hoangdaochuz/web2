FROM node:alpine

WORKDIR /usr/app

COPY ./ ./

RUN yarn install

RUN yarn build

RUN yarn global add serve

CMD [ "serve", "-s", "build", "-l", "3001" ]
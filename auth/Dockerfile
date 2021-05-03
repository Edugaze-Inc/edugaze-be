FROM node:14 as dev
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
CMD [ "yarn", "start" ]

FROM node:14 as prod
WORKDIR /usr/src/app
COPY --from=dev /usr/src/app .
RUN yarn && yarn build
CMD ["node", "build/index.js"]
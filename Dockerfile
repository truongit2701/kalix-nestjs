#build stage

FROM node:18-alpine AS build

WORKDIR /user/src/app

COPY package*.json ./

RUN nom install

COPY . . 

RUN npm run build


#prob stage

FROM node:18-alpine

WORKDIR /user/src/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=build /user/src/app/dist ./dist

COPY package*.json ./

RUN npm install --only=production

RUN rm package*.json

EXPOSE 3000

CMD ["node", "dist/main.js"]

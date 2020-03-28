FROM node:lts-alpine3.10

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run tsc

CMD ["npm", "start"]
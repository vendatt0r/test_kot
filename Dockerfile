FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g ts-node-dev typescript

EXPOSE 3000

CMD ["npx", "ts-node-dev", "--respawn", "src/app.ts"]

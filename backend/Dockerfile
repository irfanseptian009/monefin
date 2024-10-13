FROM node:14-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3001
CMD ["npx", "ts-node-dev", "src/index.ts"]

FROM node:24.13.1-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]

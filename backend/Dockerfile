FROM node:24.13.1-alpine

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .

RUN cp .env.docker .env || true

RUN yarn build

EXPOSE 4000

CMD ["yarn", "start"]

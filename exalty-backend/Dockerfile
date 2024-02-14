FROM node:18.10.0-alpine3.15

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]

COPY ./src ./src

RUN npm install

RUN npx prisma generate

CMD npm run aio

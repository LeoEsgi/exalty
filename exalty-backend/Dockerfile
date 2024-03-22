FROM node:18.10.0-alpine3.15

WORKDIR /usr/src/app/exalty-backend

COPY package*.json ./

RUN npm install

RUN npx prisma generate

COPY . .

CMD ["npm", "run", "aio"]

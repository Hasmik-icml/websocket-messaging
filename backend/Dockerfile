FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g prisma

COPY prisma/ ./prisma

RUN npx prisma generate

COPY . . 

RUN npm run build 

EXPOSE 3000

CMD ["npm", "run", "dev"]

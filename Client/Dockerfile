FROM node:16-alpine

WORKDIR /app

# COPY package*.json .
COPY package* .
RUN npm i

COPY  . .

CMD ["npm", "run", "dev"]
FROM node:19-alpine3.16

WORKDIR /nestestate_frontend

ENV PATH="./node_modules/.bin:$PATH"
COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]
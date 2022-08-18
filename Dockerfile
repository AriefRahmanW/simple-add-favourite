ARG VERSION=16.13.2

FROM node:${VERSION}

WORKDIR /app

ADD . /app

COPY package*.json ./

RUN npm install --only=production

RUN npm audit fix

COPY . .

# RUN npm run build

CMD [ "node", "dist/main"]
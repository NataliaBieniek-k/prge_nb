FROM node:24

LABEL maintainer="nb"

WORKDIR /app

COPY config/node/frontend/package.json config/node/frontend/package-lock.json ./
RUN npm install

COPY config/node/frontend .

ENV CI=false

CMD ["npm", "start"]

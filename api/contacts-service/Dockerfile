FROM node:12.20-alpine

ENV HOME=/home/app

RUN mkdir -p $HOME

WORKDIR $HOME

COPY package.json $HOME/package.json
COPY package-lock.json $HOME/package-lock.json
RUN npm install --silent --progress=false --production
COPY src/ $HOME/src

CMD ["npm", "start"]
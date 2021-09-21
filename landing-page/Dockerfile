# base image
FROM node:12.18.2 as build

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json before other files
COPY ./package.json /usr/src/app/
COPY ./package-lock.json /usr/src/app/

# Install dependencies only
RUN npm install --production

# Copy all files
COPY . /usr/src/app

# Update configs file
RUN cp /usr/src/app/configs.template.js /usr/src/app/configs.js
ARG API_ENDPOINT
ARG LANDING_PAGE_DOMAIN
ARG GA_MEASUREMENT_ID
RUN sed -i -e "s;API_ENDPOINT_HERE;$API_ENDPOINT;g" /usr/src/app/configs.js
RUN sed -i -e "s;LANDING_PAGE_DOMAIN_HERE;$LANDING_PAGE_DOMAIN;g" /usr/src/app/configs.js
RUN sed -i -e "s;GA_MEASUREMENT_ID_HERE;$GA_MEASUREMENT_ID;g" /usr/src/app/configs.js

# check configs file
RUN cat /usr/src/app/configs.js

# Build app
RUN npm run build

EXPOSE 3000

CMD  ["npm", "run", "start"]
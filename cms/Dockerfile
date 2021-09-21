# base image
FROM node:12.18.2 as build


# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Copy package.json and package-lock.json before other files
COPY ./package.json /usr/src/app/
COPY ./package-lock.json /usr/src/app/

# Install packages
RUN npm install

# Copy all files
COPY . /usr/src/app

# Update configs file
RUN cp /usr/src/app/src/configs.template.js /usr/src/app/src/configs.js
ARG API_ENDPOINT
RUN sed -i -e "s;API_ENDPOINT_HERE;$API_ENDPOINT;g" /usr/src/app/src/configs.js

# check configs file
RUN cat /usr/src/app/src/configs.js

# Build app
RUN npm run build

FROM nginx:1.14.0-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
RUN rm -rf /etc/nginx/conf.d
COPY config/nginx /etc/nginx
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 80
CMD ["nginx-debug", "-g", "daemon off;"]
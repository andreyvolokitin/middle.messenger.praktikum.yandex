FROM node:14
WORKDIR /var/www
RUN npm i express && npm i helmet
COPY dist ./dist
COPY server.js ./
EXPOSE 3000
CMD node ./server.js

FROM ubuntu:18.04
WORKDIR /var/www
COPY package*.json ./
RUN apt update && \
     apt install -y curl && \
     curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
     apt update && \
     apt install -y nodejs && \
     npm install -g npm && \
     npm i

COPY . .
CMD npm run build

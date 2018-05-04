FROM node:9.11
COPY . /app
WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org
RUN npm install -g ts-node --registry=https://registry.npm.taobao.org
RUN npm install -g typescript --registry=https://registry.npm.taobao.org
EXPOSE 3000
CMD node config/index.js
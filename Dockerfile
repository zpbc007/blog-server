FROM node:9.11
COPY ./dist /app
WORKDIR /app
EXPOSE 3000
CMD node app/app.js
FROM node:latest
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
ENV PORT=3005
EXPOSE 3005

CMD [ "npm", "run", "dev"]

### build angular app
WORKDIR /angular-app
RUN npm run build --prod

### run angular app
FROM nginx:alpine
COPY angular-app/dist/angular-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
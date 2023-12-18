FROM node:alpine AS build

WORKDIR /mywallet-frontend

COPY . .

RUN npm install

RUN npm run build

FROM nginx:alpine

COPY --from=build mywallet-frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
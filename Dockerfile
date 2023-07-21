FROM node:14 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build -- --prod

FROM nginx:1.21.3-alpine

COPY --from=build /usr/src/app/dist/orange-kpi-front /usr/share/nginx/html

EXPOSE 88
CMD ["nginx", "-g", "daemon off;"]

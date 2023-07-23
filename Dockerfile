FROM node:18 AS build

WORKDIR /home/fares/AngularApp_pfe/orange-kpi-front

COPY package*.json ./


COPY . .

RUN npm run build

FROM nginx:1.21.3-alpine

COPY --from=build /home/fares/AngularApp_pfe/orange-kpi-front /usr/share/nginx/html

EXPOSE 8083

CMD ["nginx", "-g", "daemon off;"]

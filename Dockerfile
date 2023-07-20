FROM node:14 AS build
WORKDIR /home/fares/AngularApp_pfe/orange-front-kpi
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --prod

FROM nginx:1.21.3-alpine
COPY --from=build /app/dist/your-angular-app /usr/share/nginx/html
EXPOSE 8098
CMD ["nginx", "-g", "daemon off;"]

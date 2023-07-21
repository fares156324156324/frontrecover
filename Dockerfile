# Use a base image with Node.js installed
FROM node:14 AS build

# Set the working directory within the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Angular app for production
RUN npm run build

# Use a lightweight Nginx image as the base image for serving the app
FROM nginx:1.21.3-alpine

# Copy the build output from the build container to the Nginx image
COPY --from=build /usr/src/app/dist/orange-kpi-front /usr/share/nginx/html

# Expose port 80 to access the app from outside the container
EXPOSE 80

# Start Nginx server when the container starts
CMD ["nginx", "-g", "daemon off;"]

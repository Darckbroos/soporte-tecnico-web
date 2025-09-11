# Frontend: build with Node and serve with Nginx
FROM node:20-bullseye AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN apt-get update && apt-get install -y dos2unix && \
    find node_modules/.bin -type f -maxdepth 1 -exec chmod +x {} \; && \
    find node_modules/.bin -type f -maxdepth 1 -exec dos2unix {} \; || true
RUN npm run build

FROM nginx:stable
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]


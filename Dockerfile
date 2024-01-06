FROM node:20.10-alpine AS build
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . /app/
RUN npm run buildcontainer
# RUN npm run postbuildprod

FROM nginx:1.25.3-alpine
EXPOSE 80
EXPOSE 443
RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/
COPY --from=build /app/dist/container/browser /usr/share/nginx/html

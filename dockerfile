FROM node:12-alpine AS builder
WORKDIR /fake-umbrella/front-end
COPY package*.json ./
RUN npm install
COPY . .
RUN /fake-umbrella/front-end/node_modules/.bin/ng build --prod

FROM nginx:1.16-alpine
COPY --from=builder /fake-umbrella/front-end/dist/front-end /usr/share/nginx/html
EXPOSE 80
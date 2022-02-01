FROM node:latest as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app

RUN npm install

RUN npm run build

FROM nginx:latest

COPY --from=build /usr/local/app/dist/vandelay-finance-frontend /usr/share/nginx/html

COPY default.conf.template /etc/nginx/conf.d/default.conf.template

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'

FROM nginx

COPY ./vue-project/dist /html

COPY ./nginx.conf /etc/nginx/nginx.conf
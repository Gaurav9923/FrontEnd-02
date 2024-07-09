# stage 1
FROM node:20.4.0 as build
WORKDIR /app
COPY package*.json ./

RUN npm install
RUN npx  ngcc  --properties es2023 browser  module  main --first-only --create-ivy-entry-points 
COPY . .
RUN npm run build   

# stage 2
FROM nginx:stable

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/front-end-02/browser/ /usr/share/nginx/html/

# COPY nginx.conf /etc/nginx/conf.d/nginx.conf  
EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
# docker run --name front-end-02-container -d -p  4600:80 front-end-02
#  docker build -t front-end-02 .   

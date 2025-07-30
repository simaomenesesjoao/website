FROM ubuntu:22.04 as builder

RUN apt-get update && \
    apt-get install -y git curl gnupg ca-certificates && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN npm install -g @angular/cli
WORKDIR /app

RUN git clone https://github.com/simaomenesesjoao/website.git website
RUN git clone https://github.com/simaomenesesjoao/Ostomachion.git Ostomachion
RUN cd /app/website && git checkout analytics

RUN cd /app/Ostomachion/documents && npm install marked
RUN cd /app/Ostomachion/documents && node ./install.js /app/website/angular_app/src/assets/projects/
RUN cd /app/website/angular_app && npm install bootstrap-icons highlight.js katex ngx-matomo-client@6
RUN cd /app/website/angular_app && ng build 

FROM nginx:alpine
COPY --from=builder /app/website/angular_app/dist/ /app/website/angular_app/dist/
COPY nginx.conf /app/website/nginx.conf
EXPOSE 80

CMD ["nginx", "-c", "/app/website/nginx.conf", "-g", "daemon off;"]

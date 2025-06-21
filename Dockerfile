# Use Ubuntu 22.04 base image
FROM ubuntu:22.04

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

RUN cd /app/Ostomachion/documents && npm install marked
RUN cd /app/Ostomachion/documents && node ./install.js /app/website/angular_app/src/assets/projects/
RUN cd /app/website/angular_app && npm install bootstrap-icons highlight.js katex

EXPOSE 4200
WORKDIR /app/website/angular_app
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
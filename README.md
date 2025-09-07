This is the full project for my personal website. 

# Stack:
- Docker, docker-compose
- certbot, python3-certbot-nginx to handle ssl certificates
- Angular app for the website itself, containerized within Docker
- Matomo for analytics, also via Docker
- nginx handling https and routing the requests to the website and the analytics instance (see sites-enabled)

# Configuring nginx
sudo systemctl restart nginx

# Setting up the Angular app and Matomo
git clone https://github.com/simaomenesesjoao/website
cd website
sudo docker build --no-cache -t angular-website .
sudo docker run -d -p 4200:80 angular-website

cd matomo
docker-compose up -d 

# Accessing the website
https://simaomenesesjoao.com

# Accessing Matomo
Matomo is only exposed to the outside world in port 8080 in order to receive logging requests. To access Matomo directly, I use an ssh tunnel
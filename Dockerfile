# Ubuntu를 기반 이미지로 사용합니다.
FROM ubuntu:latest

# Nginx를 설치합니다.
RUN apt-get update && \
    apt-get install -y nginx

# # Nginx 기본 설정을 제거합니다. (이 줄을 주석 처리하거나 제거)
# RUN rm /etc/nginx/sites-enabled/default

# Nginx 기본 설정 파일을 직접 생성하거나 복사합니다.
# 여기서는 간단한 기본 설정 파일을 직접 생성하는 예시입니다.
RUN echo "server {" > /etc/nginx/sites-enabled/default && \
    echo "    listen 80;" >> /etc/nginx/sites-enabled/default && \
    echo "    server_name localhost;" >> /etc/nginx/sites-enabled/default && \
    echo "    root /var/www/html;" >> /etc/nginx/sites-enabled/default && \
    echo "    index index.html index.htm;" >> /etc/nginx/sites-enabled/default && \
    echo "    location / {" >> /etc/nginx/sites-enabled/default && \
    echo "        try_files \$uri \$uri/ =404;" >> /etc/nginx/sites-enabled/default && \
    echo "    }" >> /etc/nginx/sites-enabled/default && \
    echo "}" >> /etc/nginx/sites-enabled/default

# 웹 애플리케이션 파일을 Nginx의 기본 웹 디렉토리에 복사합니다.
COPY index.html /var/www/html/
COPY style.css /var/www/html/
COPY script.js /var/www/html/

# Nginx가 80번 포트를 통해 서비스를 제공하도록 노출합니다.
EXPOSE 80

# Nginx를 포 그라운드에서 실행합니다.
CMD ["nginx", "-g", "daemon off;"]

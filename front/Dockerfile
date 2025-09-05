FROM nginx:alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

# انسخ الملفات والمجلدات اللازمة
COPY Events/ .
COPY SHOP/ SHOP/
COPY diest/ diest/

# إعداد ملف الكونفيغ لـ nginx بشكل صحيح
RUN cat <<EOF > /etc/nginx/conf.d/default.conf
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;
    location / {
        try_files \$uri /index.html;
    }
    location ~* \.(?:css|js|jpg|jpeg|gif|png|svg|ico|woff2?|ttf|eot)$ {
        try_files \$uri =404;
    }
}
EOF

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

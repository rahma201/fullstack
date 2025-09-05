FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# حذف الملفات الافتراضية في Nginx
RUN rm -rf ./*

# نسخ ملفات الواجهة (front-end) إلى الحاوية
COPY . .

# إعداد ملف config الخاص بـ Nginx ليعيد التوجيه للجذر إلى /SHOP/Shop.html
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    location = / { \
        return 302 /SHOP/Shop.html; \
    } \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    location ~* \\\.(?:css|js|jpg|jpeg|gif|png|svg|ico|woff2?|ttf|eot)$ { \
        try_files $uri =404; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

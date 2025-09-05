FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# حذف الملفات الافتراضية
RUN rm -rf ./*

# نسخ ملفات الواجهة (front-end) إلى مجلد Nginx
COPY . .

# إعداد ملف الكونفيج الخاص بـ Nginx داخل الصورة
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri /index.html; \
    } \
    location ~* \\.(?:css|js|jpg|jpeg|gif|png|svg|ico|woff2?|ttf|eot)$ { \
        try_files $uri =404; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

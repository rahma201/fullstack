# استخدم نسخة خفيفة من Nginx
FROM nginx:alpine

# حدد مجلد العمل داخل Nginx
WORKDIR /usr/share/nginx/html

# احذف أي محتوى افتراضي
RUN rm -rf ./*

# انسخ كل ملفات مشروع الفرونت
COPY Events/ .
COPY SHOP/ SHOP/
COPY diest/ diest/

# إعداد ملف الكونفيغ لـ Nginx
RUN echo 'server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location ~* \.(?:css|js|jpg|jpeg|gif|png|svg|ico|woff2?|ttf|eot)$ {
        try_files $uri =404;
    }
}' > /etc/nginx/conf.d/default.conf

# افتح المنفذ 80
EXPOSE 80

# شغل Nginx
CMD ["nginx", "-g", "daemon off;"]

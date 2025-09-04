# استخدم نسخة خفيفة من Nginx
FROM nginx:alpine

# ضع مجلد العمل داخل Nginx
WORKDIR /usr/share/nginx/html

# احذف أي ملفات افتراضية موجودة
RUN rm -rf ./*

# انسخ كل الملفات من مشروع الفرونت
COPY . .

# تعيين الـ Index الرئيسي
RUN echo "index index.html;" >> /etc/nginx/conf.d/default.conf

# إذا كانت SPA، أضف إعادة التوجيه لكل المسارات إلى index.html
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# افتح البورت 80
EXPOSE 80

# شغل Nginx
CMD ["nginx", "-g", "daemon off;"]

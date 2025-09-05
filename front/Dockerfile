FROM nginx:alpine

# تحديد مسار العمل داخل الحاوية
WORKDIR /usr/share/nginx/html

# حذف الملفات الافتراضية من Nginx
RUN rm -rf ./*

# نسخ كل الملفات والمجلدات من مجلد البناء إلى داخل الصورة
COPY . .

# إعداد ملف Nginx config
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

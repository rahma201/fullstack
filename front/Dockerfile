FROM nginx:alpine

# نسخ كل ملفات Front-end إلى Nginx
COPY . /usr/share/nginx/html

# اعرض الصفحة الرئيسية index.html تلقائيًا
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

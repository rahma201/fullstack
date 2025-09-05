# 1. Build stage
FROM node:18-alpine as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build  # أو الأمر الخاص بالبناء عندك

# 2. Production stage (serve static files with nginx)
FROM nginx:alpine

# حذف ملفات nginx الافتراضية
RUN rm -rf /usr/share/nginx/html/*

# نسخ ملفات البناء من المرحلة الأولى إلى مجلد nginx
COPY --from=build-stage /app/build /usr/share/nginx/html

# نسخ ملف إعدادات nginx مخصص (لو عندك، أو تستخدم الافتراضي)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

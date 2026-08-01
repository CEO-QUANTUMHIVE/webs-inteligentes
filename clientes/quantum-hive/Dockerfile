# Sirve el export estatico de Next.js (carpeta out/) con nginx.
# Requiere haber corrido `npm run build` antes de deployar.
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY out/ /usr/share/nginx/html/

EXPOSE 8080

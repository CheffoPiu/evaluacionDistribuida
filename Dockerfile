# Usamos Nginx ligero
FROM nginx:alpine

# Copiamos el portal al directorio que sirve Nginx
COPY index.html /usr/share/nginx/html/index.html

# (Opcional) si luego agregas CSS o JS:
# COPY css/ /usr/share/nginx/html/css/

# Exponemos el puerto interno que Nginx escucha
EXPOSE 80

# Arranque por defecto de Nginx
CMD ["nginx", "-g", "daemon off;"]

# Utiliser l'image officielle Node.js comme image de base
FROM node:18-alpine as build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le reste du code de l'application
COPY . .

# Construire l'application
RUN npm run build

# Utiliser Nginx pour servir l'application React
FROM nginx:alpine

# Copier les fichiers construits dans le répertoire nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copier le fichier de configuration nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port 80
EXPOSE 80

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
# Utiliser l'image officielle Node.js comme image de base
FROM node:20-alpine

# Mettre à jour les packages pour corriger les vulnérabilités
RUN apk update && apk upgrade && apk add --no-cache curl ca-certificates

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm ci --omit=dev

# Copier le reste du code de l'application
COPY . .

# Exposer le port sur lequel l'application s'exécutera
EXPOSE 3000

# Définir la commande de démarrage
CMD ["npm", "start"]
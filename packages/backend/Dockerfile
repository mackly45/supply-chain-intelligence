# Utiliser l'image officielle Node.js comme image de base
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier le reste du code de l'application
COPY . .

# Exposer le port sur lequel l'application s'exécutera
EXPOSE 3000

# Définir la commande de démarrage
CMD ["npm", "start"]
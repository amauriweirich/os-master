# Use Node.js oficial
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Instalar serve para servir arquivos estáticos
RUN npm install -g serve

# Expor porta
EXPOSE 3000

# Comando para iniciar
CMD ["serve", "-s", "dist", "-l", "3000"]
# Etapa 1: Usar uma imagem base do Node.js
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos necessários para o container
COPY package*.json ./

# Instalar as dependências
RUN npm install
RUN npm install -g nodemon

# Copiar todo o projeto para o container
COPY . .

# Expõe a porta 3080, usada frequentemente por servidores Node.js
EXPOSE 3080 3001

# Comando padrão para desenvolvimento (pode ser sobrescrito)
CMD ["npm", "run", "dev"]

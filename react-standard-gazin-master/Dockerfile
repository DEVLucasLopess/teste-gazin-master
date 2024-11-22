# Etapa 1: Build da aplicação
FROM node:18 AS build
WORKDIR /app

# Copia os arquivos do projeto para o container
COPY package*.json ./
RUN npm install
COPY . .

# Build da aplicação
RUN npm run build

# Etapa 2: Imagem final para execução
FROM node:18 AS production
WORKDIR /app

# Instala as dependências de produção
COPY package*.json ./
RUN npm install --omit=dev

# Copia os arquivos transpilados da etapa de build
COPY --from=build /app/dist ./dist

# Instala um servidor de arquivos estáticos (opcional)
RUN npm install -g serve

# Expõe a porta onde o servidor responderá
EXPOSE 3000

# Comando para servir os arquivos estáticos
CMD ["serve", "-s", "dist"]

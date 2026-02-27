# --- ESTÁGIO DE BUILD ---
FROM node:20-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de package.json e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Constrói a aplicação para produção (gera a pasta 'dist')
RUN npm run build

# --- ESTÁGIO DE EXECUÇÃO (RUNTIME) ---
FROM nginx:alpine

# Copia os arquivos estáticos da pasta 'dist' do estágio anterior para o diretório do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 80 (padrão do Nginx)
EXPOSE 80

# Comando para iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]

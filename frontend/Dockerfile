# /frontend/Dockerfile

# Estágio 1: Build (Construção)
# Usamos o Node 20 (como já tínhamos corrigido)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio 2: Serve (Servidor)
# Usa o servidor web Nginx
FROM nginx:1.25-alpine
# Copia os arquivos da pasta 'dist' do Estágio 1
COPY --from=build /app/dist /usr/share/nginx/html
# Copia a configuração do Nginx (para o React Router funcionar)
COPY nginx.conf /etc/nginx/conf.d/default.conf 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# Estágio de Compilação (Build)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copiar csproj e restaurar dependências
COPY *.csproj ./
RUN dotnet restore

# Copiar o restante dos arquivos e buildar
COPY . ./
RUN dotnet publish -c Release -o out

# Estágio de Execução (Runtime)
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# Definir a porta da API
EXPOSE 80

# Comando para rodar a aplicação
ENTRYPOINT ["dotnet", "BackEndCloudflared.dll"]

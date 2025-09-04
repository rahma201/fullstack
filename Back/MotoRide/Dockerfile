# Build stage
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app

COPY *.sln .
COPY MotoRide/*.csproj ./MotoRide/
RUN dotnet restore

COPY MotoRide/. ./MotoRide/
WORKDIR /app/MotoRide
RUN dotnet publish -c Release -o out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app/MotoRide/out .

# نغير البورت الداخلي إلى 5000
EXPOSE 5000
ENTRYPOINT ["dotnet", "MotoRide.dll", "--urls", "http://+:5000"]

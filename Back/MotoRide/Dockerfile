# استخدم صورة .NET Runtime لتشغيل التطبيق
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5000

# استخدم صورة SDK للبناء
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["MotoRide.sln", "./"]
COPY ["MotoRide/", "MotoRide/"]

# استعادة الحزم وبناء التطبيق
RUN dotnet restore "MotoRide/MotoRide.csproj"
RUN dotnet build "MotoRide/MotoRide.csproj" -c Release -o /app/build
RUN dotnet publish "MotoRide/MotoRide.csproj" -c Release -o /app/publish

# نسخة نهائية للتشغيل
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "MotoRide.dll"]

# استخدام صورة .NET الأساسية
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

# استخدام صورة SDK لبناء التطبيق
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# نسخ ملفات المشروع إلى الحاوية
COPY ["MotoRide/MotoRide.csproj", "MotoRide/"]
RUN dotnet restore "MotoRide/MotoRide.csproj"

# نسخ جميع الملفات المتبقية وبناء التطبيق
COPY . .
WORKDIR "/src/MotoRide"
RUN dotnet build "MotoRide.csproj" -c Release -o /app/build

# نشر التطبيق في مجلد /app
FROM build AS publish
RUN dotnet publish "MotoRide.csproj" -c Release -o /app/publish

# إعداد الحاوية لتشغيل التطبيق
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MotoRide.dll"]

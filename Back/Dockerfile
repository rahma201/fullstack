FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
RUN mkdir -p /app/Images   # إنشاء مجلد الصور داخل الحاوية
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# نسخ ملف المشروع فقط
COPY ["MotoRide/MotoRide.csproj", "MotoRide/"]

RUN dotnet restore "MotoRide/MotoRide.csproj"

# نسخ باقي الملفات
COPY . .

WORKDIR "/src/MotoRide"
RUN dotnet build "MotoRide.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MotoRide.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
# تأكد من وجود مجلد الصور
RUN mkdir -p /app/Images

ENTRYPOINT ["dotnet", "MotoRide.dll"]

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# نسخ ملف المشروع من Back/MotoRide/ إلى مجلد MotoRide/ داخل الحاوية
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
ENTRYPOINT ["dotnet", "MotoRide.dll"]

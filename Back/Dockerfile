# صورة تشغيل التطبيق متوافقة مع .NET 7
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 5000

# صورة SDK للبناء متوافقة مع .NET 7
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

COPY ["MotoRide.sln", "./"]
COPY ["MotoRide/", "MotoRide/"]
COPY ./Images /app/Images  # إضافة المجلد Images

RUN dotnet restore "MotoRide/MotoRide.csproj"
RUN dotnet build "MotoRide/MotoRide.csproj" -c Release -o /app/build
RUN dotnet publish "MotoRide/MotoRide.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "MotoRide.dll"]

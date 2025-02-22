FROM amazoncorretto:21
LABEL authors="tanpatrick"

WORKDIR /app
COPY ./build/libs/giigle-api.jar giigle-api.jar
EXPOSE 8080
ENV SPRING_PROFILES_ACTIVE=prod
CMD java -jar /app/giigle-api.jar
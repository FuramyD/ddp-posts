FROM gradle:latest as builder
WORKDIR /app
COPY . /app/.
RUN gradle build

FROM jyckbase/java21
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar /app/app.jar
EXPOSE 8000
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

# Document


#docker mongo
##docker-compose.yaml
```
version: "3.8"
services:
  mongo:
    image: mongo:latest
    container_name: mongo
    environment:
        - MONGO_INITDB_ROOT_USERNAME=parin
        - MONGO_INITDB_ROOT_PASSWORD=parindev
    restart: unless-stopped
    ports:
      - "27017:27017"
    volumes:
      - ./database/db:/data/db
      - ./database/dev.archive:/Databases/dev.archive
      - ./database/production:/Databases/production
  mongo-express:
    image: mongo-express
    container_name: mexpress
    environment:
      - ME_CONFIG_MONGODB_ADMINUSERNAME=parin
      - ME_CONFIG_MONGODB_ADMINPASSWORD=parindev
      - ME_CONFIG_MONGODB_URL=mongodb://parin:parindev@mongo:27017/?authSource=admin
      - ME_CONFIG_BASICAUTH_USERNAME=parin
      - ME_CONFIG_BASICAUTH_PASSWORD=parindev
    links:
      - mongo
    restart: unless-stopped
    ports:
      - "8081:8081"
```

# Document


### mongo 
docker-compose.yaml
```
version: "3.8"
services:
  mongo:
    image: mongo:latest
    container_name: mongo
    environment:
        - MONGO_INITDB_ROOT_USERNAME=root
        - MONGO_INITDB_ROOT_PASSWORD=password
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
      - ME_CONFIG_MONGODB_ADMINUSERNAME=root
      - ME_CONFIG_MONGODB_ADMINPASSWORD=password
      - ME_CONFIG_MONGODB_URL=mongodb://root:password@mongo:27017/?authSource=admin
      - ME_CONFIG_BASICAUTH_USERNAME=mexpress
      - ME_CONFIG_BASICAUTH_PASSWORD=mexpress
    links:
      - mongo
    restart: unless-stopped
    ports:
      - "8081:8081"
```

command shell in container
```
docker exec -it <container-name> mongosh -u "<username>" -p "<password>"
```
command in mongo

### show all database
```
show databases
```

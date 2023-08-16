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
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: admin
    ports:
      - "0.0.0.0:27017:27017"
    networks:
      - MONGO
    volumes:
      - type: volume
        source: MONGO_DATA
        target: /data/db
      - type: volume
        source: MONGO_CONFIG
        target: /data/configdb
  mongo-express:
    image: mongo-express:latest
    container_name: mongo-express
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: admin
      ME_CONFIG_MONGODB_ADMINPASSWORD: admin
      ME_CONFIG_MONGODB_SERVER: mongo
      ME_CONFIG_MONGODB_PORT: "27017"
    ports:
      - "0.0.0.0:8081:8081"
    networks:
      - MONGO
    depends_on:
      - mongo
    volumes:
      - type: bind
        source: ./wait-for.sh
        target: /wait-for.sh
    entrypoint:
      - /bin/sh
      - /wait-for.sh
      - mongo:27017
      - --
      - tini
      - --
      - /docker-entrypoint.sh

networks:
  MONGO:
    name: MONGO

volumes:
  MONGO_DATA:
    name: MONGO_DATA
  MONGO_CONFIG:
    name: MONGO_CONFIG
```
wait-for
https://github.com/eficode/wait-for

command shell in container
```
docker exec -it <container-name> mongosh -u "<username>" -p "<password>"
```

## command in mongo
```
show databases                             //show all database
db                                         //current databse
use <database-name>                        //create or switch database
db.dropDatabase()                          //drop
db.createCollection('<collection-name>')   //create collection
show collections                           //show collections
db.<collection-name>.insert({})            //insert row
db.<collection-name>.insert([])            //insert multiple rows
db.<collection-name>.find()                //get all rows
db.<collection-name>.find().pretty()       //get all rows formatted
db.<collection-name>.fin({id:'value'})     //get all by
db.<collection-name>.find().count()        //count rows
db.<collection-name>.find({id:'value'}).count() //count rows by id
db.<collection-name>.find().limit(2).pretty() //limit rows
db.<collection-name>.find().limit(2).sort({ sort: 1}).pretty() //chaining
db.<collection-name>.find().forEach(function(doc){  //foreach
    print('xxxx: ' + doc.name)
})
db.<collection-name>.findOne({id: 'value'})  // find on row
db.<collection-name>.find({ name: 'parin'}, { age: 12}) //find specific fields
```

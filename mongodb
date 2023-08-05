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

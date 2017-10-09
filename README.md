# SimpleStub

Install [Node.JS](https://nodejs.org/en/download/)

Install all dependencies
`npm install`

See few basic samples how to use it
- [routes/books.js](https://github.com/jbruchanov/SimpleStub/blob/dev/routes/books.js) - sample for PostrgreSQL
- [routes/devices.js](https://github.com/jbruchanov/SimpleStub/blob/dev/routes/devices.js) - sample for MongoDB
- [routes/settings.js](https://github.com/jbruchanov/SimpleStub/blob/dev/routes/settings.js) - very simple static JSON provider
- [routes/users.js](https://github.com/jbruchanov/SimpleStub/blob/dev/routes/users.js) - very simple JSON array example

### MongoDB:
Install it
- Check if it works using for example [Robo 3T](https://robomongo.org/)
- Update [StubConstants.MongooseURI]((https://github.com/jbruchanov/SimpleStub/blob/dev/src/StubConstants.js)) for db URI

Try few requests

**PUT** - https://yourweb/devices
```json
{
    "name": "Name",
    "id": 1,
}
```

**POST** - https://yourweb/devices
```json
{
    _id: "whatever_id_was_generated_for_the_record_from_put_request",
    "name": "Name2",
    "id": 2,
}
```

**GET** - https://yourweb/devices 

**DELETE** - https://yourweb/devices
```json
{
    _id: "whatever_id_was_generated_for_the_record_from_put_request"
}
```


### PostgreSQL
Install it
- setup new database + all necessary stuff like user/role/privileges etc...
- Update [StubConstants.PostgresSQLURI](https://github.com/jbruchanov/SimpleStub/blob/dev/src/StubConstants.js) for db URI

Try few requests

**PUT** - https://yourweb/books
```json
{
    "name": "Name",
    "price": 123, 
    "published":  "2017-01-01T11:22:33.444Z"
}
```

**POST** - https://yourweb/books/1 (or any other id)
```json
{
    "name": "Name1",
    "price": 1
}
```

**GET** - https://yourweb/books 

**DELETE** - https://yourweb/books/1

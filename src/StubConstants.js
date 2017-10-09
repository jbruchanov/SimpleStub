var StubConstants = {
    Status_OK: 200,
    Status_NotFound: 404,
    Status_ServerError: 500,

    Header_ContentType: "Content-Type",
    ContentType_JSON: "application/json",

    UTF8: 'utf-8',

    MongooseURI: "mongodb://devserver/stub",
    PostgresSQLURI: "postgres://psql:psql@devserver:5432/simplestub",
};

module.exports = StubConstants;
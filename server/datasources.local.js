module.exports = {
  "db": {
    "name": "db",
    "connector": "memory"
  },
  "mongoDs": {
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "database": process.env.DB_COLLECTION,
    "password": process.env.DB_PASS,
    "url": false,
    "name": "mongoDs",
    "user": process.env.DB_ID,
    "connector": "mongodb",
    "useNewUrlParser": true,
    //몽고DB 기본설정값을 따른다 -> false
    "prohibitHiddenPropertiesInQuery": false,
    "allowExtendedOperators": true
  }
};
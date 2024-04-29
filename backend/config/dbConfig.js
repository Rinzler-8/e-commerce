module.exports = {
    HOST: "localhost",
    USER: "root",
    PORT: 3305,
    PASSWORD: "root",
    DB: "GenuineDignity",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
}; 
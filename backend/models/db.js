const mysql = require("mysql2");
// const dbConfig = require("../config/dbConfig.js");
const dbConfig = require("../config/dbConfig");

// Create a connection to the database
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: 3305,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  timezone: "+07:00", // Set the timezone to UTC+7

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.role = require("./role.js")(sequelize, Sequelize);
db.user = require("./user.js")(sequelize, Sequelize);
db.cart = require("./cart.js")(sequelize, Sequelize);
db.product = require("./product.js")(sequelize, Sequelize);
db.order = require("./order.js")(sequelize, Sequelize);
db.orderItems = require("./orderItems.js")(sequelize, Sequelize);
db.review = require("./review.js")(sequelize, Sequelize);
db.category = require("./Category.js")(sequelize, Sequelize);

db.userDTO = require("../dto/userDTO")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "role_id",
  otherKey: "user_id",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "user_id",
  otherKey: "role_id",
});
db.cart.belongsTo(db.product, {
  foreignKey: 'productId',
});
// db.product.belongsTo(db.category, {
//   foreignKey: {
//     name: "category_id",
//     allowNull: false,
//   },
// });
db.category.hasMany(db.product, {
  foreignKey: "category_id",
  as: "products",
});
db.orderItems.belongsTo(db.product, {
  foreignKey: "productId",
  as: "product",
});

db.ROLES = ["admin", "user"];

module.exports = db;

const { sequelize, Sequelize } = require("../models/db");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    first_name: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    last_name: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    mobile: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    url_avatar: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.INTEGER, // Use INTEGER data type for enum values
      allowNull: false,
      defaultValue: 0, // Set the default value for the enum
      field: "status", // Specify the column name in the database
    },
  });

  return User;
};

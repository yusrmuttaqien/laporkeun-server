const Sequelize = require("sequelize");
const db = require("./../config/database");

const Response = db.define(
  "response",
  {
    id_response: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    id_petugas: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    id_report: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    response: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date_response: {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  },
  {
    createdAt: true,
    updatedAt: false,
  }
);

module.exports = Response;

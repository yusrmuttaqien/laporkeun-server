const Sequelize = require("sequelize");
const db = require("./../config/database");

const Report = db.define(
  "report",
  {
    id_report: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    NIK: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    id_response: {
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    report: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date_report: {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    pic: {
      type: Sequelize.TEXT,
    },
    vis: {
      type: Sequelize.ENUM("Publik", "Privat"),
      allowNull: false,
    },
    stat: {
      type: Sequelize.ENUM("Diterima", "Ditolak", "Menunggu"),
      allowNull: false,
      defaultValue: "Menunggu",
    },
    loc: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: true,
    updatedAt: false,
  }
);

module.exports = Report;

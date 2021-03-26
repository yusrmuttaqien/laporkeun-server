const Sequelize = require("sequelize");
const db = require("./../config/database");

const Petugas = db.define(
  "petugass",
  {
    id_petugas: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name_petugas: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date_akun: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    telp: {
      type: Sequelize.TEXT,
    },
    pic: {
      type: Sequelize.TEXT,
    },
    id_role: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 3,
    },
  },
  {
    createdAt: "date_akun",
    updatedAt: false,
    freezeTableName: true,
  }
);

module.exports = Petugas;

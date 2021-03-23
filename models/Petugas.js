const Sequelize = require("sequelize");
const db = require("./../config/database");

const Petugas = db.define(
  "petugas",
  {
    id_petugas: {
      type: Sequelize.INTEGER,
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
      type: Sequelize.STRING,
    },
    pic: {
      type: Sequelize.STRING,
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
  }
);

module.exports = Petugas;

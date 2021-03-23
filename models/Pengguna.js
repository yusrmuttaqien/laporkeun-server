const Sequelize = require("sequelize");
const db = require("./../config/database");

const Pengguna = db.define(
  "pengguna",
  {
    NIK: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    name_pengguna: {
      type: Sequelize.STRING,
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
    },
    date_akun: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Pengguna;

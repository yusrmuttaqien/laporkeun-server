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
      type: Sequelize.TEXT,
    },
    pic: {
      type: Sequelize.TEXT,
    },
    id_role: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 2,
    },
    date_akun: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
  },
  {
    createdAt: "date_akun",
    updatedAt: false,
  }
);

module.exports = Pengguna;

const Sequelize = require("sequelize");
const db = require("./../config/database");

const Role = db.define(
  "role",
  {
    id_role: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    role: {
      type: Sequelize.ENUM("admin", "pengguna", "petugas"),
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Role;

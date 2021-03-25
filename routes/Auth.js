const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const db = require("./../config/database");
const Role = require("./../models/Role");
const { generateAccessToken } = require("./../functions");

router.post("/masuk", (req, res) => {
  const { kataSandi, name } = req.body;

  // NOTE: RAW Query => Stored Procedure
  db.query("CALL finduser (:name)", {
    replacements: { name: name },
    type: db.QueryTypes.SELECT,
    raw: true,
  })
    .then(async (user) => {
      // Sorting output
      if (user.length > 1) {
        for (i = 0; i < user.length - 1; i++) {
          if (Object.keys(user[i]).length !== 0) {
            if (
              user[i][0].name_pengguna === name ||
              user[i][0].name_petugas === name
            ) {
              if (await bcrypt.compare(kataSandi, user[i][0].password)) {
                const roleFind = await Role.findOne({
                  where: { id_role: user[i][0].id_role },
                });
                const { role } = roleFind.dataValues;
                const data = { ...user[i][0], role };
                const accessToken = generateAccessToken(data);
                const responses = { ...data, accessToken };
                return res.status(200).send({
                  notify: `Selamat datang, ${
                    data.name_petugas || data.name_pengguna
                  }`,
                  responses,
                });
              }
              return res.status(403).send({ notify: "Kata sandi salah" });
            }
            // NOTE: I'm confused
            return res.status(400).send({ notify: "Nama tidak ditemukan" });
          }
        }
      }
      return res.status(400).send({ notify: "Nama tidak ditemukan" });
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

module.exports = router;

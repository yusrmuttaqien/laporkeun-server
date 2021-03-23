require("dotenv").config();

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const db = require("./../config/database");
const Pengguna = require("./../models/Pengguna");
const { generateAccessToken } = require("./../functions");

router.post("/registrasi", (req, res) => {
  const { kataSandi, name, NIK } = req.body;

  // NOTE: RAW Query => Stored Procedure
  db.query("CALL availibility (:name_pengguna, :nik)", {
    replacements: { name_pengguna: name, nik: NIK },
    type: db.QueryTypes.SELECT,
    raw: true,
  })
    .then(async (pengguna) => {
      // Check for duplicate
      if (pengguna.length > 1) {
        for (i = 0; i < pengguna.length - 1; i++) {
          if (Object.keys(pengguna[i]).length !== 0) {
            if (
              pengguna[i][0].name_pengguna == name ||
              pengguna[i][0].name_petugas == name
            ) {
              nameSame = true;
              return res
                .status(302)
                .send({ notify: "Nama sudah dipakai", pengguna });
            }
            if (pengguna[i][0].NIK) {
              if (pengguna[i][0].NIK === NIK.toString()) {
                NIKSame = true;
                return res
                  .status(302)
                  .send({ notify: "NIK sudah terdaftar", pengguna });
              }
            }
          }
        }
      }
      // Create account
      const hashPassword = await bcrypt.hash(kataSandi, 10);

      await Pengguna.create({
        NIK: NIK.toString(),
        password: hashPassword,
        name_pengguna: name,
      })
        .then((data) => {
          const accessToken = generateAccessToken(data.dataValues);
          let responses = { ...data.dataValues, accessToken, role: "pengguna" };
          return res.status(201).send({
            notify: `Akun telah dibuat, Halo ${responses.name_pengguna}`,
            responses,
          });
        })
        .catch((err) => {
          return res.status(500).send(err);
        });
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

module.exports = router;

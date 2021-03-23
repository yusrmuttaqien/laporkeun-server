const express = require("express");
const router = express.Router();
const db = require("./../config/database");
const Pengguna = require("./../models/Pengguna");

router.post("/registrasi", (req, res) => {
  const { kataSandi, name, NIK } = req.body;

// NOTE: RAW Query => Stored Procedure
  db.query("CALL availibility (:name_pengguna, :nik)", {
    replacements: { name_pengguna: name, nik: NIK },
    type: db.QueryTypes.SELECT,
  })
    .then((pengguna) => {
      if (pengguna.length !== 0) {
        res.status(302).send({ notify: "Nama/NIK sudah dipakai", pengguna });
      } else {
        res.status(200).send({ notify: "Nama tersedia", pengguna });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

module.exports = router;

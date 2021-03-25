require("dotenv").config();

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const db = require("./../config/database");
const Petugas = require("./../models/Petugas");
const { generateAccessToken, authenticateToken } = require("./../functions");

router.post("/registrasi", authenticateToken, (req, res) => {
  const { kataSandi, name, telp } = req.body;

  // NOTE: RAW Query => Stored Procedure
  db.query("CALL availibility (:name_pengguna, :nik)", {
    replacements: { name_pengguna: name, nik: "0000000000000000" },
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

      await Petugas.create({
        telp: telp.toString(),
        password: hashPassword,
        name_petugas: name,
      })
        .then((data) => {
          const accessToken = generateAccessToken(data.dataValues);
          let responses = { ...data.dataValues, accessToken, role: "petugas" };
          return res.status(201).send({
            notify: `Akun ${responses.name_petugas} berhasil dibuat`,
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

router.get("/list", authenticateToken, async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  var output = [];
  var info = {};

  if (endIndex < (await Petugas.count())) {
    info.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    info.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  Petugas.findAll({
    limit: limit,
    offset: startIndex,
    order: [["createdAt", "DESC"]],
  })
    .then((result) => {
      for (var i = 0; i < result.length; i++) {
        var pengguna = result[i].pengguna;
        var report = result[i];
        delete report.pengguna;
        output.push({ report, pengguna });
      }
      return res.status(200).send({
        output,
        info,
      });
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

router.post("/delete", authenticateToken, async (req, res) => {
  const { id } = req.body;
  await Petugas.destroy({
    where: {
      id_petugas: id,
    },
  })
    .then(() => {
      return res.status(201).send({
        notify: `Akun berhasil dihapus`,
      });
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

module.exports = router;

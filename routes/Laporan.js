const express = require("express");
const router = express.Router();

const db = require("./../config/database");
const Report = require("./../models/Report");
const Pengguna = require("./../models/Pengguna");
const { authenticateToken } = require("./../functions");

router.post("/buat", authenticateToken, (req, res) => {
  const { judulLaporan, isiLaporan, pic, vis } = req.body;
  const { NIK } = req.authPengguna;

  Report.create({
    NIK: NIK,
    title: judulLaporan,
    report: isiLaporan,
    // NOTE: Return pic as modified file name
    // pic: pic,
    vis: vis,
  })
    .then((report) => {
      return res.status(201).send({
        notify: `Laporan anda berhasil dipubllikasikan!`,
        report,
      });
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

router.get("/laporanku", authenticateToken, async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const { NIK } = req.authPengguna;
  Pengguna.hasMany(Report, { foreignKey: "NIK" });
  Report.belongsTo(Pengguna, { foreignKey: "NIK" });

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  var output = [];
  var info = {};

  if (endIndex < (await Report.count({ where: { NIK: NIK } }))) {
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

  Report.findAll({
    where: { NIK: NIK },
    include: [Pengguna],
    limit: limit,
    offset: startIndex,
  })
    .then((result) => {
      for (var i = 0; i < result.length; i++) {
        var pengguna = result[i].dataValues.pengguna.dataValues;
        var report = result[i].dataValues;
        delete report.pengguna;
        output.push({ report, pengguna });
      }
      return res.status(200).send({
        notify: `Berikut daftar laporan anda`,
        output,
        info,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
});

module.exports = router;

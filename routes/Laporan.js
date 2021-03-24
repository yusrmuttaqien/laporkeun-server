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
      console.log(err);
      return res.status(500).send(err);
    });
});

router.get("/laporanku", authenticateToken, async (req, res) => {
  const { NIK } = req.authPengguna;
  Pengguna.hasMany(Report, { foreignKey: "NIK" });
  Report.belongsTo(Pengguna, { foreignKey: "NIK" });

  const result = await Report.findAll({
    where: { NIK: NIK },
    include: [Pengguna],
  });

  console.log(JSON.stringify(result));

  return res.status(200).send({ notify: "I'm okay" });
});

module.exports = router;

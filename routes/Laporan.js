const express = require("express");
const router = express.Router();

const db = require("./../config/database");
const Report = require("./../models/Report");
const Pengguna = require("./../models/Pengguna");
const Response = require("./../models/Response");
const { authenticateToken } = require("./../functions");

router.post("/buat", authenticateToken, (req, res) => {
  const { judulLaporan, isiLaporan, pic, vis } = req.body;
  const { NIK } = req.authPengguna;

  Report.create({
    NIK: NIK,
    title: judulLaporan,
    report: isiLaporan,
    pic: pic ? pic : null,
    vis: vis,
  })
    .then((report) => {
      return res.status(201).send({
        notify: `Laporan anda berhasil dipublikasikan!`,
        report,
      });
    })
    .catch((err) => {
      console.log(err);
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
    order: [["createdAt", "DESC"]],
  })
    .then((result) => {
      for (var i = 0; i < result.length; i++) {
        var pengguna = result[i].dataValues.pengguna.dataValues;
        var report = result[i].dataValues;
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

router.get("/laporanpublik", authenticateToken, async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  Pengguna.hasMany(Report, { foreignKey: "NIK" });
  Report.belongsTo(Pengguna, { foreignKey: "NIK" });

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  var output = [];
  var info = {};

  if (endIndex < (await Report.count({ where: { vis: "Publik" } }))) {
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
    where: { vis: "Publik" },
    include: [Pengguna],
    limit: limit,
    offset: startIndex,
    order: [["createdAt", "DESC"]],
  })
    .then((result) => {
      for (var i = 0; i < result.length; i++) {
        var pengguna = result[i].dataValues.pengguna.dataValues;
        var report = result[i].dataValues;
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

router.get("/laporanbaru", authenticateToken, async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  Pengguna.hasMany(Report, { foreignKey: "NIK" });
  Report.belongsTo(Pengguna, { foreignKey: "NIK" });

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  var output = [];
  var info = {};

  if (endIndex < (await Report.count({ where: { stat: "Menunggu" } }))) {
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
    where: { stat: "Menunggu" },
    include: [Pengguna],
    limit: limit,
    offset: startIndex,
    order: [["createdAt", "ASC"]],
  })
    .then((result) => {
      for (var i = 0; i < result.length; i++) {
        var pengguna = result[i].dataValues.pengguna.dataValues;
        var report = result[i].dataValues;
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

router.get("/tanggapanku", authenticateToken, async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  Report.hasMany(Response, { foreignKey: "id_report" });
  Response.belongsTo(Report, { foreignKey: "id_report" });
  const { id_petugas } = req.authPengguna;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  var output = [];
  var info = {};

  if (endIndex < (await Response.count({ where: { id_petugas } }))) {
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

  Response.findAll({
    where: { id_petugas },
    include: [Report],
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

router.get("/semuatanggapan", authenticateToken, async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  Report.hasMany(Response, { foreignKey: "id_report" });
  Response.belongsTo(Report, { foreignKey: "id_report" });
  const { id_petugas } = req.authPengguna;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  var output = [];
  var info = {};

  if (endIndex < (await Response.count())) {
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

  Response.findAll({
    include: [Report],
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

router.post("/respon", authenticateToken, async (req, res) => {
  const datas = req.body;

  const isResponsed = await Response.findOne({
    where: { id_report: datas.id_report },
  });

  if (isResponsed) {
    return res.status(409).send({
      notify: `Sudah direspon petugas lain`,
    });
  }

  Response.create({
    ...datas,
  })
    .then(async (report) => {
      const id_response = report.dataValues.id_response;
      await Report.update(
        { id_response: id_response, stat: "Diterima" },
        {
          where: {
            id_report: datas.id_report,
          },
        }
      )
        .then(() => {
          return res.status(201).send({
            notify: `Respon berhasil tersimpan`,
            report,
          });
        })
        .catch(() => {
          return res.status(500).send(err);
        });
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

router.get("/detail", authenticateToken, (req, res) => {
  const id = parseInt(req.query.id);
  const nik = req.query.nik;

  // NOTE: RAW Query => Stored Procedure
  db.query("CALL detailReport (:id, :nik)", {
    replacements: { id: id, nik: nik },
    type: db.QueryTypes.SELECT,
    raw: true,
  })
    .then(async (pengguna) => {
      if (Object.keys(pengguna[0]).length === 0) {
        return res.status(410).send({
          notify: "Detail laporan tidak ditemukan, muat ulang halaman",
        });
      }
      return res.status(200).send({ notify: "OK", output: pengguna[0][0] });
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

router.get("/detailPetugas", authenticateToken, (req, res) => {
  const id = parseInt(req.query.id);
  const petugas = req.query.petugas;

  // NOTE: RAW Query => Stored Procedure
  db.query("CALL detailReportPetugas (:id, :petugas)", {
    replacements: { id: id, petugas: petugas },
    type: db.QueryTypes.SELECT,
    raw: true,
  })
    .then(async (pengguna) => {
      if (Object.keys(pengguna[0]).length === 0) {
        return res.status(410).send({
          notify: "Detail laporan tidak ditemukan, muat ulang halaman",
        });
      }
      return res.status(200).send({ notify: "OK", output: pengguna[0][0] });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
});

router.delete("/delete", authenticateToken, async (req, res) => {
  const id = parseInt(req.query.id);
  const foward = {};

  await Report.findOne({ where: { id_report: id } })
    .then(async (response) => {
      const { pic, id_response } = response.dataValues;

      if (pic || id_response) {
        if (id_response) {
          foward.id_response = id_response;
          return res.status(409).send({
            foward,
          });
        }

        if (pic) {
          foward.pic = pic;
        }
      }

      await Report.destroy({
        where: {
          id_report: id,
        },
      });

      return res.status(200).send({
        notify: `Laporan berhasil dihapus`,
        foward,
      });
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

module.exports = router;

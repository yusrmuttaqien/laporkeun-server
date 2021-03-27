const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 5006;

const app = express();
const db = require("./config/database");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(cors());

// Static folder
app.use(express.static("uploads"));

// Test MySQL
db.authenticate()
  .then(() => console.log("Database present!"))
  .catch((err) => console.log(err, "Ey db nyalain dulu napa"));

// Routes group
app.use("/pengguna", require("./routes/Pengguna"));
app.use("/petugas", require("./routes/Petugas"));
app.use("/auth", require("./routes/Auth"));
app.use("/laporan", require("./routes/Laporan"));

// PORT
app.listen(PORT, () => "Online and fine, laporkeun! rede to go");

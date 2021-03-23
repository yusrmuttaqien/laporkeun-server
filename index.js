const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();
const db = require("./config/database");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(cors());

// Test MySQL
db.authenticate()
  .then(() => console.log("Database present!"))
  .catch((err) => console.log(err));

// Routes group
app.use("/pengguna", require("./routes/Pengguna"));
app.use("/auth", require("./routes/Auth"));
app.use("/laporan", require("./routes/Laporan"));

// PORT
app.listen(PORT, () => "Online and fine, laporkeun! rede to go");

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
// app.post("/", (req, res) => {
//   if (req.body.name === "Yusril") {
//     res.json({ notify: "It's me Mario" });
//   } else res.sendStatus(500);
// });
app.use("/pengguna", require("./routes/Pengguna"));

// PORT
app.listen(PORT, () => "Online and fine");

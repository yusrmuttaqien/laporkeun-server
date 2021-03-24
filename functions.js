require("dotenv").config();

const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).send({ notify: "Sesi anda tidak valid" });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if (err) {
        return res.status(403).send({ notify: "Sesi anda tidak validi", err });
      } else {
        req.authPengguna = data;
        next();
      }
    });
  }
}

function generateAccessToken(data) {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
}

module.exports = { authenticateToken, generateAccessToken };

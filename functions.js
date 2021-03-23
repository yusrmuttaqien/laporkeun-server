require("dotenv").config();

const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (token) {
    token = token && token.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if (err)
        return res.status(403).send({ notify: "Sesi anda tidak valid", err });

      req.authPengguna = data;
      next();
    });
  }

  return res.status(401).send({ notify: "Sesi anda tidak valid" });
}

function generateAccessToken(data) {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
}

module.exports = { authenticateToken, generateAccessToken };

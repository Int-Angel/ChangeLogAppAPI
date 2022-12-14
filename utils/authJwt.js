/**
 * Verifies the jwt token is correct and not expired.
 */

const jwt = require("jsonwebtoken");
const config = require("../config");

const verifyToken = (req, res, next) => {
  try {
    let token =
      req.session.token !== undefined
        ? req.session.token
        : req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (e) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
};

module.exports = {
  verifyToken,
};

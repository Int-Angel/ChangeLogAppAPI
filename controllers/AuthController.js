"use strict";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { AppUser } = require("../services/db");

const signUp = async (req, res, next) => {
  try {
    console.log(req.body);
    AppUser.create({
      username: req.body.username,
      email: req.body.email,
      pass: bcrypt.hashSync(req.body.pass, 8),
    });
    res.send({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const signIn = async (req, res, next) => {
  try {
    const user = await AppUser.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.pass, user.pass);

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    req.session.token = token;

    return res.status(200).send({
      app_user_id: user.app_user_id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const signOut = async (req, res, next) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    console.log("Error signout");
    this.next(err);
  }
};

module.exports = {
  signUp,
  signIn,
  signOut,
};

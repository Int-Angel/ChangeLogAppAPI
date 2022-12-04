"use-strict";
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const config = require("./config");

const authRoutes = require("./routes/auth-routes");
const projectRoutes = require("./routes/project-routes");
const projectUpdateRoutes = require("./routes/update-routes");
const pointRoutes = require("./routes/point-routes");

const { verifyToken } = require("./utils/authJwt");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  cookieSession({
    name: "changelog-session",
    keys: ["key1", "key2"],
    secret: config.cookie_secret,
    httpOnly: true,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

app.use("/auth", authRoutes.routes);
app.use("/project", verifyToken, projectRoutes.routes);
app.use("/update", verifyToken, projectUpdateRoutes.routes);
app.use("/point", verifyToken, pointRoutes.routes);

app.listen(config.port, () =>
  console.log("App is listening on url http://localhost:" + config.port)
);

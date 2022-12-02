"use-strict";
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const config = require("./config");

const authRoutes = require("./routes/auth-routes");
const projectRoutes = require("./routes/project-routes");
const projectUpdateRoutes = require("./routes/update-routes");
const pointRoutes = require("./routes/point-routes");

//const { sequelize, AppUser } = require("./services/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//app.use(bodyParser.json());

app.use(
  cookieSession({
    name: "bezkoder-session",
    // keys: ['key1', 'key2'],
    secret: config.cookie_secret,
    httpOnly: true,
  })
);

app.use("/auth", authRoutes.routes);
app.use("/project", projectRoutes.routes);
app.use("/update", projectUpdateRoutes.routes);
app.use("/point", pointRoutes.routes);

/*
app.get("/", (req, res) => {
  res.json({ message: "Change log App" });
});

app.get("/test", async (req, res) => {
  try {
    const user = await AppUser.create({
      username: "test user",
      email: "test@gmail.com",
      pass: "shouldbeencrypted",
    });
    res.json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
*/

app.listen(config.port, () =>
  console.log("App is listening on url http://localhost:" + config.port)
);

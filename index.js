"use-strict";
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const config = require("./config");
const authRoutes = require("./routes/auth-routes");

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

//app.use("/auth", authRoutes.routes);

app.get("/", (req, res) => {
  res.json({ message: "Change log App" });
});

app.listen(config.port, () =>
  console.log("App is listening on url http://localhost:" + config.port)
);

let express = require("express"); // Express Server
let session = require("express-session");
let redis = require("redis");
let redisStore = require("connect-redis")(session);
let path = require("path");
let async = require("async");
let fs = require("fs");
let https = require("https");
let mongoose = require("mongoose"); // Database
let passport = require("passport"); // Passport authentication management
let LocalStrategy = require("passport-local").Strategy;
let JwtStrategy = require("passport-jwt").Strategy;
let ExtractJwt = require("passport-jwt").ExtractJwt;
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let routes = require("./router"); // Server Routes
let client = redis.createClient(); // Create redis client
let app = express();

let config = require("../config");

app.set("view engine", "html");
app.engine("html", function(path, options, callbacks) {
  fs.readFile(path, "utf-8", callback);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "../client")));

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});
app.use("/", routes);

app.use(function noCache(req, res, next) {
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  next();
});

app.set("port", config.development.backendPort || 8080);

let server = null;
if (config.development.protocol === "https") {
  // Create https server if specified
  server = https
    .createServer(
      {
        key: fs.readFileSync(config.development.key),
        cert: fs.readFileSync(config.development.certificate)
      },
      app
    )
    .listen(app.get("port"), function() {
      console.log(`Listening securely on port: ${server.address().port}`);
    });
} else {
  server = app.listen(app.get("port"), function() {
    console.log(`Listening on port: ${server.address().port}`);
  });
}

module.exports = app;
const express = require("express");
const express_handlebars = require("express-handlebars");
const mysql = require("mysql2");

require("dotenv").config();

const app = express();
const port = process.env.port || 3001;

//static files
app.use(express.static("public"));

//templating engine set up
app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  express_handlebars.engine({
    defaultLayout: "main",
    extname: ".handlebars",
  })
);

const routes = require("./server/routes/user");
app.use("/", routes);

app.listen(port, () => console.log(`Listening on port ${port}`));

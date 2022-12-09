
const express = require("express");
const app = express();

const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

const dbo = require("./db/conn");
 
app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});


/* New Code Below */

//const express = require("express");
//const cors = require("cors");
const dbConfig = require("./config/db.config");

const app2 = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app2.use(cors(corsOptions));

// parse requests of content-type - application/json
app2.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app2.use(express.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;

db.mongoose.set('strictQuery', false);

db.mongoose
  .connect('mongodb://logbookAdmin:1234567890@10.10.100.33:27017/LOGBOOK?authMechanism=DEFAULT', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app2.get("/", (req, res) => {
  res.json({ message: "TestingAPI" });
});

// routes
require("./routes/auth.routes")(app2);
require("./routes/user.routes")(app2);

// set port, listen for requests
const PORT2 = process.env.PORT2 || 8080;
app2.listen(PORT2, () => {
  console.log(`Server is running on port ${PORT2}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

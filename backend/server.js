const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models/db.js");

const corsOptions = {
  origin: "http://localhost:3000",
};

db.sequelize
  // .sync({ force: true })
  .sync({})
  .then(() => {
    console.log("Drop and resync db.");
    // initial();
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use(cors(corsOptions));

// Parse request of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

require("./app/routes/authRoutes")(app);
require("./app/routes/userRoutes")(app);
require("./app/routes/productRoutes")(app);
require("./app/routes/cartRoutes")(app);
require("./app/routes/orderRoutes")(app);
require("./app/routes/categoryRoutes")(app);

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



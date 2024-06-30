const express = require("express");
const cors = require("cors");
const ColorModel = require("./app/models/color.model.js");

ColorModel.table();

const app = express();

const corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/color.routes.js")(app);

// API route for colors
app.get("/api/colors/:id", (req, res) => {
  const id = req.params.id;
  // Sample response based on the ID
  if (id === "2") {
    res.json({ colors: ["red", "green", "blue"] });
  } else {
    res.status(404).json({ error: "Colors not found" });
  }
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

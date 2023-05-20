const express = require("express");
const app = express();
require("dotenv/config");

const cors = require("cors");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hi Umer.");
});

// User Authentication Routes
const userRoute = require("./routes/auth");
app.use("/api/users", userRoute);

// Artist routes
const artistRoutes = require("./routes/artist");
app.use("/api/artists", artistRoutes);

// Album routes
const albumRoutes = require("./routes/albums");
app.use("/api/albums", albumRoutes);

// Songs routes
const songRoutes = require("./routes/songs");
app.use("/api/songs", songRoutes);

mongoose
  .connect(process.env.Db_String, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected successfully");
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });

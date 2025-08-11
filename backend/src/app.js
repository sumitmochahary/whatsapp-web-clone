const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/messages", require("./routes/messages.routes"));
app.use("/api/status", require("./routes/status.routes"));

app.get("/", (req, res) => {
  res.send("WhatsApp Web Clone Backend Running 🚀");
});

module.exports = app;

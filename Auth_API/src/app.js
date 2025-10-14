const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./routes/user.routes");
const errorHandler = require("./middleware/errorHandler");
require("./models/user.model");
require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;

const { Sequelize } = require("sequelize");
require("dotenv").config();

const password = String(process.env.DB_PASS || "")
  .replace(/['"]/g, "")
  .trim();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  password,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
})();


module.exports = sequelize;
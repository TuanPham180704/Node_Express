const app = require("./app");
const sequelize = require("./config/db");

const PORT = process.env.PORT || 4000;

(async () => {
  await sequelize.sync({ alter: true });
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})();

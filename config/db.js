const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("events", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
  timezone: "+05:30",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;

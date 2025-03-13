// server.js
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const foodRoutes = require("./routes/foodRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/food", foodRoutes);
app.use("/api/cart", cartRoutes);

sequelize.sync().then(() => console.log("Database connected"));
const PORT = 4000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const heroTemplateRoutes = require("./routes/heroTemplateRoutes");
const itemRoutes = require("./routes/itemRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const playerRoutes = require("./routes/playerRoutes");
const playerHeroRoutes = require("./routes/playerHeroRoutes");

const app = express();

const PORT = process.env.PORT || 3001;

// 로그 기록
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined")); // 배포환경이면
} else {
  app.use(morgan("dev")); // 개발환경이면
}

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/sam_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 라우트 설정
app.use("/api/hero-templates", heroTemplateRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/player-heroes", playerHeroRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

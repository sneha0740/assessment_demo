// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const driver = require("./config/database");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({
//     message: "SkillGraph API is running",
//   });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// require("dotenv").config();
// const graphRoutes = require("./routes/graphRoutes");
// app.use("/api", graphRoutes);

// const express = require("express");
// const cors = require("cors");
// const driver = require("./config/database");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({
//     message: "SkillGraph API is running",
//   });
// });

// app.get("/api/test-db", async (req, res) => {
//   const session = driver.session();

//   try {
//     const result = await session.run(
//       "RETURN 'CognoDB Connected Successfully' AS message"
//     );

//     res.json({
//       success: true,
//       message: result.records[0].get("message"),
//     });
//   } catch (error) {
//     console.error("Database connection error:", error.message);

//     res.status(500).json({
//       success: false,
//       message: "Could not connect to CognoDB",
//     });
//   } finally {
//     await session.close();
//   }
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const graphRoutes = require("./routers/graphRoutes");

app.use("/api", graphRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "SkillGraph API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
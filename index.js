const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/api/:number", (req, res) => {
  res.json({
    message: `Hello ${req.params.name}, from server! MY_NAME => ${process.env.NUMBER}`,
  });
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server listening on ${process.env.PORT || 3001}`);
});

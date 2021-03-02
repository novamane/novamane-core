const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const docs = require("./routes/api/docs");

app.use("/api/docs", docs);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

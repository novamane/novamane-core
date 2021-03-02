const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// get
router.get("/", async (req, res) => {
  const docs = await loadDocs();
  res.send(await docs.find({}).toArray());
});

// add
router.post("/", async (req, res) => {
  const docs = await loadDocs();
  await docs.insertOne({
    text: req.body.text,
    createdAt: new Date(),
  });
  res.status(201).send();
});

// delete
router.delete("/:id", async (req, res) => {
  const docs = await loadDocs();
  await docs.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

var uri =
  "mongodb+srv://dev123:dev123@cluster0.mjjmq.mongodb.net/novamane-core-db?retryWrites=true&w=majority";

async function loadDocs() {
  const client = await mongodb.MongoClient.connect(uri, {
    useNewUrlParser: true,
  });

  return client.db("novamane-core-db").collection("docs");
}

module.exports = router;

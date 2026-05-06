const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://simple-crud-server:iKsoBhUvNeR8L545@cluster0.ufrfrxz.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    await client.connect();

    const simpleCrud = client.db("simple-crud");
    const usersClection = simpleCrud.collection("users");
    app.get("/users", async (req, res) => {
      const cursor = usersClection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// mongodb+srv://simple-crud-server:iKsoBhUvNeR8L545@cluster0.ufrfrxz.mongodb.net/?appName=Cluster0

//simple-crud-server
//iKsoBhUvNeR8L545

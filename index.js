const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

//midddleware
app.use(cors());
app.use(express.json());

// simpleDBuser
//dqB4rtqNeP8PUsGK
const uri =
  "mongodb+srv://simpleDBuser:dqB4rtqNeP8PUsGK@cluster0.0zmmwcn.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tls: true,
  tlsAllowInvalidCertificates: true,
});

app.get("/", (req, res) => {
  res.send("Crud Server is running!");
});

async function run() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB");

    const userDB = client.db("userDB");
    const usersCollection = userDB.collection("users");
    
    //add database related api here
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      console.log("user info", newUser);
      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    });

    console.log("POST /users route registered");

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    app.listen(port, () => {
      console.log(`Crud Server is running on port... ${port}`);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

// * 1. at least one user
// * 2. set uri with userId and password
// * 3. create a mongodb client
// * 4. add a run function to connect to the database
// * 5. use try finally inside it to connect the client
// * 6. ping the database to see server is alive or not;

import clientPromise from "../../lib/mongodb";

let ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("inventoryDb");
  const removedId = {
    _id: new ObjectId(req.body),
  };

  const result = await db.collection("inventory").deleteOne(removedId);

  return res.json(`Result: ${result}`);
}


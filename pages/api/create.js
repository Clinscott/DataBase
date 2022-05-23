import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("inventoryDb");
  try{
    let bodyObject = JSON.parse(req.body);
    let newItem = await db.collection("inventory").insertOne(bodyObject);
    return res.json({
        message: 'Post added successfully',
        success: true,
    });
    }catch (error){
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}


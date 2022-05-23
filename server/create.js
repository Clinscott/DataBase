const { MongoClient } = require("mongodb");

async function main() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/drivers/node/ for more details
   */
  const password = "o4z6dWI1zwmdrj1D";
  const uri = `mongodb+srv://DevIntern:${password}@devinternchallenege2022.mblec.mongodb.net?retryWrites=true&w=majority`;

  /**
   * The Mongo Client you will use to interact with your database
   * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
   * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
   * pass option { useUnifiedTopology: true } to the MongoClient constructor.
   * const client =  new MongoClient(uri, {useUnifiedTopology: true})
   */

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected!");

    // Make the appropriate DB calls

    await createItem(client, {
      item: "Item",
      description: "Description",
      location: "Location",
      amount: 10
    });

    await createMultipleItems(client, [
      {
        item: "Another Item",
        description: "Yet Another Item.",
        location: "Location",
        amount: 5
      },
      {
        item: "One Last Item",
        description: "A Finale Item.",
        location: "Location Two",
        amount: 6
      },
    ]);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
    console.log("Disconnected!");
  }
}

main().catch(console.error);

// Add functions that make DB calls here

export async function createItem(client, newItem) {
  const result = await client
    .db("inventoryDb")
    .collection("inventory")
    .insertOne(newItem);
  console.log(
    `New inventory created with the following id: ${result.insertedId}`
  );
}

async function createMultipleItems(client, newItems) {
  const result = await client
    .db("inventoryDb")
    .collection("inventory")
    .insertMany(newItems);
  console.log(
    `${result.insertedCount} new item(s) created with the following id(s)`
  );
  console.log(result.insertedIds);
}

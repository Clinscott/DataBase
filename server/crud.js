const { MongoClient } = require("mongodb");

async function main() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/drivers/node/ for more details
   */
  const password = "o4z6dWI1zwmdrj1D";
  const uri = `mongodb+srv://DevIntern:${password}@devinternchallenege2022.mblec.mongodb.net/inventoryDb?retryWrites=true&w=majority`;

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

  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
    console.log("Disconnected!");
  }
}

main().catch(console.error);

// Add functions that make DB calls here



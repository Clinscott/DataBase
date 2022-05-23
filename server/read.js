const { MongoClient } = require("mongodb");
const { resourceLimits } = require("worker_threads");

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

    await findOneItemByName(client, "Item");

    await findItemsWithMinimumAmount(client, {
        minimumAmount: 5,
        maxNumberOfResults: 5
    })
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
    console.log("Disconnected!");
  }
}

main().catch(console.error);

// Add functions that make DB calls here

async function findOneItemByName(client, nameOfItem) {
  const result = await client
    .db("inventoryDb")
    .collection("inventory")
    .findOne({ item: nameOfItem });

  if (result) {
    console.log(
      `Found a listing in the collection with the name '${nameOfItem}':`
    );
    console.log(result);
  } else {
    console.log(`No listings found with the name '${nameOfItem}'`);
  }
}

async function findItemsWithMinimumAmount(
  client,
  { minimumAmount = 1, maxNumberOfResults = Number.MAX_SAFE_INTEGER } = {}
) {
  const cursor = client
    .db("inventoryDb")
    .collection("inventory")
    .find({
      amount: { $gte: minimumAmount },
    })
    .limit(maxNumberOfResults);

    const results = await cursor.toArray();

    if(results.length > 0){
        console.log(`Found Item(s) with at least ${minimumAmount} item. `);
        results.forEach((result, i)=>{
            console.log();
            console.log(`${i + 1}. item: ${result.item}`);
            console.log(`   _id: ${result._id}`)
            console.log(`   amount: ${result.amount}`)
        });
    }else{
        console.log(`No items found with at least ${minimumAmount} item(s).`)
    }
}

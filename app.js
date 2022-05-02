


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbname = 'fruitsDB';

const client = new MongoClient(url);

client.connect(function(err){
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbname);

    findDocuments(db, function() {
        client.close();
    });
});



const insertDocuments = function(db, callback) {

    const collection = db.collection('fruits');

    collection.insertMany([
        {
            name : "Apple",
            score : 8,
            review : "Great Fruit"
        },
        {
            name : "Orange",
            score : 7,
            review : "Kinda Sour"
        },
        {
            name : "Mango",
            score : 9,
            review : "Delicious"
        },
        {
            name : "Banana",
            score : 5,
            review : "Mushy"
        }
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(4, result.ops.length);
       
        console.log("Inserted 4 documents into the collection");
        callback(result);
    });
};
    const findDocuments = function(db, callback) {

        const collection = db.collection('fruits');

        collection.find({}).toArray(function(err, fruits){
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(fruits);
            callback(fruits);
        });
    }




// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017';


// const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});

// const dbName = "fruitsDB";

// async function run() {
//     try{
//         await client.connect();
//         console.log("Connected to the server correctly");

//         const db = client.db(dbName);

//         const col = db.collection("fruits");

//         const p = await col.insertMany([
//             {
//                             name : "Apple",
//                             score : 8,
//                             review : "Great Fruit"
//                         },
//                         {
//                             name : "Orange",
//                             score : 7,
//                             review : "Kinda Sour"
//                         },
//                         {
//                             name : "Mango",
//                             score : 9,
//                             review : "Delicious"
//                         },
//                         {
//                             name : "Banana",
//                             score : 5,
//                             review : "Mushy"
//                         }
                    
//         ]);

//         const myDoc = await col.findOne();
//         console.log(myDoc);
//     } catch(err) {
//         console.log(err.stack);
//     }
//     finally{
//         await client.close();
//     }
// }

// run().catch(console.dir);
const path = require("path");
const express = require("express");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const {openaiConnection, getCompletionRequest, createPrompt} = require("./utils/openOpenAIConnection");

const url = 'mongodb://root:example@mongo:27017';

let _db;
const dbName = 'local';
const collectionName = 'collectionName';

const mongoConnect = (callback) => MongoClient.connect(url).then((client) => {
    _db = client.db(dbName);
    callback(client);
}).catch((err) => {
    console.log(err);
    throw err;
});

const clientPath = path.join(__dirname, 'client');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:3000']
}));
app.use(express.static(path.join(clientPath, 'build')));
app.use(express.static("public"));

app.get("/test", (req, res) => {
    _db.collection(collectionName).find({}).toArray().then((documents) => {
        res.json(documents)
        console.log('Retrieved documents:', documents);
    }).catch(err => {
        console.log(err)
    })
    res.send(`test`);
});


app.post('/get-bju', async (req, res) => {
    try {
        const response = await openaiConnection.createChatCompletion(getCompletionRequest(createPrompt(req.body)))
        res.status(200).json({
            success: true,
            data: response.data.choices[0].message.content
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            token: process.env.OPENAI_API_KEY,
            error: error.response ? error.response.data : 'There was an issue on a server'
        });
    }
})

app.post("/add", (req, res) => {

    console.log(req.body);
    const addInstance = {
        one: req.body.one, two: req.body.two,
    }

    _db.collection(collectionName).insertOne(addInstance).then((result) => {
        res.status(200).send(result.insertedId.toString());
    })
        .catch((err) => {
            console.log(err)
        });


    // _db.collection(collectionName).find({ /* Your query criteria */}).toArray().then((documents) => {
    //     res.json(documents)
    //     console.log('Retrieved documents:', documents);
    // }).catch(err => {
    //     console.log(err)
    // })
    // res.send(`test`);
});

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found'
}

// start express server on port 5000
const port = process.env.port || 5555

mongoConnect((client) => {
    app.listen(port, () => {
        // console.log(_db.collection(collectionName).find({ /* Your query criteria */ }))
        console.log("server started on port " + port);
    });
})
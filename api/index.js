let Express = require("express");
let cors = require("cors");
const multer=require("multer");
let app=Express();
app.use(cors());

const { MongoClient, ServerApiVersion } = require('mongodb');
const {request, response} = require("express");
const uri = "mongodb+srv://etiqaUser:<pwdHere>@cluster0.ydldj9u.mongodb.net/?retryWrites=true&w=majority";

const dbName = "etiqa";
const dbCollection = "etiqadb";
let db = null;

app.listen(5038,()=>{
    MongoClient.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    },(err,connectedClient) => {
        if(err){
            throw err;
        }

        db = connectedClient.db(dbName);
        db.collection(dbCollection).find({}).toArray()
            .then(r => {
                console.log(r);
            }).catch(e => {
            console.error(`ERROR:`,e);
        });
        console.log('CONNECTED TO ETIQADB');
    })
})

app.get('/api/EtiqaApp/GetAllData', (request, response)=>{
    db.collection(dbCollection).find({}).toArray((error, result)=>{
        response.send(result);
    })
})

app.post('/api/EtiqaApp/AddData', multer().none(), (request, response)=>{
    console.log('request = ', request.body);
    db.collection(dbCollection).count({}, function (error, numOfDocs){
        db.collection(dbCollection).insertOne({
            id:(numOfDocs+1).toString(),
            username: request.body.username,
            email: request.body.email,
            phoneNumber: request.body.phoneNumber,
            skillset: request.body.skillset,
            hobby: request.body.hobby
        });
        response.json("Added Successfully");
    })
})

app.delete('/api/EtiqaApp/DeleteOneData', (request, response)=>{
    console.log("Delete function = ", request.query.id);
    db.collection(dbCollection).deleteOne({
        id:request.query.id
    });
    response.json("Delete Successfully");
})

app.put('/api/EtiqaApp/ModifyOneData/:id/:paramChange', (request, response)=>{
    console.log("ModifyOneData request params id = ", request.params.id);
    console.log("ModifyOneData parse = ", JSON.parse(request.params.paramChange));

    const filter = { id: request.params.id };
    let newData = JSON.parse(request.params.paramChange);

    db.collection(dbCollection).updateOne(filter, {
        $set: {
            id: (request.params.id).toString(),
            username: newData.username,
            email: newData.email,
            phoneNumber: newData.phoneNumber,
            skillset: newData.skillset,
            hobby: newData.hobby
        }
    });

    response.json("Modify Successfully");
})
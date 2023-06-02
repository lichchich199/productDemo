import Express  from "express";
import Mongoose from "mongoose";
import BodyParser from "body-parser";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true}))

// Define rest api
app.get('/users', async (req, res) => {});
app.post('/user', async (req, res) => {});
app.get('/user/:id', async (req, res) => {});
app.put('/user/:id', async (req, res) => {});
app.delete('/user/:id', async (req, res) => {})

//https://cloud.mongodb.com/v2/638c4180bcf37f1f783f4ffb#/metrics/replicaSet/6479ba9b6c3a245948adcc79/explorer/my_database/user_mt/find
//https://studio3t.com/download-studio3t-free/
// mongodb+srv://admin:nv07PGawx0pEfaZA@cluster0.haza3ro.mongodb.net/?retryWrites=true&w=majority

app.listen(5000, () => {
    console.log('Listening at: 5000...')
})

Mongoose.connect('mongodb+srv://admin:nv07PGawx0pEfaZA@cluster0.haza3ro.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log('Connected to DB')
}).catch((err) => {
    console.log('Erro to connecting to DB', err)
});



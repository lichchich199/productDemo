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

// mongodb+srv://admin:nv07PGawx0pEfaZA@cluster0.haza3ro.mongodb.net/?retryWrites=true&w=majority

app.listen(5000, () => {
    console.log('Listening at: 5000...')
})
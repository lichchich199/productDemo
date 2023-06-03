import Express  from "express";
import Mongoose from "mongoose";
import BodyParser from "body-parser";
import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'



const mongoString = process.env.DATABASE_URL || 'mongodb+srv://admin:nv07PGawx0pEfaZA@cluster0.haza3ro.mongodb.net/my_database?retryWrites=true&w=majority'

Mongoose.connect(mongoString).then(() => {
    console.log('Connected to DB')
}).catch((err) => {
    console.log('Erro to connecting to DB', err)
});

var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true}))

app.listen(5000, () => {
    console.log('Listening at: 5000...')
})

app.use('/api', userRoute)
app.use('/api', productRoute)

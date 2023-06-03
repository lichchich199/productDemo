import express from "express";
import modelUser from "../models/modelUser.js"

const router = express.Router();

// Define rest api
router.get('/users', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    try {
        const data = await modelUser.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});
router.post('/user', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const data = new modelUser({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        address: {
            city: req.body.address.city,
            district: req.body.address.district,
            street: req.body.address.street,
            building: req.body.address.building,
        }
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});
router.get('/user/:id', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    try {
        const data = await modelUser.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    res.send(req.params.id)

});
router.put('/user/:id', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    try {
        const id = req.params.id;
        const updateData = req.body;
        const options = {new: true};
        const result = await modelUser.findByIdAndUpdate(
            id, updateData, options
        )
        res.send(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});
router.delete('/user/:id', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    try {
        const id = req.params.id;
        await modelUser.findByIdAndDelete(id);
        res.send(`Document with data id = ${id} has been deleted`)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


export default router


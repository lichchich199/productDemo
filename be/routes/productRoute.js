import express from "express";
import modelProduct from "../models/modelProduct.js"
import mongoose from "mongoose";

const router = express.Router();

// Define rest api
router.get('/products', async (req, res) => {
    try {
        var nameParam = req.query.name
        var paramQuery = {};
        if(nameParam) {
            paramQuery.name = { $regex: nameParam, $options: 'i' }
        } 
        const data = await modelProduct.find(paramQuery);
        res.status(200).json({
            error: false,
            message: '',
            data: data
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});
router.post('/product', async (req, res) => {
    const data = new modelProduct({
        name: req.body.name,
        price: req.body.price,
        brand: req.body.brand,
        category: req.body.category,
        image: req.body.image,
        color: req.body.color,
        size: req.body.size,
        status: req.body.status,
        quantity: req.body.quantity,
        quantitySolded: req.body.quantitySolded,
        description: req.body.description,
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});
router.get('/product/:id', async (req, res) => {
    try {
        const data = await modelProduct.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});
router.put('/product/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const options = {new: true};
        const result = await modelProduct.findByIdAndUpdate(
            id, updateData, options
        )
        res.send(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});
router.delete('/product/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await modelProduct.findByIdAndDelete(new mongoose.Types.ObjectId(id));
        res.send(`Product with data id = ${id} has been deleted`)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


export default router


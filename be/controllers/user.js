import modelUser from "../models/modelUser.js"

export default {
    login: async function(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        try {
            // todo mã hóa password
            const data = await modelUser.find({email: req.body.email, password: req.body.password});
            res.json(data);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    regiter: async function(req, res) {
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
    }
}
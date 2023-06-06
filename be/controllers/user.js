import modelUser from "../models/modelUser.js"

export default {
    login: async function(req, res, next) {
        try {
            // todo mã hóa password
            const data = await modelUser.find({email: req.body.email, password: req.body.password});
            if(data.length === 0) {
                res.status(200).json({
                    error: true,
                    message: 'Email or Pasword is invalid',
                    data: null
                })
            } else {
                res.status(200).json({
                    error: false,
                    message: '',
                    data: data[0]
                })
            }
        } catch (error) {
            res.status(500).json({message: error.message})
        }
        next();
    },
    regiter: async function(req, res) {
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
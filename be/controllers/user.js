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
        console.log('req.body', req.body)
        try {
            const data = new modelUser({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                address: {
                    city: req.body?.city || '',
                    district: req.body?.district || '',
                    street: req.body?.street || '',
                    building: req.body?.building || '',
                }
            })
            // todo mã hóa password
            const user = await modelUser.find({email: req.body.email});
            console.log('data user', user)
            
            if(user.length === 0) {
                console.log('data save', data)
                const dataToSave = await data.save();
                res.status(200).json({
                    error: false,
                    message: '',
                    data: dataToSave
                })
            } else {
                res.status(200).json({
                    error: true,
                    message: 'Email has been registered with a different email address.',
                    data: null
                })
            }
            
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
}


import mongoose from "mongoose";
const { Schema } = mongoose;

const dataSchema = new mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    phoneNumber: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: Object
    },
}, {
    timestamps: true
  })

export default mongoose.model('user', dataSchema)
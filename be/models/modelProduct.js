import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    brand: {
        required: true,
        type: String
    },
    category: {
        required: true,
        type: String
    },
    image: {
        required: true,
        type: Array
    },
    color: {
        required: true,
        type: Object
    },
    size: {
        required: true,
        type: Array
    },
    status: {
        required: true,
        type: String
    },
    quantity: {
        required: true,
        type: Number
    },
    quantitySolded: {
        required: true,
        type: Number
    },
    description: {
        required: true,
        type: String
    },

},
{
    timestamps: true
}
)

export default mongoose.model('product', dataSchema)
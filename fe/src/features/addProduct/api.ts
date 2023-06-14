import axios from '../axios';

type paramType = {
    name: string;
    price: number;
    brand: string;
    category: string;
    image: string[];
    color: string[];
    size: number[];
    quantity: number;
    description: string;
};

export const addProduct = async (params: paramType) => {
    console.log('params', params);
    var paramAdd = {
        name: params.name,
        price: params.price,
        brand: params.brand,
        category: params.category,
        image: params.image,
        color: params.color,
        size: params.size,
        status: 'available',
        quantity: params.quantity,
        quantitySolded: 0,
        description: params.description,
    };
    console.log('paramAdd', paramAdd)
    return await axios.post(`http://localhost:5000/api/product`, paramAdd);
};

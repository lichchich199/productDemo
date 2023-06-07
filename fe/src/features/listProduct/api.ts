import axios from '../axios'

export const getListProduct = async () => {
    return await axios.get('http://localhost:5000/api/products')
}
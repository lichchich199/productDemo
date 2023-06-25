import axios from '../axios'
 type paramType = {
    name: string
 }

export const getListProduct = async (params : paramType) => {
    let query = "?";
    Object.keys(params).forEach((key) => {
        if(params[key as keyof typeof params]) {
            return query += `${key}=${params[key as keyof typeof params]}&`
        }
        return query
    })
    query = query === '?' ? '' : query.substring(0, query.length - 1);
    return await axios.get(`http://localhost:5000/api/products${query}`)
}

export const deleteProduct = async (id : string) => {
    return await axios.delete(`http://localhost:5000/api/product/${id}`)
}
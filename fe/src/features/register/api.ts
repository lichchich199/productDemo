import axios from '../axios'

export const register = async (params : Object) => {
    return await axios.post('http://localhost:5000/api/user/register', params)
}
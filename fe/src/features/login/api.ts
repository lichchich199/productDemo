import axios from '../axios'

export const login = async (params : Object) => {
    return await axios.post('/api/user/login', params)
}

export const logout = async () => {
    return await axios.post('api/user/logout')
}

export const getUser = async (id: String) => {
    return await axios.get(`api/user/${id}`)
}
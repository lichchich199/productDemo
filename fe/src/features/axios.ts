import axios from "axios";

const baseURL = process.env.NODE_ENV || 'http://localhost:3000/'

const instance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",  
    },
    responseType: 'json'
})

//todo: handle token here

export default instance
import axios from "axios"

const baseurl = "http://localhost:8080/users/"

const registerUser = async (user:any) =>{
    return axios.post(`${baseurl}register`, user)
        .then(res=>res.data)
        .catch(error=>{throw error;})
}

const loginUser = async (user:any) =>{
    return axios.post(`${baseurl}login`, user)
        .then(res=>res.data)
        .catch(error=>{throw error;})
}

const sendOtp = async (email:any) =>{
    return axios.post(`${baseurl}sendOtp/${email}`)
        .then(res=>res.data)
        .catch(error=>{throw error;})
}
const verifyOtp = async (email:any, otp:any) =>{
    return axios.get(`${baseurl}verifyOtp/${email}/${otp}`)
        .then(res=>res.data)
        .catch(error=>{throw error;})
}
const changePass = async (email:string, password:string) =>{
    return axios.post(`${baseurl}changePass`, { email, password })
        .then(res=>res.data)
        .catch(error=>{throw error;})
}
export {registerUser, loginUser, sendOtp, verifyOtp, changePass};
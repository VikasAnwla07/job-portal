import axios from "axios"

const baseurl = "http://localhost:8080/profiles/"

const getProfile = async (id: number) => {
    return axios.get(`${baseurl}get/${id}`)
        .then(res => res.data)
        .catch(error => { throw error; })
}

const updateProfile = async (profile: any) => {
    return axios.put(`${baseurl}update`, profile)
        .then(res => res.data)
        .catch(error => { throw error; })
}

export { getProfile, updateProfile }

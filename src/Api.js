import axios from "axios";

const Api = axios.create({
    baseURL: `Censored`,
    headers: {
        "x-access-token": localStorage.getItem('_token')
    },
})

export default Api;

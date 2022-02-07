import axios, { AxiosRequestConfig } from 'axios'

const CONFIG: AxiosRequestConfig = {
    headers: { 'Content-Type': 'application/json' },
    baseURL: 'https://smartig-back.herokuapp.com/api/app/'
}

const client = axios.create(CONFIG)

export default client
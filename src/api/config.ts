import axios, { AxiosRequestConfig } from 'axios'

const CONFIG: AxiosRequestConfig = {
    headers: { 'Content-Type': 'application/json' },
    baseURL: 'https://campus-back.herokuapp.com/'
}

const client = axios.create(CONFIG)

export default client
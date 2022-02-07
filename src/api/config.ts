import axios, { AxiosRequestConfig } from 'axios'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNjI5NzFiMDczM2Q4OGMzNWMwMzlhMyIsImlhdCI6MTYwMTEzNjgzMSwiZXhwIjoxNjAxMjIzMjMxfQ.Ng-74mvm6-ZfM9mc136UasdgZHMfCnYMtQVb37ukE9o'

const CONFIG: AxiosRequestConfig = {
    headers: { 'Content-Type': 'application/json', 'appVersion': '1.3' },
    baseURL: 'https://gabarita-back.herokuapp.com/api/'
}

const client = axios.create(CONFIG)

// axios.interceptors.request.use(
//     (config: any) => {
//         const {origin} = new URL(config.url)

//         return config
//     },
//     error => {
//         return Promise.reject(error);
//       }
// )

export default client

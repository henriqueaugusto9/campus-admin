import { AxiosError } from 'axios'
import SubscriptionExpired from '../services/SubscriptionExpired'
import client from './config'

interface IPostConstruction {
    title: string
    subtitle: string
    description: string
}

interface IPostNote {
    description: string
}

class ConstructionAPI {

    static getConstruction = async (token: string) => {
        return await client.get(`/reception`, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                return response.data
            })
            .catch((err: AxiosError) => {
                console.error(err)
                if (err?.response?.status === 403) {
                    SubscriptionExpired.setIsExpired(true)
                    return [{}]
                }
                return null
            })
    }

    static postConstruction = async ({ title, subtitle, description }: IPostConstruction, token: string) => {
        return await client.post(`reception/`,
            { title, subtitle, description },
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then((response) => {
                return response.data
            })
            .catch((err) => {
                console.log(err)
                return null
            })
    }

    static getNote = async (token: string) => {
        return await client.get(`/notes`, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                return response.data
            })
            .catch((err: AxiosError) => {
                console.error(err)
                if (err?.response?.status === 403) {
                    SubscriptionExpired.setIsExpired(true)
                    return [{}]
                }
                return null
            })
    }

    static postNote = async ({ description }: IPostNote, token: string) => {
        return await client.post(`notes/`,
            { description },
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then((response) => {
                return response.data
            })
            .catch((err) => {
                console.log(err)
                return null
            })
    }
}

export default ConstructionAPI
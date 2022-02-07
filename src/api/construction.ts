import { AxiosError } from 'axios'
import SubscriptionExpired from '../services/SubscriptionExpired'
import client from './config'

class ConstructionAPI {

    static getConstruction = async (token: string) => {
        return await client.get(`construction/`, { headers: { Authorization: `Bearer ${token}` } })
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
}

export default ConstructionAPI
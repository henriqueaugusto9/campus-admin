import { config } from 'process'
import client from './config'

interface homeStudent {
    token: string
}

class HomeAPI {

    static homeData = async ({ token }: homeStudent) => {
        return await client.get('home', { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                return response.data
            })
            .catch((err) => {
                console.log('error: ', err)
                return null
            })
    }

}

export default HomeAPI
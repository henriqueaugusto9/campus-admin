import client from './config'

interface authStudent {
    token: string
}

class ProgressAPI {

    static getProgress = async ({ token }: authStudent) => {
        return await client.get('progress', { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                return response.data.progress[0] ?? null
            })
            .catch((err) => {
                console.log(err)
                return null
            })
    }

}

export default ProgressAPI
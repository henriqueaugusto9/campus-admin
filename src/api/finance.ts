import client from './config'

class FinanceAPI {

    static getFinance = async (token: string) => {
        return await client.get(`finance/`, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                return response.data.finance ?? [{ link: '' }]
            })
            .catch((err) => {
                console.log(err)
                return null
            })
    }
}

export default FinanceAPI
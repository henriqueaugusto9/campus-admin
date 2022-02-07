import client from './config'

interface IAuthStudent {
    token: string
}

interface IPutReview {
    id: string
    title: string
    price: string
    description: string
}

interface IPostReview {
    id: string
    title: string
    price: string
    description: string
}

class ReviewAPI {

    static getReview = async ({ token }: IAuthStudent) => {
        return await client.get('product', { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                return response.data.products
            })
            .catch((err) => {
                console.log(err)
                return null
            })
    }

    static putReview = async ({ id, title, price, description }: IPutReview, { token }: IAuthStudent) => {
        return await client.put(`product/${id}`,
            { id, title, price, description },
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

    static postReview = async ({ id, title, price, description }: IPostReview, { token }: IAuthStudent) => {
        return await client.post(`product/`,
            { id, title, price, description },
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

    static deleteReview = async (id: string, { token }: IAuthStudent) => {
        return await client.delete(`product/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then((response) => response.data)
        .catch((err) => {
            console.log(err)
            return null
        })
    }

}

export default ReviewAPI
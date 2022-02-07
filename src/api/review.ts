import client from './config'

interface IAuthStudent {
    token: string
}

interface IPutReview {
    id: string
    date: string
    percentage: string
    time: string
    questions: string
    description: string
    type: string
}

// interface IPostReview {
//     date: string
//     percentage: string
//     type: string
//     time: string
//     questions: string
//     description: string
// }

interface IPostReview {
    title: string,
    type: string 
    date: string,
    percentage: string, 
    questions: string, 
    rightQuestions: string, 
    classID: string
}

class ReviewAPI {

    static getReview = async (classID: string, { token }: IAuthStudent,) => {
        return await client.get(`review/${classID}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                return response.data.review
            })
            .catch((err) => {
                console.log(err)
                return null
            })
    }

    static putReview = async (review: IPutReview, { token }: IAuthStudent) => {
        return await client.put(`review/${review.id}`,
            review,
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

    static postReview = async (review: IPostReview, { token }: IAuthStudent) => {
        return await client.post(`review/`,
            review,
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then((response) => {
                console.log('review post', response)
                return response.data
            })
            .catch((err) => {
                console.log(err)
                return null
            })
    }

    static deleteReview = async (id: string, { token }: IAuthStudent) => {
        return await client.delete(`review/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then((response) => response.data)
            .catch((err) => {
                console.log(err)
                return null
            })
    }

}

export default ReviewAPI
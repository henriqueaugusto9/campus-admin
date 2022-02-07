import client from './config'

interface authStudent {
    token: string
}

type EditProfilePayload = {
    name: string,
    email: string,
    phoneNumber: string,
    profile: {
        birthdate?: string,
        address: {
            city: string,
            state?: string
        },
        cursinho?: string,
        works?: boolean,
        studiesAt?: string,
        difficultieLevel?: string,
        difficulties?: string,
        generalProfile: string,
        notes?: string
    },
    goals: {
        university?: string,
        course: string
    }
}

class ProfileAPI {

    static getProfile = async ({ token }: authStudent) => {
        return await client.get('profile', { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                return response.data.student
            })
            .catch((err) => {
                console.log(err)
                return null
            })
    }

    static putProfile = async (payload: any, { token }: authStudent) => {
        console.log('body putProfile: ', payload)
        return await client.put('profile', payload, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                return response.data
            })
            .catch((err) => {
                console.log(err)
                return null
            })

    }

    static uploadImage = async (file: any, { token }: authStudent) => {
        console.log('avatar: ', file)
        const formData = new FormData()
        formData.append('avatar', file, file.name)
        const config = {
            baseURL: 'https://gabarita-back.herokuapp.com/api/',
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        }
        return await client.post('app/image/upload', formData, config)
            .then((result: any) => {
                console.log('imageUploaded: ', result)
                return result.data
            })
            .catch((err) => {
                console.log(err)
                return null
            })

    }

}

export default ProfileAPI
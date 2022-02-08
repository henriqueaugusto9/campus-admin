import client from './config'

interface authStudent {
    email: string,
    password: string
}

class AuthAPI {

    static authStudent = async (data: authStudent) => {
        return await client.post('auth', data)
            .then((response) => {
                return response.data
            })
            .catch((err) => {
                console.log(err)
                return { student: null, token: null }
            })
    }

}

export default AuthAPI
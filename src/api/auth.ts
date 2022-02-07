import client from './config'

interface authStudent {
    email: string,
    password: string
}

class AuthAPI {

    static authStudent = async (data: authStudent) => {
        return await client.post('students/auth', data)
            .then((response) => {
                return response.data
            })
            .catch((err) => {
                console.log(err)
                return { student: null, token: null }
            })
    }

    static resetPassword = async (email: string) => {
        return await client.post('students/reset', { email })
            .then((response) => response.data)
            .catch((err) => {
                console.log(err)
                return null
            })
    }

    static changePassword = async (token: string, password: string) => {
        return await client.post(`students/change_password/${token}`, { password })
            .then((response) => response.data)
            .catch((err) => {
                console.log(err)
                return null
            })
    }

}

export default AuthAPI
import client from './config'

class AppointmentAPI {

    static getAllAppointments = async (userId: string, token: string) => {
        return await client({
            url: `appointment/${userId}`,
            baseURL: 'https://campus-back.herokuapp.com/',
            headers: { Authorization: `Bearer ${token}` },
            method: 'GET'
        })
            .then((response) => {
                return response.data.appointment ?? []
            })
            .catch((err) => {
                console.log(err)
                return null
            })
    }
}

export default AppointmentAPI
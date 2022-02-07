import { config } from 'process'
import client from './config'

interface auth {
    token: string
}

class AppointmentAPI {

    static getAllAppointments = async ({ token }: auth) => {
        return await client.get('calendar', { headers: { Authorization: `Bearer ${token}` } }).then((result) => result.data.appointment)
            .catch((err) => {
                console.log(err)
                return null
            })
    }

}

export default AppointmentAPI
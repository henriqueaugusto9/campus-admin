import { config } from 'process'
import client from './config'

interface auth {
    token: string
}

interface IEditClass {
    planID: string,
    contents: Array<any>
}

class SubjectAPI {

    static editClass = async ({ planID, contents }: IEditClass, { token }: auth) => {
        console.log(`{\n\tplanID: ${planID},\ncontents: ${contents} \n}`)
        return await client.put(`plan/${planID}`, { contents }, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {

                return response.data
            })
            .catch((err) => {
                console.log(err)
                return null
            })
    }

}

export default SubjectAPI
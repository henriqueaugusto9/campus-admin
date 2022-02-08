import { detect } from 'detect-browser';
import { injectable } from 'inversify';
import { AnyKindOfDictionary } from 'lodash';
import { Container } from 'unstated';
import AppointmentAPI from '../api/AppointmentAPI';
import ConstructionAPI from '../api/construction';
import FinanceAPI from '../api/finance';
import HomeAPI from '../api/home';
import ProfileAPI from '../api/profile';
import ProgressAPI from '../api/progress';
import ReviewAPI from '../api/review';
import { EMPTY_CONSTRUCTION } from '../model';
import SubscriptionExpired from '../services/SubscriptionExpired';
import { Tabs } from '../utils/tabs';

const browser = detect()

type AppRepositoryState = {
    user: any | null,
    appointments: Array<any>
    progress: any | null,
    reviews: Array<any> | null,
    token: string | null,
    construction: Array<any>,
    isExpired: boolean,
    finance: any,
    tab: Tabs,
    cityHall: string | null,
    images: Array<any>
}

type GetReviewsParams = {
    forceUpdate?: boolean
}


@injectable()
export class AppRepository extends Container<AppRepositoryState> {
    readonly state: AppRepositoryState = {
        user: null,
        token: null,
        appointments: new Array(),
        progress: null,
        reviews: null,
        finance: null,
        isExpired: false,
        cityHall: null,
        images: new Array(),
        construction: new Array(),
        tab: Tabs.CONSTRUCTION,
    }

    get appointments() {
        return this.state.appointments
    }

    get tab() {
        return this.state.tab
    }

    get progress() {
        return this.state.progress
    }

    get reviews() {
        return this.state.reviews
    }

    get user() {
        return this.state.user
    }

    get images() {
        return this.state.images
    }

    get cityHall() {
        return this.state.cityHall
    }

    setImages = async (images: Array<any>) => {
        await this.setState({ images })
    }

    setTab = async (tab: Tabs) => {
        // if (tab == Tabs.HOME) {
        //     await this.getHomeData()
        // }
        await this.setState({ tab })
    }

    getAppointments = async (): Promise<Array<any>> => {
        const { token, user } = this.state

        if (token === null) {
            const localToken = this.getLocalToken()
            if (localToken === null) {
                return new Array()
            }
        }

        let response = await AppointmentAPI.getAllAppointments(user._id, this.state.token!)

        if (response === null) {
            return new Array()
        }
        // response.map((ap: any) => {
        //     let newAp = ap
        //     let date = ap.date.split('-')
        //     newAp.date = date[2] + '/' + date[1] + '/' + date[0]
        //     return newAp
        // })
        await this.setState({ appointments: response })

        return this.state.appointments!
    }

    getReviews = async ({ forceUpdate }: GetReviewsParams): Promise<Array<any>> => {
        const { reviews, token } = this.state
        if (reviews === null || forceUpdate) {
            if (token === null) {
                const localToken = this.getLocalToken()
                if (localToken === null) {
                    return new Array()
                }
            }
            let response = await ReviewAPI.getReview({ token: this.state.token! })
            if (response === null) {
                return new Array()
            }
            await this.setState({ reviews: response })
        }
        return this.state.reviews!
    }

    getProgress = async () => {
        const { token } = this.state
        if (token === null) {
            const localToken = await this.getLocalToken()
            if (localToken === null) {
                return null
            }
        }
        let response = await ProgressAPI.getProgress({ token: this.state.token! })
        if (response === null) {
            return null
        }
        await this.setState({ progress: response })
        return this.state.progress
    }


    setUser = async (user: any, token: string) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        await this.setState({ user, token })
    }

    logout = async () => {
        localStorage.clear()
        SubscriptionExpired.setIsExpired(false)
        await this.setState({
            user: null,
            token: null,
            progress: null,
            reviews: null,
            construction: new Array(),
            tab: Tabs.CONSTRUCTION
        })
    }

    getConstructionData = async () => {
        const token = localStorage.getItem('token');
        let response = await ConstructionAPI.getConstruction(token as string)
        if (!(response?.length > 0)) {
            return null
        }
        // if (response.isExpired) {
        //     console.log('expired: ', response)
        //     await this.setState({ isExpired: true })
        //     return null
        // }
        await this.setState({ construction: response, cityHall: response.prefeitura })
        return this.state.construction!
    }

    addConstructionData = async (title: string, subtitle: string, description: string) => {

        const token = localStorage.getItem('token');
        let response = await ConstructionAPI.postConstruction({title: title, subtitle, description}, token as string)
        // if (response.isExpired) {
        //     console.log('expired: ', response)
        //     await this.setState({ isExpired: true })
        //     return null
        // }
        await this.setState({ construction: response, cityHall: response.prefeitura })
        return this.state.construction!
    }

    getFinance = async () => {
        const token = localStorage.getItem('token');
        let response = await FinanceAPI.getFinance(token as string)
        if (response === null || response.length === 0) {
            return { link: '' }
        }
        await this.setState({ finance: response[0] })
        return this.state.finance!
    }

    getLocalToken = async () => {
        const localToken = localStorage.getItem('token');
        if (localToken !== null) {
            await this.setState({ token: localToken })
        } else {
            return null;
        }
        return this.state.token
    }

    getUser = async () => {
        const { user } = this.state
        if (user === null) {
            const localUser = localStorage.getItem('user');
            if (localUser != null) {
                let userJson = JSON.parse(localUser)
                await this.setState({ user: userJson })
            } else {
                return null
            }
        }
        return this.state.user
    }

}
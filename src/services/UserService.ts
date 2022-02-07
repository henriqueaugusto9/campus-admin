import AuthAPI from '../api/auth';
import { inject, injectable } from "inversify";
import { AppRepository } from '../repositories/AppRepository';
import ReviewAPI from '../api/review';
import ProfileAPI from '../api/profile';
import SubjectAPI from '../api/subject';

type LoginParams = { email: string, password: string }

type ReviewParams = { id: string, title: string, price: string, description: string }

type ProfileParams = {
    name: string,
    city: string,
    email: string,
    phoneNumber: string,
    generalProfile: string,
    mainGoal: string
}

type ClassParams = {
    classID: string,
    performance: string
}

type CheckSessionParams = {
    goBack: () => void
}

@injectable()
class AppService {

    @inject(AppRepository) private appRepo!: AppRepository

    login = async ({ email, password }: LoginParams) => {
        let response = await AuthAPI.authStudent({ email, password })

        if (response != null && response.token != null) {
            this.appRepo.setUser(response.student, response.token)
            return true
        }
        return false
    }

    checkSessionStatus = async ({ goBack }: CheckSessionParams) => {
        const token = await this.appRepo.getLocalToken()
        if (token != null) {
            return token
        } else {
            goBack()
            return null
        }
    }

    editReview = async (review: ReviewParams) => {
        const token = await this.appRepo.getLocalToken()
        if (token == null) {
            return false
        }
        const response = await ReviewAPI.putReview(review, { token })
        if (response != null && response.review != null) {
            await this.appRepo.getReviews({ forceUpdate: true })
            return true
        }
        return false
    }

    addReview = async (review: ReviewParams) => {
        const token = await this.appRepo.getLocalToken()
        if (token == null) {
            return false
        }
        const response = await ReviewAPI.postReview(review, { token })

        if (response != null && response.review != null) {
            await this.appRepo.getReviews({ forceUpdate: true })
            return true
        }
        return false
    }


    deleteReview = async (id: string) => {
        const token = await this.appRepo.getLocalToken()
        if (token == null) {
            return false
        }
        const response = await ReviewAPI.deleteReview(id, { token })
    }

    editProfile = async ({ name, email, phoneNumber, city, generalProfile, mainGoal }: ProfileParams) => {

        const body = {
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            profile: {
                address: {
                    state: city.split('-')[1] ?? '',
                    city: city.split('-')[0]
                },
                generalProfile: generalProfile,
            },
            goals: {
                course: mainGoal
            }
        }

        const token = await this.appRepo.getLocalToken()
        if (token == null) {
            return false
        }
        const response = await ProfileAPI.putProfile(body, { token })
        if (response != null && response.student != null) {
            return true
        }
        return false
    }

}

export default AppService
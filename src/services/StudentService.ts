import AuthAPI from '../api/auth';
import { inject, injectable } from "inversify";
import { StudentRepository } from '../repositories/StudentRepository';
import ReviewAPI from '../api/review';
import ProfileAPI from '../api/profile';
import SubjectAPI from '../api/subject';

type LoginParams = { email: string, password: string }

// type ReviewParams = { 
//     id: string, 
//     date: string, 
//     percentage: string, 
//     time: string, 
//     questions: string, 
//     description: string, 
//     type: string 
// }

type ReviewParams = {
    title: string,
    type: string
    date: string,
    percentage: string,
    questions: string,
    rightQuestions: string,
    classID: string
}

type ProfileInfo = {
    icon: string,
    text: string,
    name: string
}

type ProfileParams = {
    profile: Array<ProfileInfo>
}

type ClassParams = {
    classID: string,
    performance: any,
    questions: any,
    rightQuestions: any,
    reviewQuestions: any,
    rightReviewQuestions: any,
    reviewPercentage?: any,
    theme?: any
}

type CheckSessionParams = {
    goBack: () => void
}

@injectable()
class StudentService {

    @inject(StudentRepository) private studentRepo!: StudentRepository

    login = async ({ email, password }: LoginParams) => {
        let response = await AuthAPI.authStudent({ email, password })

        if (response != null && response.token != null) {
            this.studentRepo.setStudent(response.student, response.token)
            return true
        }
        return false
    }

    resetPassword = async ({ email }: { email: string }) => {
        return await AuthAPI.resetPassword(email)
    }

    changePassword = async ({ token, password }: { token: string, password: string }) => {
        return await AuthAPI.changePassword(token, password)
    }

    checkSessionStatus = async ({ goBack }: CheckSessionParams) => {
        const token = await this.studentRepo.getLocalToken()
        if (token != null) {
            return token
        } else {
            goBack()
            return null
        }
    }

    // editReview = async (review: ReviewParams, classID?: string) => {
    //     let splittedDate = review.date.split('/')
    //     review.date = splittedDate[2] + '-' + splittedDate[1] + '-' + splittedDate[0]
    //     const token = await this.studentRepo.getLocalToken()
    //     if (token == null) {
    //         return false
    //     }
    //     const response = await ReviewAPI.putReview(review, { token })

    //     if (response != null && response.review != null) {
    //         await this.studentRepo.getReviews({ classID })
    //         return true
    //     }
    //     return false
    // }

    addReview = async (review: ReviewParams) => {
        // let splittedDate = review.date.split('/')
        // review.date = splittedDate[2] + '-' + splittedDate[1] + '-' + splittedDate[0]
        const token = await this.studentRepo.getLocalToken()
        if (token == null) {
            return false
        }

        console.log('register review: ', review)
        const response = await ReviewAPI.postReview(review, { token })
        console.log('response: ', response)
        if (response != null && response.review != null) {
            await this.studentRepo.getReviews({ classID: review.classID })
            return true
        }
        return false
    }


    deleteReview = async (id: string) => {
        const token = await this.studentRepo.getLocalToken()
        if (token == null) {
            return false
        }
        const response = await ReviewAPI.deleteReview(id, { token })
    }

    editProfile = async ({ profile }: ProfileParams) => {

        let body = { profile: {}, goals: {} }
        profile.map((info) => {
            let key = info.name
            let value = info.text as any
            if (key == 'city') {
                key = 'address'
                value = {
                    state: value.split('-')[1] ?? '',
                    city: value.split('-')[0]
                }
                Object.defineProperty(body.profile, key, { value })
            } else if (key == 'generalProfile') {
                Object.defineProperty(body.profile, key, { value })
            } else if (key == 'goals') {
                value = {
                    university: value.split('-')[0],
                    course: value.split('-')[1] ?? ''
                }
                body.goals = value
            }
            else {
                Object.defineProperty(body, key, { value: info.text })
            }
        })

        console.log('body: ', body)
        // const body = {
        //     name: name,
        //     email: email,
        //     phoneNumber: phoneNumber,
        //     profile: {
        //         address: {
        //             state: city.split('-')[1] ?? '',
        //             city: city.split('-')[0]
        //         },
        //         generalProfile: generalProfile,
        //     },
        //     goals: {
        //         course: mainGoal
        //     }
        // }

        const token = await this.studentRepo.getLocalToken()
        if (token == null) {
            return false
        }
        const response = await ProfileAPI.putProfile(body, { token })
        if (response != null && response.student != null) {
            return true
        }
        return false
    }

    editProfileImage = async (file: any) => {
        const token = await this.studentRepo.getLocalToken()
        if (token == null) {
            return false
        }
        console.log('editProfileImage file: ', file)
        const response = await ProfileAPI.uploadImage(file, { token })
        if (response != null) {
            await this.studentRepo.setProfileImage(response.student.picture)
            return true
        }
        return false
    }

    editClassPerformance = async (
        { performance, classID, questions, rightQuestions, reviewQuestions, rightReviewQuestions, theme }: ClassParams
    ) => {
        const home = await this.studentRepo.getHomeData()
        const plan = home.plan

        let newContents = plan.contents.map((content: any) => {
            let newContent = content
            newContent.subject.chapter = content.subject.chapter.map((chapter: any) => {
                let newChapter = chapter
                newChapter.classes = chapter.classes.map((c: any) => {
                    if (c._id == classID) {
                        let newClass = c
                        newClass.performance = performance
                        newClass.questions = questions
                        newClass.rightQuestions = rightQuestions
                        newClass.reviewQuestions = reviewQuestions
                        newClass.rightReviewQuestions = rightReviewQuestions
                        newClass.reviewPercentage = (parseInt(newClass.reviewQuestions) > 0 && parseInt(newClass.rightReviewQuestions) > 0) ?
                            ((parseInt(newClass.rightReviewQuestions) * 100) / parseInt(newClass.reviewQuestions)).toFixed(2)
                            : 0
                        newClass.theme = theme ?? ''
                        return newClass
                    } else {
                        return c
                    }
                })
                return newChapter
            })

            return newContent
        })

        const token = await this.studentRepo.getLocalToken()
        if (token == null) {
            return false
        }
        const result = await SubjectAPI.editClass({ planID: plan._id, contents: newContents }, { token })
        if (result != null && result.studyplan != null) {
            return true
        }
        return false
    }

}

export default StudentService
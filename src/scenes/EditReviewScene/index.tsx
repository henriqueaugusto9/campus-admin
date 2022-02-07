import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { StaticContext, useHistory, withRouter } from 'react-router';
import Colors from '../../utils/colors';
import ReactLoading from 'react-loading';
import { Container, ScrollableCardBody } from './components'
import { Header, SubmitButton, Error } from '../../components';
import { Delete } from '@material-ui/icons';
import { EditReviewCard } from './components/EditReviewCard';
import DateUtils from '../../utils/date';
import StudentService from '../../services/StudentService';
import { resolve } from 'inversify-react';

export enum Mode {
    ADD,
    EDIT
}

export type Review = {
    id?: string,
    title: string,
    type: string
    date: string,
    percentage: string,
    questions: string,
    rightQuestions: string,
    theme?: string,
    classID: string
}


type EditReviewLocationState = {
    review?: Review,
    mode: Mode,
    classID: string,
    type: string,
}

const windowHeight = window.innerHeight

class EditReviewScene extends Component<RouteComponentProps<{}, StaticContext, EditReviewLocationState>> {

    @resolve(StudentService) private studentServ!: StudentService

    state = {
        review: {
            title: '',
            type: '',
            date: '',
            percentage: '',
            questions: '',
            rightQuestions: '',
            theme: '',
            classID: ''
        },
        error: {
            type: '',
            showError: false,
            message: ''
        },
        isLoading: true,
        mode: Mode.ADD,
        isSubmitLoading: false
    }

    async componentDidMount() {
        await this.studentServ.checkSessionStatus({ goBack: this.props.history.goBack })

        let classID = this.props.location.state.classID
        let type = this.props.location.state.type
        let review = {
            id: '',
            type: type,
            title: '',
            date: '',
            percentage: '',
            questions: '',
            rightQuestions: '',
            theme: '',
            classId: classID
        }
        let mode = this.props.location.state.mode
        console.log(`review:`, review)
        if (mode == Mode.EDIT) {
            review!.percentage = review!.percentage.split(' ')[0]
            console.log('componentdidmount editreview: ', review)
        }
        this.setState({ review, isLoading: false, mode })
    }

    isReviewFormValid = (review: Review) => {
        const percentageRegexp = new RegExp(/^(0(\.0))?|^(1000(\.0)?|[0-9]?\d\d(\.\d{1})?)%?/)
        const isDateValid = DateUtils.isValidDate(review.date)
        const isPercentageValid = percentageRegexp.test(review.percentage)
        if (isDateValid && isPercentageValid) {
            return true
        } else {
            this.setState({
                isSubmitLoading: false,
                error: {
                    type: isDateValid ? isPercentageValid ? 'UNKNOWN' : 'PERCENTAGE' : 'DATE',
                    showError: true,
                    message: isDateValid ? isPercentageValid ? 'Ocorreu um erro inesperado. Tente novamente mais tarde' : 'Porcentagem inválida' : 'Data inválida: Formato deve ser DD/MM/AAAA'
                }
            })
            return false
        }
    }

    handleSubmit = async () => {
        this.setState({ isSubmitLoading: true })
        let review = this.state.review
        console.log('handleSubmit', review)
        // const isValid = this.isReviewFormValid(review)

        review.percentage = review.percentage.charAt(review.percentage.length - 1) == '%' ?
            review.percentage.slice(0, review.percentage.length - 1) : review.percentage
        let result;
        if (this.state.mode == Mode.ADD) {
            result = await this.studentServ.addReview(review)
        } else {
            // result = await this.studentServ.editReview(review)
        }
        if (result) {
            this.props.history.goBack()
        } else {
            this.setState({
                isSubmitLoading: false,
                error: {
                    type: 'UNKNOWN',
                    showError: true,
                    message: 'Ocorreu um erro inesperado. Tente novamente mais tarde'
                }
            })
        }

    }

    render() {
        const { review, isLoading, error, mode, isSubmitLoading } = this.state
        return <>
            <Header
                canGoBack={true}
                goBackTo={'review'}
                title={review.type == 'redacao' ? 'Adicionar Redação' : 'Adicionar Exercícios'}
            />
            {
                !isLoading && <Container style={{ height: windowHeight - document.getElementById('header')?.clientHeight!, top: document.getElementById('header')?.clientHeight!, bottom: 0 }}>
                    <ScrollableCardBody>
                        {error.showError && <Error>{error.message}</Error>}
                        <EditReviewCard
                            setState={(newReview: Review) => { console.log('newReview:', newReview); this.setState({ review: newReview }) }}
                            review={review}
                        />
                        <SubmitButton onClick={!isSubmitLoading ? this.handleSubmit : () => { }} >{!isSubmitLoading ? "Salvar" :
                            <ReactLoading type='bubbles' color={Colors.primaryColor} width={24} height={24} />}</SubmitButton>
                    </ScrollableCardBody>
                </Container>
            }
            {
                isLoading && <div
                    style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <ReactLoading type='bubbles' color={Colors.primaryColor} />
                </div>
            }
        </>
    }

}

export default withRouter(EditReviewScene);
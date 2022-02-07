import { AddBox } from '@material-ui/icons';
import { resolve } from 'inversify-react';
import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';
import { Header } from '../../components';
import {
    ReviewCard
} from '../../components/ProgressCard';
import { StudentRepository } from '../../repositories/StudentRepository';
import Colors from '../../utils/colors';
import {
    Container,
    ScrollableCardBody
} from './components/index';
import { Mode } from '../../scenes/EditReviewScene'
import StudentService from '../../services/StudentService';
import { EditReviewCard } from '../EditReviewScene/components/EditReviewCard';

type LocationReviewState = {
    classID?: string,
    type?: string,
    mode?: Mode
}

type Review = {
    id: string
    title: string,
    date: string,
    percentage: string
}


class ReviewScene extends Component<RouteComponentProps<{}, StaticContext, LocationReviewState>>{

    @resolve(StudentRepository) private studentRepo!: StudentRepository
    @resolve(StudentService) private studentServ!: StudentService

    state = {
        classID: '',
        type: '',
        isLoading: true
    }

    async componentDidMount() {

        const classID = this.props.location.state.classID!
        const type = this.props.location.state.type!

        const reviews = await this.studentRepo.getReviews({ classID })
        if (reviews != null) {
            this.setState({ isLoading: false, classID, type })
        } else {
            this.props.history.replace('/login')
        }
    }

    handleDelete = (reviewID: string) => async () => {
        const result = await this.studentServ.deleteReview(reviewID)
        const reviews = await this.studentRepo.getReviews({ classID: this.state.classID })
        this.setState({})
    }



    render() {
        const { isLoading, type, classID } = this.state
        const reviews = this.studentRepo.reviews!
        console.log('reviews: ', reviews)
        return (
            <>
                <Header
                    canGoBack={true}
                    title={type == 'redacao' ? 'Adicionar Redação' : 'Adicionar Exercícios'}
                    suffixComponent={<AddBox
                        style={{ color: '#fff', fontSize: '32px' }}
                        onClick={() => this.props.history.push('/review/edit', { mode: Mode.ADD, type, classID })}
                    />
                    }
                />
                <Container>
                    

                    {!isLoading ? (reviews.length > 0) ? <>
                    <ScrollableCardBody>
                    <p style={{ textAlign: 'center', fontWeight: 500, fontSize: '24px', marginTop: '32px' }}>{reviews[0].title}</p>
                        {reviews.map(
                            (review) => <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    margin: '8px 0 8px 0',
                                    width: '100%'
                                }}>
                                <ReviewCard
                                    review={review}
                                    handleDelete={this.handleDelete(review._id)}
                                />
                            </div>
                        )}

                    </ScrollableCardBody></> : <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '16px 0 16px 0',
                            width: '100%',
                            height: '100%'
                        }}><span>Nada cadastrado</span>
                    </div>
                        : <div
                            style={{
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <ReactLoading type='bubbles' color={Colors.primaryColor} />
                        </div>
                    }
                </Container>
            </>

        )
    }


}

export default withRouter(ReviewScene);
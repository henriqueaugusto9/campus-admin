import CircularSlider from '@fseehawer/react-circular-slider';
import { ArrowForward } from '@material-ui/icons';
import { Card, Input } from 'antd';
import { Location } from 'history';
import { resolve } from 'inversify-react';
import React, { Component } from 'react';
import { StaticContext } from 'react-router';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { debounce } from 'underscore';
import { Divider, Error, Header, SubmitButton } from '../../components';
import StudentService from '../../services/StudentService';
import { StudentRepository } from '../../repositories/StudentRepository';
import Colors from '../../utils/colors';
import { Container, WeekAssignmentContainer, ScrollableCardBody } from './components';

type LocationState = {
    color: string,
    id: string,
    classID?: string,
    type?: string
}

type SlideHandlerProps = {
    performance: string,
    classID: string
}

const windowHeight = window.innerHeight


class SubjectScene extends Component<RouteComponentProps<{}, StaticContext, LocationState>> {

    @resolve(StudentService) private studentServ!: StudentService
    @resolve(StudentRepository) private studentRepo!: StudentRepository

    state = {
        title: '',
        chapters: Array<{ classes: Array<any>, chapterTitle: string }>(),
        color: '',
        type: '',
        sliderData: new Array(),
        error: {
            type: '',
            showError: false,
            message: ''
        },
    }

    componentDidMount() {
        const color = this.props.location.state.color

        let sliderData = this.state.sliderData

        const { subject } = this.studentRepo.homeData.plan.contents.find(({ _id }: any) =>
            _id == this.props.location.state.id
        )

        for (var i = 0; i <= 100; i++) {
            sliderData.push(i)
        }

        this.setState({
            title: subject.subjectTitle,
            chapters: subject.chapter,
            type: subject.type,
            color,
            sliderData
        })

    }


    handleSlider = async ({ performance, classID }: SlideHandlerProps) => {

        let newChapters = this.state.chapters.map((chapter: any) => {
            chapter.classes = chapter.classes.map((cc: any) => {
                let newClass = cc
                if (cc._id == classID) {
                    newClass.performance = performance
                    newClass.color = cc.performance > 80 ? '#00ff00' : cc.performance > 49 ? '#ffff00' : '#ff0000'
                }
                return newClass
            })
            return chapter
        })
        this.setState({ chapters: newChapters })

        let questions
        let rightQuestions
        let reviewQuestions
        let rightReviewQuestions
        this.state.chapters.forEach((chapter: any) => {
            let c = chapter.classes.find((c: any) => c._id == classID)
            if (c !== undefined) {
                questions = c.questions
                rightQuestions = c.rightQuestions
                reviewQuestions = c.reviewQuestions
                rightReviewQuestions = c.rightReviewQuestions
                return
            }
        })

        console.log('questions: ', questions)
        console.log('rightQuestions: ', rightQuestions)
        const result = await this.studentServ.editClassPerformance({ performance, classID, questions, rightQuestions, reviewQuestions, rightReviewQuestions })
        if (!result) {
            this.setState({
                error: {
                    type: 'UNKNOWN',
                    showError: true,
                    message: 'Ocorreu um erro inesperado. Tente novamente mais tarde'
                }
            })
        }
    }

    onChangeRightQuestions = async ({ rightQuestions, classID }: any) => {

        let newChapters = this.state.chapters.map((chapter: any) => {
            chapter.classes = chapter.classes.map((cc: any) => {
                let newClass = cc
                if (cc._id == classID) {
                    newClass.rightQuestions = rightQuestions
                }
                return newClass
            })
            return chapter
        })
        this.setState({ chapters: newChapters })

        let questions
        let performance
        let reviewQuestions
        let rightReviewQuestions
        this.state.chapters.forEach((chapter: any) => {
            let c = chapter.classes.find((c: any) => c._id == classID)
            if (c !== undefined) {
                questions = c.questions
                reviewQuestions = c.reviewQuestions
                rightReviewQuestions = c.rightReviewQuestions
                performance = c.performance
                return
            }

        })

        console.log('questions: ', questions)
        console.log('rightQuestions: ', rightQuestions)
        const result = await this.studentServ.editClassPerformance({ performance, classID, questions, rightQuestions, reviewQuestions, rightReviewQuestions })
        if (!result) {
            this.setState({
                error: {
                    type: 'UNKNOWN',
                    showError: true,
                    message: 'Ocorreu um erro inesperado. Tente novamente mais tarde'
                }
            })
        } else {
            const homeData = await this.studentRepo.getHomeData()
        }
    }

    onChangeReviewQuestions = async ({ reviewQuestions, classID }: any) => {
        let newChapters = this.state.chapters.map((chapter: any) => {
            chapter.classes = chapter.classes.map((cc: any) => {
                let newClass = cc
                if (cc._id == classID) {
                    newClass.reviewQuestions = reviewQuestions
                }
                return newClass
            })
            return chapter
        })
        this.setState({ chapters: newChapters })
    }

    onChangeRightReviewQuestions = async ({ rightReviewQuestions, classID }: any) => {
        let newChapters = this.state.chapters.map((chapter: any) => {
            chapter.classes = chapter.classes.map((cc: any) => {
                let newClass = cc
                if (cc._id == classID) {
                    newClass.rightReviewQuestions = rightReviewQuestions
                }
                return newClass
            })
            return chapter
        })
        this.setState({ chapters: newChapters })

        let questions
        let rightQuestions
        let performance
        let reviewQuestions
        this.state.chapters.forEach((chapter: any) => {
            let c = chapter.classes.find((c: any) => c._id == classID)
            if (c !== undefined) {
                questions = c.questions
                rightQuestions = c.rightQuestions
                reviewQuestions = c.reviewQuestions
                performance = c.performance
                return
            }
        })

        const result = await this.studentServ.editClassPerformance({ performance, classID, questions, rightQuestions, reviewQuestions, rightReviewQuestions })
        if (!result) {
            this.setState({
                error: {
                    type: 'UNKNOWN',
                    showError: true,
                    message: 'Ocorreu um erro inesperado. Tente novamente mais tarde'
                }
            })
        } else {
            const homeData = await this.studentRepo.getHomeData()
        }
    }

    onChangeTheme = async ({ theme, classID }: any) => {
        let newChapters = this.state.chapters.map((chapter: any) => {
            chapter.classes = chapter.classes.map((cc: any) => {
                let newClass = cc
                if (cc._id == classID) {
                    newClass.theme = theme
                }
                return newClass
            })
            return chapter
        })
        this.setState({ chapters: newChapters })

        let questions
        let performance
        let rightQuestions
        let reviewQuestions
        let rightReviewQuestions
        let reviewPercentage
        this.state.chapters.forEach((chapter: any) => {
            let c = chapter.classes.find((c: any) => c._id == classID)
            if (c !== undefined) {
                questions = c.questions
                performance = c.performance
                rightQuestions = c.rightQuestions
                reviewQuestions = c.reviewQuestions
                rightReviewQuestions = c.rightReviewQuestions
                return
            }
        })

        console.log('questions: ', questions)
        const result = await this.studentServ.editClassPerformance({
            performance,
            classID,
            questions,
            rightQuestions,
            reviewQuestions,
            rightReviewQuestions,
            theme,
        })
        if (!result) {
            this.setState({
                error: {
                    type: 'UNKNOWN',
                    showError: true,
                    message: 'Ocorreu um erro inesperado. Tente novamente mais tarde'
                }
            })
        } else {
            const homeData = await this.studentRepo.getHomeData()
        }
    }


    render() {
        const { title, chapters, type, sliderData, error } = this.state
        return (
            <>
                <Header backgroundColor={Colors.primaryColor}
                    canGoBack
                    goBackTo={'home'}
                    title={title}
                />
                <Container style={{
                    height: windowHeight - document.getElementById('header')?.clientHeight!,
                    marginTop: document.getElementById('header')?.clientHeight!
                }}>
                    <Card style={{
                        width: '90%',
                        height: '95%',
                        borderRadius: '7px',
                        boxShadow: "5px 4px 2px 0.5px rgba(208, 216, 243, 0.6)",

                    }}
                        bodyStyle={{
                            padding: '0px 16px',
                            height: '100%'
                        }}
                    >
                        <ScrollableCardBody>
                            {error.showError && <Error>{error.message}</Error>}
                            <p style={{ textAlign: 'center', fontWeight: 500, fontSize: '24px' }}>Tarefa da semana</p>

                            {chapters.map((chapter, chapterIndex) => <>
                                <span style={{ fontSize: '24px' }}>{chapter.chapterTitle}</span>
                                {chapter != null && chapter.classes.length > 0 &&
                                    chapter.classes.map((c, index) => {
                                        let percentage = (parseInt(c.questions) > 0 && parseInt(c.rightQuestions) > 0) ?
                                            ((parseInt(c.rightQuestions) * 100) / parseInt(c.questions)).toFixed(2)
                                            : 0

                                        let reviewPercentage = (parseInt(c.reviewQuestions) > 0 && parseInt(c.rightReviewQuestions) > 0) ?
                                            ((parseInt(c.rightReviewQuestions) * 100) / parseInt(c.reviewQuestions)).toFixed(2)
                                            : 0
                                        return <><WeekAssignmentContainer>
                                            <div style={{ marginRight: 24 }}>
                                                <span style={{ fontSize: '18px' }}>{c.classTitle}</span>
                                            </div>
                                            {type != 'redacao' && <div style={{ marginRight: 16 }}>
                                                <CircularSlider
                                                    min={0}
                                                    max={100}
                                                    width={104}
                                                    knobPosition={'top'}
                                                    appendToValue={'%'}
                                                    label={'Acertos'}
                                                    labelFontSize={16}
                                                    knobSize={32}
                                                    knobColor={Colors.primaryColorLight}
                                                    valueFontSize={'24px'}
                                                    progressColorFrom={'#ff0000'}
                                                    progressColorTo={'#00ff00'}
                                                    progressSize={8}
                                                    data={sliderData}
                                                    dataIndex={c.performance}
                                                    onChange={debounce((value: any) => this.handleSlider({ performance: value, classID: c._id }), 1000)}
                                                />
                                            </div>}
                                        </WeekAssignmentContainer>
                                            {type != 'redacao' && <>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                                                    <label style={{ flex: 2, fontSize: '16px' }} htmlFor='questions'>Questões resolvidas</label>
                                                    <Input
                                                        name='questions'
                                                        placeholder='100'
                                                        style={{ flex: 1, fontSize: '18px', borderRadius: '4px', marginBottom: '8px' }}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                            let newChapters = chapters.map((chapter: any) => {
                                                                chapter.classes = chapter.classes.map((cc: any) => {
                                                                    let newClass = cc
                                                                    if (cc._id == c._id) {
                                                                        newClass.questions = e.target.value
                                                                    }
                                                                    return newClass
                                                                })
                                                                return chapter
                                                            })
                                                            this.setState({ chapters: newChapters })
                                                        }}
                                                        value={c.questions}
                                                    />
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    <label style={{ flex: 2, fontSize: '16px' }} htmlFor='rightQuestions'>Questões certas</label>
                                                    <Input
                                                        name='rightQuestions'
                                                        placeholder='80'
                                                        style={{ flex: 1, fontSize: '18px', borderRadius: '4px', marginBottom: '8px' }}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onChangeRightQuestions({ rightQuestions: e.target.value, classID: c._id })}
                                                        value={c.rightQuestions}
                                                    />
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    <label style={{ flex: 2, fontSize: '16px' }} htmlFor='percentage'>% de acerto</label>
                                                    <Input
                                                        name='percentage'
                                                        readOnly={true}
                                                        placeholder='90%'
                                                        style={{ flex: 1, fontSize: '18px', borderRadius: '4px' }}
                                                        value={percentage + '%'}
                                                    />
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '32px' }}>

                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    <label style={{ flex: 2, fontSize: '16px' }} htmlFor='reviewQuestions'>Questões resolvidas revisão</label>
                                                    <Input
                                                        name='reviewQuestions'
                                                        placeholder='80'
                                                        style={{ flex: 1, fontSize: '18px', borderRadius: '4px', marginBottom: '8px' }}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onChangeReviewQuestions({ reviewQuestions: e.target.value, classID: c._id })}
                                                        value={c.reviewQuestions}
                                                    />
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    <label style={{ flex: 2, fontSize: '16px' }} htmlFor='rightReviewQuestions'>Questões certas revisão</label>
                                                    <Input
                                                        name='rightReviewQuestions'
                                                        placeholder='80'
                                                        style={{ flex: 1, fontSize: '18px', borderRadius: '4px', marginBottom: '8px' }}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onChangeRightReviewQuestions({ rightReviewQuestions: e.target.value, classID: c._id })}
                                                        value={c.rightReviewQuestions}
                                                    />
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    <label style={{ flex: 2, fontSize: '16px' }} htmlFor='reviewPercentage'>% de acerto revisão</label>
                                                    <Input
                                                        name='reviewPercentage'
                                                        readOnly={true}
                                                        placeholder='90%'
                                                        style={{ flex: 1, fontSize: '18px', borderRadius: '4px' }}
                                                        value={reviewPercentage + '%'}
                                                    />
                                                </div>

                                                <SubmitButton
                                                    style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}
                                                    onClick={() => this.props.history.push('/review', { color: '', id: '', classID: c._id, type })}>
                                                    {type == 'simulado' ? 'Adicionar Simulado' : 'Adicionar Exercício'}
                                                    <ArrowForward />
                                                </SubmitButton>
                                            </>
                                            }
                                            {type == 'redacao' && <>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                                                    <label style={{ flex: 2, fontSize: '16px' }} htmlFor='grade'>Nota</label>
                                                    <Input
                                                        name='grade'
                                                        placeholder='100'
                                                        style={{ flex: 1, fontSize: '18px', borderRadius: '4px', marginBottom: '8px' }}
                                                        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                                                            let newChapters = chapters.map((chapter: any) => {
                                                                chapter.classes = chapter.classes.map((cc: any) => {
                                                                    let newClass = cc
                                                                    if (cc._id == c._id) {
                                                                        newClass.questions = e.target.value
                                                                    }
                                                                    return newClass
                                                                })
                                                                return chapter
                                                            })
                                                            this.setState({ chapters: newChapters })
                                                        }}
                                                        value={c.questions}
                                                    />
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    <label style={{ flex: 2, fontSize: '16px' }} htmlFor='theme'>Tema</label>
                                                    <Input
                                                        name='theme'
                                                        placeholder='Política'
                                                        style={{ flex: 1, fontSize: '18px', borderRadius: '4px', marginBottom: '8px' }}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onChangeTheme({ theme: e.target.value, classID: c._id })}
                                                        value={c.theme ?? ''}
                                                    />
                                                </div>
                                                <SubmitButton
                                                    style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}
                                                    onClick={() => this.props.history.push('/review', { color: '', id: '', classID: c._id, type })}>
                                                    Adicionar Redação
                                                <ArrowForward />
                                                </SubmitButton>
                                            </>
                                            }

                                            {(index !== chapter.classes.length - 1 || chapterIndex !== chapters.length - 1) && <Divider />}
                                        </>
                                    })
                                }
                            </>)}
                        </ScrollableCardBody>
                    </Card>
                </Container>
            </>
        )
    }

}

export default withRouter(SubjectScene)
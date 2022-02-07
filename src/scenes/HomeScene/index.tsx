import { Card, Image } from 'antd';
import { resolve } from 'inversify-react';
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ProgressBar, SubjectCard } from '../../components';
import { StudentRepository } from '../../repositories/StudentRepository';
import Colors from '../../utils/colors';
import {
    Body, Container,
    Header,
    LogoContainer,
    ScrollableCardBody,


    UserGreetings
} from './components';
import { CardHeaderContainer, ProgressContainer, ProgressLabelContainer } from './components/Card';
import { Dates } from './components/Dates';
import ReactLoading from 'react-loading';

const windowHeight = window.innerHeight

class HomeScene extends Component<RouteComponentProps>{

    @resolve(StudentRepository) private studentRepo!: StudentRepository

    state = {
        studentData: {
            student: {
                name: '',
                goals: [{ university: '', course: '' }],
                image: ''
            },
            plan: {
                startDate: '',
                endDate: '',
                contents: new Array<any>()
            },
            note: ''
        },
        isLoading: true
    }

    async componentDidMount() {
        const homeData = await this.studentRepo.getHomeData()
        const student = this.studentRepo.student
        if (student !== null && homeData !== null) {
            this.setState({ studentData: { student, plan: homeData.plan, note: homeData.note }, isLoading: false })
        } else {
            this.studentRepo.logout()
            this.props.history.replace('/login')
        }
    }

    render() {
        const { isLoading } = this.state
        const homeData = this.studentRepo.homeData
        const student = this.studentRepo.student
        return (<>
            {(student !== null && homeData !== null) && <Container style={{ height: windowHeight }}>
                <Header>
                    <LogoContainer><Image width={128} src={process.env.PUBLIC_URL + '/images/GABARITA_HORIZONTAL_BRANCA.png'} /></LogoContainer>
                    <div style={{
                            display: 'flex', flexDirection: 'row', alignItems: 'space-evenly', justifyContent: 'center',
                            margin: '0 16px 48px 16px'
                        }}>
                        <div style={{
                            height: 124,
                            width: 124,
                            borderRadius: '50%',
                            backgroundImage: `url(${student.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }}
                        ></div>
                        <div
                            style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            }}
                        >
                            <div style={{
                                display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 24
                            }}>
                                <UserGreetings>Olá, <span style={{ color: Colors.secundaryColor }}>{student.name}</span></UserGreetings>
                                {isLoading && <ReactLoading height={24} width={24} type='bubbles' color='#fff' />}
                            </div>
                            <div style={{
                                color: '#fff',
                                fontSize: '16px',
                                fontFamily: 'NexaBold',
                                textAlign: 'center',
                                lineHeight: 1,
                            }}>
                                Essas são as suas tarefas para os próximos dias:
                            </div>
                        </div>
                    </div>
                </Header>
                {(homeData.plan != null && homeData.plan.startDate !== '') && <Dates startDate={new Date(homeData.plan.startDate + ' GMT-0300')} endDate={new Date(homeData.plan.endDate + ' GMT-0300')}></Dates>}

                <Body>
                    <Card
                        loading={isLoading}
                        style={{
                            height: '90%',
                            width: '90%',
                            borderRadius: '7px',
                            boxShadow: "5px 4px 2px 0.5px rgba(208, 216, 243, 0.6)",
                        }}
                        bodyStyle={{
                            padding: '16px 16px 0 16px',
                            height: '100%',
                            overflow: 'hidden',
                        }}
                    >
                        <CardHeaderContainer>
                            <span style={{
                                fontSize: '20px',
                                fontFamily: 'NexaBold',
                                color: Colors.secundaryColor
                            }}>DES</span>
                            {/* <ProgressContainer>
                                <ProgressLabelContainer><span>Progresso</span><span>55%</span></ProgressLabelContainer>
                                <ProgressBar color={Colors.secundaryColor} completed={'55'} />
                            </ProgressContainer> */}
                        </CardHeaderContainer>
                        <ScrollableCardBody>
                            {homeData.plan && homeData.plan.contents.length > 0 && homeData.plan.contents.map(
                                ({ subject, _id }: any, key: number) => {
                                    console.log('subject: ', subject.subjectTitle)
                                    console.log('id: ', _id)
                                    return <SubjectCard
                                        key={key.toString()}
                                        title={subject.subjectTitle}
                                        checked={false}
                                        onClick={() => this.props.history.push('subject', {
                                            color: '#DBD426',
                                            id: _id
                                        })}
                                        chapters={subject.chapter}
                                        image={subject.image == '' ? 'https://site.groupe-psa.com/content/uploads/sites/9/2016/12/white-background-2.jpg' : subject.image} />
                                }
                            )}
                        </ScrollableCardBody>
                    </Card>
                    <Card
                        loading={isLoading}
                        style={{
                            marginTop: '16px',
                            width: '90%',
                            borderRadius: '7px',
                            boxShadow: "5px 4px 2px 0.5px rgba(208, 216, 243, 0.6)",
                        }}
                        bodyStyle={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '16px 16px 16px 16px',
                            height: '100%'
                        }}
                    >
                        <span style={{
                            fontSize: '20px',
                            fontFamily: 'NexaBold',
                            color: Colors.secundaryColor
                        }}>Recadinho</span>
                        <span>
                            {homeData.note}
                        </span>
                    </Card>
                </Body>
            </Container>
            }
        </>
        )
    }


}

export default withRouter(HomeScene);

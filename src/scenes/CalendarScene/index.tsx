
import { AddBox } from '@material-ui/icons';
import { Badge } from 'antd';
import { PickerLocale } from 'antd/lib/date-picker/generatePicker';
import localePT from 'antd/lib/locale/pt_PT';
import { Dayjs } from 'dayjs';
import { resolve } from 'inversify-react';
import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { Header, Divider } from '../../components';
import { StudentRepository } from '../../repositories/StudentRepository';
import { Mode } from '../../scenes/EditReviewScene';
import Colors from '../../utils/colors';
import DateUtils from '../../utils/date';
import {
    Calendar, Container,
    ScrollableCardBody
} from './components/index';
import './styles.css'


type Review = {
    id: string
    title: string,
    date: string,
    percentage: string,
    description: string,
    type: string,
}

type BadgeStatus = "warning" | "success" | "error" | "default" | "processing" | undefined

type BadgeMessage = {
    type: BadgeStatus,
    content: string
}

class CalendarScene extends Component<RouteComponentProps>{

    @resolve(StudentRepository) private studentRepo!: StudentRepository

    state = {
        isLoading: true,
        locale: null,
    }

    constructor(props: any) {
        super(props);
    }

    async componentDidMount() {
        const appointments = await this.studentRepo.getAppointments()

        if (appointments != null) {
            this.setState({ isLoading: false })
        } else {
            this.props.history.replace('/login')
        }
    }

    componentDidUpdate() {
        const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
        const elements = document.getElementsByClassName('ant-picker-content')
        let antdCalendar = elements.item(0)
        let trOld = antdCalendar?.firstChild?.firstChild
        let tr = document.createElement('tr')
        weekDays.forEach((wd) => {
            let th = document.createElement('th')
            th.textContent = wd
            tr.appendChild(th)
        })
        antdCalendar?.firstChild?.replaceChild(tr, trOld!)
    }

    getListData = (value: Dayjs, appointments: Array<any>) => {
        let listData: BadgeMessage[] = [];
        console.log('########################')
        appointments.map((ap) => {
            console.log('date: ', value.date())
            console.log('month: ', value.month())
            console.log('year: ', value.year())
            console.log('ap.date: ', ap.date.slice(0, 2))
            console.log('ap.month: ',ap.date.slice(3, 5))
            console.log('ap.year: ', ap.date.slice(6))
            console.log('============')
            if(value.date() == parseInt(ap.date.slice(0, 2)) && (value.month() + 1) == parseInt(ap.date.slice(3, 5)) 
            && value.year() == parseInt(ap.date.slice(6))){
                listData = [
                    {type: 'success', content: ''}
                ]
            }
        })
        return listData;
    }

    dateCellRender = (appointments: Array<any>) => (value: Dayjs) => {
        const listData = this.getListData(value, appointments);
        return (
            <ul className="events" style={{
                listStyleType: 'none',
                paddingInlineStart: 0,
                minHeight: 40
            }}>
                {listData.map(item => (
                    <li key={item.content}>
                        <Badge status={(item.type as BadgeStatus)} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    }

    getMonthData = (value: Dayjs) => {
        if (value.month() === 8) {
            return 1394;
        }
    }

    render() {
        const { isLoading, locale } = this.state
        const appointments = this.studentRepo.appointments!
        console.log('appointments', appointments)
        return (
            <>
                <Header
                    title='Calendário'
                    backgroundColor={Colors.secundaryColor}
                />
                <Container>
                    {!isLoading ? <ScrollableCardBody>
                        <Calendar
                            fullscreen={true}
                            // headerRender={() => <div></div>}
                            locale={localePT.Calendar as PickerLocale}
                            dateCellRender={this.dateCellRender(appointments)}
                        />
                        <Divider />
                        {(appointments != null && appointments.length > 0) ?
                            appointments.map((ap) => <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                marginTop: '24px',
                                border: `1px solid ${Colors.secundaryColor}`,
                                borderRadius: '7px',
                                padding: '16px',
                                paddingBottom: '0px',
                                width: '100%'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                    width: '100%'
                                }}>
                                    <span style={{
                                        fontSize: 18,
                                        color: Colors.lightTextColor,
                                        fontFamily: 'NexaBold',
                                    }}>{ap.title}</span>
                                    <span >{ap.date}</span>
                                </div>
                                <div style={{
                                    marginLeft: 8,
                                    fontSize: 16,
                                    whiteSpace: 'normal'
                                }}>
                                    <p>{ap.description.split(' ').map((text: string) => {
                                        if (text.includes('http')) {
                                            return <a target="_blank" rel="noopener noreferrer" href={text}>{text}</a>
                                        } else {
                                            return <span>{text + ' '}</span>
                                        }

                                    })}</p>
                                </div>
                            </div>) : <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '24px 0 16px 0',
                            width: '100%',
                        }}><span>Vazio</span>
                        </div>
                        }
                        {/* {reviews.map(
                            (review) => <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    margin: '16px 0 8px 0',
                                    width: '100%'
                                }}>
                                <ReviewCard
                                    review={review}
                                />
                            </div>
                        )} */}

                    </ScrollableCardBody>
                        : <div
                            style={{
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <ReactLoading type='bubbles' color={Colors.secundaryColor} />
                        </div>
                    }
                </Container>
            </>

        )
    }


}

export default withRouter(CalendarScene);
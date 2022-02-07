import { InsertChart, RateReview, Today, Subject, Help, AccessTime, LooksOne } from '@material-ui/icons';
import { Card, DatePicker, Input, Select } from 'antd';
import { PercentageOutlined } from '@ant-design/icons'
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Colors from '../../../utils/colors';
import moment from 'moment';
import DateUtils from '../../../utils/date';
import './styles.css'
import { Review } from '..';

const { TextArea } = Input


const ReviewRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px 4px 16px 4px
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 8px 4px 16px 4px
`

const RowText = styled.span`
    font-size: 18px;
    color: ${Colors.lightTextColor};
    font-weight: bold;
    margin-left: 16px
`



interface EditReviewCardProps {
    review: Review
    setState: (state: any) => void,
}


const { Option } = Select

export const EditReviewCard: React.FC<EditReviewCardProps> = ({ review, setState }) => {

    let { title, date, percentage, type, rightQuestions, questions, theme } = review

    // const splittedDate = date.split('/')

    // date = splittedDate[1] + '/' + splittedDate[0] + '/' + splittedDate[2]

    // const dateNow = new Date()
    // const dateNowString = dateNow.getDate() + '/' + dateNow.getMonth() + '/' + dateNow.getFullYear()

    // const defaultDate = DateUtils.isValidDate(date) && date != 'Invalid date' ?
    //     new Date(date + ' GMT-0300').getDate() + '/' + (new Date(date + ' GMT-0300').getMonth() + 1) + '/' + new Date(date + ' GMT-0300').getFullYear()
    //     : dateNowString

    // if (defaultDate == dateNowString && !DateUtils.isValidDate(date)) {
    //     setState({ title, date: defaultDate, percentage, type: 'simulado', rightQuestions, questions })
    // }

    return <Card
        style={{
            width: '90%',
            borderRadius: '7px',
            backgroundColor: '#fff'
        }}
        bodyStyle={{
            padding: '8px 16px 0 16px',
            height: '100%',
            color: Colors.primaryColor
        }}
    >

        {type == 'redacao' && <><Row>
            <label style={{ flex: 2, fontSize: '16px' }} htmlFor='grade'>Nota</label>
            <Input
                id="grade"
                placeholder='800'
                style={{ flex: 1, fontSize: '18px', borderRadius: '4px' }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let newReview = review
                    newReview.questions = e.target.value
                    setState(newReview)
                }}
                value={questions}
            />
        </Row>

            <Row>
                <label style={{ flex: 2, fontSize: '16px' }} htmlFor='theme'>Tema</label>
                <Input
                    id="theme"
                    placeholder='Política'
                    style={{ flex: 1, fontSize: '18px', borderRadius: '4px' }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        let newReview = review
                        newReview.theme = e.target.value
                        console.log('change review :', newReview)
                        setState(newReview)
                    }}
                    value={theme}
                />
            </Row>
        </>}
        {type != 'redacao' && <><Row>
            <label style={{ flex: 2, fontSize: '16px' }} htmlFor='questions'>Questões resolvidas</label>
            <Input
                id="questions"
                placeholder='60'
                style={{ flex: 1, fontSize: '18px', borderRadius: '4px' }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let newReview = review
                    newReview.questions = e.target.value
                    newReview.percentage = (parseInt(newReview.questions) > 0 && parseInt(newReview.rightQuestions) > 0) ?
                        ((parseInt(newReview.rightQuestions) * 100) / parseInt(newReview.questions)).toFixed(2)
                        : '0'
                    setState(newReview)
                }}
                value={questions}
            />
        </Row>

            <Row>
                <label style={{ flex: 2, fontSize: '16px' }} htmlFor='rightQuestions'>Questões certas revisão</label>
                <Input
                    id="rightQuestions"
                    placeholder='40'
                    style={{ flex: 1, fontSize: '18px', borderRadius: '4px' }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        let newReview = review
                        newReview.rightQuestions = e.target.value
                        newReview.percentage = (parseInt(newReview.questions) > 0 && parseInt(newReview.rightQuestions) > 0) ?
                            ((parseInt(newReview.rightQuestions) * 100) / parseInt(newReview.questions)).toFixed(2)
                            : '0'
                        console.log('change review :', newReview)
                        setState(newReview)
                    }}
                    value={rightQuestions}
                />
            </Row>
            <Row>
                <label style={{ flex: 2, fontSize: '16px' }} htmlFor='reviewPercentage'>% de acerto revisão</label>
                <Input
                    id="reviewPercentage"
                    readOnly={true}
                    placeholder={type != 'redacao' ? '80' : '700'}
                    style={{ flex: 1, fontSize: '18px', borderRadius: '4px' }}
                    value={percentage + '%'}
                />
            </Row>
        </>
        }
    </Card>
}
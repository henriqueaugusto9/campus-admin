import Icon from '@material-ui/core/Icon';
import { Assignment, AssignmentTurnedIn, CameraAlt, Delete, Help, InsertChart, Instagram, Subject } from '@material-ui/icons';
import { Card, Input } from 'antd';
import React from 'react';
import ReactLoading from 'react-loading';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Review } from '../scenes/EditReviewScene';
import Colors from '../utils/colors';

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

interface ReviewCardProps {
    review: Review,
    handleDelete: () => void
}


export const ReviewCard: React.FC<ReviewCardProps> = ({ review: {
    id,
    title,
    type,
    percentage,
    questions,
    rightQuestions,
    theme,
    classID }, handleDelete }) => {

    const history = useHistory()

    type = type ?? ''

    const getTypeText = (type: string) => {
        switch (type) {
            case 'redacao':
                return 'Redação'
            case 'exercicios':
                return 'Exercícios'
            case 'simulado':
                return 'Simulado'
            default:
                return ' - '
        }
    }

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
        {type == 'redacao' && <>
            <ReviewRow>
                <label style={{ flex: 2, fontSize: '16px' }} htmlFor='grade'>Nota</label>
                <Input
                    id="grade"
                    placeholder='60'
                    readOnly={true}
                    style={{ flex: 1, fontSize: '18px', borderRadius: '4px', }}
                    value={questions}
                />

            </ReviewRow>
            <Row>
                <label style={{ flex: 2, fontSize: '16px' }} htmlFor='theme'>Tema</label>
                <Input
                    id="theme"
                    placeholder='40'
                    readOnly={true}
                    style={{ flex: 1, fontSize: '18px', borderRadius: '4px' }}
                    value={theme}
                />
            </Row>
        </>}
        {type != 'redacao' && <>
            <ReviewRow>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <label style={{ flex: 2, fontSize: '16px' }} htmlFor='questions'>Questões resolvidas</label>
                    <Input
                        id="questions"
                        placeholder='60'
                        readOnly={true}
                        style={{ flex: 1, fontSize: '18px', borderRadius: '4px', }}
                        value={questions}
                    />
                </div>

            </ReviewRow>
            <Row>
                <label style={{ flex: 2, fontSize: '16px' }} htmlFor='rightQuestions'>Questões certas revisão</label>
                <Input
                    id="rightQuestions"
                    placeholder='40'
                    readOnly={true}
                    style={{ flex: 1, fontSize: '18px', borderRadius: '4px' }}
                    value={rightQuestions}
                />
            </Row>
            <Row>
                <label style={{ flex: 2, fontSize: '16px' }} htmlFor='percentage'>% de acerto revisão</label>
                <Input
                    id="percentage"
                    readOnly={true}
                    placeholder={type != 'redacao' ? '80' : '700'}
                    style={{ flex: 1, fontSize: '18px', borderRadius: '4px' }}
                    value={percentage + '%'}
                />
            </Row>
        </>}
        <Row style={{ justifyContent: 'flex-end' }}>
            <Delete style={{ color: 'red' }} onClick={() => handleDelete()} />
        </Row>
    </Card>
}

interface ProfileCardProps {
    info: Array<any>,
    isLoading: boolean
}

// const MaterialIcon = ({ icon }: { icon: string }) => {
//     let resolved = require(`@material-ui/icons/${icon}`).default

//     if (!resolved) {
//         throw Error(`Could not find @material-ui/icons/${icon}`)
//     }

//     return React.createElement(resolved)
// }

export const ProfileInfoCard: React.FC<ProfileCardProps> = ({ info, isLoading }) => {

    return <Card
        loading={isLoading}
        style={{
            marginTop: '16px',
            width: '90%',
            borderRadius: '7px',
            backgroundColor: '#fff'
        }}
        bodyStyle={{
            padding: '8px 16px 0 16px',
            height: '100%',
            color: Colors.secundaryAccentColor
        }}
    >
        {(info != null && info.length > 0) && info.map((row) =>
            <Row>
                {row.icon != 'instagram' ? <Icon>{row.icon}</Icon> : <Instagram />}
                <RowText>{row.text}</RowText>
            </Row>
        )
        }

    </Card>
}

interface ProfileImageCardProps {
    image: string
    isLoading: boolean
    onEditImage: (e: any) => void
}

export const ProfileImageCard: React.FC<ProfileImageCardProps> = ({ image, isLoading, onEditImage }) => {


    return <Card
        style={{
            marginTop: '16px',
            width: '90%',
            borderRadius: '7px',
            backgroundColor: '#fff'
        }}
        bodyStyle={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            padding: '0px 16px 0 16px',
            minHeight: '100px',
            height: '100%',
            color: Colors.secundaryAccentColor
        }}
    >
        {isLoading ?
            <div style={{
                marginTop: 16,
                height: 124,
                width: 124,
            }}><ReactLoading type='bubbles' color={Colors.secundaryAccentColor} /> </div> :
            <>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', padding: '16px 0 16px 0'
                }}>

                    <div style={{
                        height: 124,
                        width: 124,
                        borderRadius: '50%',
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat'
                    }}
                    >

                    </div>
                    <label style={{ marginTop: -24, marginLeft: 2, }} htmlFor="icon-button-file">
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 32, width: 32, backgroundColor: '#fff', borderRadius: '50%' }}>
                            <CameraAlt /></div>
                    </label>
                </div>

                <input accept='image/*' id='icon-button-file' type='file' hidden onChange={onEditImage} />

            </>
        }
    </Card>
}
import Icon from '@material-ui/core/Icon';
import { Instagram } from '@material-ui/icons';
import { Card, Input } from 'antd';
import { resolve } from 'inversify-react';
import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { StaticContext, withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { Error, Header, SubmitButton } from '../../components';
import StudentService from '../../services/StudentService';
import Colors from '../../utils/colors';
import { Container, Row } from './components';

type ProfileInfo = {
    icon: string,
    text: string,
    name: string
}

interface EditProfileLocationState {
    profile: {
        picture: {
            image: string
        },
        info: Array<ProfileInfo>
    },

}


class EditProfileScene extends Component<RouteComponentProps<{}, StaticContext, EditProfileLocationState>> {


    @resolve(StudentService) private studentServ!: StudentService

    state = {
        profile: {
            picture: {
                image: ''
            },
            info: new Array<ProfileInfo>()
        },
        isLoading: true,
        isSubmitLoading: false,
        error: {
            type: '',
            showError: false,
            message: ''
        },
    }

    componentDidMount() {
        let profile = this.props.location.state.profile
        console.log('profile: ', profile)
        this.setState({ profile, isLoading: false })
    }

    onChangeField = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        let { profile } = this.state
        profile.info[index].text = e.target.value
        this.setState({ profile })
    }

    handleSubmit = async () => {
        this.setState({ isSubmitLoading: true })
        const { profile } = this.state

        const result = await this.studentServ.editProfile({ profile: profile.info })
        if (result) {
            this.props.history.goBack()
        } else {
            this.setState({
                error: {
                    type: 'UNKNOWN',
                    showError: true,
                    message: 'Ocorreu um erro inesperado. Tente novamente mais tarde'
                }
            })
        }

        this.setState({ isSubmitLoading: false })
    }

    render() {
        const { isLoading, profile, error, isSubmitLoading } = this.state
        return <>
            <Header
                canGoBack={true}
                backgroundColor={Colors.secundaryAccentColor}
                goBackTo={'profile'}
                title='Editar perfil'
            />
            {
                !isLoading && <Container>
                    {error.showError && <Error>{error.message}</Error>}
                    <Card
                        style={{
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
                        {(profile.info != null && profile.info.length > 0)
                            && profile.info.map((row: ProfileInfo, index: number) => <Row>
                                {row.icon != 'instagram' ? <Icon>{row.icon}</Icon> : <Instagram />}
                                <Input
                                    style={{ marginLeft: '16px', fontSize: '18px', borderBottom: '1px solid #707070' }}
                                    onChange={this.onChangeField(index)}
                                    value={row.text} bordered={false}
                                />
                            </Row>)}
                        {/* <ProfileRow>
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <Person />
                                <Input
                                    placeholder='Nome Completo'
                                    style={{ marginLeft: '16px', fontSize: '18px', borderBottom: '1px solid #707070' }}
                                    onChange={this.onChangeName}
                                    value={profile.info.name} bordered={false}
                                />
                            </div>
                        </ProfileRow>
                        <Row>
                            <Email />
                            <Input
                                placeholder='E-mail'
                                style={{ marginLeft: '16px', fontSize: '18px', borderBottom: '1px solid #707070' }}
                                onChange={this.onChangeEmail}
                                value={profile.info.email} bordered={false}
                            />

                        </Row>
                        <Row>
                            <Instagram />
                            <Input
                                placeholder='Instagram'
                                style={{ marginLeft: '16px', fontSize: '18px', borderBottom: '1px solid #707070' }}
                                onChange={this.onChangeGeneralProfile}
                                value={profile.info.generalProfile} bordered={false}
                            />

                        </Row>
                        <Row>
                            <Flag />
                            <Input
                                placeholder='Meta'
                                style={{ marginLeft: '16px', fontSize: '18px', borderBottom: '1px solid #707070' }}
                                onChange={this.onChangeMainGoal}
                                value={profile.info.mainGoal} bordered={false}
                            />

                        </Row>
                        <Row>
                            <PhoneIphone />
                            <Input
                                placeholder='Celular'
                                style={{ marginLeft: '16px', fontSize: '18px', borderBottom: '1px solid #707070' }}
                                onChange={this.onChangePhoneNumber}
                                value={profile.info.phoneNumber} bordered={false}
                            />

                        </Row>
                        <Row>
                            <LocationCity />
                            <Input
                                placeholder='Cidade'
                                style={{ marginLeft: '16px', fontSize: '18px', borderBottom: '1px solid #707070' }}
                                onChange={this.onChangeCity}
                                value={profile.info.city} bordered={false}
                            />

                        </Row> */}
                    </Card>
                    <SubmitButton style={{ color: Colors.secundaryAccentColor }} onClick={!isSubmitLoading ? this.handleSubmit : () => { }} >
                        {!isSubmitLoading ? "Salvar" :
                            <ReactLoading type='bubbles' color={Colors.secundaryAccentColor} width={24} height={24} />} </SubmitButton>
                </Container>
            }

            {
                isLoading && <div
                    style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <ReactLoading type='bubbles' color={Colors.secundaryAccentColor} />
                </div>
            }
        </>
    }


}

export default withRouter(EditProfileScene)
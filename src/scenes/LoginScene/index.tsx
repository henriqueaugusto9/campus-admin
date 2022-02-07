import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Button, Card, Image } from 'antd'
import { Link } from 'react-router-dom'
import { TextField } from '../../components'
import { ButtonContainer, Container, DiagonalContainer, ErrorMessage, InputContainer, LogoContainer } from './components'
import StudentService from '../../services/StudentService'
import { resolve } from 'inversify-react'
import ReactLoading from 'react-loading';
import { Tabs } from '../../utils/tabs';
import Colors from '../../utils/colors'


const windowHeight = window.innerHeight
const windowWidth = window.innerWidth

enum Mode {
    LOGIN,
    RESET_PASSWORD
}

class LoginScene extends Component<RouteComponentProps> {


    @resolve(StudentService) private studentServ!: StudentService

    state = {
        email: '',
        password: '',
        showError: false,
        isLoading: false,
        mode: Mode.LOGIN
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        if (token != null) {
            this.props.history.replace('/home', { tab: Tabs.HOME })
        }
    }

    onSubmitLogin = async () => {
        this.setState({ isLoading: true })
        const { email, password } = this.state
        const isLogged = await this.studentServ.login({ email, password })
        if (isLogged) {
            this.props.history.replace('/home', { tab: Tabs.HOME })
        } else {
            localStorage.clear()
            this.setState({ showError: true })
        }
        this.setState({ isLoading: false })
    }

    onSubmitRecovery = async () => {
        this.setState({ isLoading: true })
        const { email } = this.state

        const result = await this.studentServ.resetPassword({ email })

        console.log('recovery: ', result)

        this.setState({ isLoading: false })
    }

    onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ email: e.target.value })
    }

    onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ password: e.target.value })
    }

    render() {
        const { showError, isLoading, mode } = this.state
        return (
            <Container>
                <DiagonalContainer></DiagonalContainer>
                <Card style={{
                    height: `${windowWidth < 768 ? '60%' : '70%'}`,
                    width: `${windowWidth < 768 ? '80%' : '50%'}`, borderRadius: '7px',
                    marginTop: `-${windowHeight < 920 ? '256' : windowHeight * 0.35}px`
                }} bodyStyle={{
                    display: 'flex',
                    height: '100%',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    padding: '16px',
                    backgroundColor: '#f7bf50',
                    borderRadius: '7px'
                }}>

                    <LogoContainer>
                        <Image
                            width={mode == Mode.RESET_PASSWORD ? 200 : 150}
                            src={process.env.PUBLIC_URL + '/images/GABARITA_VERTICAL_BRANCA_ROXA.png'}
                        />
                    </LogoContainer>
                    {showError && <ErrorMessage>E-mail ou senha incorretos</ErrorMessage>}
                    {mode == Mode.RESET_PASSWORD &&
                        <p style={{ width: '90%', textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>
                            Enviaremos um e-mail para recuperar seu acesso
                            </p>
                    }
                    <InputContainer>
                        {mode == Mode.LOGIN && <>
                            <TextField
                                placeholder='Seu e-mail'
                                type='email'
                                onChange={this.onChangeEmail}
                            />
                            <TextField
                                placeholder='Sua senha'
                                isPassword={true}
                                onChange={this.onChangePassword}
                                onSubmit={this.onSubmitLogin}
                            />
                            <div style={{ width: '100%', textAlign: 'center' }}>
                                <a onClick={() => this.setState({ mode: Mode.RESET_PASSWORD })}>
                                    Esqueci minha senha
                                </a>
                            </div>
                        </>}
                        {mode == Mode.RESET_PASSWORD &&
                            <>
                                <TextField placeholder='Seu e-mail' type='email' onChange={this.onChangeEmail} />
                                <div style={{ width: '100%', textAlign: 'center' }}>
                                    <a onClick={() => this.setState({ mode: Mode.LOGIN })}>
                                        Voltar
                                    </a>
                                </div>
                            </>
                        }
                    </InputContainer>
                    <ButtonContainer>
                        {mode == Mode.LOGIN &&
                            <Button
                                onClick={isLoading ? () => { } : this.onSubmitLogin}
                                style={{ borderRadius: '8px', backgroundColor: Colors.primaryColor, borderColor: 'transparent', fontWeight: 'bold' }}
                                size='large'
                                type='primary'>
                                {
                                    isLoading ? <ReactLoading type='bubbles' color='#fff' height={24} width={24} /> :
                                        'Entrar'
                                }
                            </Button>
                        }
                        {mode == Mode.RESET_PASSWORD &&
                            <Button
                                onClick={isLoading ? () => { } : this.onSubmitRecovery}
                                style={{ borderRadius: '8px', backgroundColor: Colors.primaryColor, borderColor: 'transparent', fontWeight: 'bold' }}
                                size='large'
                                type='primary'>{
                                    isLoading ? <ReactLoading type='bubbles' color='#fff' height={24} width={24} /> :
                                        'Recuperar Senha'
                                }
                            </Button>
                        }
                    </ButtonContainer>
                </Card>
            </Container>
        )
    }

}

export default withRouter(LoginScene);
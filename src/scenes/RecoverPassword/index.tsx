import React, { useState } from 'react'
import { ButtonContainer, InputContainer, LogoContainer } from '../LoginScene/components'
import { Container, DiagonalContainer } from "./components"
import { Button, Card, Image } from 'antd'
import { TextField } from '../../components'
import { useHistory, useParams } from 'react-router'
import Colors from '../../utils/colors'
import ReactLoading from 'react-loading';
import AuthAPI from '../../api/auth'


const windowHeight = window.innerHeight
const windowWidth = window.innerWidth


const RecoveryPasswordScene: React.FC = () => {

    const { token }: { token: string } = useParams();
    const history = useHistory();
    const [isLoading, setIsLoadingState] = useState(false)
    const [password, setPasswordState] = useState('')
    const [confirmPassword, setConfirmPasswordState] = useState('')

    const onSubmitRecovery = async () => {
        setIsLoadingState(true)

        if(password == confirmPassword){
            const result = await AuthAPI.changePassword(token, password)
            console.log('change: ', result)
            history.replace('/login')
        }

        setIsLoadingState(false)
    }

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
                        width={200}
                        src={process.env.PUBLIC_URL + '/images/GABARITA_VERTICAL_BRANCA_ROXA.png'}
                    />
                </LogoContainer>
                <InputContainer>
                    <TextField
                        placeholder='Sua senha'
                        isPassword={true}
                        onChange={(e) => setPasswordState(e.target.value)}
                    />
                    <TextField
                        placeholder='Confirme sua senha'
                        isPassword={true}
                        onChange={(e) => setConfirmPasswordState(e.target.value)}
                    />
                </InputContainer>

                <ButtonContainer>
                    <Button
                        onClick={isLoading ? () => { } : onSubmitRecovery}
                        style={{ borderRadius: '8px', backgroundColor: Colors.primaryColor, borderColor: 'transparent', fontWeight: 'bold' }}
                        size='large'
                        type='primary'>{
                            isLoading ? <ReactLoading type='bubbles' color='#fff' height={24} width={24} /> :
                                'Recuperar Senha'
                        }
                    </Button>
                </ButtonContainer>
            </Card>
        </Container>
    )
}

export default RecoveryPasswordScene;
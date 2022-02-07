import styled from 'styled-components'
import Colors from '../../../utils/colors'


export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

export const DiagonalContainer = styled.div`
    height: 50%;
    width: 100%;
    background-color: ${Colors.primaryColorLight};
    margin-bottom: 64px; 
`

export const LogoContainer = styled.div`
    margin: 32px 0 32px 0;
`

export const InputContainer = styled.div`
    width: 90%
`

export const ButtonContainer = styled.div`
    margin-top: 32px;
    margin-bottom: 32px
`

export const ErrorMessage = styled.span`
    color: #ff0000;
    
`
import styled from 'styled-components'
import Colors from '../../../utils/colors'

export const Container = styled.div`
    display: flex;
    position: fixed;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
`

export const ScrollableCardBody = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 16px; 
    padding-top: 32px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        width: 0px;
    }
`
import styled from 'styled-components'
import Colors from '../../../utils/colors'


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 100%;
    margin: 0 16px 56px 16px;
    padding: 32px 0 32px 0;
    overflow-y: scroll;
`

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background: ${Colors.primaryColor};
    /* background: linear-gradient(
    90deg,
    rgba(253, 133, 23, 1) 0%,
    rgba(255, 191, 31, 1) 100%
    ); */
    width: 100%;
    min-height: 35%;
`

export const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 24px 0 24px 0;
`

export const UserContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 0 16px 0 16px;
`

export const UserGreetingsContainer = styled.div`
    display: flex;
    flex: 1;
    margin-bottom: 16px;
    flex-direction: column;
    line-height: 0.5;
    padding-left: 16px;
`

export const UserGreetings = styled.span`
    color: #fff;
    font-size: 20px;
    font-family: 'NexaBold';
    line-height: 1;
`

export const UserGreetingsSub = styled.span`
    font-size: 14px;
    line-height: 0.9;
`

export const UserGoalContainer = styled.div`
    position: fixed;
    display: flex;
    margin-top: -8px;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
`

export const UserGoalText = styled.span`
    font-weight: 900;
    font-size: 14px;
    padding: 4px;
    color: white;
`

export const ScrollableCardBody = styled.div`
    height: 95%;
    padding-bottom: 32px; 
    overflow-y: scroll;
`
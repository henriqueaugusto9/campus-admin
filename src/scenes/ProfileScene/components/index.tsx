import styled from 'styled-components';
import Colors from '../../../utils/colors';

export const Container = styled.div`
    display: flex;
    position: fixed;
    top: 69px;
    bottom: 56px;
    padding-top: 1px;
    padding-bottom: 32px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        width: 0px;
    }
`

export const ProfileHeader = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify: 'center';
    margin-bottom: 16px;
    height: 70px;
    background: ${Colors.primaryColor};
`

export const LogoutButton = styled.div`
    margin: 32px 16px 16px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    width: 90%;
    height: 64px;
    border-radius: 7px;
    color: ${Colors.secundaryAccentColor};
    font-weight: bold;
    font-family: NexaBold;
    font-size: 24px;
    background-color: #fff;
`
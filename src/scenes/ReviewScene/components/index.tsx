import styled from 'styled-components';
import Colors from '../../../utils/colors';

export const Container = styled.div`
    display: flex;
    position: fixed;
    top: 69px;
    bottom: 0px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`

export const ReviewHeader = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify: 'center';
    margin-bottom: 16px;
    height: 70px;
    background: ${Colors.primaryColor};
`

export const ScrollableCardBody = styled.div`
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        width: 0px;
    }
`
import styled from 'styled-components';


export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #fff;
    overflow-y: scroll;
    margin-top: 44px;
`


export const WeekAssignmentContainer = styled.div`
    display: flex; 
    flex-direction: row; 
    justify-content: space-between; 
    align-items: center; 
    margin: 8px 4px 8px 4px
`

export const ScrollableCardBody = styled.div`
    height: 100%;
    width: 100%;
    padding: 16px 0;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        width: 0px;
    }
`

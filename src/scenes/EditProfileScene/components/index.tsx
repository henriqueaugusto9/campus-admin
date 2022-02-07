import styled from 'styled-components'
import Colors from '../../../utils/colors'

export const Container = styled.div`
    display: flex;
    position: fixed;
    top: 69px;
    bottom: 56px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 32px 0 0 0;
`

export const ProfileRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px 4px 16px 4px
`

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 4px 16px 4px
`

export const RowText = styled.span`
    font-size: 18px;
    color: ${Colors.lightTextColor};
    font-weight: bold;
    margin-left: 16px
`

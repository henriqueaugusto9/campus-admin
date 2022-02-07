import React from 'react';
import styled from 'styled-components'
import { Add, ChevronLeft } from '@material-ui/icons'
import Colors from '../utils/colors';
import { useHistory } from 'react-router-dom';
import { Tabs } from '../utils/tabs';

export const Container = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px;
`

export const HeaderTitle = styled.span`
    font-size: 24px;
    font-weight: bold;
    color: #fff;
`

export const CenteredTitle = styled.span`
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
`

interface HeaderProps {
    backgroundColor?: string
    canGoBack?: boolean
    goBackTo?: string
    color?: string
    title: string
    suffixComponent?: JSX.Element
}

export const Header: React.FC<HeaderProps> = ({ backgroundColor = Colors.primaryColor, color = '#fff', canGoBack = false, goBackTo, title, suffixComponent }) => {

    const history = useHistory()

    const goBack = () => {
        if (goBackTo != null) {
            let tab = Tabs.HOME
            switch (goBackTo) {
                case 'home':
                    tab = Tabs.HOME
                    break;
                case 'calendar':
                    tab = Tabs.REVIEW
                    break;
                case 'progress':
                    tab = Tabs.PROGRESS
                    break;
                case 'profile':
                    tab = Tabs.PROFILE
                    break;
                default:
                    tab = Tabs.HOME
                    break
            }
            history.goBack()
            history.replace('home', { tab })
        } else {
            history.goBack()
        }
    }

    return <Container id="header" style={{ backgroundColor }}>
        {canGoBack && <ChevronLeft onClick={() => goBack()} style={{
            fontSize: '40px', fontWeight: 'bold', color: color,
        }} />}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <HeaderTitle style={canGoBack && !suffixComponent ? { marginRight: '40px' } : (!canGoBack && suffixComponent) ? { marginLeft: '40px' } : {}}>{title}</HeaderTitle>
        </div>
        {suffixComponent != null && suffixComponent}
    </Container>
}




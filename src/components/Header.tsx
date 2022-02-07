import React from 'react';
import styled from 'styled-components'
import { Add, ChevronLeft } from '@material-ui/icons'
import Colors from '../utils/colors';
import { useHistory } from 'react-router-dom';
import { Tabs } from '../utils/tabs';
import { FaWhatsapp } from 'react-icons/fa';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import { useInjection } from 'inversify-react';
import { AppRepository } from '../repositories/AppRepository';

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
    onGoBack?: () => void
    color?: string
    title: string
    suffixComponent?: JSX.Element,
}

export const Header: React.FC<HeaderProps> = (
    { backgroundColor = Colors.primaryColor,
        color = '#fff',
        canGoBack = false,
        goBackTo,
        onGoBack = () => { },
        title,
        suffixComponent
    }
) => {

    const history = useHistory()
    const appRepo = useInjection(AppRepository)

    const goBack = () => {
        onGoBack()
        if (goBackTo != null) {
            let tab = Tabs.CONSTRUCTION
            switch (goBackTo) {
                case 'home':
                    tab = Tabs.CONSTRUCTION
                    break;
                case 'review':
                    tab = Tabs.PROGRESS
                    break;
                case 'progress':
                    tab = Tabs.FINANCIAL
                    break;
                case 'profile':
                    tab = Tabs.CALENDAR
                    break;
                default:
                    tab = Tabs.CONSTRUCTION
                    break
            }
            history.replace('home', { tab })
        } else {
            history.goBack()
        }
    }

    return <Container id="header" style={{ backgroundColor }}>
        {canGoBack && <ChevronLeft onClick={() => goBack()} style={{
            fontSize: '40px', fontWeight: 'bold', color: color,
        }} />}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'left' }}>
            <HeaderTitle style={canGoBack || !suffixComponent ? { marginRight: '40px' } : suffixComponent ? { marginLeft: 0 } : {}}>{title}</HeaderTitle>
        </div>
        {suffixComponent ?? <div style={{ display: 'flex' }}>
            {appRepo.cityHall && <AccountBalanceIcon style={{ color: '#fff', fontSize: 32, marginRight: 16 }} onClick={() => {
                window.open(appRepo.cityHall!);
            }} />
            }
            <a href='whatsapp://send?phone=5516991387091' style={{ width: 32, height: 32 }}>
                <FaWhatsapp style={{ color: '#fff', fontSize: 32 }} />
            </a>
        </div>}
    </Container>
}




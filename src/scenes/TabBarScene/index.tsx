import { Button, Menu, MenuItem } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Business, CalendarToday, MonetizationOn, TrendingUp, MoreVert, ExitToApp } from '@material-ui/icons';
import { resolve } from 'inversify-react';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { AppRepository } from '../../repositories/AppRepository';
import { Tabs, TabsTitles } from '../../utils/tabs';
import CalendarScene from '../CalendarScene';
import ConstructionScene from '../ConstructionScene';
import FinancialScene from '../FinancialScene';
import ProgressScene from '../ProgressScene';
import { FaWhatsapp } from "react-icons/fa";
import SubscriptionExpired from '../../services/SubscriptionExpired';

const windowHeight = window.innerHeight

class TabBarScene extends Component<RouteComponentProps> {

    state = {
        tab: Tabs.CONSTRUCTION,
        anchor: null
    }

    @resolve(AppRepository) private appRepo!: AppRepository

    componentDidMount() {
        this.appRepo.getUser()
    }

    onChangeTab = async (e: React.ChangeEvent<{}>, tab: Tabs) => {
        await this.appRepo.setTab(tab)
        this.setState({ tab })
    }

    handleMenu = (event: any) => {
        this.setState({ anchor: event.currentTarget })
    }

    handleClose = () => {
        this.setState({ anchor: null })
    }


    render() {
        const tab = this.appRepo.tab!
        const { anchor } = this.state
        return <>

            <div style={{ height: '100%', padding: '56px 0' }}>
                {tab === Tabs.CONSTRUCTION && <ConstructionScene>

                </ConstructionScene>
                }
                {tab === Tabs.PROGRESS && <ProgressScene>

                </ProgressScene>
                }
                {tab === Tabs.FINANCIAL && <FinancialScene>

                </FinancialScene>
                }
                {tab === Tabs.CALENDAR && <CalendarScene>

                </CalendarScene>}

            </div>

            <BottomNavigation
                value={tab}
                showLabels
                onChange={this.onChangeTab}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: '100%',
                    borderTop: '3px solid #f3f3f3',
                    backgroundColor: '#fff',
                }}
            >
                <BottomNavigationAction label="Obra" value={Tabs.CONSTRUCTION} icon={<Business />} />
                <BottomNavigationAction label="Progresso" value={Tabs.PROGRESS} icon={<TrendingUp />} />
                <BottomNavigationAction label="Financeiro" value={Tabs.FINANCIAL} icon={<MonetizationOn />} />
                <BottomNavigationAction label="Calendario" value={Tabs.CALENDAR} icon={<CalendarToday />} />
            </BottomNavigation>
        </>
    }
}

export default withRouter(TabBarScene)
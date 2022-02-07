import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { CalendarToday, EmojiPeople, Home, Report, TrendingUp } from '@material-ui/icons';
import { resolve } from 'inversify-react';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { StudentRepository } from '../../repositories/StudentRepository';
import Colors from '../../utils/colors';
import { Tabs } from '../../utils/tabs';
import HomeScene from '../HomeScene';
import ProfileScene from '../ProfileScene';
import ProgressScene from '../ProgressScene';
import CalendarScene from '../CalendarScene';
import './styles.css'


const windowHeight = window.innerHeight


class TabBarScene extends Component<RouteComponentProps> {

    state = {
        tab: Tabs.HOME
    }

    @resolve(StudentRepository) private studentRepo!: StudentRepository

    onChangeTab = async (e: React.ChangeEvent<{}>, tab: Tabs) => {
        await this.studentRepo.setTab(tab)
        this.setState({ tab })
    }

    render() {
        const tab = this.studentRepo.tab!
        return <div style={{ height: windowHeight }}>
            <BottomNavigation
                value={tab}
                showLabels
                onChange={this.onChangeTab}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    fontFamily: 'Nexa',
                    borderTop: '3px solid #f3f3f3',
                    backgroundColor: '#fff',
                }}
            >
                <BottomNavigationAction label="DES" value={Tabs.HOME} icon={<Home />} />
                <BottomNavigationAction label="Calendário" value={Tabs.REVIEW} icon={<CalendarToday />} />
                <BottomNavigationAction label="Progresso" value={Tabs.PROGRESS} icon={<TrendingUp />} />
                <BottomNavigationAction label="Perfil" value={Tabs.PROFILE} icon={<EmojiPeople />} />
            </BottomNavigation>
            {tab === Tabs.PROFILE && <ProfileScene>

            </ProfileScene>
            }
            {tab === Tabs.REVIEW && <CalendarScene>

            </CalendarScene>
            }
            {tab === Tabs.PROGRESS && <ProgressScene>

            </ProgressScene>
            }
            {tab === Tabs.HOME && <HomeScene>

            </HomeScene>}
        </div>
    }


}

export default withRouter(TabBarScene)
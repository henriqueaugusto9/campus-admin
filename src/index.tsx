import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './utils/setup'
import 'antd/dist/antd.css';
import { Provider as InversifyProvider } from 'inversify-react'
import { Container as UnstatedContainer, Provider as UnstatedProvider } from 'unstated'
import MonitoriaContainer from './utils/container'
import registerServiceWorker from './registerServiceWorker';
import { UNSTATED_CONTAINERS } from './repositories/UnstatedBinds';

import LoginScene from './scenes/LoginScene'
import HomeScene from './scenes/HomeScene'
import SubjectScene from './scenes/SubjectScene';
import ProfileScene from './scenes/ProfileScene'
import CalendarScene from './scenes/CalendarScene';
import TabBarScene from './scenes/TabBarScene'
import EditReviewScene from './scenes/EditReviewScene';
import EditProfileScene from './scenes/EditProfileScene';
import ReviewScene from './scenes/ReviewScene';
import RecoveryPasswordScene from './scenes/RecoverPassword';

class App extends Component {

    state = {
        redirectTo: '/login'
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        if (token != null) {
            this.setState({ redirectTo: '/home' })
        }
    }

    render() {
        return (
            <InversifyProvider container={MonitoriaContainer}>
                <UnstatedProvider inject={MonitoriaContainer.get<UnstatedContainer<any>[]>(UNSTATED_CONTAINERS)}>
                    <Router>
                        <Switch>
                            <Route exact path="/" render={() => <Redirect to={this.state.redirectTo} />} />
                            <Route exact path='/home' component={TabBarScene} />
                            <Route exact path='/login' component={LoginScene} />
                            <Route exact path='/subject' component={SubjectScene} />
                            <Route exact path='/profile' component={ProfileScene} />
                            <Route exact path='/calendar' component={CalendarScene} />
                            <Route exact path='/review' component={ReviewScene} />
                            <Route exact path='/review/edit' component={EditReviewScene} />
                            <Route exact path='/profile/edit' component={EditProfileScene} />
                            <Route exact path='/recuperar-senha/:token' component={RecoveryPasswordScene} />
                        </Switch>
                    </Router>
                </UnstatedProvider>
            </InversifyProvider>)
    }
}

ReactDom.render(<App />, document.getElementById('root'))
registerServiceWorker()
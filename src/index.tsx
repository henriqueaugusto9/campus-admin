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
import HomeScene from './scenes/ProgressScene'
import TabBarScene from './scenes/TabBarScene'
import { WebViewScene } from './scenes/WebViewScene';
import SubscriptionExpired from './services/SubscriptionExpired';
import ImagesScene from './scenes/ImagesScene';

class App extends Component {

    state = {
        redirectTo: '/login'
    }

    componentDidMount() {
        SubscriptionExpired.setIsExpired(false)
        const token = localStorage.getItem('token')
        if (token !== null) {
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
                            <Route exact path='/showPdf/' component={WebViewScene} />
                            <Route exact path='/showSheets/' component={WebViewScene} />
                            <Route exact path='/images/' component={ImagesScene} />
                        </Switch>
                    </Router>
                </UnstatedProvider>
            </InversifyProvider>)
    }
}

ReactDom.render(<App />, document.getElementById('root'))
registerServiceWorker()
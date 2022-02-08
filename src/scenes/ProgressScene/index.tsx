
import { LinearProgress } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { resolve } from 'inversify-react';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { Body, CardComponent, Header, InputRow, Label, LoadingComponent, SubmitButton } from '../../components';
import { AppRepository } from '../../repositories/AppRepository';
import SubscriptionExpired from '../../services/SubscriptionExpired';


const EMPTY_PROGRESS_TYPE = {
    _id: '',
    title: '',
    indexes: new Array<any>()
}

class ProgressScene extends Component<RouteComponentProps>{

    @resolve(AppRepository) private appRepo!: AppRepository

    state = {
        isLoading: true,
        progress: {
            progressTypes: new Array<any>()
        },
        currentlyOpenProgressType: {
            isOpen: false,
            progressType: EMPTY_PROGRESS_TYPE
        }
    }

    async componentDidMount() {
        // const progress = await this.appRepo.getProgress()

        // this.setState({ isLoading: false, progress })

    }

    openProgressType = (progressTypeId: string) => () => {
        const progressType = this.state
            .progress
            .progressTypes
            .find((progressType: any) => progressType._id === progressTypeId)

        this.setState({ currentlyOpenProgressType: { isOpen: true, progressType } })
    }


    render() {
        let { isLoading, progress, currentlyOpenProgressType } = this.state
        return (
            <>
                <Header
                    title={'Recadinho'}
                />
                <Body>

                    <LoadingComponent show={isLoading} />

                    <p>Em breve</p>
                </Body>
            </>

        )
    }


}

export default withRouter(ProgressScene);
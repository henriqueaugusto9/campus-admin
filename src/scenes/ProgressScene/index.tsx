
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
        const progress = await this.appRepo.getProgress()

        this.setState({ isLoading: false, progress })

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
                    canGoBack={currentlyOpenProgressType.isOpen}
                    goBackTo={'progress'}
                    onGoBack={() => this.setState({ currentlyOpenProgressType: { isOpen: false, progressType: EMPTY_PROGRESS_TYPE } })}
                    title={currentlyOpenProgressType.isOpen ? currentlyOpenProgressType.progressType.title : 'Progresso'}
                />
                <Body>
                    <LoadingComponent show={isLoading} />

                    <SubscriptionExpired.Component />
                    {(!isLoading && !SubscriptionExpired.isExpired() && !currentlyOpenProgressType.isOpen) && progress?.progressTypes?.length === 0 &&
                        <div>
                            <h2>Vazio</h2>
                        </div>}
                    {(!isLoading && !currentlyOpenProgressType.isOpen) && progress &&
                        progress.progressTypes && progress.progressTypes.length > 0 &&
                        progress.progressTypes.map((progressType: any, index) => (
                            <CardComponent
                                key={index}
                                onClick={this.openProgressType(progressType._id)}
                            >
                                <InputRow style={{ justifyContent: 'space-between' }}>
                                    <span style={{
                                        fontSize: 22
                                    }}>{progressType.title}</span>
                                    <ArrowForwardIcon />
                                </InputRow>
                                <div>
                                    <LinearProgress variant="determinate" value={progressType.totalPercentage} />
                                    <span>{`${Math.round(
                                        progressType.totalPercentage,
                                    )}%`}
                                    </span>
                                </div>
                            </CardComponent>
                        ))}
                    {(!isLoading && currentlyOpenProgressType.isOpen) && currentlyOpenProgressType.progressType &&
                        currentlyOpenProgressType.progressType.indexes.length > 0 &&
                        currentlyOpenProgressType.progressType.indexes.map((index: any, i) => (
                            <CardComponent key={i}>
                                <h2 style={{
                                    textAlign: 'center'
                                }}>
                                    {index.title}
                                </h2>
                                <div>
                                    <LinearProgress variant="determinate" value={index.percentage} />
                                    <span>{`${Math.round(
                                        index.percentage,
                                    )}%`}
                                    </span>
                                </div>
                                <div style={{
                                    marginTop: '1rem'
                                }}>
                                    <Label style={{ fontSize: '1rem' }}>Comentários</Label>
                                    <p style={{ fontSize: '1rem' }}>{index.description}</p>
                                </div>
                                {index.images?.length > 0 && <SubmitButton
                                    onClick={async () => {
                                        await this.appRepo.setImages(index.images)
                                        this.props.history.push('/images')
                                    }}
                                >
                                    Fotos
                                </SubmitButton>}
                            </CardComponent>
                        ))}
                </Body>
            </>

        )
    }


}

export default withRouter(ProgressScene);
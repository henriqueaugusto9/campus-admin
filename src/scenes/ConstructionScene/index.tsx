
import { resolve } from 'inversify-react';
import _ from 'lodash';
import React, { Component } from 'react';
import { StaticContext, withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import {
    Body, CardComponent, Header, InputColumn, InputRow, Label,
    LoadingComponent,
    SubmitButton,
} from '../../components';
import { ScrollableCardBody } from '../ConstructionScene/components/index'
import { InputContainer } from '../LoginScene/components/index';
import { TextField } from '../../components/index'
import { EMPTY_CONSTRUCTION } from '../../model';
import { AppRepository } from '../../repositories/AppRepository';
import {
    ValueText
} from './components/';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SubscriptionExpired from '../../services/SubscriptionExpired';
import { Height } from '@material-ui/icons';

type LocationState = {
    url?: string,
    images?: Array<any>
}

class ConstructionScene extends Component<RouteComponentProps<{}, StaticContext, LocationState>>{

    @resolve(AppRepository) private appRepo!: AppRepository

    state = {
        isLoading: true,
        id: '',
        construction: new Array(),
        title: '',
        subtitle: '',
        description: '',
    }

    async componentDidMount() {


        const constructions = await this.appRepo.getConstructionData()

        if (constructions !== null) {
            this.setState({ isLoading: false, construction: constructions })
        }
    }

    onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ title: e.target.value })
    }

    onChangeSubtitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ subtitle: e.target.value })
    }

    onChangeDescrition = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ description: e.target.value })
    }

    onSubmitReception = async () => {
        this.setState({ isLoading: true })

        let result = await this.appRepo.addConstructionData(this.state.title, this.state.subtitle, this.state.description)

        if (result != null) {
            const constructions = await this.appRepo.getConstructionData()
            if (constructions !== null) {
                this.setState({ construction: constructions })
            }
            this.setState({ isLoading: false })
        }
    }

    render() {
        const { isLoading, construction } = this.state
        return (
            <>
                <Header
                    title={'Acolhimento'}
                />
                <Body style={{ padding: '16px 16px' }}>
                    <ScrollableCardBody>
                    <p>Cadastrar novo card de acolhimento:</p>

                    <InputContainer>
                        <TextField placeholder='Titulo' onChange={this.onChangeTitle} />
                        <TextField placeholder='Subtitulo' onChange={this.onChangeSubtitle} />
                        <TextField placeholder='Descrição' onChange={this.onChangeDescrition} />

                        {/* <div style={{ width: '100%', textAlign: 'center' }}><Link to='/forgot-password'>Esqueci minha senha</Link></div> */}
                    </InputContainer>

                    <SubmitButton
                        style={{ marginTop: 24 }}
                        onClick={() => { this.onSubmitReception() }}
                    >
                        Cadastrar
                    </SubmitButton>

                    <LoadingComponent show={isLoading} />

                    {(!isLoading) && construction.map(c =>
                        <> <CardComponent>
                            <p>{c.title}</p>
                            <p>{c.subtitle}</p>
                            <p>{c.description.substring(0,150)}...</p>
                        </CardComponent>
                        </>
                    )
                    }
                    </ScrollableCardBody>
                </Body>
            </>
        )
    }
}

export default withRouter(ConstructionScene);
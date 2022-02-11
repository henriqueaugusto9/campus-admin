
import { LinearProgress } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { resolve } from 'inversify-react';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { Body, CardComponent, Header, InputRow, Label, LoadingComponent, SubmitButton } from '../../components';
import { ScrollableCardBody } from "../ProgressScene/components"
import { TextField } from "../../components"
import { InputContainer } from "../LoginScene/components/index"
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
        id: '',
        notes: new Array(),
        description: '',
    }

    async componentDidMount() {

        const notes = await this.appRepo.getNoteData()

        if (notes !== null) {
            this.setState({ isLoading: false, notes: notes })
        }
    }

    onChangeDescrition = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ description: e.target.value })
    }

    onSubmitReception = async () => {
        this.setState({ isLoading: true })

        let result = await this.appRepo.addNoteData(this.state.description)

        if (result != null) {
            const notes = await this.appRepo.getNoteData()
            if (notes !== null) {
                this.setState({ notes: notes })
            }
            this.setState({ isLoading: false })
        }
    }

    render() {
        const { isLoading, notes } = this.state
        return (
            <>
                <Header
                    title={'Recadinho'}
                />
                <Body style={{ padding: '16px 16px' }}>
                    <ScrollableCardBody>
                    <p>Cadastrar novo recadinho:</p>

                    <InputContainer>
                        <TextField placeholder='Descrição' onChange={this.onChangeDescrition} />

                        {/* <div style={{ width: '100%', textAlign: 'center' }}><Link to='/forgot-password'>Esqueci minha senha</Link></div> */}
                    </InputContainer>

                    <SubmitButton
                        style={{ marginTop: 24 }}
                        onClick={() => { this.onSubmitReception() }}
                    >
                        Adicionar recadinho
                    </SubmitButton>

                    <LoadingComponent show={isLoading} />

                    {(!isLoading) && notes.map(c =>
                        <> <CardComponent>
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

export default withRouter(ProgressScene);

import { resolve } from 'inversify-react';
import _ from 'lodash';
import React, { Component } from 'react';
import { StaticContext, withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import {
    Body, CardComponent, Header, InputColumn, InputRow, Label,
    LoadingComponent,
    SubmitButton
} from '../../components';
import { EMPTY_CONSTRUCTION } from '../../model';
import { AppRepository } from '../../repositories/AppRepository';
import {
    ValueText
} from './components/';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SubscriptionExpired from '../../services/SubscriptionExpired';

type LocationState = {
    url?: string,
    images?: Array<any>
}

class ConstructionScene extends Component<RouteComponentProps<{}, StaticContext, LocationState>>{

    @resolve(AppRepository) private appRepo!: AppRepository

    state = {
        isLoading: true,
        id: '',
        construction: EMPTY_CONSTRUCTION,
    }

    async componentDidMount() {


        const constructions = await this.appRepo.getConstructionData()
        if (constructions !== null) {
            this.setState({ isLoading: false, construction: constructions })
        } else {
            this.appRepo.logout()
            this.props.history.replace('/login')
        }
    }

    openPdfLink = (url: string) => {
        window.open(url);
        // this.props.history.push({ pathname: `/showPdf/`, state: { url: url } })
    }

    render() {
        const { isLoading, construction } = this.state
        return (
            <>
                <Header
                    title={'Dados da obra'}
                />
                <Body style={{ padding: '16px 16px' }}>

                    <LoadingComponent show={isLoading} />

                    <SubscriptionExpired.Component />
                    {(!isLoading && !SubscriptionExpired.isExpired()) && <><CardComponent>
                        <InputColumn>
                            <Label>
                                Endereço:
                            </Label>
                            <ValueText>{_.get(construction, 'endereco')}</ValueText>
                        </InputColumn>
                    </CardComponent>
                        <CardComponent>
                            <InputColumn>
                                <Label>
                                    Lote:
                                </Label>
                                <ValueText>{_.get(construction, 'lote')}</ValueText>
                            </InputColumn>

                        </CardComponent>
                        <CardComponent>
                            <InputColumn>
                                <Label>
                                    Quadra:
                                </Label>
                                <ValueText>{_.get(construction, 'quadra')}</ValueText>
                            </InputColumn>

                        </CardComponent>
                        <CardComponent>
                            <InputColumn>
                                <Label>
                                    Proprietário:
                                </Label>
                                <ValueText>{_.get(construction, 'proprietario')}</ValueText>
                            </InputColumn>

                        </CardComponent>
                        <CardComponent>
                            <InputColumn>
                                <Label>
                                    Início Contrato:
                                </Label>
                                <ValueText>{_.get(construction, 'inicioContrato')}</ValueText>
                            </InputColumn>

                        </CardComponent>

                        {_.get(construction, 'docs.ART') !== '' &&
                            <CardComponent onClick={() => this.openPdfLink(_.get(construction, 'docs.ART'))}>
                                <InputRow style={{ justifyContent: 'space-between' }}>
                                    <Label>Art: </Label>
                                    <ArrowForwardIcon />
                                </InputRow>

                            </CardComponent>
                        }{_.get(construction, 'docs.matricula') !== '' &&
                            <CardComponent onClick={() => this.openPdfLink(_.get(construction, 'docs.matricula'))}>
                                <InputRow style={{ justifyContent: 'space-between' }}>
                                    <Label>Matrícula: </Label>
                                    <ArrowForwardIcon />
                                </InputRow>

                            </CardComponent>
                        }{_.get(construction, 'docs.relContribuinte') !== '' &&
                            <CardComponent onClick={() => this.openPdfLink(_.get(construction, 'docs.relContribuinte'))}>
                                <InputRow style={{ justifyContent: 'space-between' }}>
                                    <Label>Rel Contribuinte: </Label>
                                    <ArrowForwardIcon />
                                </InputRow>

                            </CardComponent>
                        }
                        {_.get(construction, 'docs.alana') !== '' &&
                            <CardComponent onClick={() => this.openPdfLink(_.get(construction, 'docs.alana'))}>
                                <InputRow style={{ justifyContent: 'space-between' }}>
                                    <Label>Alvara: </Label>
                                    <ArrowForwardIcon />
                                </InputRow>

                            </CardComponent>
                        }
                        {_.get(construction, 'docs.habiteSe') !== '' &&
                            <CardComponent onClick={() => this.openPdfLink(_.get(construction, 'docs.habiteSe'))}>
                                <InputRow style={{ justifyContent: 'space-between' }}>
                                    <Label>Habite-se: </Label>
                                    <ArrowForwardIcon />
                                </InputRow>
                            </CardComponent>
                        }
                        {_.get(construction, 'docs.projetos') !== '' &&
                            <CardComponent onClick={() => this.openPdfLink(_.get(construction, 'docs.projetos'))}>
                                <InputRow style={{ justifyContent: 'space-between' }}>
                                    <Label>Projetos: </Label>
                                    <ArrowForwardIcon />
                                </InputRow>
                            </CardComponent>
                        }
                         {_.get(construction, 'docs.proposta') !== '' &&
                            <CardComponent onClick={() => this.openPdfLink(_.get(construction, 'docs.proposta'))}>
                                <InputRow style={{ justifyContent: 'space-between' }}>
                                    <Label>Proposta: </Label>
                                    <ArrowForwardIcon />
                                </InputRow>
                            </CardComponent>
                        }
                        {_.get(construction, 'docs.contrato') !== '' &&
                            <CardComponent onClick={() => this.openPdfLink(_.get(construction, 'docs.contrato'))}>
                                <InputRow style={{ justifyContent: 'space-between' }}>
                                    <Label>Contrato: </Label>
                                    <ArrowForwardIcon />
                                </InputRow>
                            </CardComponent>
                        }
                        {_.get(construction, 'docs.bombeiros') !== '' &&
                            <CardComponent onClick={() => this.openPdfLink(_.get(construction, 'docs.bombeiros'))}>
                                <InputRow style={{ justifyContent: 'space-between' }}>
                                    <Label>Bombeiros: </Label>
                                    <ArrowForwardIcon />
                                </InputRow>
                            </CardComponent>
                        }
                          {_.get(construction, 'docs.protocolos') !== '' &&
                            <CardComponent onClick={() => this.openPdfLink(_.get(construction, 'docs.protocolos'))}>
                                <InputRow style={{ justifyContent: 'space-between' }}>
                                    <Label>Protocolos: </Label>
                                    <ArrowForwardIcon />
                                </InputRow>
                            </CardComponent>
                        }
                        {
                            construction.images?.length > 0 &&
                            <CardComponent onClick={async () => {
                                await this.appRepo.setImages(construction.images)
                                this.props.history.push('/images')
                            }}
                            >
                                <InputRow style={{ justifyContent: 'space-between' }}>
                                    <Label>Imagens: </Label>
                                    <ArrowForwardIcon />
                                </InputRow>
                            </CardComponent>
                        }
                    </>}

                    <SubmitButton
                        style={{ marginTop: 64 }}
                        onClick={() => {
                            this.appRepo.logout()
                            this.props.history.replace('/login')
                        }}
                    >
                        Logout
                    </SubmitButton>

                </Body>
            </>
        )
    }
}

export default withRouter(ConstructionScene);
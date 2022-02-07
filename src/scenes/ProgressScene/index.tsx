
import { resolve } from 'inversify-react';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { Header } from '../../components';
import { StudentRepository } from '../../repositories/StudentRepository';
import Colors from '../../utils/colors';
import ReactLoading from 'react-loading';
import { Line, Bar } from 'react-chartjs-2';
import {
    CardTitle,
    ChartCard,
    Container,
    ScrollableCardBody
} from './components/index';
import { Card } from 'antd';

type Progress = {
    title: string,
    date: string,
    percentage: string
}

const defaultDataSets = (label: string, color: string, data: Array<any>) => {
    // return {
    //     label,
    //     fill: false,
    //     lineTension: 0.1,
    //     backgroundColor: 'rgba(75,192,192,0.4)',
    //     borderColor: color,
    //     borderCapStyle: 'butt',
    //     borderDash: [],
    //     borderDashOffset: 0.0,
    //     borderJoinStyle: 'miter',
    //     pointBorderColor: color,
    //     pointBackgroundColor: color,
    //     pointBorderWidth: 1,
    //     pointHoverRadius: 5,
    //     pointHoverBackgroundColor: color,
    //     pointHoverBorderColor: 'rgba(220,220,220,1)',
    //     pointHoverBorderWidth: 2,
    //     pointRadius: 1,
    //     pointHitRadius: 10,
    //     data
    // }
    return {
        label,
        backgroundColor: color,
        borderWidth: 1,
        maxBarThickness: 28,
        data
    }
}


class ProgressScene extends Component<RouteComponentProps>{

    @resolve(StudentRepository) private studentRepo!: StudentRepository

    state = {
        isLoading: true,
        progressDataSets: new Array()
    }

    async componentDidMount() {
        const result = await this.studentRepo.getProgress()
        if (result.progress != null && result.progress.length > 0) {
            let progressDataSets = result.progress.map((p: any) => {
                let data = p.classesGrade.map((classGrade: any) => classGrade.averageGrade)
                let dataSet = defaultDataSets(p.title, Colors.primaryColorLight, data)
                let suggestedMax = p.type == 'redacao' ? 1000 : 100
                let chartData = {
                    labels: p.classesGrade.map((classGrade: any) => {
                        let title = classGrade.title as string
                        if (title.length > 10) {
                            title = title.slice(0, 13) + '...'
                        }
                        return title
                    }),
                    datasets: [
                        dataSet
                    ]
                };
                return { title: p.title, data: chartData, suggestedMax: suggestedMax }
            })

            this.setState({ isLoading: false, progressDataSets })
        } else if (result.progress.length == 0) {
            this.setState({ isLoading: false, progressDataSets: [] })
        }
        else {
            this.props.history.replace('/login')
        }
    }


    render() {
        const { isLoading, progressDataSets } = this.state
        const progress = this.studentRepo.progress!
        return (
            <>
                <Header title='Progresso' backgroundColor={Colors.primaryColorLight} />
                <Container>
                    {
                        (!isLoading && progressDataSets != null && progressDataSets.length > 0) && <ScrollableCardBody>
                            {progressDataSets.map((p: any) => <ChartCard>
                                <CardTitle>{p.title}:</CardTitle>
                                <Bar data={p.data} legend={false} options={{
                                    scales: {
                                        yAxes: [{
                                            display: true,
                                            ticks: {
                                                suggestedMin: 0,
                                                suggestedMax: p.suggestedMax,
                                            }
                                        }]
                                    }
                                }} />
                                {/* <Line data={p.data} legend={false} options={{
                                    scales: {
                                        yAxes: [{
                                            display: true,
                                            ticks: {
                                                suggestedMax: 100,    
                                                // beginAtZero: true   
                                            }
                                        }]
                                    }
                                }} /> */}
                            </ChartCard>)
                            }
                        </ScrollableCardBody>
                    }
                    {
                        (!isLoading && progressDataSets != null && progressDataSets.length == 0) &&
                        <div style={{ height: '100%' }}>
                            <p>Vazio</p>
                        </div>
                    }
                    {
                        isLoading && <div
                            style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                            <ReactLoading type='bubbles' color={Colors.primaryColorLight} />
                        </div>
                    }
                </Container>
            </>

        )
    }


}

export default withRouter(ProgressScene);
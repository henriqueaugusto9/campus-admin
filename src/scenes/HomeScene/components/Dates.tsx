import { resolve } from 'inversify-react';
import React, { Component } from 'react';
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%; 
    margin-top: -16px; 
    padding: 2px;
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 48px;
    height: 48px;
    box-shadow: 0px 0px 4px 0.5px rgba(208,216,243,0.6);
    border-radius: 7px;
    background-color: #fff;
`
interface DatesPropsType {
    startDate: Date
    endDate: Date
}


export const Dates: React.FC<DatesPropsType> = ({ startDate, endDate }) => {

    // console.log(startDate.toUTCString())
    // console.log(endDate.toUTCString())

    let curr = new Date()

    let days = []

    var week = new Array();
    // Starting Monday not Sunday
    curr.setDate((curr.getDate() - curr.getDay() + 1));
    for (var i = 0; i < 7; i++) {
        let date = new Date(curr)
        days.push(
            { weekDay: date.getDay(), day: date.getDate() }
        );
        curr.setDate(curr.getDate() + 1);
    }


    return <Container>
        {
            days.map((d) => {
                // console.log('StartWeekDay: ', startDate.getDate())
                // console.log('endWeekDay: ', endDate.getDate())
                // console.log('Week day: ', d.day)
                // console.log('curr date: ', curr.getDate())
                return <Card
                    style={(d.day >= new Date().getDate()) ? { opacity: 1 } : { opacity: 0.7 }}
                >
                    <span style={{ fontSize: '10px' }}>{['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'][d.weekDay]}</span>
                    <span>{d.day}</span>
                </Card>
            })
        }
    </Container>
}
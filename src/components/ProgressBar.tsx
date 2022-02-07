import React from 'react'
import styled from 'styled-components'

interface ProgressBarPropsType {
    color: string
    completed: string
}

const Container = styled.div`
    height: 4px;
    width: 100%;
    background-color: #e0e0de;
    border-radius: 50px;
`

const Filler = styled.div`
    height: 100%;
    border-radius: inherit;
    text-align: right
`


export const ProgressBar: React.FC<ProgressBarPropsType> = (props) => {

    const { color, completed } = props



    return (
        <Container>
            <Filler style={{
                width: `${completed}%`,
                backgroundColor: color,
            }}></Filler>
        </Container>
    )
}
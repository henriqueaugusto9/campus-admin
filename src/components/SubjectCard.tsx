import React from 'react'
import styled from 'styled-components';
import { Check } from '@material-ui/icons';


const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 4px 0 4px 0;
`

const ImageContainer = styled.div`
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-position: center;
    background-size: cover;
    margin-right: 16px
`

const SubjectContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const CheckboxContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid #727073
`

interface SubjectCardPropsType {
    key: string
    image: string
    title: string
    chapters?: any
    checked: boolean
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void
}

export const SubjectCard: React.FC<SubjectCardPropsType> = ({ key, image, title, chapters, checked, onClick }) => {


    return (
        <Container onClick={onClick} key={key}>
            <ImageContainer style={{ backgroundImage: `url(${image})` }} />
            <SubjectContainer>
                <TextContainer>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#4B484B' }}>
                        {title}
                    </span>
                    {chapters != null && chapters.map((chapter: any, i: number) => <span key={i.toString()} style={{ fontSize: '12px', color: '#4B484B', opacity: '80%', lineHeight: '1' }}>
                        {chapter.chapterTitle}
                    </span>)}
                </TextContainer>
                <CheckboxContainer>
                    {checked && <Check style={{ color: '#727073' }} />}
                </CheckboxContainer>
            </SubjectContainer>
        </Container>
    );

}


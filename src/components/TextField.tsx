import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components'
import Colors from '../utils/colors';

interface TextFieldProps {
    placeholder: string
    isPassword?: boolean
    type?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const windowHeight = window.innerHeight
const windowWidth = window.innerWidth

const TextFieldContainer = styled.div`
    display: flex;
    justify-content: center;
    border: 1px solid #e0eefc;
    border-radius: 24px;
    margin: 8px 0 8px 0;
    background-color: #fff;
    height: ${windowWidth >= 1440 ? '48' : '40'}px;
    width: 100%;

    &:focus-within {
        border: 1px solid #298ce9;
    }

`

export const TextField: React.FC<TextFieldProps> = (props) => {
    const inputProps = { placeholder: props.placeholder, type: props.type, onChange: props.onChange }
    return (
        <TextFieldContainer>
            {!props.isPassword && <Input style={{color: Colors.primaryColorLight, fontSize: 16}}  {...inputProps} bordered={false} />}
            {props.isPassword && <Input.Password style={{color: Colors.primaryColorLight, fontSize: 16}} {...inputProps} bordered={false} visibilityToggle={false} />}
        </TextFieldContainer>
    )
}

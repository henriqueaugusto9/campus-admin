import { Card, CardProps } from "antd";
import React from "react";



export const CardComponent: React.FC<CardProps> = (props) => {
    return <Card
        style={{
            marginTop: '16px',
            width: '100%',
            borderRadius: '7px',
            boxShadow: "5px 4px 2px 0.5px rgba(208, 216, 243, 0.6)",
        }}
        bodyStyle={{
            display: 'flex',
            flexDirection: 'column',
            padding: '4px 16px',
            height: '100%'
        }}
        {...props}
    >
    </Card>
}
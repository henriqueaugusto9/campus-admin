
import ReactLoading from 'react-loading';
import React from 'react'
import Colors from '../utils/colors';



export const LoadingComponent: React.FC<{ show: boolean }> = ({ show }) => {
    return show ? <div
        style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ReactLoading type='spinningBubbles' color={Colors.primaryColorLight} />
    </div> : <></>
}
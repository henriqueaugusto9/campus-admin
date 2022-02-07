import React from 'react'
import styled from 'styled-components';
import Colors from '../../../utils/colors';
import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generateCalendar from 'antd/lib/calendar/generateCalendar';
import 'antd/lib/calendar/style';

export const Container = styled.div`
    display: flex;
    position: fixed;
    top: 69px;
    bottom: 56px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`

export const ReviewHeader = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify: 'center';
    margin-bottom: 16px;
    height: 70px;
    background: ${Colors.primaryColor};
`

export const ScrollableCardBody = styled.div`
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    padding: 16px;
    ::-webkit-scrollbar {
        width: 0px;
    }
`

export const Calendar = generateCalendar<Dayjs>(dayjsGenerateConfig);

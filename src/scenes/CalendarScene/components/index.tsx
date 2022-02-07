import styled from 'styled-components';
import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generateCalendar from 'antd/lib/calendar/generateCalendar';
import 'antd/lib/calendar/style';

export const Container = styled.div`
    display: flex;
    position: fixed;/*  */
    top: 69px;
    bottom: 56px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 100%;
    margin: 0 16px 0px 16px;
    padding: 32px 0 32px 0;
    overflow-y: hidden;
`

export const Calendar = generateCalendar<Dayjs>(dayjsGenerateConfig);
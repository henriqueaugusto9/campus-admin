import styled from "styled-components";

export const Body = styled.div`
    display: flex;
    position: absolute;
    top: 72px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: calc(100% - 128px);
    width: 100%;
    margin-bottom: 56px;
    padding: 32px 16px 32px 16px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        width: 0px;
    }
`
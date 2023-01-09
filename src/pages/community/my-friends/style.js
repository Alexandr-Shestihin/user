import styled from "styled-components";
import {InnerBox} from "../../../components/UI";

export const StyledRequest = {
    Title: styled.h2`
        margin: 0 0 20px;
        font-weight: 500;
        font-size: 21px;
        color: #D5CBFF;
    `,
    Container: styled.div`
        margin: 0 0 40px;
    `,
    Item: styled(InnerBox)`
        & + & {
            margin-top: 10px;
        }
        
        padding: 10px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        @media (max-width: 767px) {
            flex-direction: column;
            align-items: flex-start;
        }
        
        .nickname {
            color: #D5CBFF;
            font-weight: 500;
        }
        
        .controls {
            display: flex;
            
            button + button {
                margin-left: 12px;
            }
            
            @media (max-width: 767px) {
                margin-top: 10px;
            }
        }
    `
}
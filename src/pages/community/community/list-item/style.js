import styled from "styled-components";
import {InnerBox} from "../../../../components/UI";

export const Styled = {
    Body: styled(InnerBox)`
        & + & {
            margin-top: 10px;
        }
        
        display: flex;
        
        @media (max-width: 991px) {
            flex-direction: column;
        }
    `,
    Image: styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 30px;
        flex-shrink: 0;
        width: 140px;
        height: auto;
        
        @media (max-width: 991px) {
            margin-right: 0;
            margin-bottom: 24px;
        }
        
        img {
            display: block;
            max-width: 100%;
            max-height: 100%;
            cursor: pointer;
        }
    `,
    Data: styled.div`
        width: 100%;
    `,
    Name: styled.div`
        font-weight: 500;
        font-size: 14px;
        color: #EDA211;
        margin: 0 0 16px;
    `,
    Description: styled.div`
        font-weight: 500;
        font-size: 14px;
        margin-bottom: 10px;
    `,
    List: styled.div`
        display: flex;
        margin-bottom: 6px;
        
        > div {
            font-size: 14px;
            
            &:first-child {
                font-weight: bold;
                color: #D5CBFF;
            }
            
            &:last-child {
                margin-left: 8px;
            }
        }
    `,
    Controls: styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
    `
}
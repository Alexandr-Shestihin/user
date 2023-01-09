import styled from "styled-components";
import {InnerBox} from "../../../../../components/UI";

export const Styled = {
    AboutRow: styled.div`
        display: flex;
        margin: 0 -5px 20px;
        
        @media (max-width: 991px) {
            flex-direction: column;
        }
    `,
    AboutCol: styled.div`
        padding: 0 5px;
        
        &:first-child {
            width: 33.3333%;
            
            @media (max-width: 991px) {
                width: 100%;
            }
        }
        
        &:last-child {
            width: 66.6666%;
            
            @media (max-width: 991px) {
                width: 100%;
                margin-top: 10px;
            }
        }
    `,
    AboutInner: styled(InnerBox)`
        height: 100%;
        
        .image {
            display: flex;
            align-items: center;
            justify-content: center;
            
            &-holder {
                width: 200px;
                height: 200px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            img {
                display: block;
                max-width: 100%;
                max-height: 100%;
            }
        }
    `,
    AboutBox: styled(InnerBox)`
        margin: 20px 0 0;
    `,
    AboutBoxGroup: styled.div`
        & + & {
            margin-top: 16px;
        }
    `,
    AboutBoxTitle: styled.div`
        font-weight: bold;
        font-size: 16px;
        color: #D5CBFF;
        margin: 0 0 8px;
    `,
    AboutBoxText: styled.div`
        font-weight: 500;
        font-size: 14px;
    `,
    InnerRow: styled.div`
        display: flex;
        flex-wrap: wrap;
        margin: 0 -10px;
    `,
    InnerCol: styled.div`
        width: 50%;
        padding: 0 10px;
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
}
import styled from "styled-components";
import {InnerBox} from "../../../components/UI";

export const Styled = {
    Row: styled.div`
        display: flex;
        flex-wrap: wrap;
        margin: 0 -15px;
    `,
    Col: styled.div`
        padding: 0 15px;
        
        &:first-child {
            width: 66.6666%;
            
            @media (max-width: 991px) {
                width: 100%;
                order: 1;
            }
        }
        
        &:last-child {
            width: 33.3333%;

            @media (max-width: 991px) {
                width: 100%;
                margin-bottom: 20px;
            }
        }
    `,
    AddMore: styled.div`
        margin: 16px 0 0;
        
        > span {
            cursor: pointer;
            font-size: 14px;    
            line-height: 21px;

            &:hover {
                text-decoration: underline;
            }
        }
    `,
    Title: styled(InnerBox)`
        margin: 0 0 20px;
        padding: 8px 20px;
        font-weight: bold;
        font-size: 21px;
        line-height: 31px;
        color: #D5CBFF;
    `,
    Social: styled(InnerBox)`
        margin: 30px 0 20px;
        padding: 8px 20px;
        font-size: 14px;
        line-height: 21px;
        color: #D5CBFF;
    `,
    Logo: styled(InnerBox)`
        cursor: pointer;
        padding: 16px;
        
        .image {
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100px;
            width: 100px;
            margin: 0 auto;
            border-radius: 3px;
            
            img {
                display: block;
                max-height: 100%;
                max-width: 100%;
            }
        }

        .copy {
            font-size: 14px;
            line-height: 21px;
            text-align: center;
        }
    `,
}
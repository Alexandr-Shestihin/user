import styled from "styled-components";
import { ContentBox, InnerBox } from "../UI";

export const Styled = {
    Title: styled.div`
        font-weight: 500;
        font-size: 21px;
        color: #D5CBFF;
        margin: 0 0 20px;
        text-align: center;
        
        @media (max-width: 767px) {
            font-size: 18px;
        }
    `,
    StyledContentBox: styled(ContentBox)`
        padding: 30px 20px;
   `,
    Tournament: styled(InnerBox)`
        display: flex;
        align-items: center;
        padding: 10px 10px 20px;

        @media (max-width: 767px) {
            padding: 10px;
        }

        & + & {
            margin-top: 10px;
        }
        
        .main {
            width: 100%;
            overflow: hidden;
            padding-right: 8px;
            display: flex;
            flex-wrap: wrap;
            cursor: pointer;
            font-weight: 500;
        }
        
        .avatar {
            width: 60px;
            height: 60px;
            position: relative;
            flex-shrink: 0;
            margin-right: 10px;
            border-radius: 3px;
        }
                
        .picture {
            width: 60px;
            height: 60px;
            background-size: cover;
        }

        .date {
            color: #EDA211;
            margin: 4px 0 0;
        }

        .game {
            color: #D5CBFF;
            margin: 4px 0 0;
            font-size: 14px;
        }
        
        .name {
            margin-top: 15px;
            font-size: 14px;
            width: 100%;

            @media (max-width: 767px) {
            margin-top: 10px;
            }
        }
    `,
    Empty: styled.div`
        text-align: center;
        font-size: 14px;  
    `
}
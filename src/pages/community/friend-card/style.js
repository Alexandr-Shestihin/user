import styled from "styled-components";
import {InnerBox} from "../../../components/UI";

export const StyledFriendCard = {
    Item: styled(InnerBox)`
        display: flex;
        align-items: flex-start;
        position: relative;
        
        & + & {
            margin-top: 10px;
        }
        
        @media (max-width: 991px) {
            flex-direction: column;
            text-align: center;
        }
    `,
    Avatar: styled.div`
        position: relative;
        width: 112px;
        height: 112px;
        flex-shrink: 0;
        cursor: pointer;
        
        @media (max-width: 991px) {
            margin: 0 auto 20px;
        }
        
        .image {
            width: 112px;
            height: 112px;
            background: ${props => props.image ? `#eee url(${props.image}) no-repeat center center` : '#eee'};
            background-size: cover;
            border-radius: 50%;
        }
        
        .status {
            background: #14C911;
            border: 2px solid #201941;
            box-sizing: border-box;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            position: absolute;
            top: 6px;
            right: 6px;
        }
        
        &.top-gamer {
            .image {
                border: 3px solid #EDA211;
            }
        }
    `,
    Info: styled.div`
        padding-left: 20px;
        padding-right: 200px;
        width: 100%;
        
        @media (max-width: 991px) {
            padding-right: 20px;
        }
        
        @media (max-width: 767px) {
            padding: 0 10px;
        }
        
        .nickname {
            font-weight: bold;
            font-size: 18px;
            color: #D5CBFF;
            margin: 0 0 6px;
        }
        
        .description {
            font-weight: 500;
            font-size: 14px;
            
            & + .description {
                margin-top: 4px;
            }
        }
    `,
    Controls: styled.div`
        display: flex;
        position: absolute;
        top: 20px;
        right: 20px;
        
        @media (max-width: 991px) {
            position: static;
            justify-content: center;
            margin-top: 10px;
        }
        
        button + button {
            margin-left: 2px;
        }
        
        button:last-child {
            padding: 0 8px;
            
            svg {
                position: relative;
                right: -2px;
                top: 1px;
            }
        }
    `
}
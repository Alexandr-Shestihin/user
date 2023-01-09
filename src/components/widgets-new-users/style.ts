import styled from "styled-components";
import {ContentBox, InnerBox} from "../UI";

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
    UserItem: styled(InnerBox)`
        display: flex;
        align-items: center;
        padding: 15px 20px;

        & + & {
            margin-top: 10px;
        }
        
        .main {
            width: 100%;
            overflow: hidden;
            padding-right: 8px;
            display: flex;
            align-items: center;
            cursor: pointer;
        }
        
        .avatar {
            width: 46px;
            height: 46px;
            position: relative;
            flex-shrink: 0;
            margin-right: 10px;
            border: 2px solid transparent;
            border-radius: 50%;
            
            &.top-gamer {
                border-color: #EDA211;
            }
        }
        
        .info {
            width: calc(100% - 52px)
        }
        
        .picture {
            width: 42px;
            height: 42px;
            background: ${(props: {image: string}) => props.image ? `#eee url(${props.image}) no-repeat center center` : '#eee'};
            background-size: cover;
            border-radius: 50%;
        }
        
        .nickname {
            font-weight: 600;
            font-size: 18px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        
        .game {
            margin: 4px 0 0;
            font-size: 14px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        
        .status {
            background: #14C911;
            border: 2px solid #201941;
            box-sizing: border-box;
            border-radius: 50%;
            width: 12px;
            height: 12px;
            position: absolute;
            top: 0;
            right: 0;
        }
    `,
    Empty: styled.div`
        text-align: center;
        font-size: 14px;  
    `
}
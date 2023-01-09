import styled from "styled-components";
import {SectionTitle} from "../../../components/UI";

export const Styled = {
    Group: styled.div`
        & + & {
            margin-top: 20px;
        }
    `,
    Status: styled.div`
        display: flex;
        justify-content: flex-end;
        
        font-weight: 500;
        font-size: 14px;
        color: #D5CBFF;
        margin: 0 0 10px;
    `,
    Disconnect: styled.div`
        display: flex;
        justify-content: flex-end;
        
        font-weight: 500;
        font-size: 14px;
        color: #D5CBFF;
        margin: 10px 0 0;
        cursor: pointer;
        
        &:hover {
            text-decoration: underline;
        }
    `,
    GamesTitle: styled(SectionTitle)`
        margin: 0 0 4px;
    `,
    GamesItem: styled.div`
        border: 1px solid rgba(213, 203, 255, .2);
        border-radius: 3px;
        display: flex;
        align-items: center;
        padding: 5px 64px 5px 5px;
        position: relative;
        
        @media (max-width: 767px) {
            border: none;
            padding: 0 40px 0 0;
        }
        
        & + & {
            margin-top: 4px;
        }
        
        .image {
            width: 64px;
            height: 64px;
            border-radius: 3px;
            flex-shrink: 0;
            margin-right: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            
            img {
                width: 100%;
                display: block;
            }
            
            @media (max-width: 767px) {
                width: 40px;
                height: 40px;
            }
        }
        
        .name {
            font-size: 14px;
            line-height: 1.5;
        }
        
        span {
            display: block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            right: 26px;
            transform: translateY(-5px);
            background: rgba(255,255,255,.3);
            
            @media (max-width: 767px) {
                right: 16px;
            }
            
            &.online {
                background: #14C911;
            }
        }
    `,
    GameEditor: styled.div`
        min-height: 320px;
        
        label {
            display: block;
            margin: 0 0 4px;
            font-weight: 500;
            font-size: 14px;
        }
        
        .no-games {
            text-align: center;
            font-size: 14px;
        }
    `,
    Game: styled.div`
        display: flex;
        justify-content: center;
        margin: 30px 0 0;
    `
}
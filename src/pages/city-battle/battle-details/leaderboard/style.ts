import styled from "styled-components";
import {InnerBox} from "../../../../components/UI";

interface Props {
    image?: string;
}

export const Styled = {
    Wrapper: styled.div`
        margin: 10px 0 0;
    `,
    Title: styled(InnerBox)`
        font-weight: bold;
        font-size: 21px;
        text-align: center;
        padding: 15px;
        margin: 0 0 1px;
    `,
    Row: styled.div`
        display: flex;
        flex-wrap: wrap;
        margin: 0 -5px;
    `,
    Col: styled.div`
        width: 50%;
        padding: 0 5px;
        
        @media (max-width: 767px) {
            width: 100%;
            margin-top: 1px;
        }
    `,
    City: styled(InnerBox)`
        padding: 10px 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 0 1px;
        
        .name {
            font-weight: bold;
            font-size: 21px;
        }
        
        .image {
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            
            img {
                display: block;
                max-width: 50px;
                max-height: 50px;
            }
        }
    `,
    Player: styled.a`
        display: flex;
        align-items: center;
        cursor: pointer;
        color: #fff;
        text-decoration: none;
        
        &:hover {
            text-decoration: underline;
        }
        
        .picture {
            width: 18px;
            height: 18px;
            margin-right: 8px;
            background: ${(props: Props) => props.image ? `#eee url(${props.image}) no-repeat center center` : '#eee'};
            background-size: cover;
            border-radius: 50%;
            position: relative;
            
            &.top-gamer {
                &:after {
                    content: '';
                    display: block;
                    position: absolute;
                    top: -1px;
                    left: -1px;
                    right: -1px;
                    bottom: -1px;
                    border: 1px solid #EDA211;
                    border-radius: 50%;
                }
            }
        }
        
        .name {
            max-width: 110px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    `
}
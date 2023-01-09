import styled from "styled-components";
import {ContentBox, InnerBox} from "../../../components/UI";

interface Props {
    image?: string,
    isActive?: boolean
}

export const Styled = {
    ContentBox: styled(ContentBox)`
        height: 100%;
        margin: 0;
        padding: 20px;
        display: flex;
        flex-direction: column;
    `,
    Header: styled.div`
        display: flex;
        align-items: center;
        margin: 0 0 20px;
        
        span {
            font-weight: bold;
            font-size: 18px;
            color: #D5CBFF;
        }
    `,
    HeaderImage: styled.div`
        background: ${(props: Props) => props.image ? `#eee url(${props.image}) no-repeat center center` : '#eee'};
        background-size: cover;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        margin-right: 10px;
    `,
    Search: styled(InnerBox)`
        padding: 10px;
        margin: 0 0 10px;
        display: flex;
        align-items: center;
        
        .icon {
            opacity: .54;
            width: 24px;
            flex-shrink: 0;
            margin-right: 10px;
            
            svg {
                display: block;
            }
        }
        
        input {
            width: 100%;
            background: transparent;
            border: none;
            color: #fff;
            font-size: 14px;
            outline: none;
        }
    `,
    Items: styled.div`
        flex: 1;
        overflow: hidden;
        height: 100%;
    `,
    ItemsScroller: styled.div`
        height: 100%;
        overflow-y: scroll
    `,
    Item: styled(InnerBox)`
        & + & {
            margin-top: 10px;
        }

        padding: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        position: relative;
        
        .icon {
            position: relative;
            margin-right: 10px;
            flex-shrink: 0;
            
            .image {
                width: 42px;
                height: 42px;
                background: ${(props: Props) => props.image ? `#eee url(${props.image}) no-repeat center center` : '#eee'};
                background-size: cover;
                border-radius: 50%;
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
        }
        
        .info {
            min-width: 0;
        }
        
        .name {
            font-weight: 600;
            font-size: 16px;
            color: ${(props: Props) => props.isActive ? '#EDA211' : '#fff'};
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            
            @media (max-width: 991px) {
                color: #fff;
            }
        }
        
        .last-message {
            font-size: 10px;
            color: #D5CBFF;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            
            display: flex;
            align-items: center;
            
            .body {
                margin-left: 4px;
            }
            
            p {
                margin: 0;
            }
            
            a {
                color: #D5CBFF;
                font-weight: 500;
            }
            
            strong {
                font-weight: 500;
            }
        }
        
        .active {
            @media (min-width: 992px) {
                background: #EDA211;
                border-radius: 50%;
                width: 10px;
                height: 10px;
                position: absolute;
                top: 10px;
                right: 10px;
            }
        }
    `
}
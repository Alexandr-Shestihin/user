import styled from "styled-components";
import {ContentBox, InnerBox} from "../../../components/UI";

interface Props {
    image?: string;
    active?: boolean;
}

export const Styled = {
    ContentBox: styled(ContentBox)`
        height: 100%;
        margin: 0;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    `,
    Header: styled(InnerBox)`
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
        margin: 0 0 20px;
    `,
    UserInfo: styled.div`
        display: flex;
        align-items: center;

        .icon {
            position: relative;
            margin-right: 10px;
            
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
        
        .name {
            font-weight: 600;
            font-size: 21px;
            color: #D5CBFF;
            
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            
            @media (max-width: 991px) {
                font-size: 18px;
            }
        }
        
        .back {
            display: none;
            
            @media (max-width: 991px) {
                display: flex;
                align-items: center;
                margin-right: 12px;
            }
        }
    `,
    Input: styled.div`
        position: relative;
        flex-shrink: 0;
        margin: 20px 0 0;
        
        textarea {
            resize: none;
            width: 100%;
            background: #3F317C;
            border-radius: 20px;
            outline: none;
            min-height: 36px;
            max-height: 200px;
            color: #fff;
            border: none;
            font-size: 14px;
            padding: 10px 20px;
        }
    `,
    Messages: styled.div`
        flex: 1;
        height: calc(100% - 138px);
        overflow-y: scroll;
        margin: 0 -20px;
        padding: 0 20px;
    `,
    Message: styled.div`
        & + & {
            margin-top: 5px;
        }

        display: flex;
        align-items: flex-start;
        
        .body {
            padding: 6px 12px;
            background: #2B244A;
            border-radius: 20px;
            font-size: 14px;
            line-height: 1.5;
        }
        
        &.self {
            justify-content: flex-end;
            
            .body {
                background: #3F317C;
            }
        }
        
        p {
            margin: 0;
        }
        
        a {
            color: #EDA211;
        }
   `,
    Controls: styled.div`
        display: flex;
        align-items: center;
        
        > div + div {
            margin-left: 10px;
        }
    `,
    Control: styled.div`
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: ${(props: Props) => props.active ? '#EDA211' : '#D5CBFF'};
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        
        &.mobile {
            display: none;
        }
        
        @media (max-width: 991px) {
            &.mobile {
                display: flex;
            }
            
            &.desktop {
                display: none;
            }
        }
        
        svg {
            display: block;
        }
    `
}
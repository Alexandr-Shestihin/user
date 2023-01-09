import styled from "styled-components";
import {ContentBox, InnerBox} from "../../../components/UI";

interface Props {
    image?: string;
}

export const Styled = {
    ContentBox: styled(ContentBox)`
        height: 100%;
        margin: 0;
        padding: 20px;
    `,
    AvatarHolder: styled.div`
        width: 112px;
        height: 112px;
        margin: 0 auto 16px;
        position: relative;
    `,
    Avatar: styled.div`
        width: 112px;
        height: 112px;
        border-radius: 50%;
        overflow: hidden;
        background: ${(props: Props) => props.image ? `#eee url(${props.image}) no-repeat center center` : '#eee'};
        background-size: cover;
    `,
    OnlineStatus: styled.div`
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #14C911;
        border: 2px solid #201941;
        position: absolute;
        top: -2px;
        right: 20px;
    `,
    UserInfo: styled(InnerBox)`
        position: relative;
        
        .back {
            display: none;
            
            @media (max-width: 991px) {
                display: flex;
                align-items: center;
                margin-right: 12px;
                position: absolute;
                top: 10px;
                left: 10px;
            }
        }

        .nickname {
            text-align: center;
            font-size: 21px;
            font-weight: bold;
            color: #D5CBFF;
            margin: 0 0 16px;
        }
        
        .username {
            text-align: center;
            font-weight: 500;
            font-size: 16px;
            margin: 0 0 4px;
        }
        
        .role {
            text-align: center;
            font-weight: 500;
            font-size: 14px;
        }
    `,
    PassportLink: styled(InnerBox)`
        padding: 10px 20px;
        cursor: pointer;
        font-weight: 500;
        font-size: 16px;
        color: #D5CBFF;
        transition: color .3s ease;
        margin-top: 10px;
        
        &:hover {
            color: #EDA211;
        }
    `
}
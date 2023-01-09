import styled from "styled-components";
import {InnerBox} from "../../../components/UI";

const Styled = {
    Row: styled.div`
        display: flex;
        flex-wrap: wrap;
        margin: 0 -5px
    `,
    Col: styled.div`
        padding: 0 5px;
        width: 33.3333%;
        
        @media (max-width: 767px) {
            width: 100%;
            
            & + & {
                margin-top: 10px;
            }
        }
        
        &.about {
            width: 100%;
            margin-top: 10px;
        }
        
        &.social {
            margin-top: 10px;
        }
        
        &.controls {
            margin-top: 10px;
            width: 100%;
            display: flex;
            justify-content: flex-end;
            
            button + button {
                margin-left: 12px;
            }
            
            @media (max-width: 767px) {
                width: 100%;
                flex-direction: column;
                
                button + button {
                    margin-left: 0;
                    margin-top: 10px;
                }
            }
        }
    `,
    StyledInnerBox: styled(InnerBox)`
        height: 100%;
    `,
    Content: styled.div`

        .logos {
            display: flex;
            justify-content: center;
            margin: 0 -10px;
            
            .logo {
                padding: 0 10px;
                width: 33.3333%;
                display: flex;
                justify-content: center;
                
                img {
                    display: block;
                    max-width: 100%;
                }
            }
        }

        .qr {
            display: flex;
            justify-content: center;
            
            img {
                min-width: 100%;
            }
        }
        
        .nickname {
            text-align: center;
            font-size: 21px;
            font-weight: bold;
            color: #D5CBFF;
            margin: 0 0 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            
            svg {
                position: relative;
                top: -4px;
                margin-left: 6px;
            }
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
        
        .sectionTitle {
            font-weight: 500;
            font-size: 21px;
            margin: 0 0 16px;
            
            &.next {
                margin: 16px 0;
            }
            
            &.withSwitcher {
                display: flex;
                align-items: center;
            }
            
            strong {
                font-weight: bold;
            }
        }
        
        .dataRow {
            font-size: 14px;
            display: flex;
            align-items: flex-start;
            
            @media (min-width: 992px) and (max-width: 1199px) {
                flex-direction: column;
            }
            
            &.center {
                justify-content: center;
            }
        
            & + .dataRow {
                margin-top: 6px;
            }
            
            > div {
                &:first-child {
                    min-width: 90px;
                    padding-right: 16px;
                    flex-shrink: 0;
                    color: #D5CBFF;
                }
            }
            
            &.row-type {
                display: block;
            }
        }
        
        .pg {
            color: #EDA211;
            font-weight: 500;
            padding-right: 8px;
        }
    `,
    AvatarHolder: styled.div`
        width: 118px;
        height: 118px;
        margin: 0 auto 16px;
        position: relative;
    `,
    Avatar: styled.div`
        width: 118px;
        height: 118px;
        border-radius: 50%;
        overflow: hidden;
        background: ${props => props.image ? `#eee url(${props.image}) no-repeat center center` : '#eee'};
        background-size: cover;
        
        &.top-gamer {
            border: 3px solid #EDA211;
        }
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
    About: styled.div`
        font-size: 14px;
        padding-left: 30px;
        position: relative;
        
        svg {
            position: absolute;
            top: 0;
            left: 0;
        }
    `
}

export default Styled
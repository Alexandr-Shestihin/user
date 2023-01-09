import styled from "styled-components";
import {InnerBox, ModalSubTitle, ModalTitle} from "../../../../components/UI";

export const Styled = {
    Title: styled(ModalTitle)`
        text-align: left;
    `,
    SubTitle: styled(ModalSubTitle)`
        text-align: left;
    `,
    SelectTypes: styled.div`
        margin: 50px -10px 0;
        display: flex;
        
    `,
    SelectType: styled.div`
        padding: 0 10px;
        cursor: pointer;
        width: 20%;
        
        &:hover {
            .picture {
                opacity: 1;
            }
        }
        
        .picture {
            width: 100%;
            height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 0 10px;
            border: 1px solid rgba(213, 203, 255, 1);
            border-radius: 3px;
            transition: opacity .3s ease;
            opacity: .25;
            
            img {
                display: block;
                max-width: 100%;
                max-height: 100%;
            }
        }
        
        .label {
            text-align: center;
            font-size: 14px;
        }
    `,
    LangSwitcher: styled(InnerBox)`
        padding: 10px;
        margin: 0 0 20px;
        display: flex;
        align-items: center;
        
        .label {
            font-weight: 500;
            font-size: 14px;
            color: #D5CBFF;
            margin-right: 15px;
        }
        
        .buttons {
            text-transform: uppercase;
            
            button {
                background: transparent;
                border: none;
                cursor: pointer;
                color: #fff;
                text-transform: uppercase;
                opacity: .5;
                font-weight: 500;
                font-size: 14px;
                outline: none;
                
                &.is-active {
                    opacity: 1;
                }
            }
            
            button + button {
                margin-left: 5px;
            }
        }
    `,
    Logo: styled.div`
        padding-top: 20px;
        cursor: pointer;
        
        .image {
            border: 1px solid rgba(213, 203, 255, .2);
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100px;
            width: 100px;
            margin: 0 auto 10px;
            border-radius: 3px;
            
            img {
                display: block;
                max-height: 100%;
                max-width: 100%;
            }
        }

        .copy {
            font-size: 14px;
            text-align: center;
        }
    `,
    ContactInfo: styled.div`
        font-weight: 500;
        font-size: 14px;
        color: #D5CBFF;
    `,
    AddressDisclaimer: styled.div`
        margin: 20px 0 0;
        font-size: 12px;
        line-height: 1.5;
        color: #D5CBFF;
    `
}
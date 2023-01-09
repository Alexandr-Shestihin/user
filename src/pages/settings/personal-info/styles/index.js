import styled from "styled-components";
import {InnerBox} from "../../../../components/UI";

const Styled = {
    Row: styled.div`
        display: flex;
        flex-wrap: wrap;
        margin: 0 -20px;
        
        &.tiny {
            margin: 0 -4px;
        }
    `,
    Col: styled.div`
        margin: 0 0 8px;
        padding: 0 20px;
        width: 100%;
        
        @media (min-width: 992px) {
            width: 50%;
        }
        
        &.full-width {
            width: 100%;
        }
        
        &.tiny {
            padding: 0 4px;
        }
        
        &:last-child {
            margin: 0;
        }
    `,
    FormGroup: styled.div`
        &.inline {
            @media (min-width: 1200px) {
                display: flex;
            
                > label {
                    width: 100px;
                    white-space: nowrap;
                    flex-shrink: 0;
                    margin-right: 8px;
                    line-height: 30px;
                    display: block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                
                > div {
                    min-width: 0;
                }
            }
        }

        & + & {
            margin-top: 20px;
        }
        
        &.muted {
            opacity: .5;
            pointer-events: none;
        }
        
        label {
            display: block;
            font-size: 14px;
            line-height: 22px;
            margin: 0 0 4px;
        }
    `,
    PassportHelper: styled.div`
        font-size: 13px;
        font-weight: 500;
        letter-spacing: .5px;
        margin: 6px 0 0;
        opacity: .5;
        
        &.link {
            opacity: 1;
            
            a, > div {
                color: #fff;
                display: block;
                text-decoration: none;
                
                &.limited {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
            
            a:hover {
                text-decoration: underline;
            }
        }
    `,
    StyledInnerBox: styled(InnerBox)` 
        height: 100%;
    `,
    AddressDisclaimer: styled.div`
        margin: 20px 0 0;
        font-size: 12px;
        line-height: 1.5;
        color: #D5CBFF;
    `,
    InnerBox: styled(InnerBox)`
        background: transparent;
        padding: 0;
        margin-bottom: 20px;
        
        &.no-margin {
            margin: 0;
        }
    `,
    Description: styled.p`
        font-weight: normal;
        font-size: 14px;
        margin: 16px 0;
        line-height: 1.5;
    `
}

export default Styled
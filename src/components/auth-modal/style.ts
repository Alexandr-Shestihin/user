import styled from "styled-components";

export const Styled = {
    FormGroup: styled.div`
        & + & {
            margin-top: 20px;
        }
        
        > label {
            display: block;
            font-size: 14px;
            margin: 0 0 4px;
        }
        
        &.reset-password {
            display: flex;
            align-items: center;
            justify-content: space-between;
            
            a {
                font-size: 12px;
                color: #D5CBFF;
                text-decoration: none;
                
                &:hover, &:focus {
                    color: #EDA211;
                    text-decoration: underline;
                }
            }
        }
        
        &.switch-form {
            display: flex;
            align-items: center;
            justify-content: space-between;
            
            > div {
                font-size: 12px;
                color: #D5CBFF;
            }
            
            a {
                font-weight: bold;
                font-size: 16px;
                color: #D5CBFF;
                text-decoration: underline;
                
                &:hover, &:focus {
                    color: #EDA211;
                }
            }
        }
    `,
    ButtonHolder: styled.div`
        display: flex;
        justify-content: center;
        margin: 30px 0 0;
    `,
    Steam: styled.div`
        display: flex;
        align-items: center;
        border: 1px solid rgba(213,203,255,.2);
        border-radius: 3px;
        padding: 5px 10px;
        
        img {
            margin-right: 12px;
        }
        
        .name {
            color: #D5CBFF;
            font-weight: bold;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    `,
    UserBlocked: styled.div`
        p {
            text-align: center;
        }
    `
}
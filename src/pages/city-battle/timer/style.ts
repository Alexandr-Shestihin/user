import styled from "styled-components";

export const Styled = {
    Wrapper: styled.div`
        width: 374px;
        background: #201941;
        border-radius: 3px;
        padding: 20px;
        margin: 20px auto;
    `,
    Title: styled.div`
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        margin: 0 0 12px;
        
        text-align: center;
        text-transform: uppercase;
        
        color: #D5CBFF;
    `,
    Body: styled.div`
        display: flex;
        justify-content: center;

        .row {
            width: 48px;
            text-align: center;
        }
        
        .row + .row {
            margin-left: 10px;
        }
        
        .value {
            font-weight: bold;
            font-size: 18px;            
            color: #000000;
            padding: 6px 0;
            border-radius: 3px 3px 0 0;
            background: #FFBE3F;
        }
        
        .label {
            font-weight: 500;
            font-size: 10px;
            color: #000000;
            padding: 2px 0;
            background: #EDA211;
            border-radius: 0 0 3px 3px;
        }
    `
}
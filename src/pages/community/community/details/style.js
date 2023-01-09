import styled from "styled-components";

export const Styled = {
    Title: styled.div`
        font-weight: bold;
        font-size: 24px;
        line-height: 32px;
        text-align: center;
        color: #EDA211;
        margin: 0 0 16px;
        position: relative;
        
        .title {
            padding: 0 50px;
        }
        
        .go-back {
            position: absolute;
            top: 0;
            left: 0;
            height: 32px;
            display: flex;
            align-items: center;
        }
    `,
    Tabs: styled.div`
        margin: 0 0 20px;
        display: flex;
    `,
    Tab: styled.div`
        & + & {
            margin-left: 20px;
        }
        
        span {
            font-weight: 500;
            font-size: 14px;
            cursor: pointer;
            
            &.active {
                color: #EDA211;
            }
        }
    `
}
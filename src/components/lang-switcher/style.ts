import styled from "styled-components";

export const Styled = {
    Wrapper: styled.div`
        position: relative;
      
        .current {
            display: flex;
            align-items: center;
            cursor: pointer;
            
            &__lang {
                color: #B9A9FF;
                font-weight: bold;
                margin-right: 8px;
                text-transform: uppercase;
            }
        }
        
        .dropdown {
            position: absolute;
            right: 0;
            top: 100%;
        }
    `,
    Dropdown: styled.div`
        position: absolute;
        z-index: 5;
        top: 100%;
        right: 0;
        margin-top: 10px;
        
        background: #B9A9FF;
        box-shadow: 0 0 10px #B9A9FF;
        border-radius: 3px;
        padding: 5px 10px;
        
        &:before {
            content: '';
            display: block;
            border: 6px solid transparent;
            border-bottom-color: #B9A9FF;
            position: absolute;
            bottom: 100%;
            right: 3px;
        }
        
        > div {
            color: #140F2B;
            font-weight: bold;
            cursor: pointer;
            padding: 5px;
            text-transform: uppercase;
            transition: color .3s ease;
        }
    `
}
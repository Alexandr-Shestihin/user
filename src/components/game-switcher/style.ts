import styled from "styled-components";

export const Styled = {
    Wrapper: styled.div`
        position: relative;
    `,
    Current: styled.div`
        text-transform: uppercase;
        font-weight: bold;
        font-size: 21px;
        color: #EDA211;
        display: flex;
        align-items: center;
        
        svg {
            display: none;
        }
        
        &.has-options {
            cursor: pointer;
            svg {
                display: block;
            }
        }
    `,
    Dropdown: styled.div`
        position: absolute;
        z-index: 1;
        top: 100%;
        left: 0;
        margin-top: 5px;
        background: #2B244A;
        box-shadow: 0 0 20px #140F2B;
        border-radius: 3px;
        
        &.left {
            right: auto;
            left: 0;
        }
        
        &.right {
            left: auto;
            right: 0;
        }
    `,
    DropdownItem: styled.div`
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
        text-transform: uppercase;
        padding: 10px;
        transition: color .3s ease;
        white-space: nowrap;
        
        &:hover {
            color: #EDA211;
        }
    `
}
import styled from "styled-components";

export const SearchForm = {
    Form: styled.form`
        display: flex;
        margin: 0 0 10px;
    `,
    Input: styled.input`
        background: #2B244A;
        border-radius: 3px 0 0 3px;
        border: none;
        outline: none;
        width: 100%;
        padding: 0 12px;
        
        font-size: 14px;
        color: #fff;
        font-weight: 500;
    `,
    Button: styled.button`
        width:60px;
        height: 46px;
        background: rgba(255,255,255,.1);
        border-radius: 0 3px 3px 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background .3s ease;
        flex-shrink: 0;
        border: none;
        
        &:hover {
            background: rgba(255,255,255,.2);
        }
    `
}
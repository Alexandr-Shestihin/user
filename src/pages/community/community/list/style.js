import styled from "styled-components";
import {InnerBox} from "../../../../components/UI";

export const Styled = {
    Title: styled.div`
        font-weight: bold;
        font-size: 24px;
        line-height: 40px;
        text-align: center;
        color: #EDA211;
        margin: 0 0 36px;
        text-transform: uppercase;
        
        position: relative;
        padding: 0 150px;
        
        @media (max-width: 991px) {
            padding: 0;
            display: flex;
            flex-direction: column;
        }
        
        button {
            position: absolute;
            top: 0;
            right: 0;
            
            @media (max-width: 991px) {
                position: static;
                margin-top: 10px;
            }
        }
    `,
    Intro: styled(InnerBox)`
        margin: 0 0 10px;
        
        h2 {
            font-weight: 500;
            font-size: 14px; 
            color: #EDA211;
            margin: 0 0 10px;
        }
        
        p {
            font-weight: 500;
            font-size: 12px;
            line-height: 1.5;
            margin: 0;
        }
    `,
    Filters: styled(InnerBox)`
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 0 10px;
        
        @media (max-width: 1199px) {
            flex-direction: column;
        }
    `,
    FiltersGroup: styled.div`
        display: flex;
        align-items: center;
        
        @media (max-width: 1199px) {
            order: 2
        }
        
        @media (max-width: 991px) {
            flex-direction: column;
            width: 100%;
        }
        
        > div {
            @media (max-width: 991px) {
                width: 100%;
            }
        }
        
        > div + div {
            margin-left: 24px;
            
            @media (max-width: 991px) {
                margin-left: 0;
                margin-top: 10px;
                align-items: flex-start;
            }
        }
        
        .select {
            width: 120px;
            
            @media (max-width: 1199px) {
                width: 150px
            }
            
            @media (max-width: 991px) {
                width: 100%;
            }
        }
    `,
    SearchForm: styled.form`
        display: flex;
        border: 1px solid rgba(213, 203, 255, .2);
        border-radius: 3px;
        
        @media (max-width: 1199px) {
            width: 100%;
            margin-bottom: 10px;
            order: 1
        }
    `,
    SearchInput: styled.input`
        background: #2B244A;
        border-radius: 3px 0 0 3px;
        border: none;
        outline: none;
        width: 180px;
        padding: 0 12px;
        
        font-size: 14px;
        color: #fff;
        font-weight: 500;
        
        @media (max-width: 1199px) {
            width: 100%;
        }
    `,
    SearchButton: styled.button`
        width: 40px;
        height: 30px;
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
    `,
    NoResults: styled.div`
        font-size: 14px;
        padding: 0 20px;
    `
}
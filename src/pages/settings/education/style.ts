import styled from "styled-components";
import {SectionTitle} from "../../../components/UI";

export const Styled = {
    Form: styled.form`
        label {
            font-size: 14px;
            margin-right: 20px;
            flex-shrink: 0;
            
            &.fixed {
                display: block;
                width: 90px;
            }
        }
    `,
    FormGroup: styled.div`
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px;
        margin: 0 -10px;
        
        & + & {
            margin-top: 20px;
        }
    `,
    Col: styled.div`
        width: 100%;
        display: flex;
        align-items: center;
        
        @media (max-width: 767px) {
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
        }
    `,
    YearCol: styled.div`
        align-items: center;
        display: flex;
        
        & + & {
            margin-left: 50px;
        }
        
        > div {
            width: 100px;
        }
        
        @media (max-width: 991px) {
            width: 100%;
            
            & + & {
                margin-left: 0;
                margin-top: 20px;
            }
            
            > div {
                width: 100%;
            }
            
            > label {
                width: 90px;
            }
        }
        
        @media (max-width: 767px) {
            flex-direction: column;
            align-items: flex-start;
            
            label {
                width: 100%;
                margin: 0 0 4px;
            }
        }
    `,
    TripleCol: styled.div`
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 33.3333%;
        
        > div {
            width: 150px;
            display: flex;
            justify-content: flex-end;
        }
        
        &.first {
            justify-content: flex-start;
            
            @media (max-width: 767px) {
                justify-content: flex-end;
                align-items: flex-start;
            }
        }
        
        @media (max-width: 1199px) {
            width: 100%;
            
            & + & {
                margin-top: 20px;
            }
            
            > div {
                width: 100%;
            }
            
            label {
                width: 90px;
            }
        }
        
        @media (max-width: 767px) {
            flex-direction: column;
            
            label {
                width: 100%;
                margin: 0 0 4px;
            }
        }
    `,
    NewItemTitle: styled(SectionTitle)`
        margin: 0 0 16px;
        font-size: 18px;
    `,
    ListHolder: styled.div`
        margin: 0 0 30px;
    `,
    ListRow: styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
    `,
    ListItem: styled.div`
        background: #2B254B;
        border-radius: 3px;
        padding: 15px 20px 15px 50px;
        cursor: pointer;
        transition: background-color .3s ease;
        position: relative;
        
        &.on-edit {
            &:after {
                content: '';
                width: 10px;
                height: 10px;
                background: #D5CBFF;
                border-radius: 50%;
                position: absolute;
                top: 20px;
                left: 20px;
            }
        }
        
        &:hover {
            background: #322b58;
        }
        
        & + & {
            margin-top: 10px;
        }
        
        .text {
            font-weight: 500;
            font-size: 14px;
            line-height: 1.5;
        }
        
        .text + .text {
            margin-top: 10px;
        }
        
        .name {
            font-weight: 600;
        }
        
        a {
            color: #D5CBFF;
            font-weight: 500;
            font-size: 14px;
            text-decoration-line: underline;
            
            &:hover, &:focus {
                color: #EDA211;
            }
        }
    `,
    SelectUniversity: styled.div`
        display: flex;
        align-items: center;
        width: 100%;
        position: relative;
        
        > button {
            white-space: nowrap;
            margin-left: 16px;
        }
    `,
    AddEducation: styled.div`
        display: flex;
        
        button {
            height: 30px;
            font-size: 14px;
            margin-left: 6px;
        } 
    `,
    Description: styled.p`
        font-weight: normal;
        font-size: 14px;
        margin: 16px 0;
        line-height: 1.5;
    `
}
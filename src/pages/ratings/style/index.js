import styled from "styled-components";
import {ContentBox, InnerBox} from "../../../components/UI";

const Styled = {
    RatingRow: styled.div`
        display: flex;
        flex-wrap: wrap;
        margin: 0 -5px;
    `,
    RatingCol: styled.div`
        padding: 0 5px;
        
        &:first-child {
            width: 25%;
            
            @media (max-width: 991px) {
                width: 100%;
                order: 1;
            }
        }
        
        &:last-child {
            width: 75%;
            
            @media (max-width: 991px) {
                width: 100%;
            }
        }
    `,
    StyledContentBox: styled(ContentBox)`
        padding: 20px 10px;
    `,
    FilterTitle: styled(InnerBox)`
        margin: 0;
        padding: 10px 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        
        span {
            font-weight: bold;
            font-size: 18px;
            line-height: 26px;
            color: #D5CBFF;
        }
    `,
    FilterBox: styled(InnerBox)`
        padding: 15px 10px;
        margin: 10px 0 0;
        
        .title {
            font-weight: 500;
            font-size: 16px;
            color: #D5CBFF;
        }
        
        .form-group {
            margin-top: 15px;
            
            label {
                font-size: 14px;
                color: #FFFFFF;
                margin: 0 0 4px;
                display: block;
            }
        }
    `,
    TableTitle: styled(InnerBox)`
        margin: 0 0 10px;
        padding: 10px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        @media (max-width: 767px) {
            flex-direction: column;
            align-items: flex-start;
        }
        
        .game {
            font-weight: 500;
            font-size: 16px;
            line-height: 26px;
            color: #D5CBFF;
            display: flex;
            align-items: center;
            
            span {
                font-weight: bold;
                font-size: 21px;
                line-height: 26px;
                color: #EDA211;
                display: block;
                margin-left: 8px;
            }
        }
        
        .name {
            font-weight: bold;
            font-size: 21px;
            line-height: 26px;
            color: #EDA211;
        }
    `,
    TableFilters: styled(InnerBox)`
        padding: 15px;
        margin: 0 0 10px;
        
        .title {
            font-weight: 500;
            font-size: 16px;
            color: #D5CBFF;
            margin: 0 0 12px;
        }
        
        .row {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .timers {
            display: flex;
            text-align: center;
            
            > div {
                cursor: pointer;
                transition: all .3s ease;
                font-weight: 500;
                font-size: 14px;
                
                &:hover {
                    color: #EDA211;
                }
                
                &.isActive {
                    color: #EDA211;
                }
            }
            
            > div + div {
                margin-left: 30px;
            }
        }
    `,
    TableHolder: styled.div`
        overflow-x: scroll;
    `,
    Table: styled.table`
        width: 100%;
        border-collapse: collapse;
        
        th {
            font-weight: 500;
            font-size: 14px;
            color: #D5CBFF;
            padding: 10px 15px;
            text-align: left;
            background: rgba(255,255,255,.05);
            white-space: nowrap;
            
            &:first-child {
                border-radius: 3px 0 0 3px;
            }
            
            &:last-child {
                border-radius: 0 3px 3px 0;
            }
            
            .flexed {
                display: flex;
                align-items: center;
            }
            
            .removeRow {
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                background: transparent;
                border: none;
                cursor: pointer;
                outline: none;
                margin-left: 4px;
                
                svg {
                    display: block;
                    transform: rotate(45deg);
                    position: static;
                }
            }
        }
        
        th.optional {
            position: relative;
            
            &:after {
                content: '';
                display: block;
                position: absolute;
                top: 0;
                left: 1px;
                right: 1px;
                bottom: 0;
                z-index: 1;
                background: rgba(255,255,255,.05);
                pointer-events: none;
                border-radius: 3px;
            }
        }
        
        .sortable {
            cursor: pointer;
        }
        
        .sort-this {
            position: relative;
            color: #EDA211;
        
            > svg {
                position: absolute;
                left: 2px;
                top: 50%;
                transform: rotate(90deg) translateX(-4px);
                
                path {
                    fill: #EDA211
                }
            }
        }
        
        .sort-ask {
            > svg {
                transform: rotate(-90deg) translateX(6px);
            }
        }
        
        .skip-this {
            pointer-events: none;
        }
        
        .is-new {
            position: relative;
            
            &:after {
                content: 'new!';
                font-size: 12px;
                color: #eda211;
                font-weight: 500;
                position: absolute;
                top: 0;
                left: 100%;
                pointer-events: none;
                transform: translateY(-10px) translateX(-8px);
            }
        }
        
        td {
            font-weight: 500;
            font-size: 14px;
            background: #2B244A;
            padding: 10px 15px;
            border-top: 1px solid #201941;
            border-bottom: 1px solid #201941;
            position: relative;
            
            &:first-child {
                border-radius: 3px 0 0 3px;
            }
            
            &:last-child {
                border-radius: 0 3px 3px 0;
            }
        }
        
        td.optional {
            &:after {
                content: '';
                display: block;
                position: absolute;
                top: 0;
                left: 1px;
                right: 1px;
                bottom: 0;
                z-index: 1;
                background: rgba(255,255,255,.05);
                pointer-events: none;
                border-radius: 3px;
            }
        }
        
        tr:nth-child(2n) {
            td {
                background: rgba(63, 49, 124, .5)
            }
        }
        
        tr.me {
            color: #EDA211;
        }
    `,
    TableFooter: styled(InnerBox)`
        margin: 10px 0 0;
        padding: 10px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 500;
        font-size: 14px;
        
        @media (max-width: 767px) {
            flex-direction: column;
        }
        
        span {
            color: #D5CBFF;
        }
        
        button {
            border: none;
            border-radius: 0;
            cursor: pointer;
            background: transparent;
            padding: 0;
            color: #fff;
            opacity: .5;
            font-weight: 500;
            outline: none;
            
            &.skipper {
                pointer-events: none;
            }
            
            &.active {
                opacity: 1;
                pointer-events: none;
            }
        }
        
        button + button {
            margin-left: 15px;
        }
        
        .show {
            display: flex;
            align-items: center;
            
            @media (max-width: 767px) {
                margin-top: 10px;
            }
        }
        
        .pagination {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .controls {
            display: flex;
            align-items: center;
            margin-left: 15px;
        }
        
        .compare {
            button {
                opacity: 1;
            }
        }
    `,
    Player: styled.a`
        display: flex;
        align-items: center;
        cursor: pointer;
        text-decoration: none;
        color: #fff;
        
        &:hover {
            text-decoration: underline;
        }
        
        .picture {
            width: 18px;
            height: 18px;
            margin-right: 8px;
            background: ${props => props.image ? `#eee url(${props.image}) no-repeat center center` : '#eee'};
            background-size: cover;
            border-radius: 50%;
            position: relative;
            
            &.top-gamer {
                &:after {
                    content: '';
                    display: block;
                    position: absolute;
                    top: -1px;
                    left: -1px;
                    right: -1px;
                    bottom: -1px;
                    border: 1px solid #EDA211;
                    border-radius: 50%;
                }
            }
        }
    `,
    Checkbox: styled.div`
        &.is-muted {
            opacity: .5;
            pointer-events: none;
        }
    `
}

export default Styled
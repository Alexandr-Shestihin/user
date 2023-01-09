import styled from "styled-components";

export const Styled = {
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
        
        th.sortable {
            position: relative;
            cursor: pointer;
            
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
        
        th.align-right {
            text-align: right;
        }
        
        th.align-center {
            text-align: center;
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
        
        .skip-this {
            pointer-events: none;
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
        
        td.sortable {
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
        
        tr.clickable {
            td {
                cursor: pointer;
            }
            
            &:hover {
                td {
                    background: #262042;
                }
            }
            
            &:nth-child(2n):hover {
                td {
                    background: rgba(63, 49, 124, .35)
                }
            }
        }
        
        &.dotaHeroes {
            td {
                padding: 5px 15px;
            }   
        }
        
        &.topFive {
             tr:nth-child(1),
             tr:nth-child(2),
             tr:nth-child(3),
             tr:nth-child(4),
             tr:nth-child(5){
                    td {
                    position: relative;
                    
                    &:before {
                        content: '';
                        display: block;
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        pointer-events: none;
                        border-bottom: 1px solid #EDA211;
                        border-top: 1px solid #EDA211;
                        opacity: .5;
                    }
                }
                
                td:first-child:before {
                    border-radius: 3px 0 0 3px;
                    border-left: 1px solid #EDA211;
                }
                
                td:last-child:before {
                    border-radius: 0 3px 3px 0;
                    border-right: 1px solid #EDA211;
                }
            }
        }
    `
}
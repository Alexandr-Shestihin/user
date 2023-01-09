import styled from "styled-components";
import {TitleRow} from "../../../../components/UI";

const Styled = {
    StyledTitleRow: styled(TitleRow)`
        margin: 0 0 20px;
        
        @media (max-width: 767px) {
            flex-direction: column;
            align-items: flex-start;
        }
    `,
    Tabs: styled.div`
        display: flex;
        align-items: center;

        @media (max-width: 767px) {
            margin: 6px 0;
        }

        div {
            cursor: pointer;
            transition: all .3s ease;
            font-weight: 500;
            font-size: 14px;

            &:hover {
                color: #EDA211;
            }
        }

        div.active {
            color: #EDA211;
        }

        div + div {
            margin-left: 30px;
        }
    `,
    ProgressRow: styled.div`
        display: flex;
        flex-wrap: wrap;
        margin: 0 -5px;
    `,
    ProgressCol: styled.div`
        padding: 0 5px;
        width: 33.3333%;
        
        @media (max-width: 767px) {
            width: 100%;
            
            & + & {
                margin-top: 10px;
            }
        }
    `,
    ProgressTitle: styled.div`
        text-align: center;
        margin: 0 0 16px;
        font-weight: 500;
        font-size: 18px;
    `,
    PerformanceTitle: styled.div`
        font-weight: bold;
        font-size: 18px;
        line-height: 27px;
        color: #EDA211;
        margin: 0 0 16px;
        
        @media (max-width: 767px) {
            text-align: center;
        }
    `,
    PerformanceRow: styled.div`
        margin: 0 -5px 20px;
        display: flex;
        flex-wrap: wrap;
    `,
    PerformanceCol: styled.div`
        padding: 0 5px;
        width: 50%;
        
        @media (max-width: 767px) {
            width: 100%;
            
            & + & {
                margin-top: 5px;
            }
        }
   `,
    PerformanceData: styled.div`
        display: flex;
        
        & + & {
            margin-top: 5px;
        }
    
        div {
            border: 1px solid rgba(213, 203, 255, .2);
            box-sizing: border-box;
            border-radius: 3px;
            font-weight: 500;
            font-size: 14px;
            padding: 5px 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            
            &:first-child {
                width: 100%;
            }
            
            &:last-child {
                width: 33%;
                flex-shrink: 0;
                margin-left: 5px;
            }
        }
        
        .green {
            color: #14C911;
        }
        
        .red {
            color: red;
        }
    `,
    PerformanceControls: styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 0 20px;
        
        @media (max-width: 767px) {
            flex-direction: column;
            
            button + button {
                margin-top: 10px;
            }
        }
    `,
    NoTableData: styled.div`
        font-size: 14px;
    `,
    TableHero: styled.div`
        display: flex;
        align-items: center;
        
        img {
            display: block;
            margin-right: 8px;
        }
    `,
    AddResults: styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        @media (max-width: 767px) {
            flex-direction: column;
        }
        
        .copy {
            font-weight: bold;
            font-size: 21px;
            color: #D5CBFF;
            
            @media (max-width: 767px) {
                margin-bottom: 20px;
            }
        }
    `
}

export default Styled
import styled from 'styled-components';
import ContentBox from "./ContentBox";

const ContentArea = styled(ContentBox)`
    font-size: 14px;
    line-height: 1.5;
    
    h1 {
        font-weight: bold;
        font-size: 24px;
        line-height: 36px;
        text-align: center;
        color: #D5CBFF;
        margin: 0 0 30px;
        
        @media (max-width: 991px) {
            font-size: 21px;
        }
        
        @media (max-width: 767px) {
            font-size: 18px;
            margin: 0 0 24px;
        }
    }
    
    h2 {
        font-weight: bold;
        font-size: 21px;
        margin: 24px 0 20px;
        
        @media (max-width: 991px) {
            font-size: 18px;
            margin: 20px 0 16px;
        }
        
        @media (max-width: 767px) {
            text-align: center;
        }
    }
    
    ul {
        margin: 0 0 20px;
        padding: 0 0 0 20px;
        list-style: none;
        
        @media (max-width: 991px) {
            margin: 0 0 16px;
        }
        
        li {
            position: relative;
            
            &:before {
                content: '';
                display: block;
                width: 10px;
                height: 1px;
                position: absolute;
                top: 10px;
                left: -20px;
                background: #fff;
                
            }
        }
        
        li + li {
            margin-top: 8px;
            
            @media (max-width: 991px) {
                margin-top: 6px;
            }
        }
    }
    
    p {
        margin: 0 0 20px;
        
        @media (max-width: 991px) {
            margin: 0 0 16px;
        }
    }
    
    a {
        color: #D5CBFF;
        font-weight: bold;
        text-decoration: none;
        
        &:hover {
            text-decoration: underline;
        }
    }
    
    .table-holder {
        overflow-x: scroll;
    }
    
    table {
        width: 100%;
        border-collapse: collapse;
        margin: 0 0 20px;
        background: rgba(255,255,255,.05);
        
        p {
            margin: 0;
        }
        
        p + p {
            margin-top: 10px;
        }
    }
        
    thead {
        th {
            font-weight: 500;
            font-size: 14px;
            color: #D5CBFF;
            padding: 8px 10px;
            text-align: left;
            white-space: nowrap;
        
            &:first-child {
                text-align: left;
                padding-left: 20px;
            }
            
            &:last-child {
                padding-right: 20px;
            }
        }
    }
    
    tbody {
    
        td {
            font-size: 14px;
            padding: 10px;
            vertical-align: top;
            
            @media (max-width: 991px) {
                font-size: 12px;
            }
            
            &:first-child {
                text-align: left;
                padding-left: 20px;
            }
            
            &:last-child {
                padding-right: 20px;
            }
        }
        
        td {
            border-top: 1px solid #201941;
        }
        
        .win {
            td {
                background: rgba(63, 49, 124, .5);
            }
        }
    }
`;

export default ContentArea;
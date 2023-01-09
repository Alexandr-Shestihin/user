import styled from "styled-components";

export const Styled = {
    Nav: styled.ul`
        list-style: none;
        margin: 0;
        padding: 0;
        
        li.locked {
            pointer-events: none;
        }
        
        li.active {
            a {
                color: #EDA211;
                font-weight: bold;
            }
        }
        
        li + li {
            margin-top: 18px;
        }
        
        a {
            font-weight: 500;
            font-size: 16px;
            text-decoration: none;
            color: #fff;
            display: flex;
            align-items: center;
            
            &:hover, &:focus {
                color: #EDA211;
            }
        }
        
        svg {
            display: block;
            margin-left: 6px;
            position: relative;
            top: -2px;
        }
    `
}
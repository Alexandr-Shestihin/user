import styled from "styled-components";
import picHeaderBG from "./img/header-bg.png";

export const Styled = {
    Header: styled.section`
        display: flex;
        flex-direction: column;
        background: url(${picHeaderBG}) no-repeat top center;
        background-size: cover;
        
        .top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 0;
        }
        
        .title {            
            .logo {
                
                img {
                    display: block;
                    
                    max-height: 40px;
                
                    @media (max-width: 767px) {
                        max-height: 50px;
                    }
                }
                
                &-sm {
                    display: none;
                    
                    @media (max-width: 767px) {
                        display: block;
                    }
                }
                
                &-lg {
                    display: block;
                    
                    @media (max-width: 767px) {
                        display: none;
                    }
                }
            }
        }
        
        .bottom {
            padding: 100px 0 120px;
            
            @media (max-width: 1199px) {
                padding: 80px 0 100px;
            }
            
            @media (max-width: 767px) {
                padding: 40px 0 60px;
                
                br {
                    display: none;
                }
            }
            
            h1 {
                margin: 0 0 30px;
                font-weight: bold;
                font-size: 48px;
                
                @media (max-width: 767px) {
                    font-size: 24px;
                    margin: 0 0 10px;
                }
            }
            
            > div {
                font-weight: 500;
                font-size: 21px;
                line-height: 1.5;
                margin: 0 0 60px;
                
                @media (max-width: 767px) {
                    font-size: 16px;
                    margin: 0 0 30px;
                }
            }
        }
    `,
    Button: styled.button`
        border-radius: 3px;
        border: 2px solid #EDA211;
        background: #EDA211;
        height: 50px;
        color: #fff;
        font-weight: 600;
        font-size: 16px;
        padding: 0 50px;
        cursor: pointer;
        transition: all .3s ease;
        
        @media (max-width: 767px) {
            padding: 0 15px;
            height: 40px;
        }
        
        &:hover, &:focus {
            background: #d5910f;
            border-color: #d5910f;
        }
        
        &.login {
            border-color: #B9A9FF;
            color: #B9A9FF;
            background: transparent;
            
            &:hover, &:focus {
                background: #B9A9FF;
                border-color: #B9A9FF;
                color: #fff;
            }
        }
    `,
    FlexGroup: styled.div`
        display: flex;
        align-items: center;
        
        button {
          margin-left: 24px;
        }
    `
}
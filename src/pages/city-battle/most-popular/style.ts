import styled from "styled-components";
import {InnerBox} from "../../../components/UI";

interface Props {
    image?: string;
}

export const Styled = {
    Title: styled(InnerBox)`
        font-weight: bold;
        font-size: 24px;
        text-align: center;
        color: #D5CBFF;
        margin: 0 0 10px;
    `,
    Previous: styled.div`
        font-weight: bold;
        font-size: 24px;
        color: #D5CBFF;
        margin: 40px 0 20px;
        text-align: center;
   `,
    TableTitle: styled.div`
        font-weight: bold;
        font-size: 24px;
        color: #D5CBFF;
        margin: 40px 0 20px;
        text-align: center;
   `,
    TableName: styled.div`
        display: flex;
        align-items: center;
        
        .item {
            display: flex;
            align-items: center;
        }
        
        .item + .item {
            margin-left: 8px;
        }
        
        .img {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 8px;
            
            img {
                display: block;
                max-width: 100%;
                max-height: 100%;
            }
        }
        
        .name {
            font-weight: 500;
            font-size: 14px;
            white-space: nowrap;
        }
        
        .vs {
            margin: 0 8px;
        }
    `,
    Cards: styled.div`
        display: flex;
        flex-wrap: wrap;
        margin: 0 -5px;
    `,
    CardHolder: styled.div`
        padding: 0 5px;
        margin: 0 0 10px;
        width: 50%;
        
        @media (max-width: 767px) {
            width: 100%;
        }
        
        &:first-child {
            width: 100%;
        }
    `,
    Slider: styled.div`

        .slide-holder {
            padding: 0 5px;
        }
        
        .slick-slide {
            img {
                display: block;
                max-width: 70px;
                margin: 0 auto;
            }
        }
        
        .slick-arrow::before {
            display: none !important;
        }
        
        .slick-disabled {
            opacity: .5;
        }
        
        .slick-next {
            right: -20px;
        }
        
        .slick-prev {
            left: -20px;
        }
        
        .slick-track {
            margin: 0;
        }
    `,
    Card: styled.div`
        background: #2F294C url(${(props: Props) => props.image}) no-repeat center center;
        background-size: cover;
        border-radius: 3px;
        padding: 15px;
        position: relative;
        text-align: center;
        cursor: pointer;
        
        .content-holder {
            width: 220px;
            margin: 0 auto;
            
            @media (max-width: 1199px) {
                width: 130px;
            }
        }
        
        .game {
            font-weight: bold;
            font-size: 18px;
            letter-spacing: 0.03em;
            text-transform: uppercase;
            
            color: #EDA211;
            margin: 0 0 4px;
        }
        
        .vs {
            font-weight: 500;
            font-size: 14px;
            margin: 0 0 4px;
            
            color: #EDA211;
            
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .social {
            display: flex;
            justify-content: center;
            margin: 20px 0 0;
            
            a {
                background: rgba(255,255,255,.05);
                border-radius: 3px;
                padding: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
        
                & + a {
                    margin-left: 4px;
                }
        
                svg {
                    display: block;
                    width: 18px;
                    height: 18px;
                }
            }
        }
        
        .date {
            font-weight: bold;
            font-size: 10px;
            letter-spacing: 0.03em;
        }
        
        .participant {
            position: absolute;
            top: 20px;
            text-align: center;
            
            &-left {
                left: 20px;
            }
            
            &-right {
                right: 20px;
            }
            
            .name {
                font-weight: 500;
                font-size: 12px;
                width: 60px;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .image {
                margin: 0 auto 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 60px;
                height: 60px;
                
                img {
                    display: block;
                    max-width: 100%;
                    max-height: 100%;
                }
            }
        }
        
        &.lg {
            @media (min-width: 768px) {
                padding: 30px;
            
                .content-holder {
                    width: 440px;
                    
                    @media (max-width: 1199px) {
                        width: 340px;
                    }
                }
                
                .game {
                    font-size: 36px;
                    margin: 0 0 16px;
                }
                
                .vs {
                    font-weight: bold;
                    font-size: 24px;
                    margin: 0 0 20px;
                }
                
                .social {
                    margin: 30px 0 0;
                    
                    a {
                        padding: 8px;
                
                        & + a {
                            margin-left: 10px;
                        }
                        
                        svg {
                            width: auto;
                            height: auto;
                        }
                    }
                }
                
                .date {
                    font-size: 18px;
                }
                
                .participant {
                    top: 30px;
                    
                    &-left {
                        left: 30px;
                    }
                    
                    &-right {
                        right: 30px;
                    }
                
                    .name {
                        font-weight: bold;
                        font-size: 18px;
                        width: 112px;
                    }
                    
                    .image {
                        margin: 0 0 12px;
                        width: 112px;
                        height: 112px;
                    }
                }
            }
        }
    `
}
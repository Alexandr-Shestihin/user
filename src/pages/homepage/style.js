import styled from "styled-components";
import map from "./img/map.svg";
import bonus01 from "./img/bonus-01.png";
import bonus02 from "./img/bonus-02.png";
import bonus03 from "./img/bonus-03.png";
import bonus04 from "./img/bonus-04.png";
import bonus05 from "./img/bonus-05.png";

const DefaultSection = styled.div`
    background: #fff;
    overflow: hidden;
    
    h2 {
        font-weight: bold;
        font-size: 36px;
        color: #000;
        margin: 0 0 40px;
        position: relative;
        
        @media (max-width: 767px) {
            font-size: 21px;
            margin: 0 0 20px;
        }
        
        span {
            background: #D5CBFF;
            padding: 0 6px;
        }
        
        .arrows {
            position: absolute;
            left: -50px;
            top: 16px;
            
            @media (max-width: 1199px) {
                display: none;
            }
        }
    }
    
    p, ul {
        font-weight: 500;
        font-size: 18px;
        line-height: 1.5;
        margin: 0 0 20px;
        color: rgba(0,0,0,.6);
        
        @media (max-width: 767px) {
            font-size: 16px;
        }
    }
    
    ul {
        li + li {
            margin-top: 8px;
        }
    }
    
    img {
        display: block;
        width: 100%;
    }
    
    .row {
        margin: 0 -15px;
        display: flex;
        flex-wrap: wrap;
    }
    
    .col {
        padding: 0 15px;
        width: 50%;
        
        @media (max-width: 991px) {
            width: 100%;
        }
    }
    
    .dots-decorator {
        position: relative;
        z-index: 0;
        padding: 80px 0;
        
        @media (max-width: 767px) {
            padding: 60px 0;
        }
        
        .dots {
            position: absolute;
            z-index: -1;
            
            @media (max-width: 1499px) {
                display: none;
            }
        }
    }
`;

export const Styled = {
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
            padding: 0 30px;
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
    BeInvolved: styled(DefaultSection)`
        
        .dots-decorator {
            .dots {
                &-t1 {
                    left: 20px;
                    top: 20px;
                }
                
                &-t2 {
                    bottom: 20px;
                    left: 20px;
                }
                
                &-t3 {
                    top: 50%;
                    transform: translateY(-50%);
                    right: 20px;
                }
            }
        }
        
        .col {
            @media (max-width: 991px) {
                &:first-child {
                    order: 1;
                    margin-top: 40px;
                }
            }
        }
    `,
    Line: styled.section`
        background: #3F317C;
        padding: 60px 0;
        
        @media (max-width: 991px) {
            padding: 40px 0;
        }
        
        @media (max-width: 767px) {
            padding: 30px 0;
        }
        
        > div {
            font-weight: bold;
            font-size: 36px;
            color: #fff;
            text-align: center;
            
            @media (max-width: 767px) {
                font-size: 21px;
            }
        }
    `,
    MapArea: styled(DefaultSection)`
        
        .dots-decorator {
            .dots {
                &-t1 {
                    left: 20px;
                    bottom: 20px;
                }
                
                &-t2 {
                    top: 20px;
                    right: 20px;
                }
            }
        }

        button {
            margin-top: 20px;
            
            @media (max-width: 767px) {
                margin-top: 10px;
            }
        }
    `,
    Triple: styled.section`
        background: #F8F6FF;
        padding: 80px 0;
        
        @media (max-width: 767px) {
            padding: 60px 0;
        }
        
        h2 {
            font-weight: bold;
            font-size: 36px;
            color: #000;
            margin: 0 0 50px;
            text-align: center;
            
            @media (max-width: 767px) {
                font-size: 21px;
                margin: 0 0 30px;
            }
        }
        
        .row {
            display: flex;
            margin: 0 -15px;
            flex-wrap: wrap;
        }
        
        .col {
            width: 33.3333%;
            padding: 0 15px;
            
            @media (max-width: 991px) {
                width: 100%;
                
                & + .col {
                    margin-top: 40px;
                }
            }
        }
        
        img {
            display: block;
            margin: 0 0 30px;
            max-width: 100%;
        }
        
        .flagHolder {
            position: relative;
            
            .flag {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
            }
            
            .hidden {
                opacity: 0;
            }
        }
        
        .title {
            font-weight: bold;
            font-size: 26px;
            margin: 0 0 20px;
            color: #000;
            
            @media (max-width: 767px) {
                font-size: 21px;
                margin: 0 0 20px;
            }
        }
        
        p {
            font-weight: 500;
            font-size: 18px;
            line-height: 1.5;
            color: rgba(0,0,0,.6);
            margin: 0;
            
            @media (max-width: 767px) {
                font-size: 16px;
            }
        }
    `,
    School: styled(DefaultSection)`
        .dots-decorator {
            .dots {
                &-t1 {
                    left: 20px;
                    top: 20px;
                }
                
                &-t2 {
                    bottom: 20px;
                    right: 20px;
                }
            }
        }
        
        .col {
            @media (max-width: 991px) {
                &:first-child {
                    order: 1;
                    margin-top: 40px;
                }
            }
        }
    `,
    WorldLine: styled.section`
        background: #3F317C;
        
        .map {
            background: ${props => props.noPicture ? '#3F317C' : `url(${map}) no-repeat center center`};
            background-size: contain;
            padding: 80px 0;
            
            @media (max-width: 767px) {
                padding: 60px 0;
            }
        }
        
        .title {
            text-align: center;
            font-weight: bold;
            font-size: 36px;
            margin: 0 0 24px;
            
            @media (max-width: 767px) {
                font-size: 21px;
                margin: 0 0 16px;
            }
        }
        
        .txt {
            font-weight: 500;
            font-size: 21px;
            margin: 0 0 30px;
            color: rgba(255,255,255,.9);
            text-align: center;
            
            @media (max-width: 767px) {
                font-size: 16px;
                margin: 0 0 20px;
            }
        }
        
        .btn-row {
            display: flex;
            justify-content: center;
        }
        
        .alliance-logo {
            width: 300px;
            max-width: 100%;
            margin: 0 auto;
            
            img {
                max-width: 100%;
            }
        }
        
        form {
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            
            .form-group {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                margin: 0 -15px;
            }
            
            .col {
                width: 360px;
                max-width: 100%;
                padding: 0 15px;
                
                @media (max-width: 767px) {
                    width: 100%;
                    
                    & + .col {
                        margin-top: 24px;
                    }
                }
            }
            
            .checkbox {
                width: 100%;
                max-width: 720px;
                padding: 0 15px;
            }
            
            .form-group + .form-group {
                margin-top: 30px;
                
                @media (max-width: 767px) {
                    margin-top: 24px;
                }
            }
            
            .btn-row {
                margin-top: 30px;
                
                @media (max-width: 767px) {
                    button {
                        height: 50px;
                        width: 100%;
                    }
                }
            }
        }
    `,
    Games: styled.section`
        background: #fff;
        padding: 80px 0;
        
        @media (max-width: 767px) {
            padding: 60px 0;
        }
        
        h2 {
            font-weight: bold;
            font-size: 36px;
            color: #000;
            margin: 0 0 40px;
            text-align: center;
            
            @media (max-width: 767px) {
                font-size: 21px;
                margin: 0 0 30px;
            }
        }
        
        .row {
            display: flex;
            flex-wrap: wrap;
            margin: 0 -15px;
        }
        
        .col {
            width: 20%;
            padding: 0 15px;
            
            @media (max-width: 991px) {
                width: 33.3333%;
            }
            
            @media (max-width: 767px) {
                width: 50%;
            }
        }
        
        img {
            max-width: 100%;
            display: block;
            filter: grayscale(100%);
            opacity: .5;
            
            &.active {
                filter: grayscale(0);
                opacity: 1;
            }
        }
    `,
    Cards: styled.section`
        background: #F8F6FF;
        padding: 80px 0;
        
        @media (max-width: 767px) {
            padding: 60px 0;
        }
        
        .soon {
            background: #EDA211;
            font-size: 16px;
            font-weight: bold;
            padding: 6px 12px;
            border-radius: 3px;
            color: #fff;
            margin: 0 auto 10px;
            width: 140px;
        }
        
        h2 {
            font-weight: bold;
            font-size: 36px;
            color: #000;
            margin: 0 0 30px;
            display: flex;
            justify-content: center;
            
            @media (max-width: 767px) {
                font-size: 21px;
                margin: 0 0 30px;
            }
        }
        
        .sub {
            font-weight: 500;
            font-size: 21px;
            text-align: center;
            color: rgba(0,0,0,.6);
            
            @media (max-width: 767px) {
                font-size: 16px;
                
                br {
                    display: none;
                }
            }
        }
        
        .main {
            display: flex;
            flex-wrap: wrap;
            margin-top: 50px; 
        }
        
        .item {
            width: 50%;
            height: 380px;
            position: relative;
            overflow: hidden;
            
            @media (max-width: 991px) {
                height: 300px;
            }
            
            @media (max-width: 767px) {
                height: 250px;
                width: 100%;
            }
            
            &:hover {
                .content {
                    bottom: 0;
                }
            }
        }
        
        .bg {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            
            &-01 {
                background: #fff url(${bonus01}) no-repeat center center;
                background-size: 75%;
            }
            
            &-02 {
                width: 50%;
                right: auto;
                background: #fff url(${bonus02}) no-repeat center center;
                background-size: contain;
            }
            
            &-03 {
                width: 50%;
                left: 50%;
                background: #fff url(${bonus03}) no-repeat center center;
                background-size: contain;
            }
            
            &-04 {
                background: #fff url(${bonus04}) no-repeat center center;
                background-size: cover;
            }
            
            &-05 {
                background: #fff url(${bonus05}) no-repeat center center;
                background-size: cover;
            }
        }
        
        .content {
            padding: 30px 30px 10px;
            position: absolute;
            bottom: -70px;
            left: 0;
            right: 0;
            z-index: 2;
            background: linear-gradient(0deg, rgba(0,0,0,.85) 0%, rgba(0,0,0,.5) 45%, rgba(0,0,0,0) 100%);
            transition: all .3s ease;
            
            @media (max-width: 1199px) {
                bottom: -90px;
            }
            
            @media (max-width: 767px) {
                bottom: -110px;
            }
            
            .title {
                font-weight: 700;
                font-size: 21px;
                margin: 0 0 20px;
            }
        }
        
        .btn-row {
            margin: 30px 0 0;
            display: flex;
            justify-content: center;
        }
    `,
    MapContainer: styled.div`
        height: 100%;
        
        @media (max-width: 991px) {
            margin-bottom: 40px;
        }
        
        #map {
            height: 100%;
            
            @media (max-width: 991px) {
                height: 400px;
            }
            
            @media (max-width: 767px) {
                height: 300px;
            }
        }
   `
}
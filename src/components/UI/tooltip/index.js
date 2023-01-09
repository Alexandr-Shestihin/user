import React from 'react';
import styled from "styled-components";

const icon = () => (
    <svg width="13" height="21" viewBox="0 0 13 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6.5" cy="10.5" r="6.5" fill="#D5CBFF"/>
        <path d="M5.70898 11.9102C5.70898 11.4772 5.7627 11.1322 5.87012 10.875C5.97754 10.6178 6.18913 10.3363 6.50488 10.0303C6.82389 9.72103 7.02572 9.5013 7.11035 9.37109C7.24056 9.17253 7.30566 8.95768 7.30566 8.72656C7.30566 8.42057 7.22917 8.18783 7.07617 8.02832C6.92643 7.86556 6.70508 7.78418 6.41211 7.78418C6.13216 7.78418 5.90592 7.86393 5.7334 8.02344C5.56413 8.17969 5.47949 8.3929 5.47949 8.66309H4.29297C4.29948 8.08691 4.49479 7.63118 4.87891 7.2959C5.26628 6.96061 5.77734 6.79297 6.41211 6.79297C7.06641 6.79297 7.57585 6.95898 7.94043 7.29102C8.30827 7.62305 8.49219 8.08691 8.49219 8.68262C8.49219 9.21322 8.24479 9.73568 7.75 10.25L7.14941 10.8408C6.93457 11.085 6.82389 11.4414 6.81738 11.9102H5.70898ZM5.62598 13.4287C5.62598 13.2367 5.6862 13.082 5.80664 12.9648C5.92708 12.8444 6.08984 12.7842 6.29492 12.7842C6.50326 12.7842 6.66764 12.846 6.78809 12.9697C6.90853 13.0902 6.96875 13.2432 6.96875 13.4287C6.96875 13.6077 6.91016 13.7575 6.79297 13.8779C6.67578 13.9984 6.50977 14.0586 6.29492 14.0586C6.08008 14.0586 5.91406 13.9984 5.79688 13.8779C5.68294 13.7575 5.62598 13.6077 5.62598 13.4287Z" fill="#201941"/>
    </svg>
)

const Tip = styled.div`
        display: inline-block;
        margin-left: 4px;
        position: relative;
        width: 16px;
        height: 16px;
        
        svg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
        }
        
        &:hover {
            .message {
                opacity: 1;
            }
        }
        
        .message {
            position: absolute;
            bottom: 100%;
            left: 50%;
            width: 200px;
            transform: translateX(-50%) translateY(-10px);
            padding: 15px;
            border-radius: 3px;
            z-index: 1;
            background: #3F317C;
            box-shadow: 0 0 20px #1A133A;
            font-size: 12px;
            line-height: 1.5;
            text-align: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity .3s ease;
            
            &:after {
                content: '';
                display: block;
                width: 0;
                height: 0;
                border: 6px solid transparent;
                border-top-color: #3F317C;
                position: absolute;
                left: 50%;
                top: 100%;
                transform: translateX(-50%);
                z-index: 2;
            }
        }
    `;

const Tooltip = ({message = ''}) => {
    return (
        <Tip>
            {icon()}
            <div className="message">
                {message}
            </div>
        </Tip>
    )
}

export default Tooltip;
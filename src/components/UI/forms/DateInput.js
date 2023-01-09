import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import ErrorMessage from "../blocks/ErrorMessage";

const Holder = styled.div`
        position: relative;
        
        .react-datepicker-time__input {
            input {
                color: #111;
            }
        }
        
        .react-datepicker-wrapper {
            width: 100%;
        }
        
        &.has-error {
            input {
                border-color: rgba(235, 87, 87, .2) !important;
            }
        }
        
        input {
            width: 100%;
            height: 30px;
            display: block;
            
            border: 1px solid rgba(213, 203, 255, .2);
            background: transparent;
            border-radius: 3px;
            
            font-weight: 500;
            font-size: 14px;
            color: #fff;
            padding: 0 6px;
            
            transition: all .3s ease;
            outline: none;
            cursor: pointer;
            
            &:hover, &:focus {
                border-color: rgba(213, 203, 255, .6);
            }
        }
    `,
    Icon = styled.svg`
        position: absolute;
        right: 6px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
    `;

const renderIcon = () => (
    <Icon width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0)">
            <path d="M15.9375 18H2.06255C0.924774 18 0 17.0752 0 15.9375V3.56247C0 2.4247 0.924774 1.50006 2.06255 1.50006H15.9375C17.0752 1.50006 18 2.4247 18 3.56247V15.9375C18 17.0752 17.0752 18 15.9375 18ZM2.06255 2.62506C1.54578 2.62506 1.125 3.0457 1.125 3.56247V15.9375C1.125 16.4542 1.54578 16.875 2.06255 16.875H15.9375C16.4542 16.875 16.875 16.4542 16.875 15.9375V3.56247C16.875 3.0457 16.4542 2.62506 15.9375 2.62506H2.06255Z" fill="#9E9BAC"/>
            <path d="M17.4375 7.12506H0.5625C0.251999 7.12506 0 6.87306 0 6.56256C0 6.25206 0.251999 6.00006 0.5625 6.00006H17.4375C17.748 6.00006 18 6.25206 18 6.56256C18 6.87306 17.748 7.12506 17.4375 7.12506Z" fill="#9E9BAC"/>
            <path d="M4.31299 4.5C4.00249 4.5 3.75049 4.248 3.75049 3.9375V0.5625C3.75049 0.251999 4.00249 0 4.31299 0C4.62349 0 4.87549 0.251999 4.87549 0.5625V3.9375C4.87549 4.248 4.62349 4.5 4.31299 4.5Z" fill="#9E9BAC"/>
            <path d="M13.687 4.5C13.3765 4.5 13.1245 4.248 13.1245 3.9375V0.5625C13.1245 0.251999 13.3765 0 13.687 0C13.9975 0 14.2495 0.251999 14.2495 0.5625V3.9375C14.2495 4.248 13.9975 4.5 13.687 4.5Z" fill="#9E9BAC"/>
        </g>
        <defs>
            <clipPath id="clip0">
                <rect width="18" height="18" fill="white"/>
            </clipPath>
        </defs>
    </Icon>
);

export default function DateInput({
    minDate = null,
    maxDate = null,
    name,
    error,
    selected,
    onChange,
    placeholderText,
    withTime = false,
    dateFormat = "dd.MM.yyyy"
}) {
    return (
        <Holder className={error ? 'has-error' : ''}>
            <DatePicker
                maxDate={maxDate}
                minDate={minDate}
                selected={selected}
                onChange={onChange}
                dateFormat={dateFormat}
                showTimeInput={withTime}
                name={name}
                placeholderText={placeholderText}/>
            {renderIcon()}
            {error &&
                <ErrorMessage>{error}</ErrorMessage>
            }
        </Holder>

    )
}

DateInput.propTypes = {
    name: PropTypes.string,
    error: PropTypes.string,
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
    selected: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    placeholderText: PropTypes.string
};
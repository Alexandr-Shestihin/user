import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ErrorMessage from "../blocks/ErrorMessage";
import {Label} from "./Label";

const StyledTextArea = styled(TextareaAutosize)`
        width: 100%;
        height: 30px;
        display: block;
        
        border: 1px solid rgba(213, 203, 255, .2);
        background: transparent;
        border-radius: 3px;
        
        font-weight: 500;
        font-size: 14px;
        line-height: 1.5;
        color: #fff;
        padding: 4px 6px;
        resize: none;
        
        transition: border-color .3s ease;
        outline: none;
        
        &:hover, &:focus {
            border-color: rgba(213, 203, 255, .5);
        }
    `,
    Holder = styled.div`
        position: relative;
    `;

export default function TextArea({name, error, value, required, label, onChange}) {
    return (
        <Holder>
            {label &&
                <Label>{label} {required && '*'}</Label>
            }
            <StyledTextArea
                name={name}
                value={value}
                onChange={onChange}
                rowsMin={3}
            />
            {error &&
                <ErrorMessage>{error}</ErrorMessage>
            }
        </Holder>

    )
}

TextArea.propTypes = {
    name: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};
import React from "react";
import styled from "styled-components";
import Slider from 'rc-slider';
import PropTypes from "prop-types";

const Range = Slider.Range;
const Wrapper = styled.div`
    .rc-slider {
        &-rail {
            background: rgba(213, 203, 255, .24);
        }
        
        &-track {
            background: rgba(213, 203, 255, 1);
        }
        
        &-handle {
            border-color: rgba(213, 203, 255, 1) !important;
            background: rgba(213, 203, 255, 1);
            box-shadow: none !important;
            width: 12px;
            height: 12px;
            margin-top: -4px;
        }
    }
    
    &.hide-left-handler {
        .rc-slider-handle-1 {
            opacity: 0;
            pointer-events: none;
        }
    }
`;

export default function RangePicker({
    min,
    max,
    value,
    onChange,
    step = 1,
    hideLeftHandler = false
}) {
    return (
        <Wrapper className={hideLeftHandler ? 'hide-left-handler' : ''}>
            <Range
                min={min}
                max={max}
                value={value}
                step={step}
                onChange={onChange}
                defaultValue={[min, max]}/>
        </Wrapper>
    )
}

RangePicker.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    value: PropTypes.array.isRequired,
    step: PropTypes.number,
    onChange: PropTypes.func.isRequired
};
import React, {useState, useRef} from "react";
import styled from "styled-components";
import {FormattedMessage} from "react-intl";
import {CheckBox} from "../../../components/UI";
import {ClickOutside} from "../../../helpers";
import {models} from '../models';
import plusIcon from '../icons/plusIcon';

const Wrapper = styled.div`
    position: relative;
    white-space: nowrap;
    
    .controller.blur {
        opacity: .5;
    }

    button {
        border: none;
        cursor: pointer;
        background: transparent;
        display: flex;
        align-items: center;
        outline: none;
        padding: 0;
        
        .text {
            font-size: 14px;
            transition: color .3s ease;
            color: #fff;
        }
    }
    
    .options {
        position: absolute;
        z-index: 5;
        top: 100%;
        right: 0;
        margin-top: 10px;
        
        background: #2B244A;
        box-shadow: 0 0 20px #140F2B;
        border-radius: 3px;
        padding: 15px;
        
        &:before {
            content: '';
            display: block;
            border: 6px solid transparent;
            border-bottom-color: #2B244A;
            position: absolute;
            bottom: 100%;
            right: 3px;
        }
        
        > div + div {
            margin-top: 10px;
        }
    }
`;

const StyledWrapper = ({onChange, selectedOptions, selectedGame}) => {
    const shouldBlur = selectedOptions.length === 5;
    const [dropDownState, setDropDownState] = useState(false);
    const dropDownRef = useRef(null);
    const closeDropDown = () => setDropDownState(false);
    ClickOutside(dropDownRef, closeDropDown);

    return (
        <Wrapper ref={dropDownRef}>
            <button
                onClick={() => setDropDownState(!dropDownState)}>
                <span className="text">
                    <FormattedMessage id="ratings.changeColumn" />
                </span>
                {plusIcon()}
            </button>
            {dropDownState &&
            <div className="options">
                {models[selectedGame].map(item => {
                    const isSelected = selectedOptions.findIndex(option => option.key === item.key) !== -1;

                    return (
                        <div
                            key={item.key}
                            className={`controller ${shouldBlur && !isSelected && 'blur'}`}>
                            <CheckBox
                                checked={isSelected}
                                onChange={() => onChange(item)}>
                                <FormattedMessage id={item.value} />
                            </CheckBox>
                        </div>
                    )
                })}
            </div>
            }
        </Wrapper>
    )
}

export default StyledWrapper;
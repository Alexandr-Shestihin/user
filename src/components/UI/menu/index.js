import React, {useRef, useState} from "react";
import {ClickOutside} from "../../../helpers";
import styled from "styled-components";

const StyledMenu = styled.div`
    position: relative;
    
    .control {
        background: #201941;
        border-radius: 3px;
        width: 16px;
        height: 34px;
        flex-shrink: 0;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        
        span {
            width: 3px;
            height: 3px;
            border-radius: 1px;
            background: #fff;
        }
        
        span + span {
            margin-top: 2px;
        }
        
        &:hover {
            span {
                background: #F2994A;
            }
        }
    }
    
    .control.active {
        span {
            background: #F2994A;
        }
    }
    
    .menu {
        position: absolute;
        top: 0;
        right: 100%;
        z-index: 1;
        background: #3F317C;
        box-shadow: 0 0 20px #1A133A;
        border-radius: 3px;
        padding: 16px;
        margin-right: 12px;
        
        &:after {
            content: '';
            display: block;
            border: 5px solid transparent;
            border-left-color: #3F317C;
            position: absolute;
            top: 12px;
            left: 100%;
        }
    }
    
    .menu-item {
        display: flex;
        align-items: center;
        cursor: pointer;
        white-space: nowrap;
        
        svg {
            margin-right: 8px;
        }
        
        span {
            display: block;
            white-space: nowrap;
            font-weight: 500;
            font-size: 12px;
            transition: color .3s ease;
        }
    }
    
    .menu-item:hover {
        span {
            color: #F2994A;
        }
    }
    
    .menu-item + .menu-item {
        margin-top: 8px;
    }
`;

export const Menu = ({children}) => {
    const [controlState, setControlState] = useState(false);
    const controlRef = useRef(null);

    ClickOutside(controlRef, () => setControlState(false));

    return (
        <StyledMenu ref={controlRef} onClick={e => e.stopPropagation()}>
            <div className={controlState ? 'control active' : 'control'} onClick={() => setControlState(true)}>
                <span/>
                <span/>
                <span/>
            </div>
            {controlState && (
                    <div className="menu" onClick={() => setControlState(false)}>
                        {children}
                    </div>
                )
            }
        </StyledMenu>
    )
}

export const MenuItem = ({callback, children}) => {
    return (
        <div className="menu-item" onClick={() => typeof callback === 'function' && callback()}>
            {children}
        </div>
    )
}
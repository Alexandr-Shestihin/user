import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Row = styled.div`
    display: flex;
    margin: 20px 0 0;
    
    button + button {
        margin-left: 16px;
    }
    
    &.center {
        justify-content: center;
    }
    
    &.right {
        justify-content: flex-end;
    }
`;

export default function ButtonRow({direction, children}) {
    return (
        <Row className={direction}>
            {children}
        </Row>
    )
}

ButtonRow.propTypes = {
    direction: PropTypes.oneOf(['left', 'center', 'right'])
};
import React, {Component} from "react";
import styled from "styled-components";
import {connect} from 'react-redux';

const StyledSpinner = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255,255,255,.5);
    z-index: 9999;
    transition: all .3s ease;
    opacity: 0;
    pointer-events: none;
    
    &.is-active {
        opacity: 1;
        pointer-events: auto;
    }
`;

class Spinner extends Component {
    render() {
        const {spinner} = this.props;

        return (
            <StyledSpinner className={spinner > 0 ? 'is-active' : ''}>

            </StyledSpinner>
        )
    }
}

const mapStateToProps = state => {
    return {
        spinner: state.spinner
    }
};

export default connect(mapStateToProps)(Spinner);
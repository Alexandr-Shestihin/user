import React from "react";
import PropTypes, {number, string} from "prop-types";
import styled from "styled-components";
import {CircularProgressbar} from 'react-circular-progressbar';

const Holder = styled.div`
    width: 150px;
    height: 150px;
    margin: 0 auto;
    box-shadow: 0 0 20px rgba(255,190,63,0.5);
    border-radius: 50%;
`;

export default function ProgressCircle({value = 0, fakeProgress = false}) {
    const styles = {
        root: {},
        path: {
            stroke: '#EDA211'
        },
        trail: {
            stroke: '#3F317C'
        },
        text: {
            fill: '#fff',
            fontWeight: 'bold',
            fontSize: '24px'
        }
    };

    return (
        <Holder>
            <CircularProgressbar
                value={fakeProgress ? 100 : value}
                styles={styles}
                strokeWidth={5}
                text={fakeProgress ? value : `${value}%`}/>
        </Holder>
    )
}

ProgressCircle.propTypes = {
    value: PropTypes.oneOfType([string, number])
};
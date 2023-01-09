import React from "react"
import {Styled} from '../style'

import iconWesco from './img/wesco.png';
import iconPamesco from './img/pamesco.png';
import iconCBDEL from './img/cbdel.png';

export const wescoBrazil = () => (
    <Styled.Wrapper>
        <img src={iconWesco} alt="Wesco"/>
        <img src={iconPamesco} alt="Pamesco"/>
        <img src={iconCBDEL} alt="CBDEL"/>
    </Styled.Wrapper>
)
import React from "react"
import {Styled} from '../style'

import iconWesco from './img/wesco.png';
import iconPamesco from './img/pamesco.png';
import iconFedecolde from './img/fedecolde.png';

export const wescoColombia = () => (
    <Styled.Wrapper>
        <img src={iconWesco} alt="Wesco"/>
        <img src={iconPamesco} alt="Pamesco"/>
        <img src={iconFedecolde} alt="Fedecolde"/>
    </Styled.Wrapper>
)
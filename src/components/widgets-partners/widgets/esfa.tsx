import React from "react"
import {Styled} from '../style'

import iconWesco from './img/wesco.png';
import iconEsfa from './img/esfa.png'

export const esfa = () => (
    <Styled.Wrapper>
        <img src={iconWesco} alt="WESCO"/>
        <img src={iconEsfa} alt="ESFA"/>
    </Styled.Wrapper>
)
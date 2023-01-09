import React from "react"
import {Styled} from '../style'

import iconWesco from './img/wesco.png';
import iconEsfa from './img/esfa.png'
import iconNigeria from './img/nigeria.png'

export const nigeria = () => (
    <Styled.Wrapper>
        <img src={iconWesco} alt="WESCO"/>
        <img src={iconEsfa} alt="ESFA"/>
        <img src={iconNigeria} alt="Nigeria"/>
    </Styled.Wrapper>
)
import React from "react"
import {Styled} from '../style'

import iconWesco from './img/wesco.png';
import iconWescoItaly from './img/wesco-italy.png'

export const wescoItaly = () => (
    <Styled.Wrapper>
        <img src={iconWesco} alt="WESCO"/>
        <img src={iconWescoItaly} alt="WESCO ITALY"/>
    </Styled.Wrapper>
)
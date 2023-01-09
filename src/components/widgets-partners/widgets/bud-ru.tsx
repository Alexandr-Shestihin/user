import React from "react"
import {Styled} from '../style'

import budLogoNA from './img/bud-logo-na.png'
import budLightNA from './img/bud-light-na.png'

export const budRu = () => (
    <Styled.Wrapper>
        <img src={budLogoNA} alt="bud"/>
        <img src={budLightNA} alt="bud"/>
    </Styled.Wrapper>
)
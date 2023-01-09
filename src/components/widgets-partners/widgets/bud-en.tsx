import React from "react"
import {Styled} from '../style'

import budLogo from './img/bud-logo.png'
import budLight from './img/bud-light.png'

export const budEn = () => (
    <Styled.Wrapper>
        <img src={budLogo} alt="bud"/>
        <img src={budLight} alt="bud"/>
    </Styled.Wrapper>
)
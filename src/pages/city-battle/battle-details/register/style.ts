import styled from "styled-components";
import map from '../../../homepage/img/map.svg';

export const Styled = {
    Wrapper: styled.div`
        background: #3F317C;
        border-radius: 3px;
        margin-top: 10px;
    `,
    Map: styled.div`
        padding: 50px 15px;
        background: url(${map}) no-repeat center center;
        background-size: contain;
        text-align: center;
    `,
    Title: styled.div`
        font-weight: bold;
        font-size: 18px;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        color: #EDA211;
        margin: 0 0 20px;
    `,
    Message: styled.p`
        font-size: 14px;
        margin: 0 0 30px;
    `
}
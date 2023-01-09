import styled from "styled-components";
import {ContentBox} from '../../../components/UI';

export const Styled = {
    Wrapper: styled(ContentBox)`
        padding: 20px 10px;
    `,
    Title: styled.div`
        font-weight: bold;
        font-size: 18px;
        text-align: center;
        margin: 0 0 18px;
        color: #EDA211;
    `,
    Group: styled.div`
        & + & {
            margin-top: 30px;
        }
    `
}
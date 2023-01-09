import styled from "styled-components";
import {ContentBox} from "../UI";

export const Styled = {
    Wrapper: styled(ContentBox)`
        padding: 30px 10px;
        
        img {
            display: block;
            max-width: 100%;
            margin: 0 auto;
        }
    
        img + img {
            margin-top: 24px;
        }
    `
}
import styled from "styled-components";
import {ContentBox, SideBarRowLeft} from '../../components/UI';

export const Styled = {
    Main: styled(ContentBox)`
        padding: 20px;
    `,
    Grid: styled(SideBarRowLeft)`
        > div {
            @media (max-width: 991px) {
                width: 100% !important;
                
                &:first-child {
                    order: 1;
                }
            }
        }
    `
}
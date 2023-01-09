import styled from 'styled-components';

export const SideBarRowLeft = styled.div`
      display: flex;
      flex-wrap: wrap;
      margin: 0 -5px;
      
      > div {
            padding: 0 5px;
            
            &:first-child {
                width: 100%;
                
                @media (min-width: 768px) {
                    width: 33.3333%;
                }
                
                @media (min-width: 992px) {
                    width: 25%;
                }
            }
            
            &:last-child {
                width: 100%;
                
                @media (min-width: 768px) {
                    width: 66.6666%;
                }
                
                @media (min-width: 992px) {
                    width: 75%;
                }
            }
      }
      
      &.change-order-on-mobile {
            @media (max-width: 767px) {
                > div {
                    &:first-child {
                        order: 1;
                    }
                }
            }
      }
`;
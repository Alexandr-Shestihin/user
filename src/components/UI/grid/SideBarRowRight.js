import styled from 'styled-components';

export const SideBarRowRight = styled.div`
      display: flex;
      flex-wrap: wrap;
      margin: 0 -5px;
      
      > div {
            padding: 0 5px;
            
            &:last-child {
                width: 100%;
                
                @media (min-width: 992px) {
                    width: 25%;
                }
            }
            
            &:first-child {
                width: 100%;
                
                @media (min-width: 992px) {
                    width: 75%;
                }
            }
      }
`;
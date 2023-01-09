import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    padding: 0 15px;
    
    @media (min-width: 768px) {
        width: 750px;
    }
    
    @media (min-width: 992px) {
        width: 970px;
    }
    
    @media (min-width: 1200px) {
        width: 1170px;
    }
`;
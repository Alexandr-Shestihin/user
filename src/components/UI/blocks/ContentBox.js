import styled from 'styled-components';

const ContentBox = styled.div`
    margin: 0 0 10px;
    background: #000000;
    border-radius: 3px;
    padding: 30px;
    
    @media (max-width: 767px) {
        padding: 30px 20px;
    }
`;

export default ContentBox;
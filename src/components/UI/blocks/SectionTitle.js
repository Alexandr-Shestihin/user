import styled from 'styled-components';

const SectionTitle = styled.h2`
    font-weight: 500;
    font-size: 21px;
    color: var(--main-title-text);
    margin: 0 0 16px;
    
    @media(max-width: 767px) {
        font-size: 18px;
        text-align: center;
    }
`;

export default SectionTitle;
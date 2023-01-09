import styled from 'styled-components';

const InnerBox = styled.div`
    background: rgba(255,255,255,.05);
    border-radius: 3px;
    padding: 20px;
    height: ${props => props.fullHeight ? '100%' : 'auto'};
`;

export default InnerBox;
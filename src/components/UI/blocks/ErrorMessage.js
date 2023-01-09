import styled from 'styled-components';

const ErrorMessage = styled.div`
        font-size: 12px;
        color: red;
        margin: 2px 0 0;
        position: ${props => props.static ? 'static' : ''};
        top: 100%;
        left: 0;
        right: 0;
    `;

export default ErrorMessage;
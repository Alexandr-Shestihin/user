import React from 'react';
import PropTypes from "prop-types";

export default function IconFacebook({fill = 'white'}) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.6746 0H1.32464C0.593559 0 0 0.592373 0 1.32464V22.6746C0 23.4068 0.593559 24 1.32464 24H12.8188V14.7058H9.69137V11.0832H12.8188V8.41178C12.8188 5.31239 14.7113 3.62379 17.4768 3.62379C18.8026 3.62379 19.9395 3.72298 20.2711 3.76605V7.00573L18.3529 7.00652C16.8492 7.00652 16.5592 7.7214 16.5592 8.76981V11.082H20.1466L19.6775 14.7042H16.5588V23.9988H22.6742C23.406 23.9988 24 23.4049 24 22.6746V1.32385C23.9996 0.592373 23.4064 0 22.6746 0Z" fill={fill}/>
        </svg>
    )
}

IconFacebook.propTypes = {
    fill: PropTypes.string
};
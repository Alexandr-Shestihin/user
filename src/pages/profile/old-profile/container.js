import React from 'react';
import s from './style.module.css'


const Container = ({children, className}) => {
    return (
        <div className={`${s.wrapper} ${className}`}>
            {children}
        </div>
    );
};

export default Container;
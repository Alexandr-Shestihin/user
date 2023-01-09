import React from 'react';
import s from './style.module.css'
import Container from "../../common/container";


import home from '../../assests/svg/profile/13.svg'
import reward from '../../assests/svg/profile/10.svg'
import calendar from '../../assests/svg/profile/14.svg'
import replay from '../../assests/svg/profile/15.svg'
 // import replay1 from '../../assests/svg/profile/06.svg'
import menu from '../../assests/svg/profile/17.svg'
import line from '../../assests/Layer 10.png'

const Header = () => {
    const items = [
        {img: home},
        {img: reward},
        {img: calendar},
        {img: replay},
        {img: menu},
    ]

    return (
        <div className={s.header}>
            <img src={line} alt="" className={s.line}/>
            <Container className={s.wrapper}>
                <div className={s.header__items}>
                    {items.map((el, i) => (
                        <img src={el.img} alt="" key={i} className={s.header_items__item}/>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Header;

import React, {useRef, useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {RootState} from "../../redux/store"
import {setInterfaceLang} from "../../redux/actions/language";
import {INTERFACE_LANGUAGES} from "../../config"
import {ClickOutside} from "../../helpers";
import {Styled} from './style';

const arrowIcon = () => (
    <svg width="16" height="8" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L4.5 4L8 1" stroke="#B9A9FF" strokeLinecap="round"/>
    </svg>
)

const LangSwitcher = () => {
    const interfaceLang = useSelector<RootState>(store => store.interfaceLang)
    const [dropdownState, setDropdownState] = useState(false)
    const dropDownRef = useRef(null);
    const closeDropdown = () => setDropdownState(false)
    const dispatch = useDispatch()
    const switchLang = (lang: string) => {
        localStorage.setItem('interfaceLang', lang)
        dispatch(setInterfaceLang(lang))
        closeDropdown()
    }

    ClickOutside(dropDownRef, closeDropdown);

    return (
        <Styled.Wrapper ref={dropDownRef}>
            <div className="current" onClick={() => setDropdownState(true)}>
                <div className="current__lang">{String(interfaceLang)}</div>
                {arrowIcon()}
            </div>
            {dropdownState &&
                <Styled.Dropdown>
                    {INTERFACE_LANGUAGES
                        .filter(lang => lang !== interfaceLang)
                        .map(lang => {
                            return (
                                <div
                                    key={lang}
                                    onClick={() => switchLang(lang)}>
                                    {lang}
                                </div>
                            )
                        })
                    }
                </Styled.Dropdown>
            }
        </Styled.Wrapper>
    )
}

export default LangSwitcher
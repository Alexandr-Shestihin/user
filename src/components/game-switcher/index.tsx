import React, {useRef, useState, FunctionComponent} from "react";
import {ClickOutside} from "../../helpers";
import {Styled} from "./style";

const arrowIcon = () => (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M17.1 8.53174L12.5 13.0952L7.9 8.53174L6.5 9.92063L12.5 15.873L18.5 9.92063L17.1 8.53174Z" fill="#EDA211"/>
    </svg>
)

interface Props {
    selectedGame: string;
    gamesAvailable: string[];
    setSelectedGame: (game: string) => void;
    dropdownPosition?: 'left' | 'right';
}

const GameSwitcher: FunctionComponent<Props> = ({
    selectedGame,
    gamesAvailable,
    dropdownPosition,
    setSelectedGame
}) => {
    const menuRef = useRef(null)
    const [dropdownState, setDropdownState] = useState(false)
    const options = gamesAvailable.filter(game => game !== selectedGame)

    const onSelect = (game: string) => {
        setDropdownState(false)
        setSelectedGame(game)
    }

    const nameTransformer = (gameName: string) => {
        switch (gameName) {
            case 'cs-go':
                return 'cs:go';
            case 'pes-mobile':
                return 'PES';
            case 'cod-mobile':
                return 'COD';
            case 'pubg-mobile':
                return 'PUBG';
            default:
                return gameName
        }
    }

    ClickOutside(menuRef, () => setDropdownState(false));

    return (
        <Styled.Wrapper ref={menuRef}>
            <Styled.Current
                onClick={() => setDropdownState(true)}
                className={gamesAvailable.length > 1 ? 'has-options' : ''}>
                {nameTransformer(selectedGame)}
                {arrowIcon()}
            </Styled.Current>
            {gamesAvailable.length > 1 && dropdownState &&
                <Styled.Dropdown className={dropdownPosition}>
                    {options.map((game: string) => (
                        <Styled.DropdownItem key={game} onClick={() => onSelect(game)}>
                            {nameTransformer(game)}
                        </Styled.DropdownItem>
                    ))}
                </Styled.Dropdown>
            }
        </Styled.Wrapper>
    )
}

export default GameSwitcher
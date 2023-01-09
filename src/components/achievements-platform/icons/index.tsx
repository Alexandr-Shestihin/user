import React, {FunctionComponent} from "react";

// platform
import iconSuccessfulRegistration from './platform/icon-successful-registration.png';
import iconConnectOneGame from './platform/icon-connect-one-game.png';
import iconConnectTwoGames from './platform/icon-connect-two-games.png';
import iconFilledEducation from './platform/icon-filled-education.png';
import iconAddFriend from './platform/icon-add-friend.png';
import iconAddThreeFriend from './platform/icon-add-three-friend.png';
import iconAddFiveFriend from './platform/icon-add-five-friend.png';
import iconCreateChat from './platform/icon-create-chat.png';
import iconRatingStart from './platform/icon-rating-start.png';
import iconFilledGeo from './platform/icon-filled-geo.png';

// bud-light
// import iconDilly from './bud-light/icon-dilly.png';

interface IProps {
    iconName: string;
    iconDescription: string;
}

export const Icon: FunctionComponent<IProps> = ({iconName, iconDescription}) => {
    switch (iconName) {
        case 'successful-registration':
            return <img src={iconSuccessfulRegistration} alt={iconDescription} title={iconDescription} />
        case 'connect-one-game':
            return <img src={iconConnectOneGame} alt={iconDescription} title={iconDescription} />
        case 'connect-two-games':
            return <img src={iconConnectTwoGames} alt={iconDescription} title={iconDescription} />
        case 'filled-education':
            return <img src={iconFilledEducation} alt={iconDescription} title={iconDescription} />
        case 'add-friend':
            return <img src={iconAddFriend} alt={iconDescription} title={iconDescription} />
        case 'add-three-friends':
            return <img src={iconAddThreeFriend} alt={iconDescription} title={iconDescription} />
        case 'add-five-friends':
            return <img src={iconAddFiveFriend} alt={iconDescription} title={iconDescription} />
        case 'create-chat':
            return <img src={iconCreateChat} alt={iconDescription} title={iconDescription} />
        case 'rating-start':
            return <img src={iconRatingStart} alt={iconDescription} title={iconDescription} />
        case 'filled-geo':
            return <img src={iconFilledGeo} alt={iconDescription} title={iconDescription} />
        default:
            return <img src={iconSuccessfulRegistration} alt={iconDescription} title={iconDescription} />
    }
}
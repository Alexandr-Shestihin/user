import React, {FunctionComponent} from "react";

interface Props {
    type: 'facebook' | 'twitter' | 'vk' | 'telegram'
}

const share = (e: React.SyntheticEvent<HTMLElement>, shareLink: string) => {
    e.preventDefault()
    e.stopPropagation()

    const width = 650, height = 450;

    window.open(shareLink, 'Share', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width='+width+',height='+height+',top='+(window.screen.height/2-height/2)+',left='+(window.screen.width/2-width/2));
}

const ShareLink: FunctionComponent<Props> = ({
    type,
    children
}) => {

    const siteURL = window.location.href

    let shareLink: string;

    switch (type) {
        case 'facebook':
            shareLink = 'https://www.facebook.com/sharer.php?u=' + siteURL
            break;
        case 'twitter':
            shareLink = 'https://twitter.com/intent/tweet?text=' + siteURL
            break;
        case 'vk':
            shareLink = 'https://vkontakte.ru/share.php?url=' + siteURL
            break;
        case 'telegram':
            shareLink = 'https://telegram.me/share/url?url=' + siteURL
            break;
        default:
            return <div/>
    }

    return (
        <a href={shareLink} onClick={e => share(e, shareLink)}>
            {children}
        </a>
    )
}

export default ShareLink
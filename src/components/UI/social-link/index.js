import React from "react";
import {
    IconFacebook,
    IconInstagramm,
    IconReddit,
    IconSteam, IconTwitch,
    IconTwitter,
    IconVK,
    IconYoutube,
    IconWhatsApp,
    IconTeamspeak,
    IconDiscord
} from "../../social-icons";
import styled from "styled-components";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {useDispatch} from "react-redux";
import {showNotificationModal} from "../../../redux/actions";

const StyledLink = styled.a`
        width: 24px;
        height: 24px;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: .5;
        transition: opacity .3s ease;
        
        & + & {
            margin-left: 20px;
        }
        
        &:hover {
            opacity: 1;
        }
    `,
    StyledHolder = styled.div`
        display: flex;
    `

export const SocialLinkHolder = ({children}) => {
    return (
        <StyledHolder>
            {children}
        </StyledHolder>
    )
}

export const SocialLink = ({link, type}) => {
    const dispatch = useDispatch()

    if (!link) {
        return false;
    }

    switch (type) {
        case 'facebook':
            return (
                <StyledLink href={link} target="_blank">
                    <IconFacebook fill="#fff"/>
                </StyledLink>
            )
        case 'instagram':
            return (
                <StyledLink href={link} target="_blank">
                    <IconInstagramm fill="#fff"/>
                </StyledLink>
            )
        case 'youtube':
            return (
                <StyledLink href={link} target="_blank">
                    <IconYoutube fill="#fff"/>
                </StyledLink>
            )
        case 'vk':
            return (
                <StyledLink href={link} target="_blank">
                    <IconVK fill="#fff"/>
                </StyledLink>
            )
        case 'twitter':
            return (
                <StyledLink href={link} target="_blank">
                    <IconTwitter fill="#fff"/>
                </StyledLink>
            )
        case 'steam':
            return (
                <StyledLink href={link} target="_blank">
                    <IconSteam fill="#fff"/>
                </StyledLink>
            )
        case 'reddit':
            return (
                <StyledLink href={link} target="_blank">
                    <IconReddit fill="#fff"/>
                </StyledLink>
            )
        case 'twitch':
            return (
                <StyledLink href={link} target="_blank">
                    <IconTwitch fill="#fff"/>
                </StyledLink>
            )
        case 'discord':
            return (
                <StyledLink href={link} target="_blank">
                    <IconDiscord />
                </StyledLink>
            )
        case 'whatsapp':
            return (
                <CopyToClipboard
                    text={link}
                    onCopy={() => dispatch(showNotificationModal('Link copied to clipboard'))}>
                    <StyledLink href={link} target="_blank" onClick={e => e.preventDefault()}>
                        <IconWhatsApp />
                    </StyledLink>
                </CopyToClipboard>
            )
        case 'teamspeak':
            return (
                <CopyToClipboard
                    text={link}
                    onCopy={() => dispatch(showNotificationModal('Link copied to clipboard'))}>
                    <StyledLink href={link} target="_blank" onClick={e => e.preventDefault()}>
                        <IconTeamspeak />
                    </StyledLink>
                </CopyToClipboard>
            )
        default:
            return false;
    }
}
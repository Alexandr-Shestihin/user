import React from 'react';
import {Timer} from "../../timer";
import Slider from "react-slick";
import {IconFacebook, IconTwitter, IconVK, IconTelegram} from "../../../../components/social-icons";
import ShareLink from "../../../../components/share-link";
import {Icon} from "../../../../components/achievements-platform/icons";
import {Styled} from './style';
import {FormattedMessage} from "react-intl";
import LangDecoder from "../../../../components/lang-decoder";

const formatDate = date => date.split('-').reverse().join('.')
const SlickArrow = ({currentSlide, slideCount, children, ...props}) => <button {...props}>{children}</button>

const sliderSettings = {
    dots: false,
    infinite: false,
    slidesToShow: 9,
    slidesToScroll: 1,
    nextArrow: (
        <SlickArrow>
            <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.112875 4.104V2.84H7.98488V0.856L12.4809 3.464L7.98488 6.088V4.104H0.112875Z" fill="white"/>
            </svg>
        </SlickArrow>
    ),
    prevArrow: (
        <SlickArrow>
            <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.8871 4.104V2.84H5.01512V0.856L0.519124 3.464L5.01512 6.088V4.104H12.8871Z" fill="white"/>
            </svg>
        </SlickArrow>
    )
}

export const Info = ({battle}) => {
    return (
        <Styled.Container className={battle.game}>
            <Styled.InfoWrapper>
                <Styled.Title>
                    <LangDecoder data={battle} target="name"/>
                </Styled.Title>
                <Styled.Date>
                    {`${formatDate(battle.startDate)} - ${formatDate(battle.endDate)}`}
                </Styled.Date>
                <Timer startDate={battle.startDate} />
                <Styled.FinalMatch>
                    <FormattedMessage id="cityBattle.finalMatch" /> <strong>{formatDate(battle.endDate)}</strong>
                </Styled.FinalMatch>
                <Styled.Description>
                    <LangDecoder data={battle} target="description"/>
                </Styled.Description>
            </Styled.InfoWrapper>
            <Styled.SocialIcons>
                <ShareLink type="facebook">
                    <IconFacebook fill="#D5CBFF"/>
                </ShareLink>
                <ShareLink type="twitter">
                    <IconTwitter fill="#D5CBFF"/>
                </ShareLink>
                <ShareLink type="vk">
                    <IconVK fill="#D5CBFF"/>
                </ShareLink>
                <ShareLink type="telegram">
                    <IconTelegram fill="#D5CBFF"/>
                </ShareLink>
            </Styled.SocialIcons>
            {!!battle?.rewards?.length &&
                <>
                    <Styled.RewardsTitle>
                        <FormattedMessage id="cityBattle.rewards" />
                    </Styled.RewardsTitle>
                    <Styled.RewardsSlider>
                        <Slider {...sliderSettings}>
                            {battle.rewards.map(icon => (
                                <Icon
                                    key={icon.name}
                                    iconName={icon.name}
                                    iconDescription={icon.description}
                                />
                            ))}
                        </Slider>
                    </Styled.RewardsSlider>
                </>
            }
        </Styled.Container>
    )
}
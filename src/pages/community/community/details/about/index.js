import React from "react";
import {Styled} from "./style";
import noImage from '../../../../../assets/no-image.png'
import {FormattedMessage} from "react-intl";
import {Button, ButtonRow, SocialLink, SocialLinkHolder} from "../../../../../components/UI";
import LangDecoder from "../../../../../components/lang-decoder";

const About = ({details, leave, join}) => {
    const {community, members} = details;

    return (
        <>
            <Styled.AboutRow>
                <Styled.AboutCol>
                    <Styled.AboutInner>
                        <div className="image">
                            <div className="image-holder">
                                <img src={community.image || noImage} alt="community"/>
                            </div>
                        </div>
                    </Styled.AboutInner>
                </Styled.AboutCol>
                <Styled.AboutCol>
                    <Styled.AboutInner>
                        <LangDecoder data={{i18n: community.description}} target="description"/>
                    </Styled.AboutInner>
                </Styled.AboutCol>
            </Styled.AboutRow>
            <Styled.AboutBox>
                <Styled.AboutBoxGroup>
                    <Styled.AboutBoxTitle>
                        <FormattedMessage id="community.list.description.requirements"/>
                    </Styled.AboutBoxTitle>
                    <Styled.AboutBoxText>
                        <LangDecoder data={{i18n: community.requirements}} target="requirements"/>
                    </Styled.AboutBoxText>
                </Styled.AboutBoxGroup>
                <Styled.AboutBoxGroup>
                    <Styled.AboutBoxTitle>
                        <FormattedMessage id="community.list.description.fee"/>
                    </Styled.AboutBoxTitle>
                    <Styled.AboutBoxText>
                        {community.fee}
                    </Styled.AboutBoxText>
                </Styled.AboutBoxGroup>
                <Styled.AboutBoxGroup>
                    <Styled.AboutBoxTitle>
                        <FormattedMessage id="community.list.description.comprise"/>
                    </Styled.AboutBoxTitle>
                    <Styled.AboutBoxText>
                        {community.comprise.join(', ')}
                    </Styled.AboutBoxText>
                </Styled.AboutBoxGroup>
            </Styled.AboutBox>
            <Styled.AboutBox>
                <Styled.AboutBoxTitle>
                    <FormattedMessage id="community.list.description.statements"/>
                </Styled.AboutBoxTitle>
                <Styled.InnerRow>
                    <Styled.InnerCol>
                        {community.foundedAt &&
                            <Styled.List>
                                <FormattedMessage id="community.list.description.founded" tagName="div"/>
                                <div>{community.foundedAt.split('-')[0]}</div>
                            </Styled.List>
                        }
                        {!!community.games.length &&
                            <Styled.List>
                                <FormattedMessage id="community.list.description.games" tagName="div"/>
                                <div>{community.games.join(', ')}</div>
                            </Styled.List>
                        }
                        {!!community.country.length &&
                            <Styled.List>
                                <FormattedMessage id="community.list.description.country" tagName="div"/>
                                <div>{community.subtype === 'global' ? 'Global' : community.country.join(', ')}</div>
                            </Styled.List>
                        }
                        {community.city &&
                            <Styled.List>
                                <FormattedMessage id="community.list.description.city" tagName="div"/>
                                <div>{community.city}</div>
                            </Styled.List>
                        }
                    </Styled.InnerCol>
                    <Styled.InnerCol>
                        {community.hq &&
                            <Styled.List>
                                <FormattedMessage id="community.list.description.hq" tagName="div"/>
                                <div>{community.hq}</div>
                            </Styled.List>
                        }
                        <Styled.List>
                            <FormattedMessage id="community.list.description.members" tagName="div"/>
                            <div>{members.length}</div>
                        </Styled.List>
                    </Styled.InnerCol>
                </Styled.InnerRow>
            </Styled.AboutBox>
            <Styled.AboutBox>
                <Styled.AboutBoxTitle>
                    <FormattedMessage id="community.list.description.contacts"/>
                </Styled.AboutBoxTitle>
                <Styled.InnerRow>
                    <Styled.InnerCol>
                        {community.website &&
                            <Styled.List>
                                <FormattedMessage id="community.list.description.website" tagName="div"/>
                                <div>{community.website}</div>
                            </Styled.List>
                        }
                        {community.email &&
                            <Styled.List>
                                <FormattedMessage id="community.list.description.email" tagName="div"/>
                                <div>{community.email}</div>
                            </Styled.List>
                        }
                    </Styled.InnerCol>
                    <Styled.InnerCol>
                        <SocialLinkHolder>
                            <SocialLink type="facebook" link={community.facebook} />
                            <SocialLink type="instagram" link={community.insta} />
                            <SocialLink type="youtube" link={community.youtube} />
                            <SocialLink type="vk" link={community.vk} />
                            <SocialLink type="twitter" link={community.twitter} />
                            <SocialLink type="twitch" link={community.twitch} />
                            <SocialLink type="steam" link={community.steam} />
                            <SocialLink type="reddit" link={community.reddit} />
                        </SocialLinkHolder>
                    </Styled.InnerCol>
                </Styled.InnerRow>
            </Styled.AboutBox>
            <ButtonRow direction="right">
                <Button
                    label={<FormattedMessage id={`community.list.controls.${details.joined ? 'leave' : 'join'}`}/>}
                    action={() => details.joined ? leave(community.uuid) : join(community.uuid)} />
            </ButtonRow>
        </>
    )
}

export default About
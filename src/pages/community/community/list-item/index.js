import React from "react";
import noImage from '../../../../assets/no-image.png';
import {Styled} from "./style";
import {FormattedMessage} from "react-intl";
import {useHistory} from "react-router-dom";
import {ArrowButton, Button} from "../../../../components/UI";
import LangDecoder from "../../../../components/lang-decoder";

export const ListItem = ({item, join, leave}) => {
    const {community} = item
    const history = useHistory()

    return (
        <Styled.Body>
            <Styled.Image>
                <img
                    onClick={() => history.push(`/communities/${community.uuid}`)}
                    src={community.image || noImage}
                    alt="logo"/>
            </Styled.Image>
            <Styled.Data>
                <Styled.Name>
                    <LangDecoder data={{i18n: community.name}} target="name"/>
                </Styled.Name>
                {community.description &&
                    <Styled.Description>
                        <LangDecoder data={{i18n: community.description}} target="description"/>
                    </Styled.Description>
                }
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
                {community.requirements &&
                    <Styled.List>
                        <FormattedMessage id="community.list.description.requirements" tagName="div"/>
                        <div>
                            <LangDecoder data={{i18n: community.requirements}} target="requirements"/>
                        </div>
                    </Styled.List>
                }
                {community.fee &&
                    <Styled.List>
                        <FormattedMessage id="community.list.description.fee" tagName="div"/>
                        <div>{community.fee}</div>
                    </Styled.List>
                }
                <Styled.Controls>
                    <ArrowButton
                        label={<FormattedMessage id="community.list.controls.details"/>}
                        action={() => history.push(`/communities/${community.uuid}`)} />
                    <Button
                        label={<FormattedMessage id={`community.list.controls.${item.joined ? 'leave' : 'join'}`}/>}
                        action={() => item.joined ? leave(community.uuid) : join(community.uuid)} />
                </Styled.Controls>
            </Styled.Data>
        </Styled.Body>
    )
}
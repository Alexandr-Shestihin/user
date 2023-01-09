import React, {useState, FunctionComponent} from "react";
import {ArrowButton, TitleRowTitle, ContentBox} from "../UI";
import {Styled} from "./style";
import {Icon} from './icons';
import {FormattedMessage, useIntl} from "react-intl";

interface IAchievementPlatform {
    description: string;
    name: string;
    receivedAt: string;
    title: string;
}

interface IProps {
    data: IAchievementPlatform[]
}

const AchievementsPlatform: FunctionComponent<IProps> = ({
    data = []
}) => {
    const [useTiny, setUseTiny] = useState(true)
    const tiny = data.slice(0,20)
    const dataToPrint = useTiny ? tiny : data
    const intl = useIntl()

    if (!dataToPrint.length)
        return null;

    return (
        <ContentBox>
            <Styled.AchievementsTitleRow>
                <TitleRowTitle>
                    <FormattedMessage id="id.achievementsPlatform"/>
                </TitleRowTitle>
                {data.length > 20 &&
                    <ArrowButton
                        label={
                            useTiny
                                ? intl.formatMessage({id: 'global.buttons.viewAll'})
                                : intl.formatMessage({id: 'global.buttons.hide'})
                        }
                        action={() => setUseTiny(!useTiny)}/>
                }
            </Styled.AchievementsTitleRow>
            <Styled.AchievementsContainer>
                {dataToPrint.map(item => {
                    return (
                        <Styled.AchievementsItem key={item.name}>
                            <Icon iconName={item.name} iconDescription={item.description}/>
                        </Styled.AchievementsItem>
                    )
                })}
            </Styled.AchievementsContainer>
            {data.length > 20 &&
                <Styled.AchievementsButtonRow>
                    <ArrowButton
                        label={
                            useTiny
                                ? intl.formatMessage({id: 'global.buttons.viewAll'})
                                : intl.formatMessage({id: 'global.buttons.hide'})
                        }
                        action={() => setUseTiny(!useTiny)}/>
                </Styled.AchievementsButtonRow>
            }
        </ContentBox>
    )
}

export default AchievementsPlatform
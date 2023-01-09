import React, {useState, FunctionComponent} from "react";
import {ArrowButton, TitleRowTitle, ContentBox} from "../UI";
import {Styled} from "./style";
import {FormattedMessage, useIntl} from "react-intl";

interface IAchievementCSGO {
    achieved: boolean;
    apiName: string;
    appId: number;
    metadata: {
        defaultvalue: number;
        description: string;
        displayName: string;
        hidden: number;
        icon: string;
        icongray: string;
        name: string;
    }
    steamId: number;
    unlockTime: number;
    uuid: string;
}

interface IProps {
    data: IAchievementCSGO[]
}

const AchievementsSteam: FunctionComponent<IProps> = ({
    data = []
}) => {
    const [useTiny, setUseTiny] = useState(true)
    const filtered = data.filter(item => item.achieved)
    const tiny = filtered.slice(0,20)
    const dataToPrint = useTiny ? tiny : filtered
    const intl = useIntl()

    if (!dataToPrint.length)
        return null;

    return (
        <ContentBox>
            <Styled.AchievementsTitleRow>
                <TitleRowTitle>
                    <FormattedMessage id="id.achievementsGame"/>
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
                        <Styled.AchievementsItem key={item.uuid}>
                            <img
                                src={item.metadata.icon}
                                title={item.metadata.description}
                                alt={item.metadata.description}/>
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

export default AchievementsSteam
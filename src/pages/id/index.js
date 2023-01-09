import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {LinearProgress} from "@material-ui/core";
import {useParams} from "react-router-dom";
import {Container, ContentBox, SideBarRowRight} from '../../components/UI';
import {API, API_ROUTER} from "../../api";
import Membership from "./membership";
import MyTeams from "./my-teams";
import AchievementsSteam from "../../components/achievements-steam";
import AchievementsPlatform from "../../components/achievements-platform";
import NewUsers from "../../components/widgets-new-users";
import UserInfo from "./user-info";
import Performance from "./performance";
import WarningNotification from "../../components/warning-notification";
import {isAuthenticated} from "../../helpers";

export default function Profile() {
    // helpers
    const {url} = useParams();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    // this user data
    const userData = useSelector(store => store.userData);

    // target user data
    const [targetUserData, setTargetUserData] = useState(null);

    // select game
    const [selectedGame, setSelectedGame] = useState(null);
    const [gamesAvailable, setGamesAvailable] = useState([])

    useEffect(() => {
        setSelectedGame(null)

        const params = {
            ...API_ROUTER.user.getUserDataByUrl,
            pathKeys: {
                url
            }
        }

        API.request(params, true)
            .then(data => {
                setTargetUserData(data)
                setSuccess(true)
                // games
                const gamesAvailable = Object.keys(data.games?.statistics || {})
                setGamesAvailable(gamesAvailable)
                setSelectedGame(gamesAvailable[0] || null)
            })
            .catch(() => setError(true))
    }, [url]);

    if (!success && !error) {
        return (
            <Container>
                <ContentBox>
                    <LinearProgress/>
                </ContentBox>
            </Container>
        )
    }

    if (error || !url.length) {
        return (
            <Container>
                <ContentBox>
                    <div>User not found...</div>
                </ContentBox>
            </Container>
        )
    }

    // is current user
    let isCurrentUser = false;
    if (userData && targetUserData) {
        isCurrentUser = userData.uuid === targetUserData.uuid
    }

    // game details
    const achievements = targetUserData?.games?.achievements[selectedGame] || [];
    const performance = targetUserData?.games?.statistics[selectedGame];

    // platform achievements
    const platformAchievements = targetUserData.achievements;

    // steam warning
    const warningMessage = (
        <>
            <p>Seems you have a private Steam account.</p>
            <p>To get access to the rating, please change your privacy on Steam.</p>
        </>
    )

    return (
        <Container>
            <SideBarRowRight>
                <div>
                    <UserInfo
                        data={targetUserData}
                        isCurrentUser={isCurrentUser}
                        gamesAvailable={gamesAvailable}
                        selectedGame={selectedGame}
                        setSelectedGame={setSelectedGame}/>

                    {!!targetUserData.communities.length &&
                        <Membership communities={targetUserData.communities}/>
                    }

                    {isAuthenticated() && <MyTeams data={targetUserData} isCurrentUser={isCurrentUser}/>}

                    {targetUserData && !targetUserData.topGamer &&
                        <AchievementsPlatform data={platformAchievements}/>
                    }

                    {isCurrentUser && userData && userData.steamId && userData.steamProblem &&
                        <WarningNotification message={warningMessage} />
                    }

                    <Performance
                        userUuid={targetUserData.uuid}
                        performance={performance}
                        gamesAvailable={gamesAvailable}
                        selectedGame={selectedGame}
                        setSelectedGame={setSelectedGame}/>

                    <AchievementsSteam data={achievements}/>
                </div>
                <div>
                    <NewUsers />
                </div>
            </SideBarRowRight>
        </Container>
    )
}

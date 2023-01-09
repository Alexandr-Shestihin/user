import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {LinearProgress} from "@material-ui/core";
import {Container, ContentBox} from '../../components/UI';
import TournamentsBar from "./tournaments-bar";
import MostPopular from "./most-popular";
import BattleDetails from "./battle-details";
import ParticipantDetails from "./participant-details";
import {Styled} from './style';
import {API, API_ROUTER} from "../../api";

export default function CityBattles() {
    const {battleUuid, details, city} = useParams()
    const [popularBattles, setPopularBattles] = useState(null)
    const [currentBattles, setCurrentBattles] = useState(null)
    const [ongoingBattles, setOngoingBattles] = useState(null)

    useEffect(() => {
        if (!details && !city) {
            API.request({...API_ROUTER.battles.getPopular}, true)
                .then(({battles}) => setPopularBattles(battles))
                .catch(err => toast.error(err.data && err.data.message))

            API.request({...API_ROUTER.battles.getAside}, true)
                .then(({current, ongoing}) => {
                    setCurrentBattles(current)
                    setOngoingBattles(ongoing)
                })
                .catch(err => toast.error(err.data && err.data.message))
        }
    }, [details, city])


    if (details && city)
        return <ParticipantDetails/>

    if (!currentBattles || !ongoingBattles || !popularBattles)
        return (
            <Container>
                <ContentBox>
                    <LinearProgress />
                </ContentBox>
            </Container>
        )

    return (
        <Container>
            <Styled.Grid>
                <div>
                    <TournamentsBar currentBattles={currentBattles} ongoingBattles={ongoingBattles}/>
                </div>
                <div>
                    <Styled.Main>
                        {battleUuid
                            ? <BattleDetails />
                            : <MostPopular
                                popularBattles={popularBattles}
                                currentBattles={currentBattles}
                                ongoingBattles={ongoingBattles}/>
                        }
                    </Styled.Main>
                </div>
            </Styled.Grid>
        </Container>
    )
}
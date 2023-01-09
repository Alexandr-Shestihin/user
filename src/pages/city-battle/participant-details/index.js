import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {LinearProgress} from "@material-ui/core";
import {API, API_ROUTER} from "../../../api";
import {Container, ContentBox} from "../../../components/UI";
import ParticipantDetailsTable from './Table'

const ParticipantDetails = () => {
    const {battleUuid, details, city} = useParams()
    const [battleData, setBattleData] = useState(null)
    const [loadingState, setLoadingState] = useState(true)

    useEffect(() => {
        if (battleUuid) {
            const params = {
                ...API_ROUTER.battles.getBattleInfo,
                pathKeys: {
                    uuid: battleUuid
                }
            }

            API.request(params, true)
                .then(({battle}) => {
                    setBattleData(battle)
                    setLoadingState(false)
                })
                .catch(err => console.error(err))
        }
    }, [])

    if (loadingState || !battleData || !details || !city) {
        return (
            <Container>
                <ContentBox>
                    <LinearProgress />
                </ContentBox>
            </Container>
        )
    }

    return <ParticipantDetailsTable battle={battleData} city={city}/>
}

export default ParticipantDetails
import React, {useEffect, useState} from "react";
import {ContentBox, Container} from "../../../components/UI";
import {LinearProgress} from "@material-ui/core";
import {useHistory, useParams} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import {API, API_ROUTER} from "../../../api";
import {useDispatch} from "react-redux";
import {isAuthenticated} from "../../../helpers";
import {showAuthModal} from "../../../redux/actions";

export default function TeamInvite() {
    const {code} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const [error, setError] = useState(false)

    useEffect(() => {

        if (!code) {
            setError(true)
            return;
        }

        localStorage.setItem('team-invite', code)

        if (!isAuthenticated()) {
            dispatch(showAuthModal())
            return;
        }

        API.request({
                ...API_ROUTER.teams.referral,
                pathKeys: {
                    referral: code
                }
            }, true)
            .then(team => {
                history.push(`/teams/team/${team.url}`)
            })
            .catch(err => {
                setError(true)
                console.error(err)
            })
    }, [code, history, dispatch])

    if (!code || error) {
        return (
            <Container>
                <ContentBox>
                    <FormattedMessage id="teams.invite.notValid" />
                </ContentBox>
            </Container>
        )
    }

    return (
        <Container>
            <ContentBox>
                <LinearProgress />
            </ContentBox>
        </Container>
    )
}
import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { LinearProgress } from "@material-ui/core";
import { API, API_ROUTER } from "../../api";
import { useHistory } from "react-router-dom";
import noImage from "../../assets/no-image.png";
import { Styled } from "./style";


export default function NewTournaments() {
    const history = useHistory();
    const [tournaments, setTournaments] = useState([])
    const [requestSuccess, setRequestSuccess] = useState(false)

    useEffect(() => {
        API.request({ ...API_ROUTER.tournaments.getTournaments })
            .then(res => {
                setTournaments(res.tournaments)
                setRequestSuccess(true)
            })
            .catch(err => console.log(err))
    }, []);

    function formattedDate(date) {
        date = date.substring(0, date.indexOf('T'))
        return date.split("-").reverse().join(".")
    }

    const renderTournaments = tournaments => {

        if (!tournaments.length)
            return (
                <Styled.Empty>
                    <FormattedMessage id="widget.newTournaments.noTournaments" />
                </Styled.Empty>
            )

        return (
            <div>
                {tournaments.map(({ uuid, url, logo, date_start, name, _game }, id) => (
                    id < 5
                        ? <Styled.Tournament
                            key={uuid}>
                            <div
                                className="main"
                                onClick={() => history.push(`/tournaments/tournament/${url}`)}>
                                <div className="avatar">
                                    <img src={logo?.url || noImage} className="picture" alt="logo" />
                                </div>
                                <div className="info">
                                    <div className="date">{formattedDate(date_start)}</div>
                                    <div className="game">{_game.name}</div>
                                </div>
                                <div className="name">{name}</div>
                            </div>
                        </Styled.Tournament>
                        : null
                ))}
            </div>
        )
    };

    return (
        <>
            <Styled.StyledContentBox>
                <Styled.Title>
                    <FormattedMessage id="widget.newTournaments.title" />
                </Styled.Title>
                {requestSuccess ? renderTournaments(tournaments) : <LinearProgress />}
            </Styled.StyledContentBox>
        </>
    )
}

import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {LinearProgress} from "@material-ui/core";
import {API,API_ROUTER} from "../../../api";
import {toast} from "react-toastify";
import {Info} from "./info";
import {Register} from "./register";
import {Statistic} from "./battle-statistic";
import {Leaderboard} from "./leaderboard";

const Battle = ({battleMain, updateHandler}) => {
    const {battle, voted, statistics} = battleMain;

    return (
        <>
            <Info battle={battle} />
            <Register />
            <Statistic battle={battle} statistics={statistics} voted={voted} updateHandler={updateHandler}/>
            <Leaderboard battle={battle} statistics={statistics} />
        </>
    )
}

const BattleDetails = () => {
    const {battleUuid} = useParams();
    const [battle, setBattle] = useState(null);
    const updateHandler = () => {
        const params = {
            ...API_ROUTER.battles.getBattleInfo,
            pathKeys: {
                uuid: battleUuid
            }
        }

        API.request(params, true)
            .then(battle => setBattle(battle))
            .catch(err => toast.error(err.data && err.data.message))
    }

    useEffect(() => {
        setBattle(null)

        const params = {
            ...API_ROUTER.battles.getBattleInfo,
            pathKeys: {
                uuid: battleUuid
            }
        }

        API.request(params, true)
            .then(battle => setBattle(battle))
            .catch(err => toast.error(err.data && err.data.message))
    }, [battleUuid])

    return !battle ? <LinearProgress/> : <Battle battleMain={battle} updateHandler={updateHandler}/>
}

export default BattleDetails
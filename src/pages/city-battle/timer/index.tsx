import React, {FunctionComponent, useEffect, useState} from "react";
import {Styled} from "./style";
import {FormattedMessage} from "react-intl";

interface Props {
    startDate?: string;
}

interface ITimeLeft {
    daysLeft: string | number;
    hoursLeft: string | number;
    minutesLeft: string | number;
    secondsLeft: string | number;
}

export const Timer: FunctionComponent<Props> = ({startDate = '1989-01-01'}) => {
    const timeDiff = (new Date(startDate)).getTime() - (new Date()).getTime()
    const [timeLeft, setTimeLeft] = useState<ITimeLeft>({
        daysLeft: 0,
        hoursLeft: 0,
        minutesLeft: 0,
        secondsLeft: 0
    })
    const getTimeLeft = () => {
        let diff = Math.floor(((new Date(startDate)).getTime() - (new Date()).getTime()) / 1000)

        let daysLeft: string | number = Math.floor(diff / 86400);
        diff -= daysLeft * 86400;
        if (('' + daysLeft).length === 1) daysLeft = '0' + daysLeft;

        let hoursLeft: string | number  = Math.floor(diff / 3600) % 24;
        diff -= hoursLeft * 3600;
        if (('' + hoursLeft).length === 1) hoursLeft = '0' + hoursLeft;

        let minutesLeft: string | number  = Math.floor(diff / 60) % 60;
        diff -= minutesLeft * 60;
        if (('' +minutesLeft).length === 1) minutesLeft = '0' + minutesLeft;

        let secondsLeft: string | number  = diff % 60;
        if (('' + secondsLeft).length === 1) secondsLeft = '0' + secondsLeft;

        setTimeLeft({
            daysLeft,
            hoursLeft,
            minutesLeft,
            secondsLeft
        })
    }

    useEffect(() => {
        getTimeLeft()
        const interval = setInterval(() => {
            getTimeLeft()
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    if (timeDiff < 0)
        return <div/>

    return (
        <Styled.Wrapper>
            <Styled.Title>
                <FormattedMessage id="cityBattle.timer.title" />
            </Styled.Title>
            <Styled.Body>
                <div className="row">
                    <div className="value">{timeLeft.daysLeft}</div>
                    <div className="label">
                        <FormattedMessage id="cityBattle.timer.days" />
                    </div>
                </div>
                <div className="row">
                    <div className="value">{timeLeft.hoursLeft}</div>
                    <div className="label">
                        <FormattedMessage id="cityBattle.timer.hours" />
                    </div>
                </div>
                <div className="row">
                    <div className="value">{timeLeft.minutesLeft}</div>
                    <div className="label">
                        <FormattedMessage id="cityBattle.timer.minutes" />
                    </div>
                </div>
                <div className="row">
                    <div className="value">{timeLeft.secondsLeft}</div>
                    <div className="label">
                        <FormattedMessage id="cityBattle.timer.seconds" />
                    </div>
                </div>
            </Styled.Body>
        </Styled.Wrapper>
    )
}
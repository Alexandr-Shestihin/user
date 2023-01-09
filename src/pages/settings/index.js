import React, {useRef, useEffect} from "react";
import {useSelector} from "react-redux";
import ProfileTemplate from "../../components/profile/profile-template";
import PersonalInfo from "./personal-info";
import Education from "./education";
import Games from "./games";
import WarningNotification from "../../components/warning-notification";

const Settings = () => {
    const gamesRef = useRef(null)
    const userData = useSelector(state => state.userData)
    const scrollTo = useSelector(state => state.scrollTo)

    const warningMessage = (
        <>
            <p>Seems you have a private Steam account.</p>
            <p>To get access to the rating, please change your privacy on Steam.</p>
        </>
    )

    // scroll to games on nav click
    useEffect(() => {
        if (scrollTo === 'games') {
            gamesRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [scrollTo]);

    if (!userData)
        return false

    return (
        <ProfileTemplate>
            <PersonalInfo />
            <Education />
            {userData.steamId && userData.steamProblem &&
                <WarningNotification message={warningMessage} />
            }
            <div ref={gamesRef}>
                <Games/>
            </div>
        </ProfileTemplate>
    )
};

export default Settings;
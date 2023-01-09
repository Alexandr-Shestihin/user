import React from "react";
import PropTypes from "prop-types";
import PerformanceCSGO from './games/cs-go';
import PerformanceDota2 from "./games/dota2";
import PerformanceFIFA20 from "./games/fifa-20/";

export default function Performance({performance, selectedGame, gamesAvailable, setSelectedGame, userUuid}) {
    switch (selectedGame) {
        case 'cs-go':
            return <PerformanceCSGO
                performance={performance}
                selectedGame={selectedGame}
                gamesAvailable={gamesAvailable}
                setSelectedGame={setSelectedGame}/>
        case 'dota2':
            return <PerformanceDota2
                userUuid={userUuid}
                performance={performance}
                selectedGame={selectedGame}
                gamesAvailable={gamesAvailable}
                setSelectedGame={setSelectedGame}/>
        case 'fifa-20':
            return <PerformanceFIFA20
                userUuid={userUuid}
                performance={performance}
                selectedGame={selectedGame}
                gamesAvailable={gamesAvailable}
                setSelectedGame={setSelectedGame}/>
        default:
            return null
    }
}

Performance.propTypes = {
    performance: PropTypes.object,
    selectedGame: PropTypes.string,
    gamesAvailable: PropTypes.array.isRequired,
    setSelectedGame: PropTypes.func.isRequired,
    userUuid: PropTypes.string
};
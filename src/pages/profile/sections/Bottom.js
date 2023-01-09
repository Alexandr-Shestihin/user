import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FormattedMessage, injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { API, API_ROUTER } from "../../../api";
import { getUserData } from "../../../redux/actions";
import { connect } from "react-redux";
import Row from "../../../components/profile-bricks/Row";
import pubgImg from "../../../assets/images/img-login_register_profile_rodster/pubg.png";
import firefareImg from "../../../assets/images/img-login_register_profile_rodster/firefare.png";
import { loadAllGames } from "../../../redux/actions/games";
import loadUserGames from "../../../helpers/games/loadUserGames";
import getPublicGames from "../../../helpers/games/getPublicGames";
import { useHistory, useParams } from "react-router-dom";

import { getGameCards, getTournamentCards } from "../const";

const Bottom = ({ user, history, userData, teamId, isCreator, id }) => {
  const tournaments = useSelector((state) => state.userTournaments.tournaments);
  const [games, setGames] = useState([]);
  const [userPublicGames, setUserPublicGames] = useState([]);
  useEffect(() => {
    getPublicGames(id)
      .then((res) => {
        setUserPublicGames(res.userGames);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  useEffect(() => {
    API.request({
      ...API_ROUTER.games.getUserGames,
    })
      .then((res) => {
        setGames(res.games);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Row
        title={
          isCreator() ? (
            <FormattedMessage id="id.myGames" />
          ) : (
            <FormattedMessage id="id.games" />
          )
        }
        cards={
          isCreator()
            ? getGameCards(games, history, isCreator())
            : getGameCards(userPublicGames, history, isCreator())
        }
      />
      <Row
        title={
          isCreator() ? (
            <FormattedMessage id="id.myTournaments" />
          ) : (
            <FormattedMessage id="id.tournaments" />
          )
        }
        cards={getTournamentCards(tournaments, history)}
      />
      <Row
        title={
          isCreator() ? (
            <FormattedMessage id="id.myStatistics" />
          ) : (
            <FormattedMessage id="id.statistics" />
          )
        }
        cards={getRosterCards(user, history)}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    runGetUserData: () => dispatch(getUserData()),
  };
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Bottom));

function getRosterCards(user, history) {
  const statisticCard1 = [
    {
      id: uuidv4(),
      add: false,
      title: "Roster",
      action: () => {
        history.push("/rating");
      },
      img: "",
      icon: "user-group",
      isComing: true,
    },
    {
      id: uuidv4(),
      add: false,
      title: <FormattedMessage id="id.statistics.all" />,
      action: () => {
        history.push("/rating");
      },
      img: "",
      icon: "graphic",
      isComing: true,
    },
  ];

  const statisticCard2 = [
    {
      id: uuidv4(),
      add: false,
      title: <FormattedMessage id="id.statistics.all" />,
      action: () => {
        history.push("/rating");
      },
      img: "",
      icon: "graphic",
    },

    {
      id: uuidv4(),
      add: false,
      title: <FormattedMessage id="game.pubg.stats" />,
      action: () => {
        history.push("/rating");
      },
      img: pubgImg,
    },
    {
      id: uuidv4(),
      add: false,
      title: <FormattedMessage id="game.FreeFire.stats" />,
      action: () => {
        history.push("/rating");
      },
      img: firefareImg,
    },
  ];

  return statisticCard1;
}

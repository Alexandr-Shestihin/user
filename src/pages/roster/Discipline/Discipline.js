import React, { useState, useContext, useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";
import "./Discipline.css";
import { useDispatch, useSelector } from "react-redux";
import loadGames from "../../../helpers/games/loadGames";
import { setCreateRosterValues } from "../../../redux/actions";
import image from "../../../assets/no-image.png";
import { useHistory } from "react-router-dom";
import { API, API_ROUTER } from "../../../api";
import { toast } from "react-toastify";

const Discipline = (props) => {
  let id = useParams();
  const dispatch = useDispatch();
  console.log(id);
  const [game, changeGameDiscipline] = useState(false);
  const [games, setGames] = useState([]);

  const history = useHistory();
  const changeGame = () => {
    API.request({
      ...API_ROUTER.teams.postTeamGame,
      pathKeys: {
        teamId: id.teamId,
      },
      data: {
        gameId: game.id,
      },
    })
      .then(() => {
        history.push(`/teams/team/${id.teamId}/roster/create`);
      })
      .catch((err) => console.log(err));
    // dispatch(setCreateRosterValues({ discipline: game }));

    // history.push(`/teams/team/${id.teamId}/roster/create`);
  };
  console.log(game.id);
  useEffect(() => {
    loadGames()
      .then((res) => {
        setGames(() => res.games);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <div className="discipline">
        <h1 className="discipline__title">discipline </h1>
        <ul className="discipline__list">
          {games?.map((el) => (
            <li
              className={
                el.title === game.title
                  ? "games__item-list  games__item-list--active"
                  : "games__item-list"
              }
              onClick={(e) => changeGameDiscipline(el)}
              key={el.id}
            >
              <img
                className="games__item-list-image"
                src={el.logo}
                alt={el.title}
                width="100"
                height="100"
              />
              {el.title.length > 16 ? (
                <p className="games__item-list-text">
                  {el.title.slice(0, 16) + "..."}
                </p>
              ) : (
                <p className="games__item-list-text">{el.title}</p>
              )}
            </li>
          ))}
        </ul>
        <div className="submit-button-wrapper">
          {game ? (
            <button className="submit-button" onClick={() => changeGame()}>
              Select
            </button>
          ) : (
            <div className="submit-button submit-button--disabled">Select</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Discipline);

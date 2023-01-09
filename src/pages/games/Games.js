import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Games.css";
import NoImage from "../../assets/no-image.png";
import { useDispatch, useSelector } from "react-redux";
import loadGames from "../../helpers/games/loadGames";
import addGame from "../../helpers/games/addGame";
import { toast } from "react-toastify";
import { API, API_ROUTER } from "../../api";

const Games = () => {
  const [selectedGame, changeGameDiscipline] = useState(false);
  const [games, setGames] = useState([]);
  const [nickInput, setNickInput] = useState("");

  const history = useHistory();

  const user = useSelector((state) => state.userData);

  // const changeGame = () => {
  //   addGame(selectedGame)
  //     .then((res) => {
  //       toast.success("Game successfully added");
  //       history.push(`/id/${user.url}`);
  //     })
  //     .catch((e) => {
  //       console.log("error", e);
  //       toast.error(e.message);
  //     });
  // };
  console.log(nickInput);
  function addGame() {
    const data = {
      gameId: selectedGame.id,
      nickname: nickInput,
    };
    API.request({
      ...API_ROUTER.games.addGameToUserGames,
      data,
    })
      .then(() => {
        toast.success("Game successfully added");
        history.push(`/id/${user.id}`);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    API.request({
      ...API_ROUTER.games.getGames,
    })
      .then((res) => {
        setGames(res.games);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(selectedGame);

  return (
    <div>
      <div className="games">
        <h1 className="games__title">Games</h1>
        <ul className="games__list">
          {games.map((el) => (
            <li
              className={
                el.id === selectedGame.id
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
              {el.id === selectedGame.id ? (
                <input
                  type="text"
                  value={nickInput}
                  onChange={(e) => setNickInput(e.target.value)}
                  className="games__input-name"
                  placeholder="Type your nickname here"
                />
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>
        <div className="submit-button-wrapper">
          <button
            className={`submit-button ${
              !selectedGame ? "submit-button--disabled" : ""
            }`}
            onClick={() => addGame()}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default Games;

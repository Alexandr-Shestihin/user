import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import "./Roster.css";
import { Context } from "../../../components/main/index";
/////////////////////////////
import { players } from "../data";

const Roster = () => {
  let id = useParams();
  const [context, setContext] = useContext(Context);
  ////////////////////////////////////////////////////////////////////////
  /* console.log(Context) */

  const [roster, changeRoster] = useState(false);
  const [couch, changeCouch] = useState(context.couchName);
  const [couchImage, changeCouchImage] = useState(context.couchImg);
  const [managerImage, changeManagerImage] = useState(context.managerImg);
  const [manager, changeManager] = useState(context.managerName);
  const [actialTeam, changeActialTime] = useState(context.team);

  const [reserve, changeReserve] = useState(context.reserveTeam);
  const [currentPlayer, changeCurrentPlayer] = useState(null);

  const closeChoiseRoster = () => {
    let newContext = JSON.parse(JSON.stringify(context));
    newContext.rosterChoise = true;
    setContext(newContext);
    console.log(newContext);
  };
  ///////////////////////////////////////////////////////////////////////////////////////

  const dragStartHandler = (e, player) => {
    changeCurrentPlayer(player);
  };
  const dragEndHandler = (e, player, deleteData) => {
    //e.target.style.borderColor = "transparent";
    if (player == "couch") {
      let newContext = JSON.parse(JSON.stringify(context));
      newContext.couchImg = "";
      newContext.couchName = "";
      setContext(newContext);
      changeCouch(newContext.couchName);
      changeCouchImage(newContext.couchImg);
    } else if (player == "manager") {
      let newContext = JSON.parse(JSON.stringify(context));
      newContext.managerImg = context.teamBuilderImage;
      newContext.managerName = context.teamBuilder;
      setContext(newContext);
      changeManager(newContext.managerName);
      changeManagerImage(newContext.managerImg);
    } else if (deleteData == "delete player") {
      let newContext = JSON.parse(JSON.stringify(context));
      let ourIndex = actialTeam.indexOf(player);
      let newTeam = [...actialTeam];
      let biba = newTeam.splice(ourIndex, 1);
      newContext.team = newTeam;
      setContext(newContext);
      changeActialTime(newContext.team);
    } else if (deleteData == "delete reserve player") {
      let newContext = JSON.parse(JSON.stringify(context));
      let ourIndex = reserve.indexOf(player);
      let newTeam = [...reserve];
      let biba = newTeam.splice(ourIndex, 1);
      newContext.reserveTeam = newTeam;
      setContext(newContext);
      changeReserve(newContext.reserveTeam);
    }
  };
  const dragOverHandler = (e) => {
    e.preventDefault();
    //e.target.style.borderColor = "yellow";
  };
  const dropHandler = (e, player, elementTag) => {
    e.preventDefault();
    if (player == "manager") {
      let newContext = JSON.parse(JSON.stringify(context));
      newContext.managerImg = players.filter(
        (a) => a.player == currentPlayer
      )[0]["img"];
      newContext.managerName = currentPlayer;
      setContext(newContext);
      changeManager(newContext.managerName);
      changeManagerImage(newContext.managerImg);
    } else if (player == "couch") {
      let newContext = JSON.parse(JSON.stringify(context));
      newContext.couchImg = players.filter((a) => a.player == currentPlayer)[0][
        "img"
      ];
      newContext.couchName = currentPlayer;
      setContext(newContext);
      changeCouch(newContext.couchName);
      changeCouchImage(newContext.couchImg);
    } else if (
      elementTag == "add player" &&
      actialTeam.indexOf(currentPlayer) == -1
    ) {
      console.log(player, currentPlayer);

      let newContext = JSON.parse(JSON.stringify(context));
      let ourIndex = actialTeam.indexOf(player);
      let newTeam = [...actialTeam];
      let biba = newTeam.splice(ourIndex, 1, currentPlayer);
      let newReserveTeam = [...reserve];
      newContext.team = newTeam;
      setContext(newContext);
      changeActialTime(newContext.team);

      if (context.reserveTeam.indexOf(currentPlayer) !== -1) {
        let reverseIndex = reserve.indexOf(currentPlayer);
        let pipa = newReserveTeam.splice(reverseIndex, 1);
        newContext.reserveTeam = newReserveTeam;
        setContext(newContext);
        changeReserve(newContext.reserveTeam);
      }
    } else if (
      elementTag == "add reserve player" &&
      reserve.indexOf(currentPlayer) == -1
    ) {
      console.log(player, currentPlayer);
      let newContext = JSON.parse(JSON.stringify(context));
      let ourIndex = reserve.indexOf(player);
      let newTeam = [...reserve];
      let biba = newTeam.splice(ourIndex, 1, currentPlayer);
      let newMainTeam = [...actialTeam];
      newContext.reserveTeam = newTeam;
      setContext(newContext);
      changeReserve(newContext.reserveTeam);

      if (context.team.indexOf(currentPlayer) !== -1) {
        let mainIndex = actialTeam.indexOf(currentPlayer);
        let pipa = newMainTeam.splice(mainIndex, 1);
        newContext.team = [...newMainTeam];
        changeActialTime(newContext.team);
        console.log(pipa, newContext.team);
      }
      newContext.reserveTeam = newTeam;
      setContext(newContext);
    }
  };
  ////////////////////////////////////////////////////////////////////
  const addPlayerPlace = (e) => {
    let newContext = JSON.parse(JSON.stringify(context));
    newContext.team = [...actialTeam, "+"];
    setContext(newContext);
    changeActialTime(newContext.team);
    console.log(actialTeam);
  };
  const decreasePlayerPlace = (e) => {
    let newContext = JSON.parse(JSON.stringify(context));
    let newArr = JSON.parse(JSON.stringify(actialTeam));
    newArr.pop();
    newContext.team = [...newArr];
    setContext(newContext);
    changeActialTime(newContext.team);
    console.log(actialTeam);
  };
  ////////////////////////////////////////////////////////////////////

  const addPlayerReservePlace = () => {
    let newContext = JSON.parse(JSON.stringify(context));
    newContext.reserveTeam = [...reserve, "+"];
    changeReserve(newContext.reserveTeam);
    setContext(newContext);
  };

  return (
    <div>
      <div className="roster">
        <h1 className="roster__title">roster </h1>
        <section className="roster__players">
          <h3 className="roster__sub-title">Main Roster</h3>
          <div className="roster__armband-captain">
            <div className="armband-captain__decoration"></div>
          </div>
          <ul className="roster__players-list">
            <li
              className="roster__decrease-players"
              onClick={(e) => decreasePlayerPlace(e)}
            >
              <div className="add-players__image">-</div>
              <p className="add-players__name">Decrease</p>
            </li>

            {actialTeam.map((el) => (
              <li
                className="player-list__player"
                draggable={true}
                onDragStart={(e) => dragStartHandler(e, el, "delete player")}
                onDragLeave={(e) => dragEndHandler(e)}
                onDragEnd={(e) => dragEndHandler(e, el, "delete player")}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, el, "add player")}
              >
                {el == "+" ? (
                  <div className="add-players__image"></div>
                ) : (
                  <img
                    className="player-list__player-image"
                    src={players.filter((a) => a.player == el)[0]["img"]}
                    alt={el}
                    width="60"
                    height="60"
                  />
                )}
                <p className="player-list__player-name">
                  {el == "+" ? "" : el}
                </p>
              </li>
            ))}
            <li
              className="roster__add-players"
              onClick={(e) => addPlayerPlace(e)}
            >
              <div className="add-players__image">+</div>
              <p className="add-players__name">Add</p>
            </li>
          </ul>

          {/* Reserve Team */}
          {/* <h3 className="roster__sub-title">Substitutes</h3>
          <ul className="roster__players-list">
            {reserve.map((el) => (
              <li
                className="player-list__player"
                draggable={true}
                onDragStart={(e) =>
                  dragStartHandler(e, el, "delete reserve player")
                }
                onDragLeave={(e) => dragEndHandler(e)}
                onDragEnd={(e) =>
                  dragEndHandler(e, el, "delete reserve player")
                }
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, el, "add reserve player")}
              >
                <div className="roster__armband-reserve">
                  <div className="armband-reserve__decoration"></div>
                  <div className="armband-reserve__decoration"></div>
                </div>
                {el == "+" ? (
                  <div className="add-players__image">+</div>
                ) : (
                  <img
                    className="player-list__player-image"
                    src={players.filter((a) => a.player == el)[0]["img"]}
                    alt={el}
                    width="60"
                    height="60"
                  />
                )}
                <p className="player-list__player-name">
                  {el == "+" ? "" : el}
                </p>
              </li>
            ))}
            <li
              className="roster__add-players"
              onClick={(e) => addPlayerReservePlace(e)}
            >
              <div className="add-players__image">+</div>
              <p className="add-players__name">Add</p>
            </li>
          </ul> */}

          <article className="roster__manager-and-coach">
            <div
              className="roster__coach"
              draggable={true}
              onDragStart={(e) => dragStartHandler(e, "couch")}
              onDragLeave={(e) => dragEndHandler(e)}
              onDragEnd={(e) => dragEndHandler(e, "couch")}
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropHandler(e, "couch")}
            >
              {couch == "" ? (
                <div className="roster__coach-image">+</div>
              ) : (
                <img
                  className="player-list__player-image"
                  src={couchImage}
                  alt={couch}
                  width="60"
                  height="60"
                />
              )}
              <p className="roster__coach-name">{couch}</p>
              <p className="roster__coach-profession">Couch</p>
            </div>
            <div
              className="roster__manager"
              draggable={true}
              onDragStart={(e) => dragStartHandler(e, "manager")}
              onDragLeave={(e) => dragEndHandler(e)}
              onDragEnd={(e) => dragEndHandler(e, "manager")}
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropHandler(e, "manager")}
            >
              {manager == "" ? (
                <div className="roster__manager-image">+</div>
              ) : (
                <img
                  className="player-list__player-image"
                  src={managerImage}
                  alt={manager}
                  width="60"
                  height="60"
                />
              )}
              <p className="roster__manager-name">{manager}</p>
              <p className="roster__manager-profession">Manager</p>
            </div>
          </article>
        </section>
        <h3 className="roster__sub-title">List</h3>
        <ul className="roster__player-list">
          {players.map((el) => (
            <li
              className="player-list__player"
              draggable={true}
              onDragStart={(e) => dragStartHandler(e, el.player)}
              onDragLeave={(e) => dragEndHandler(e)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropHandler(e, el.player)}
            >
              <img
                className="player-list__player-image"
                src={el.img}
                alt={el.player}
                width="60"
                height="60"
              />
              <p className="player-list__player-name">{el.player}</p>
            </li>
          ))}
        </ul>
        <div
          className="submit-button-wrapper"
          onClick={() => closeChoiseRoster()}
        >
          <Link
            className="submit-button"
            to={`/teams/team/${id.teamId}/roster/create`}
          >
            Apply
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Roster;

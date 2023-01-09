import { FormattedMessage } from "react-intl";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export function getGameCards(games = [], history, isCreator) {
  let gameCard;
  if (isCreator) {
    return (gameCard = [
      ...games,
      {
        id: uuidv4(),
        add: true,
        title: <FormattedMessage id="id.games.add" />,
        action: () => {
          history.push("/games");
        },
        img: "",
      },
    ]);
  }
  if (!isCreator) {
    return (gameCard = [...games]);
  }
  return gameCard;
}
export function fakeCard(userData, userInfo) {
  console.log(userInfo);
  return (
    <>
      <div className="team-card__owl">
        <img
          src={userData?.avatar ? userInfo?.avatar : userInfo?.avatar}
          alt="Owl"
          width="110"
          height="110"
        />
      </div>

      <p>{userData?.nickname ? userInfo?.nickname : userData?.nickname}</p>
    </>
  );
}

export function renderUserProfile(userInfo) {
  return <p>{}</p>;
}

export function getTournamentCards(tournaments, history) {
  return [
    {
      id: uuidv4(),
      add: false,
      title: <FormattedMessage id="id.tournaments.finished" />,
      action: () => {
        history.push("/calendar");
      },
      img: "",
      icon: "rank",
      isComing: true,
    },
    {
      id: uuidv4(),
      add: false,
      title: <FormattedMessage id="id.tournaments.inProgress" />,
      action: () => {
        history.push("/calendar");
      },
      img: "",
      icon: "timer",
      isComing: true,
    },
    {
      id: uuidv4(),
      add: false,
      title: <FormattedMessage id="id.tournaments.comingSoon" />,
      action: () => {
        history.push("/calendar");
      },
      img: "",
      icon: "clock",
      isComing: true,
    },
    // ...tournaments,
    {
      id: uuidv4(),
      add: true,
      title: <FormattedMessage id="id.tournaments.addTo" />,
      action: () => {
        history.push("/calendar");
      },
      img: "",
      isComing: true,
    },
  ];
}

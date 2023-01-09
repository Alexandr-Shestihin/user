import React from "react";
import noImage from "../../assets/no-image.png";
export function teamCard(teamInfo) {
  let cards = {
    defaultCard: (
      <div
        className="default-card"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="default-card__img" style={{ paddingRight: "15px" }}>
          <img
            src={teamInfo?.flag ? teamInfo?.flag : noImage}
            width="50"
            height="50"
            style={{ borderRadius: 50 }}
          />
        </div>
        {/* <p className="default-card__nickname" style={{ fontSize: "20px" }}>
          {teamInfo?.name ? teamInfo?.name : "team"}
        </p> */}
      </div>
    ),
    profile: (
      <>
        <div className="team-card__owl">
          <img src={teamInfo?.logo} alt="Owl" width="110" height="110" />
        </div>

        <p>{teamInfo?.name}</p>
      </>
    ),

    secondProfile: (
      <>
        <p>{teamInfo?.name}</p>
        <div className="team-card__owl">
          <img
            src={teamInfo?.logo}
            alt="Owl"
            width="110"
            height="110"
            style={{ borderRadius: "15px" }}
          />
        </div>
      </>
    ),
  };
  return cards;
}

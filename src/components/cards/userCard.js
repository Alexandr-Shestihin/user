import React from "react";
import noImage from "../../assets/no-image.png";

export function UserCard(userInfo) {
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
            src={userInfo?.avatar ? userInfo?.avatar : noImage}
            alt="Owl"
            width="50"
            height="50"
            style={{ borderRadius: 50 }}
          />
        </div>
        <p className="default-card__nickname" style={{ fontSize: "20px" }}>
          {userInfo?.nickname ? userInfo?.nickname : "nickname"}
        </p>
      </div>
    ),
    profile: (
      <>
        <div className="team-card__owl">
          <img
            src={userInfo?.avatar ? userInfo?.avatar : noImage}
            alt="Owl"
            width="110"
            height="110"
          />
        </div>

        <p>{userInfo?.nickname ? userInfo?.nickname : "nickname"}</p>
      </>
    ),

    secondProfile: (
      <>
        <p>{userInfo?.nickname ? userInfo?.nickname : "nickname"}</p>
        <div className="team-card__owl">
          <img
            src={userInfo?.avatar ? userInfo?.avatar : noImage}
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

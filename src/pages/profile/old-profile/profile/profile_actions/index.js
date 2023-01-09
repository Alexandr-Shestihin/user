import React from "react";
import s from "./style.module.css";
import Circles from "../profile_circles";
import { data } from "../data";

const ProfileAction = () => {
  const arrowLength = Array.from({ length: 24 }, (v, k) => k);

  return (
    <div className={s.profile_action}>
      <div className={s.profile_action__item}>
        <div className={s.profile_action__info}>
          <h6>MY GAMES</h6>
          <div className={s.line_wrapper}>
            {arrowLength.map((el, i) => (
              <div key={i} className={s.line} />
            ))}
          </div>
        </div>
        <div className={s.circlec}>
          {data.myGame.map((el, i) => (
            <Circles item={el.img} key={i} title={el.title} />
          ))}
        </div>
      </div>

      <div className={s.profile_action__item}>
        <div className={s.profile_action__info}>
          <h6>MY TOURNAMENTS</h6>
          <div className={s.line_wrapper}>
            {arrowLength.map((el, i) => (
              <div key={i} className={s.line} />
            ))}
          </div>
        </div>
        <div className={s.circlec}>
          {data.myTournaments.map((el, i) => (
            <Circles item={el.img} key={i} title={el.title} />
          ))}
        </div>
      </div>

      <div className={s.profile_action__item}>
        <div className={s.profile_action__info}>
          <h6>MY STATISTICS</h6>
          <div className={s.line_wrapper}>
            {arrowLength.map((el, i) => (
              <div key={i} className={s.line} />
            ))}
          </div>
        </div>
        <div className={s.circlec}>
          {data.myStatus.map((el, i) => (
            <Circles item={el.img} key={i} title={el.title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileAction;

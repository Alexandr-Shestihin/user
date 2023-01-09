import React, { useEffect, useState } from "react";
import "./Notification.css";
import Gabon from "../../assets/svg/gabon.svg";
import { API, API_ROUTER } from "../../api";

const NotificationItem = ({ uuid, message, viewed }) => {
  const [star, tongleStar] = useState("false");
  const tongStar = () => {
    if (star) {
      tongleStar(true);
    }
  };
  function viewedNotification(uuid) {
    const params = {
      ...API_ROUTER.notifications.markSingleAsViewed,
      pathKeys: {
        notificationUuid: uuid,
      },
    };

    return API.request(params);
  }
  return viewed === true ? (
    <ul className="notification__result-list">
      <li
        className="notification__result-item"
        // onClick={() => view()}
      >
        <img
          className="notification__result-item-image"
          src={Gabon}
          alt="flag"
          width="33"
          height="19"
        />
        <a className="notification__result-item-link-viewed">{message}</a>
      </li>
    </ul>
  ) : (
    <ul
      className={
        star === true
          ? "notification__result-list"
          : "notification__result-list notification__result-list--blue"
      }
    >
      <li
        className="notification__result-item"
        onClick={() => viewedNotification(uuid)}
      >
        <img
          className="notification__result-item-image"
          src={Gabon}
          alt="flag"
          width="33"
          height="19"
        />
        <a
          className={
            star === true
              ? "notification__result-item-link-viewed"
              : "notification__result-item-link"
          }
          onClick={() => tongStar()}
        >
          {message}
        </a>
      </li>
    </ul>
  );
};

export default NotificationItem;

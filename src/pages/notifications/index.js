import React, { useEffect, useState } from "react";
import "./Notification.css";
import { API, API_ROUTER } from "../../api";
import { FormattedMessage } from "react-intl";
import { LinearProgress } from "@material-ui/core";
import NotificationItem from "./notifi-item";
const Notification = () => {
  const [notification, setNotification] = useState([]);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [viewd, setViewed] = useState();

  useEffect(() => {
    API.request({
      ...API_ROUTER.notifications.getUserNotifications,
      urlParams: {
        limit: 100,
      },
    })
      .then((res) => {
        setNotification(res);
        setRequestSuccess(true);
      })
      .catch((err) => console.log(err));
  }, []);
  const renderNotification = (notifications) => {
    if (!notifications.length) return <div>no notifications</div>;
    return (
      <div>
        <div className="notification">
          <section className="notification__result">
            {notifications.map((items) => (
              <div key={items.uuid}>
                <article className="notification__result-events">
                  {/* <h2 className="notification__result-title">{type}</h2> */}

                  <ul className="notification__result-list">
                    <NotificationItem {...items} key={items.uuid} />
                  </ul>
                </article>
              </div>
            ))}
          </section>
        </div>
      </div>
    );
  };

  return (
    <>
      {requestSuccess ? renderNotification(notification) : <LinearProgress />}
    </>
  );
};

export default Notification;

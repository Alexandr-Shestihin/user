import React, { useState, useEffect } from "react";
import {
  getAvatar,
  offerToPlay,
  addFriend,
  isAuthenticated,
} from "../../helpers";
import { useSelector, useDispatch } from "react-redux";
import { LinearProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { API, API_ROUTER } from "../../api";
import { ROUTER } from "../../config";
import { toast } from "react-toastify";
import { presetChatMessage, setActiveChat } from "../../redux/actions";
import { Styled } from "./style";
import { FormattedMessage } from "react-intl";
import { Menu, MenuItem } from "../UI";

const AddIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.54"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 5V11H5V13H11V19H13V13H19V11H13V5H11Z"
      fill="#FFFEFE"
    />
  </svg>
);

const FollowIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.54"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 8C11.33 6.268 9.453 5 7.5 5C4.957 5 3 6.932 3 9.5C3 13.029 6.793 15.758 12 21C17.207 15.758 21 13.029 21 9.5C21 6.932 19.043 5 16.5 5C14.545 5 12.67 6.268 12 8Z"
      fill="#FFFDFD"
    />
  </svg>
);

const OfferIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.54">
      <g clipPath="url(#clip0)">
        <path
          d="M23.9871 15.0198C23.9274 13.6447 23.6882 12.1202 23.3295 10.6853C22.9708 9.31026 22.5224 8.02486 21.9843 7.03839C19.8918 3.36154 17.6199 3.92951 14.8997 4.64694C14.0328 4.85619 13.1061 5.09534 12.1495 5.18502H11.8506C10.894 5.09534 9.96731 4.85619 9.10041 4.64694C6.38015 3.9594 4.10828 3.36154 2.01576 7.06828C1.47769 8.05475 0.999401 9.34015 0.670577 10.7152C0.311861 12.1501 0.0727164 13.6746 0.0129303 15.0497C-0.0468557 16.5743 0.102609 17.6803 0.431433 18.4575C0.760256 19.175 1.23854 19.6234 1.8663 19.8027C2.43427 19.9522 3.09191 19.8924 3.77945 19.5935C4.94528 19.1152 6.29047 18.0988 7.60576 16.8732C8.53245 15.9764 10.2662 15.528 12 15.528C13.7338 15.528 15.4676 15.9764 16.3943 16.8732C17.7096 18.0988 19.0548 19.1152 20.2206 19.5935C20.9082 19.8625 21.5658 19.9522 22.1338 19.8027C22.7316 19.6234 23.2398 19.2049 23.5686 18.4276C23.8975 17.6803 24.0469 16.5743 23.9871 15.0198ZM22.5523 18.0091C22.3729 18.4276 22.1338 18.6668 21.8349 18.7565C21.506 18.8461 21.0875 18.7864 20.6092 18.607C19.563 18.1885 18.3374 17.2618 17.1416 16.1259C16.0057 14.9899 14.0029 14.422 12 14.422C9.99721 14.422 7.99437 14.9899 6.82854 16.0661C5.60293 17.202 4.37731 18.1586 3.36095 18.5472C2.88266 18.7266 2.46416 18.8162 2.13534 18.6967C1.83641 18.607 1.59726 18.3678 1.4179 17.9493C1.17876 17.3814 1.05919 16.4547 1.11897 15.0796C1.17876 13.7942 1.38801 12.3295 1.74673 10.9544C2.07555 9.66897 2.49405 8.47325 3.00223 7.57646C4.64635 4.61705 6.55951 5.09534 8.83138 5.6932C9.75806 5.93234 10.7146 6.17149 11.7609 6.26117C11.7908 6.26117 11.7908 6.26117 11.8207 6.26117H12.1495C12.1794 6.26117 12.1794 6.26117 12.2093 6.26117C13.2854 6.17149 14.242 5.93234 15.1687 5.6932C17.4406 5.12523 19.3537 4.61705 20.9978 7.57646C21.506 8.47325 21.9245 9.63908 22.2534 10.9544C22.5822 12.3295 22.8213 13.7643 22.8811 15.0796C22.9409 16.4547 22.8213 17.3814 22.5523 18.0091Z"
          fill="#FFF9F9"
        />
        <path
          d="M9.24989 9.19069C8.95095 8.92165 8.59224 8.7124 8.17374 8.68251C8.14384 8.2939 7.96448 7.90529 7.69545 7.63625L7.66555 7.60636C7.33673 7.27753 6.91823 7.09818 6.43994 7.09818C5.96165 7.09818 5.51326 7.30743 5.21432 7.60636C4.94529 7.87539 4.73604 8.264 4.70614 8.68251C4.28764 8.7124 3.92892 8.89176 3.62999 9.16079L3.6001 9.19069C3.27128 9.51951 3.09192 9.93801 3.09192 10.4163C3.09192 10.8946 3.30117 11.343 3.6001 11.6419C3.89903 11.9408 4.25775 12.1202 4.70614 12.1501C4.73604 12.5686 4.91539 12.9572 5.21432 13.2262C5.54315 13.5551 5.96165 13.7344 6.43994 13.7344C6.91823 13.7344 7.36662 13.5252 7.66555 13.2262C7.93459 12.9273 8.14384 12.5686 8.17374 12.1501C8.59224 12.1202 8.98085 11.9408 9.24989 11.6419C9.57871 11.3131 9.75807 10.8946 9.75807 10.4163C9.75807 9.93801 9.54882 9.48962 9.24989 9.19069ZM8.50256 10.8647C8.38299 10.9843 8.23352 11.0441 8.05416 11.0441H7.63566C7.33673 11.0441 7.06769 11.2832 7.06769 11.612V12.0006C7.06769 12.18 7.00791 12.3295 6.88833 12.449C6.76876 12.5686 6.6193 12.6284 6.43994 12.6284C6.26058 12.6284 6.11112 12.5686 5.99154 12.449C5.87197 12.3295 5.81219 12.18 5.81219 12.0006V11.5821C5.81219 11.2832 5.57304 11.0142 5.24422 11.0142H4.82572C4.64636 11.0142 4.49689 10.9544 4.37732 10.8348C4.28764 10.7451 4.19796 10.5957 4.19796 10.4163C4.19796 10.2369 4.25775 10.0875 4.37732 9.96791C4.37732 9.96791 4.37732 9.96791 4.40721 9.93801C4.52678 9.84833 4.67625 9.78855 4.82572 9.78855H5.24422C5.54315 9.78855 5.81219 9.5494 5.81219 9.22058V8.80208C5.81219 8.62272 5.87197 8.47325 5.99154 8.35368C6.11112 8.23411 6.26058 8.17432 6.43994 8.17432C6.6193 8.17432 6.76876 8.23411 6.88833 8.35368C6.88833 8.35368 6.88833 8.35368 6.91823 8.38358C7.00791 8.50315 7.06769 8.65261 7.06769 8.80208V9.22058C7.06769 9.51951 7.30684 9.78855 7.63566 9.78855H8.05416C8.23352 9.78855 8.38299 9.84833 8.50256 9.96791C8.62213 10.0875 8.68192 10.2369 8.68192 10.4163C8.68192 10.5957 8.62213 10.7451 8.50256 10.8647Z"
          fill="#FFF9F9"
        />
        <path
          d="M17.2015 9.34016C17.7793 9.34016 18.2477 8.87173 18.2477 8.2939C18.2477 7.71607 17.7793 7.24765 17.2015 7.24765C16.6236 7.24765 16.1552 7.71607 16.1552 8.2939C16.1552 8.87173 16.6236 9.34016 17.2015 9.34016Z"
          fill="#FFF9F9"
        />
        <path
          d="M17.2015 13.585C17.7793 13.585 18.2477 13.1165 18.2477 12.5387C18.2477 11.9609 17.7793 11.4925 17.2015 11.4925C16.6236 11.4925 16.1552 11.9609 16.1552 12.5387C16.1552 13.1165 16.6236 13.585 17.2015 13.585Z"
          fill="#FFF9F9"
        />
        <path
          d="M15.079 11.4626C15.6568 11.4626 16.1253 10.9941 16.1253 10.4163C16.1253 9.83848 15.6568 9.37006 15.079 9.37006C14.5012 9.37006 14.0327 9.83848 14.0327 10.4163C14.0327 10.9941 14.5012 11.4626 15.079 11.4626Z"
          fill="#FFF9F9"
        />
        <path
          d="M19.3238 11.4626C19.9017 11.4626 20.3701 10.9941 20.3701 10.4163C20.3701 9.83848 19.9017 9.37006 19.3238 9.37006C18.746 9.37006 18.2776 9.83848 18.2776 10.4163C18.2776 10.9941 18.746 11.4626 19.3238 11.4626Z"
          fill="#FFF9F9"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const Control = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  // offer to play
  const runOfferToPlay = (userUuid) => {
    offerToPlay(userUuid)
      .then(({ chat }) => {
        dispatch(setActiveChat(chat.uuid));
        dispatch(presetChatMessage(true));
        history.push(ROUTER.messenger);
      })
      .catch((err) => toast.error(err.data && err.data.message));
  };

  // add friend
  const runAddFriend = (userUuid) => {
    addFriend(userUuid)
      .then(({ message }) => toast.success(message))
      .catch((err) => toast.error(err.data && err.data.message));
  };

  return (
    <Menu>
      <MenuItem callback={() => runAddFriend(user.uuid)}>
        {AddIcon()}
        <FormattedMessage id="widget.newUsers.addFriend" tagName="span" />
      </MenuItem>
      <MenuItem callback={() => console.log("follow")}>
        {FollowIcon()}
        <FormattedMessage id="widget.newUsers.follow" tagName="span" />
      </MenuItem>
      <MenuItem callback={() => runOfferToPlay(user.uuid)}>
        {OfferIcon()}
        <FormattedMessage id="widget.newUsers.offerToPlay" tagName="span" />
      </MenuItem>
    </Menu>
  );
};

export default function NewUsers() {
  const userData = useSelector((state) => state.userData);
  const [newUsers, setNewUsers] = useState([]);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (userData && isAuthenticated()) {
      let params = {
        ...API_ROUTER.user.getNewUsersAroundYou,
        pathKeys: {
          userUuid: userData.uuid,
        },
      };

      API.request(params)
        .then(({ users }) => {
          setNewUsers(users);
          setRequestSuccess(true);
        })
        .catch((err) => console.log(err));
    }

    if (!isAuthenticated()) {
      API.request({ ...API_ROUTER.public.getNewUsers })
        .then(({ users }) => {
          setNewUsers(users);
          setRequestSuccess(true);
        })
        .catch((err) => console.log(err));
    }
  }, [userData]);

  const renderUsers = (newUsers) => {
    if (!newUsers.length)
      return (
        <Styled.Empty>
          <FormattedMessage id="widget.newUsers.noUsers" />
        </Styled.Empty>
      );

    return (
      <div>
        {newUsers.map((user) => (
          <Styled.UserItem image={getAvatar(user.avatars)} key={user.uuid}>
            <div
              className="main"
              onClick={() => history.push(`/id/${user.id}`)}
            >
              <div className={`avatar ${user.topGamer && "top-gamer"}`}>
                <div className="picture" />
                {user.online && <div className="status" />}
              </div>
              <div className="info">
                <div className="nickname">{user.nickname}</div>
              </div>
            </div>
            <Control user={user} />
          </Styled.UserItem>
        ))}
      </div>
    );
  };

  // if online
  return (
    <Styled.StyledContentBox>
      <Styled.Title>
        <FormattedMessage id="widget.newUsers.title" />
      </Styled.Title>
      {requestSuccess ? renderUsers(newUsers) : <LinearProgress />}
    </Styled.StyledContentBox>
  );
}

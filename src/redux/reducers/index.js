import { combineReducers } from "redux";
import showAuthModal from "./particles/authModal";
import showQrModal from "./particles/qrModal";
import hideQrModal from "./particles/qrModal";
import showMenu from "./particles/menu";
import hideMenu from "./particles/menu";
import showRegisterModal from "./particles/registerModal";
import showAuthBlockedModal from "./particles/authBlocked";
import userOnline from "./particles/userOnline";
import spinner from "./particles/spinner";
import userData from "./particles/userData";
import userNotifications from "./particles/userNotifications";
import countriesList from "./particles/countriesList";
import platformsList from "./particles/platformsList";
import devicesList from "./particles/devicesList";
import activeChat from "./particles/activeChat";
import presetChatMessage from "./particles/presetChatMessage";
import scrollTo from "./particles/scrollTo";
import interfaceLang from "./particles/interfaceLang";
import steamData from "./particles/steamData";
import notificationModal from "./particles/notificationModal";
import userGames from "./particles/userGames";
import userTournaments from "./particles/userTournaments";
import userCommunityList from "./particles/userCommunityList";
import communityDetails from "./particles/communityDetails";
import addDiscipline from "./particles/addDiscipline";
import roster from "./particles/roster";

const reducers = combineReducers({
  showAuthModal, // show auth modal
  showQrModal,
  hideQrModal,
  showMenu,
  hideMenu,
  showRegisterModal, // switch auth modal to register (use before 'showAuthModal')
  showAuthBlockedModal, // switch auth modal to user blocked (use before 'showAuthModal')
  userOnline, // is user logged in?
  userData, // user data object
  userNotifications, // all user notifications
  countriesList, // list of countries used on selects
  platformsList, // list of platforms used on selects
  devicesList, // list of devices used on selects
  spinner, // XHR spinner
  activeChat, // target chat id
  presetChatMessage, // preset chat message on "Offer to play"
  scrollTo, // hot fix, should be removed later
  interfaceLang, // selected interface lang, 'en' is default
  steamData, // steam profile data, used on steam registration
  notificationModal, // notification modal
  userGames, // games in row "MyGames"
  userTournaments, // tournaments in row "My Tournaments"
  userCommunityList, // userCommunityList in "more/mycommunities"
  communityDetails, // communityDetails
  roster
});

export default reducers;

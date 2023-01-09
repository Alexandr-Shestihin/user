import { ClickOutside } from "./trash/click-outside";
import { dataUriToBlob } from "./trash/data-uri-to-blob";
import { getRandomInt } from "./trash/get-random-int";
import { numbersOnly } from "./validation/numbers-only";
import { isAuthenticated } from "./auth/is-authenticated";
import { isPhoneValid } from "./validation/isPhoneValid";
import { isFieldEmpty } from "./validation/isFieldEmpty";
import { isFieldEmptyAndLength } from "./validation/isFieldEmptyAndLength";
import { isSelectEmpty } from "./validation/isSelectEmpty";
import { isEmailValid } from "./validation/isEmailValid";
import { isPasswordValid } from "./validation/isPasswordValid";
import { isCheckboxChecked } from "./validation/isCheckboxChecked";
import { isConfirmPasswordCorrect } from "./validation/isConfirmPasswordCorrect";
import {
  getValueFromSelect,
  createSelectObject,
  getLabelFromSelect,
  setValueToSelect,
  setArrayToSelect,
  getArrayFromSelect,
} from "./select";
import { getUrlParams } from "./trash/get-url-params";
import { getAvatar } from "./user/getAvatar";
import { createDateAsUTC } from "./trash/create-date-us-UTC";
import ScrollToTop from "./trash/ScrollToTop";

import offerToPlay from "./user/offerToPlay";
import addFriend from "./user/addFriend";
import markSingleNotificationAsViewed from "./notifications/markSingleNotificationAsViewed";
import markArrayNotificationsAsViewed from "./notifications/markArrayNotificationsAsViewed";

import {
  getPrivacyPolicyLink,
  getTermsLink,
  getCookiesPolicyLink,
} from "./external-links";

export {
  isAuthenticated,
  isPhoneValid,
  isFieldEmpty,
  isFieldEmptyAndLength,
  isSelectEmpty,
  isEmailValid,
  isCheckboxChecked,
  isPasswordValid,
  isConfirmPasswordCorrect,
  dataUriToBlob,
  numbersOnly,
  ClickOutside,
  createSelectObject,
  getValueFromSelect,
  getLabelFromSelect,
  setValueToSelect,
  getUrlParams,
  getAvatar,
  ScrollToTop,
  offerToPlay,
  addFriend,
  createDateAsUTC,
  markSingleNotificationAsViewed,
  markArrayNotificationsAsViewed,
  getPrivacyPolicyLink,
  getTermsLink,
  getCookiesPolicyLink,
  getArrayFromSelect,
  setArrayToSelect,
  getRandomInt,
};

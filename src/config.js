require("dotenv").config();

export const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
export const GOOGLE_AUTH_CLIENT_ID =
  process.env.REACT_APP_GOOGLE_AUTH_CLIENT_KEY;
export const FACEBOOK_AUTH_CLIENT_ID =
  process.env.REACT_APP_FACEBOOK_AUTH_CLIENT_KEY;
export const API_URL = process.env.REACT_APP_API_URL;
export const GTM_ID = process.env.REACT_APP_GTM_ID;

export const STEAM_GAMES_CODES = {
  "cs-go": 730,
  dota2: 570,
};

export const INTERFACE_LANGUAGES = ["en", "ru", "pt", "fr", "es"];

export const INTERFACE_LANGUAGES_OPTIONS = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "Русский",
    value: "ru",
  },
  {
    label: "Português",
    value: "pt",
  },
  {
    label: "Français",
    value: "fr",
  },
  {
    label: "Español",
    value: "es",
  },
];

export const LANGUAGE_SPEAK_OPTIONS = [
  {
    label: "German",
    value: "de",
  },
  {
    label: "English",
    value: "en",
  },
  {
    label: "French",
    value: "fr",
  },
  {
    label: "Italian",
    value: "it",
  },
  {
    label: "Portuguese",
    value: "pt",
  },
  {
    label: "Russian",
    value: "ru",
  },
  {
    label: "Spanish",
    value: "es",
  },
  {
    label: "Ukrainian",
    value: "ua",
  },
];

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/PassportGG",
  facebook: "https://www.facebook.com/PassportGG",
  twitter: "https://twitter.com/PassportGG",
  telegram: "https://t.me/PassportGG",
  vk: "https://vk.com/passportgg",
};

export const ROUTER = {
  homepage: "/",
  notFound: "/404",
  login: "/login",
  signup: "/signup",
  termsOfUse: "/terms-of-use",
  privacyPolicy: "/privacy-policy",
  cookiePolicy: "/cookie-policy",
  leaderboard: "/leaderboard",
  games: "/games",
  createRoster: "/teams/team/:teamId?/roster/create",
  disciplineRoster: "/teams/team/:teamId?/roster/discipline",
  gamesRoster: "/teams/team/:teamId?/games/discipline",
  roster: "/teams/team/:teamId?/roster/edit",
  eventPage: "/eventPage/:id?",
  support: "/support",

  communitiesPage: "/community",
  communityPage: "/community/:communityId?",

  //communitiesPage: "/more/my-communities",
  MatchDisscusion: "/match-disscusion/:matchId",

  addroster: "/roster/add",
  needauth: "/needauth",
  confirmPassword: "/password/confirm",
  launcher: "/launcher",
  ratings: "/ratings/:game?",
  community: {
    findFriends: "/find-friends",
    myFriends: "/my-friends",
    community: "/communities/:communityId?",
    createCommunity: "/create-community",
    communityTabs: "/community/:communityId?/:tab",
  },
  earnSpend: "/earn-spend",
  id: "/id/:id?",
  messenger: "/messenger",
  comparison: "/comparison",
  steam: "/steam/:gameCode", // game connect
  steamRegistration: "/steam/registration", // registration
  resetPassword: "/password/reset",
  changePassword: "/password/change",
  emailConfirm: "/email/confirm",
  profile: {
    settings: "/profile/settings",
    // settings: "/profile/settings",
    password: "/profile/password",
  },
  tournaments: {
    tournaments: "/tournaments",
    UserTournaments: "/my/tournament",

    details: "/tournaments/tournament/:tournamentUuid/:activeTab?",
    match: "/tournaments/match/:matchUuid",
  },
  battleCup: {
    registrationTournament: "/battleCup/:id?/registrationTournament",
    information: "/battleCup/:id?/information",
    participants: "/battleCup/:id?/participants",
    matches: "/battleCup/:id?/matches",
    rules: "/battleCup/:id?/rules",
    statistics: "/battleCup/:id?/statistics",
    bracket: {
      preliminary_tournament: "/battleCup/:id?/bracket/preliminary_tournament",
      group_stage: "/battleCup/:id?/bracket/group_stage",
      play_off: "/battleCup/:id?/bracket/play_off",
    },
  },
  teams: {
    find: "/teams/find-team/:game?",
    team: "/teams/team/:teamId?",
    create: "/teams/team/create",
    edit: "/teams/edit/:teamId?",
    invite: "/teams/invite/:code?",
    inviteTeam: "/teams/team/:teamId/invite",
  },
  more: "/more",
  home: "/home",
  rating: "/rating",
  calendar: "/calendar/:tab",

  notifications: "/notifications",
  verification: "/verification",
  watch: "/watch",
};

export const TYPE_OPTIONS = [
  {
    label: "battle.types.city",
    value: "city",
  },
  {
    label: "battle.types.country",
    value: "country",
  },
  {
    label: "battle.types.community",
    value: "community",
  },
  {
    label: "battle.types.company",
    value: "company",
  },
];

export const TEAM_GAMES = [
  "cs-go",
  "dota2",
  "pes-mobile",
  "cod-mobile",
  "pubg-mobile",
];

export const HIDE_FOR = [
  ROUTER.login,
  ROUTER.signup,
  ROUTER.needauth,
  ROUTER.resetPassword,
  ROUTER.changePassword,
  ROUTER.emailConfirm,
  ROUTER.homepage,
];

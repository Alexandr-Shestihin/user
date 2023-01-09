export const API_ROUTER = {
  auth: {
    register: {
      method: "POST",
      url: "/auth/register",
    },
    registerEvent: {
      method: "POST",
      url: "/public/special/event/{eventName}",
    },
    logIn: {
      method: "POST",
      url: "/auth/login",
    },
    facebookAuthCheck: {
      method: "POST",
      url: "/auth/facebook/check",
    },
    googleAuthCheck: {
      method: "POST",
      url: "/auth/google/check",
    },
    logOut: {
      method: "POST",
      url: "/auth/logout",
    },
    forgotPassword: {
      method: "POST",
      url: "/auth/password/forgot",
    },
    changePassword: {
      method: "PUT",
      url: "/app/password/change",
    },
    confirmPassword: {
      method: "POST",
      url: "/auth/password/confirm",
    },
    confirmEmail: {
      method: "POST",
      url: "/public/callback/email/confirm",
    },
  },
  media: {
    get: {
      method: "GET",
      url: "/api/v1/media",
    },
    create: {
      method: "POST",
      url: "/api/v1/media",
    },
  },
  events: {
    getEvents: {
      method: "GET",
      url: "/public/v1/events",
    },
    getCurrentEvent: {
      method: "GET",
      url: "/public/v1/event/{eventId}",
    },
    getEventTournaments: {
      method: "GET",
      url: "/public/v1/event/{eventId}/tournaments",
    },
  },
  Koza: {
    getKoza: {
      method: "GET",
      url: "/public/v1/koza/{stageId}",
    },
  },
  user: {
    setUserAvatar: {
      method: "POST",
      url: "/app/users/avatar",
    },
    getPublicUserInfo: {
      method: "GET",
      url: "public/v1/user/{userId}/profile",
    },

    setUserData: {
      method: "PUT",
      url: "/api/v1/my/profile",
    },
    setProfileData: {
      method: "PUT",
      url: "/app/v1/my/profile",
    },
    getMyData: {
      method: "GET",
      url: "/api/v1/my/profile",
    },
    getUserData: {
      method: "GET",
      url: "/app/me",
    },
    getUserReferrals: {
      method: "GET",
      url: "/app/referrals",
    },
    getUserDataByUrl: {
      method: "GET",
      url: "public/v1/user/{userId}/profile",
    },
    getNewUsersAroundYou: {
      method: "GET",
      url: "/app/users/{userUuid}/new-around-you",
    },
    search: {
      method: "GET",
      url: "/public/user/search",
    },
    saveAddress: {
      method: "PUT",
      url: "/app/users/address",
    },
    getUserQR: {
      method: "GET",
      url: "/public/v1/user/{userId}/passport/qr-code",
    },
    changeUserNickname: {
      method: "PUT",
      url: "/api/v1/my/nickname",
    },
  },
  public: {
    getNewUsers: {
      method: "GET",
      url: "/public/statistics/users/new",
    },
    getCountriesList: {
      method: "GET",
      url: "/public/labels/countries",
    },
    getCountryRegions: {
      method: "GET",
      url: "/public/labels/countries/{country}/regions",
    },
    getCitiesByRegion: {
      method: "GET",
      url: "/public/labels/countries/{country}/regions/{region}/cities",
    },
    getLocationByIp: {
      method: "GET",
      url: "/public/ip/{ip}",
    },
    getPlatforms: {
      method: "GET",
      url: "/public/catalog/platform",
    },
    getDevices: {
      method: "GET",
      url: "/public/game/devices",
    },
  },
  games: {
    getAvailable: {
      method: "GET",
      url: "/app/games/available",
    },
    addGameToUserGames: {
      method: "POST",
      url: "/api/v1/my/game",
    },
    getUserGames: {
      method: "GET",
      url: "/api/v1/my/games",
    },
    getGames: {
      method: "GET",
      url: "public/v1/games",
    },

    getAllowedGames: {
      method: "GET",
      url: "/app/games/allowed",
    },
    getConnectedGames: {
      method: "GET",
      url: "/public/v1/user/{userId}/games",
    },
    dota2: {
      getHeroesStatistic: {
        method: "GET",
        url: "/public/users/{userUuid}/games/dota2/heroes",
      },
    },
    connect: {
      method: "POST",
      url: "/app/games/add/{gameCode}",
    },
  },
  steam: {
    connect: {
      method: "POST",
      url: "/app/integrations/steam/connect/{code}",
    },
    disconnect: {
      method: "DELETE",
      url: "/app/integrations/steam",
    },
    signIn: {
      method: "POST",
      url: "/auth/steam/sign-in",
    },
    signUp: {
      method: "POST",
      url: "/auth/steam/sign-up",
    },
    getProfile: {
      method: "POST",
      url: "/public/steam/profile",
    },
    getProfileDetails: {
      method: "GET",
      url: "/app/integrations/steam/user/player-summaries/v2/{steamId}",
    },
  },
  chat: {
    getUserChats: {
      method: "GET",
      url: "/app/chats",
    },
    createNewChat: {
      method: "POST",
      url: "/app/chats",
    },
    getChatInfo: {
      method: "GET",
      url: "/app/chats/{chatUuid}",
    },
    getChatMessages: {
      method: "GET",
      url: "/app/chats/{chatUuid}/messages",
    },
    sendMessage: {
      method: "POST",
      url: "/app/chats/{chatUuid}/messages",
    },
    deleteChat: {
      method: "DELETE",
      url: "/app/chats/{chatUuid}",
    },
  },
  notifications: {
    getUserNotifications: {
      method: "GET",
      url: "/app/notifications",
    },
    markSingleAsViewed: {
      method: "PATCH",
      url: "/app/notifications/{notificationUuid}/view",
    },
    markArrayAsViewed: {
      method: "PATCH",
      url: "/app/notifications/view",
    },
  },
  friendship: {
    addFriend: {
      method: "POST",
      url: "/app/friendship/{userUuid}",
    },
    approveRequest: {
      method: "POST",
      url: "/app/friendship/{friendshipUuid}/approve",
    },
    declineRequest: {
      method: "POST",
      url: "/app/friendship/{friendshipUuid}/decline",
    },
    getFriendsList: {
      method: "GET",
      url: "/app/friendships",
    },
    getRequestsList: {
      method: "GET",
      url: "/app/friendships/received",
    },
  },
  rating: {
    getPlayersListByGame: {
      method: "GET",
      url: "/public/games/{game}/ratings",
    },
  },
  external: {
    getIpAddress: {
      method: "GET",
      url: "https://api.ipify.org/",
    },
  },
  institutions: {
    search: {
      method: "GET",
      url: "/app/institutions/search",
    },
    add: {
      method: "POST",
      url: "/app/institutions",
    },
  },
  education: {
    get: {
      method: "GET",
      url: "/app/educations",
    },
    add: {
      method: "POST",
      url: "/app/educations",
    },
    edit: {
      method: "PATCH",
      url: "/app/educations/{uuid}",
    },
    delete: {
      method: "DELETE",
      url: "/app/educations/{uuid}",
    },
  },
  roster: {
    add: {
      method: "POST",
      url: "/api/v1/team/roster",
    },
  },
  community: {
    getCommunityList: {
      method: "GET",
      url: "/public/v1/communities",
    },
    getCommunityDetails: {
      method: "GET",
      url: "/public/v1/community/{communityId}",
    },
    getCommunityEvent: {
      method: "GET",
      url: "/public/v1/community/{communityId}/events",
    },
    getCommunityTournaments: {
      method: "GET",
      url: "/public/v1/community/{communityId}/tournaments",
    },
    getList: {
      // old
      method: "GET",
      url: "/app/users/communities",
    },
    create: {
      // old
      method: "POST",
      url: "/app/community",
    },
    search: {
      // old
      method: "GET",
      url: "/app/community",
    },
    join: {
      method: "POST",
      url: "/app/community/{uuid}/join",
    },
    leave: {
      method: "POST",
      url: "/app/community/{uuid}/leave",
    },
    leaderboard: {
      method: "GET",
      url: "/public/games/{gameCode}/community/{communityUuid}",
    },
    createNewCommunity: {
      method: "POST",
      url: "/app/community",
    },
    uploadImage: {
      method: "POST",
      url: "/app/community/{communityUuid}/image",
    },
  },
  // battles: {
  //     getBattlesList: {
  //         method: 'GET',
  //         url: '/public/battles'
  //     },
  //     getPopular: {
  //         method: 'GET',
  //         url: '/public/battles/info/popular'
  //     },
  //     getAside: {
  //         method: 'GET',
  //         url: '/public/battles/info/aside'
  //     },
  //     getBattleInfo: {
  //         method: 'GET',
  //         url: '/public/battles/{uuid}'
  //     },
  //     getParticipantBoard: {
  //         method: 'GET',
  //         url: '/public/battles/{battle}/ratings'
  //     },
  //     voteForParticipant: {
  //         method: 'POST',
  //         url: '/app/battles/{battle}/participants/{participant}/vote'
  //     }
  // },
  comparison: {
    getList: {
      method: "POST",
      url: "/public/comparisons",
    },
  },
  getQRCode: {
    method: "GET",
    url: "/app/users/id-pass-qr-code",
  },
  getTeamQR: {
    method: "GET",
    url: "/public/v1/team/{teamId}/passport/qr-code",
  },
  teams: {
    createTeam: {
      method: "POST",
      url: "/api/v1/team",
    },
    getTeams: {
      method: "GET",
      url: "/public/v1/teams",
    },
    putTeam: {
      method: "PUT",
      url: "/api/v1/team/{teamId}",
    },
    updateTeam: {
      method: "PATCH",
      url: "/app/teams/{team}",
    },
    addTeamImage: {
      method: "POST",
      url: "/app/teams/{teamUuid}/image",
    },
    setDesiredGames: {
      method: "PATCH",
      url: "/app/users/me/desired-teams",
    },
    getMyRequests: {
      method: "GET",
      url: "/app/team-requests/my",
    },
    // getMyTeams: {
    //   method: "GET",
    //   url: "/app/users/{userUuid}/teams",
    // },
    getMyTeams: {
      method: "GET",
      url: "api/v1/my/teams",
    },
    postTeamGame: {
      method: "POST",
      url: "api/v1/team/{teamId}/game",
    },
    getTeamGames: {
      method: "GET",
      url: "public/v1/team/{teamId}/games",
    },
    getTeamDetails: {
      method: "GET",
      url: "api/v1/team/{teamId}",
    },

    getTeamRequests: {
      method: "GET",
      url: "/app/team/{teamUuid}/requests",
    },
    getTeam: {
      method: "GET",
      url: "/public/v1/team/{teamUuid}",
    },
    find: {
      method: "GET",
      url: "/app/teams",
    },
    leaveTeam: {
      method: "POST",
      url: "/app/teams/{teamUuid}/leave",
    },
    inviteUser: {
      method: "POST",
      url: "/app/teams/{teamUuid}/invite",
    },
    requestAccept: {
      method: "POST",
      url: "/app/team-requests/{requestUuid}/accept",
    },
    requestCancel: {
      method: "POST",
      url: "/app/team-requests/{requestUuid}/cancel",
    },
    movePlayer: {
      method: "POST",
      url: "/app/team-members/{teamMember}/move",
    },
    kickPlayer: {
      method: "POST",
      url: "/app/team-members/{teamMember}/exclude",
    },
    makeCaptain: {
      method: "POST",
      url: "/app/team-members/{teamMember}/capitan",
    },
    referral: {
      method: "GET",
      url: "/app/teams/referral/{referral}",
    },
    getMembers: {
      method: "GET",
      url: "/public/v1/team/{teamId}/members",
    },
    setEmailUserInvite: {
      method: "POST",
      url: "/api/v1/team/{teamId}/team-member-invites",
    },
    setIdUserInvite: {
      method: "POST",
      url: "/api/v1/team/{teamId}/team-member-invite",
    },
    delUser: {
      method: "DELETE",
      url: "/api/v1/team/{teamId}/team-member/{userId}",
    },
    getTeamInvites: {
      method: "GET",
      url: "/api/v1/my/team-invites",
    },
    setAnswerInvites: {
      method: "PUT",
      url: "/api/v1/team/{teamId}/invite",
    },
  },
  tournaments: {
    getTournaments: {
      method: "GET",
      url: "/public/v1/tournaments",
    },
    getCurrentTournament: {
      method: "GET",
      url: "/public/v1/tournament/{tournamentId}",
    },
    getTournamentMembers: {
      method: "GET",
      url: "/public/v1/tournament/{tournamentId}/tournament-members",
    },
    getTournamentMatches: {
      method: "GET",
      url: "/public/v1/tournament/{tournamentId}/matches",
    },
    getCurrentMatch: {
      method: "GET",
      url: "/public/v1/match/{matchId}",
    },
    getPrimaryTournaments: {
      method: "GET",
      url: "/public/tournaments/primary",
    },
    getTournamentDetails: {
      method: "GET",
      url: "/public/tournaments/{tournamentUuid}",
    },
    getStageList: {
      method: "GET",
      url: "/app/tournament/{tournament}/stage",
    },
    joinTournament: {
      method: "POST",
      url: "/app/tournament/{tournament}/member/{member}",
    },
    createStage: {
      method: "POST",
      url: "/app/tournament/{tournament}/stage",
    },
    getMatchDetails: {
      method: "GET",
      url: "/app/tournament/stage/match/{matchUuid}",
    },
    userReady: {
      method: "POST",
      url: "/app/tournament/stage/match/ready/{matchUuid}",
    },
    polls: {
      getPoll: {
        method: "GET",
        url: "/app/polls/{poll}",
      },
      ban: {
        method: "POST",
        url: "/app/poll-options/{option}/ban",
      },
      pick: {
        method: "POST",
        url: "/app/poll-options/{option}/pick",
      },
    },
    startMatch: {
      method: "POST",
      url: "/app/tournament/stage/match/cs/{csMatchUuid}",
    },
    getStageRounds: {
      method: "GET",
      url: "/app/tournament/stage/{stage}/round",
    },
    getPrimaryMembers: {
      method: "GET",
      url: "/api/v1/my/team/primary",
    },
    postTeamRoster: {
      method: "POST",
      url: "/api/v1/tournament/{tournamentId}/tournament-member",
    },
  },
  watch: {
    getAllMatches: {
      method: "GET",
      url: "/public/v1/matches",
    },
  },
  support: {
    method: "POST",
    url: "/public/v1/contact",
  },
};

import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";

import { ROUTER, HIDE_FOR } from "../../config";
import { isAuthenticated } from "../../helpers";

import Homepage from "../../pages/homepage";
// import Login from "../../pages/login/mainlogin"; // old
import Login from "../../pages/login"; // new
import ResetPassword from "../../pages/reset-passwod"; // new
import newPassword from "../../pages/new-password";
import ConfirmPassword from "../../pages/confirm-password"; // new
import Profile from "../../pages/profile"; // new
import AddRoster from "../../pages/add-roster"; // new
import SignUp from "../../pages/signup"; // new
import TermsOfUse from "../../pages/terms-of-use"; // new
import CookiePolicy from "../../pages/cookie-policy";
import PrivacyPolicy from "../../pages/privacy-policy";
import Ratings from "../../pages/ratings";
// import CityBattles from "../../pages/city-battle";
import FindFriends from "../../pages/community/find-friends";
import MyFriends from "../../pages/community/my-friends";
// import Community from "../../pages/community/community";
import CommunityPage from "../../pages/community-page/CommunityPage";
import TournamentPage from "../../pages/tournaments-page";
import CreateCommunity from "../../pages/community/community/create-community";
import EarnSpend from "../../pages/earn-spend";
import CommunitiesPage from "../../pages/communities-page"; //new

import EventPage from "../../pages/event-page-new"; //new
import Leaderboard from "../../pages/leaderboard/LeaderBoard"; //new

import Roster from "../../pages/roster/roster"; //new
import disciplineRoster from "../../pages/roster/discipline"; //new
import CreateRoster from "../../pages/roster/createRoster"; //new

// import Profile from "../../pages/id"; // old
import Messenger from "../../pages/messenger";
import searchTournaments from "../../pages/watch";
// import Settings from "../../pages/settings"; // old
import Settings from "../../pages/profile-settings"; // new
import TeamSettings from "../../pages/team-settings/edit-team"; // new
import CreateTeam from "../../pages/team-settings/Settings"; // new

import Password from "../profile/password";
import ConnectSteamGame from "../../pages/steam";
import SteamRegistration from "../../pages/steam-registration";
// import ResetPassword from "../../pages/password-reset"; // old
import EmailConfirm from "../../pages/email-confirm";
import Comparison from "../../pages/comparison";
import PageNotFound from "../../pages/page-not-found";
import NeedAuth from "../../pages/need-auth";
import SupportContainer from "../../pages/support";
import Team from "../../pages/team";
import InviteTeam from "../../pages/inviteTeam";
import { FindTeam, TeamPage, TeamInvite } from "../../pages/teams";
import { Tournaments, TournamentDetails, Match } from "../../pages/tournaments";
import ChangePassword from "../../pages/change-password";
import More from "../../pages/more";
import Calendar from "../../pages/calendar";
import Notifications from "../../pages/notifications";
import Verification from "../../pages/verification";
import CupBracket from "../../pages/battle-cup/HOC/CupBracketHOC"; //new
import CupInformation from "../../pages/battle-cup/HOC/CupInformationHoc"; //new
import CupMatches from "../../pages/battle-cup/HOC/CupMatchesHOC"; //new
import CupParticipants from "../../pages/battle-cup/HOC/CupParticipantsHOC"; //new
import CupStatistics from "../../pages/battle-cup/HOC/CupStatisticsHOC"; //new
import CupRules from "../../pages/battle-cup/HOC/CupRulesHOC"; //new
import Games from "../../pages/games/Games"; //new
import GamesRoster from "../../pages/games";
import MatchDiscussion from "../../pages/match-discussion/MatchDiscussion"; //new
import RegistrationTournament from "../../pages/registration-tournament";
import profile4 from "../../assets/images/profile-4.png";

const StyledMain = styled.main`
  flex: 1;
`;

const PrivateRoute = ({ children, ...rest }) => {
  if (!isAuthenticated()) {
    return <NeedAuth />;
  }

  return <Route {...rest} />;
};

export const Context = React.createContext();
let contextDate = {
  country: "Estonia",
  languages: ["Estonian", "Germany"],
  gameMain: "",
  gameImage: "",
  couchName: "",
  couchImg: "",
  teamBuilder: "KingPin",
  teamBuilderImage: profile4,
  managerName: "KingPin",
  managerImg: profile4,
  team: ["+"],
  reserveTeam: ["+"],
  decisionIsMade: false,
  rosterChoise: false,
};

const Main = () => {
  const [location, setLocation] = useState(window.location.pathname);

  useEffect(() => {
    console.log(window.location.pathname);
    setLocation(window.location.pathname);
  }, [window.location.pathname]);

  const [context, setContext] = useState(contextDate);
  return (
    <Context.Provider value={[context, setContext]}>
      <StyledMain
        style={
          HIDE_FOR.includes(location)
            ? {}
            : { marginBottom: "var(--menu-height)" }
        }
      >
        <Switch>
          <Route path={ROUTER.homepage} exact component={Login} />
          <Route path={ROUTER.login} exact component={Login} />
          <Route path={ROUTER.signup} exact component={SignUp} />
          <Route path={ROUTER.needauth} exact component={NeedAuth} />
          <Route
            path={ROUTER.confirmPassword}
            exact
            component={ConfirmPassword}
          />
          <Route path={ROUTER.verification} exact component={Verification} />
          <Route path={ROUTER.ratings} exact component={Ratings} />
          <Route path={ROUTER.earnSpend} exact component={EarnSpend} />
          <Route path={ROUTER.resetPassword} exact component={ResetPassword} />
          <Route path={ROUTER.changePassword} exact component={newPassword} />
          <Route path={ROUTER.emailConfirm} exact component={EmailConfirm} />
          <PrivateRoute path={ROUTER.addroster} exact component={AddRoster} />
          <PrivateRoute
            path={ROUTER.watch}
            exact
            component={searchTournaments}
          />
          <Route path={ROUTER.termsOfUse} exact component={TermsOfUse} />]
          <Route path={ROUTER.privacyPolicy} exact component={PrivacyPolicy} />
          <Route path={ROUTER.cookiePolicy} exact component={CookiePolicy} />
          <PrivateRoute path={ROUTER.eventPage} exact component={EventPage} />
          <PrivateRoute path={ROUTER.games} exact component={Games} />
          <PrivateRoute
            path={ROUTER.createRoster}
            exact
            component={CreateRoster}
          />
          <PrivateRoute
            path={ROUTER.gamesRoster}
            exact
            component={GamesRoster}
          />
          <PrivateRoute path={ROUTER.roster} exact component={Roster} />
          <PrivateRoute
            path={ROUTER.disciplineRoster}
            exact
            component={disciplineRoster}
          />
          <Route
            path={ROUTER.steamRegistration}
            exact
            component={SteamRegistration}
          />
          <PrivateRoute
            path={ROUTER.communitiesPage}
            exact
            component={CommunitiesPage}
          />
          <PrivateRoute
            path={ROUTER.community.communityTabs}
            exact
            component={CommunityPage}
          />
          <PrivateRoute
            path={ROUTER.tournaments.UserTournaments}
            exact
            component={TournamentPage}
          />
          <PrivateRoute
            path={ROUTER.battleCup.registrationTournament}
            exact
            component={RegistrationTournament}
          />
          <PrivateRoute path={ROUTER.comparison} exact component={Comparison} />
          <PrivateRoute
            path={ROUTER.teams.invite}
            exact
            component={TeamInvite}
          />
          <PrivateRoute
            path={ROUTER.battleCup.bracket.preliminary_tournament}
            exact
            component={CupBracket}
            /* preliminary_tournament */
          />
          <PrivateRoute
            path={ROUTER.battleCup.bracket.group_stage}
            exact
            component={CupBracket}
            /* group_stage */
          />
          <PrivateRoute
            path={ROUTER.battleCup.bracket.play_off}
            exact
            component={CupBracket}
            /* play_off */
          />
          <PrivateRoute
            path={ROUTER.battleCup.rules}
            exact
            component={CupRules}
          />
          <PrivateRoute
            path={ROUTER.battleCup.information}
            exact
            component={CupInformation}
          />
          <PrivateRoute
            path={ROUTER.battleCup.matches}
            exact
            component={CupMatches}
          />
          <PrivateRoute
            path={ROUTER.battleCup.participants}
            exact
            component={CupParticipants}
          />
          <PrivateRoute
            path={ROUTER.battleCup.statistics}
            exact
            component={CupStatistics}
          />
          <PrivateRoute
            path={ROUTER.tournaments.details}
            exact
            component={TournamentDetails}
          />
          <PrivateRoute
            path={ROUTER.tournaments.match}
            exact
            component={Match}
          />
          <PrivateRoute path={ROUTER.more} exact component={More} />
          <PrivateRoute path={ROUTER.home} exact component={Profile} />
          <PrivateRoute path={ROUTER.rating} exact component={Leaderboard} />
          <PrivateRoute path={ROUTER.calendar} exact component={Calendar} />
          <PrivateRoute
            path={ROUTER.notifications}
            exact
            component={Notifications}
          />
          <PrivateRoute
            path={ROUTER.profile.password}
            exact
            component={ChangePassword}
          />
          <PrivateRoute path={ROUTER.id} exact component={Profile} />
          <PrivateRoute
            path={ROUTER.profile.settings}
            exact
            component={Settings}
          />
          <PrivateRoute
            path={ROUTER.profile.password}
            exact
            component={ChangePassword}
          />
          <PrivateRoute path={ROUTER.id} exact component={Profile} />
          <PrivateRoute
            path={ROUTER.profile.settings}
            exact
            component={Settings}
          />
          <PrivateRoute path={ROUTER.steam} exac component={ConnectSteamGame} />
          <PrivateRoute path={ROUTER.messenger} exact component={Messenger} />
          {/* <PrivateRoute
            path={ROUTER.community.communityTabs}
            exact
            component={Community}
          /> */}
          <PrivateRoute
            path={ROUTER.community.findFriends}
            exact
            component={FindFriends}
          />
          <PrivateRoute
            path={ROUTER.community.myFriends}
            exact
            component={MyFriends}
          />
          <PrivateRoute
            path={ROUTER.MatchDisscusion}
            exact
            component={MatchDiscussion}
          />
          <PrivateRoute
            path={ROUTER.community.createCommunity}
            exact
            component={CreateCommunity}
          />
          <PrivateRoute
            path={ROUTER.teams.create}
            exact
            component={CreateTeam}
          />
          <PrivateRoute
            // path={ROUTER.teams.edit}
            // exact
            // render={(props) => <CreateTeam {...props} editMode />} old
            path={ROUTER.teams.edit}
            exact
            component={TeamSettings} //new
          />
          <PrivateRoute path={ROUTER.teams.find} exact component={FindTeam} />
          {/* <PrivateRoute path={ROUTER.teams.team} exact component={TeamPage} /> */}
          <PrivateRoute path={ROUTER.teams.team} exact component={Team} />
          <PrivateRoute
            path={ROUTER.teams.inviteTeam}
            exact
            component={InviteTeam}
          />
          <PrivateRoute
            path={ROUTER.support}
            exact
            component={SupportContainer}
          />
          <Route path="*" exact component={PageNotFound} />
        </Switch>
      </StyledMain>
    </Context.Provider>
  );
};

export default Main;

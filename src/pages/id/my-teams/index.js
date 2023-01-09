import React, { Component, useEffect, useState } from "react";
import { Button, ButtonRow, CheckBox, ContentBox, Table, TitleRowTitle } from "../../../components/UI";
import { FormattedMessage, useIntl } from "react-intl";
import { API, API_ROUTER } from "../../../api";
import { TEAM_GAMES } from "../../../config";
import GameSwitcher from "../../../components/game-switcher";
import { Styled } from "./style";
import { Box, LinearProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import noImage from '../../../assets/justin-bober.svg';
import Flag from 'react-world-flags';
import { useSelector } from "react-redux";

class Request extends Component {

   state = {
      page: 1,
      pages: 1,
      limit: 20,
      requests: [],
      loading: true
   }

   get tableModel() {
      const { intl } = this.props;

      return [
         {
            key: 'team',
            value: intl.formatMessage({ id: "teams.team.table.team" })
         },
         {
            key: 'country',
            value: intl.formatMessage({ id: "teams.team.table.country" })
         },
         {
            key: 'date',
            value: intl.formatMessage({ id: "teams.team.table.date" })
         },
         {
            key: 'status',
            value: intl.formatMessage({ id: "teams.team.table.status" })
         },
         {
            key: 'controls',
            value: ''
         }
      ]
   }

   tableData = requests => {
      return requests.map(request => {
         const { team } = request;
         const { countriesList } = this.props;

         const country = countriesList
            ? countriesList.find(item => item.value === team.country)
            : null

         return ({
            team: (
               <Styled.TableTeam href={`/teams/team/${team.url}`}>
                  <img src={team.image?.url || noImage} alt={team.name} />
                  <span>{team.name}</span>
               </Styled.TableTeam>
            ),
            country: (
               <Styled.TableCountry>
                  <Flag code={team.country} />
                  <span>{country ? country.label : ''}</span>
               </Styled.TableCountry>
            ),
            date: this.getDate(request.createdAt),
            status: request.status,
            controls: (
               <Styled.TableActions>
                  {request.status === 'pending' &&
                     <>
                        <span onClick={() => this.inviteCancel(request.uuid)}>Cancel</span>
                     </>
                  }
               </Styled.TableActions>
            )
         })
      })
   }

   componentDidMount() {
      this.getData()
   }

   getData = () => {
      const { limit, page } = this.state;

      API.request({
         ...API_ROUTER.teams.getMyRequests,
         urlParams: {
            limit,
            page
         }
      }, true)
         .then(res => {
            this.setState({
               page: res.page,
               pages: res.pages,
               requests: res.items,
               loading: false
            })
         })
         .catch(err => console.log(err))
   }

   renderPagination = (pages, page) => {
      if (!page || !pages)
         return false

      const pagination = [];
      for (let i = 1; i < pages + 1; i++) {
         pagination.push(
            <button
               key={i}
               onClick={() => this.setState({ page: i }, () => this.getData())}
               className={i === page ? 'active' : ''}>
               {i}
            </button>
         )
      }

      const filterPagination = (page, pages) => {
         let leftLimit = page - 3;
         let rightLimit = page + 2;

         if (leftLimit < 0) leftLimit = 0;
         if (rightLimit > pages) rightLimit = pages;

         const res = pagination.slice(leftLimit, rightLimit)

         if (leftLimit > 0) {
            res.unshift(<button className="skipper" key="skip-left">...</button>)
            res.unshift(pagination.slice(0, 1))
         }

         if (rightLimit < pages) {
            res.push(<button className="skipper" key="skip-right">...</button>)
            res.push(pagination.slice(pages - 1, pages))
         }

         return res
      }

      return filterPagination(page, pages)
   }

   getDate(inputDate) {
      const date = new Date(inputDate)
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();

      return (
         <Styled.TableDate>
            <span>{`${d < 10 ? `0${d}` : d}.${m < 10 ? `0${m}` : m}.${y}`}</span>
         </Styled.TableDate>
      )
   }

   inviteCancel = requestUuid => {
      API.request({
         ...API_ROUTER.teams.requestCancel,
         pathKeys: {
            requestUuid
         }
      }, true)
         .then(() => this.getData())
         .catch(err => console.error(err))
   }

   render() {
      const { loading, requests, limit, page, pages } = this.state

      if (loading) {
         return <LinearProgress />
      }

      if (!requests.length) {
         return (
            <div />
         )
      }

      return (
         <>
            <Styled.RequestsLabel>
               <FormattedMessage id="teams.team.myRequests" />
            </Styled.RequestsLabel>
            <Table tableModel={this.tableModel} tableData={this.tableData(requests).reverse()} />
            <Styled.TableFooter>
               <div className="pagination">
                  {this.renderPagination(pages, page)}
               </div>
               <div className="show">
                  <FormattedMessage id="table.pagination.show" tagName="span" />
                  <div className="controls">
                     <button
                        onClick={() => this.setState({ limit: 20, page: 1 }, () => this.getData())}
                        className={limit === 20 ? 'active' : ''}>
                        20
                     </button>
                     <button
                        onClick={() => this.setState({ limit: 50, page: 1 }, () => this.getData())}
                        className={limit === 50 ? 'active' : ''}>
                        50
                     </button>
                     <button
                        onClick={() => this.setState({ limit: 100, page: 1 }, () => this.getData())}
                        className={limit === 100 ? 'active' : ''}>
                        100
                     </button>
                  </div>
               </div>
            </Styled.TableFooter>
         </>
      )
   }
}

const Team = ({ team, exTeam }) => {
   const history = useHistory()
   const details = team.team;

   return (
      <Styled.TeamItem onClick={() => history.push(`/teams/team/${details.url}`)}>
         <img
            className={exTeam ? 'ex' : ''}
            src={details.image?.url || noImage} alt={details.name} />
         <span>{details.name}</span>
      </Styled.TeamItem>
   )
}

const MyTeams = ({ data, isCurrentUser }) => {
   const intl = useIntl()
   const history = useHistory()
   const countriesList = useSelector(props => props.countriesList)
   const [loading, setLoading] = useState(true)
   const [myTeams, setMyTeams] = useState({})
   const [selectedGame, setSelectedGame] = useState('cs-go')
   const [desiredState, setDesiredState] = useState([])

   const onGameChange = game => {
      setSelectedGame(game)
   }

   const checkBoxHandler = () => {
      const desiredTeams = desiredState;

      if (!desiredTeams.includes(selectedGame)) {
         desiredTeams.push(selectedGame)
      } else {
         const current = desiredTeams.indexOf(selectedGame)
         desiredTeams.splice(current, 1);
      }

      setLookingState(desiredTeams)
   };

   const convertTeams = list => {
      const out = {}

      TEAM_GAMES.forEach(item => out[item] = [])

      list.forEach(item => {
         const game = item.team.game;

         if (out[game]) {
            out[game].push(item)
         }
      })

      setMyTeams(out)
   }

   const setLookingState = state => {
      API.request({
         ...API_ROUTER.teams.setDesiredGames,
         data: {
            desiredTeams: state
         }
      }, true)
         .then(res => console.log(res))
         .catch(err => console.log(err))
   }

   useEffect(() => {
      const { desiredTeams, uuid } = data;
      setDesiredState(desiredTeams)

      // get my teams
      API.request({
         ...API_ROUTER.teams.getMyTeams,
         pathKeys: {
            userUuid: uuid
         }
      }, true)
         .then(res => {
            convertTeams(res.list)
            setLoading(false)
         })
         .catch(err => console.log(err))

   }, [data])

   if (loading) {
      return (
         <ContentBox>
            <LinearProgress />
         </ContentBox>
      )
   }

   if (myTeams[selectedGame] && myTeams[selectedGame].length) {
      const activeTeams = myTeams[selectedGame].filter(item => item.active)
      const exTeams = myTeams[selectedGame].filter(item => !item.active)

      return (
         <ContentBox>
            <Styled.MainTitle>
               <TitleRowTitle>
                  <FormattedMessage id="id.teams.title" />
               </TitleRowTitle>
               <Box ml={2}>
                  <GameSwitcher
                     selectedGame={selectedGame}
                     gamesAvailable={TEAM_GAMES}
                     setSelectedGame={onGameChange} />
               </Box>
            </Styled.MainTitle>
            {!!activeTeams.length &&
               <>
                  <Styled.TeamTitle>
                     <FormattedMessage id="id.teams.activeTeams" />
                  </Styled.TeamTitle>
                  <Styled.TeamRow>
                     {activeTeams.map(item => (
                        <div key={item.uuid}>
                           <Team team={item} />
                        </div>
                     ))}
                  </Styled.TeamRow>
               </>
            }
            {!!exTeams.length &&
               <>
                  <Styled.TeamTitle>
                     <FormattedMessage id="id.teams.exTeams" />
                  </Styled.TeamTitle>
                  <Styled.TeamRow>
                     {exTeams.map(item => (
                        <div key={item.uuid}>
                           <Team team={item} exTeam />
                        </div>
                     ))}
                  </Styled.TeamRow>
               </>
            }
            {isCurrentUser &&
               <>
                  <Styled.Looking>
                     <CheckBox
                        onChange={checkBoxHandler}
                        checked={!(desiredState.indexOf(selectedGame) === -1)}>
                        <FormattedMessage id="id.teams.lookTitle" />
                     </CheckBox>
                     <div className="message">
                        <FormattedMessage id="id.teams.lookDescription" />
                     </div>
                  </Styled.Looking>
                  <Styled.Requests>
                     {!loading && <Request intl={intl} countriesList={countriesList} />}
                  </Styled.Requests>
                  <ButtonRow>
                     <Button
                        variant="secondary"
                        label={<FormattedMessage id="id.teams.findTeam" />}
                        action={() => history.push(`/teams/find-team/${selectedGame}`)} />
                     <Button
                        variant="primary"
                        disabled={!!activeTeams.length}
                        label={<FormattedMessage id="id.teams.createTeam" />}
                        action={() => history.push('/teams/create-team')} />
                  </ButtonRow>
               </>
            }
         </ContentBox>
      )
   }

   return (
      <ContentBox>
         <Styled.MainTitle>
            <TitleRowTitle>
               <FormattedMessage id="id.teams.title" />
            </TitleRowTitle>
            <Box ml={2}>
               <GameSwitcher
                  selectedGame={selectedGame}
                  gamesAvailable={TEAM_GAMES}
                  setSelectedGame={onGameChange} />
            </Box>
         </Styled.MainTitle>
         <Styled.NoTeams>
            <div className="message">
               <FormattedMessage id="id.teams.noTeams" />
            </div>
            {isCurrentUser &&
               <div className="buttons">
                  <Button
                     variant="secondary"
                     label={<FormattedMessage id="id.teams.findTeam" />}
                     action={() => history.push(`/teams/find-team/${selectedGame}`)} />
                  <Button
                     variant="primary"
                     label={<FormattedMessage id="id.teams.createTeam" />}
                     action={() => history.push('/teams/create-team')} />
               </div>
            }
         </Styled.NoTeams>
         {isCurrentUser &&
            <>
               <Styled.Looking>
                  <CheckBox
                     onChange={checkBoxHandler}
                     checked={!(desiredState.indexOf(selectedGame) === -1)}>
                     <FormattedMessage id="id.teams.lookTitle" />
                  </CheckBox>
                  <div className="message">
                     <FormattedMessage id="id.teams.lookDescription" />
                  </div>
               </Styled.Looking>
               <Styled.Requests>
                  {!loading && <Request intl={intl} countriesList={countriesList} />}
               </Styled.Requests>
            </>
         }
      </ContentBox>
   )
}

export default MyTeams
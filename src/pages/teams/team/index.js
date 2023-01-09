import React, { Component, useState } from "react";
import {
  ContentBox,
  Container,
  Button,
  Modal,
  ButtonRow,
  ModalTitle,
  ModalSubTitle,
  Table,
  Menu,
  MenuItem,
  SocialLinkHolder,
  SocialLink,
} from "../../../components/UI";
import { API, API_ROUTER } from "../../../api";
import { Box, LinearProgress } from "@material-ui/core";
import { FormattedMessage, injectIntl } from "react-intl";
import { Styled } from "./style";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import noImage from "../../../assets/justin-bober.svg";
import Flag from "react-world-flags";
import { getAvatar, isAuthenticated } from "../../../helpers";
import { useHistory } from "react-router-dom";
import { showNotificationModal } from "../../../redux/actions";

class Request extends Component {
  state = {
    page: 1,
    pages: 1,
    limit: 20,
    requests: [],
    loading: true,
  };

  get tableModel() {
    const { intl } = this.props;

    return [
      {
        key: "gamer",
        value: intl.formatMessage({ id: "teams.team.table.gamer" }),
      },
      {
        key: "country",
        value: intl.formatMessage({ id: "teams.team.table.country" }),
      },
      {
        key: "date",
        value: intl.formatMessage({ id: "teams.team.table.date" }),
      },
      {
        key: "status",
        value: intl.formatMessage({ id: "teams.team.table.status" }),
      },
      {
        key: "controls",
        value: "",
      },
    ];
  }

  tableData = (requests) => {
    return requests.map((request) => {
      const { member } = request;
      const { countriesList } = this.props;

      const country = countriesList
        ? countriesList.find((item) => item.value === member.country)
        : null;

      return {
        gamer: (
          <Styled.TableGamer
            href={"/id/" + member.url}
            image={getAvatar(member.avatars)}
          >
            <div className={`picture ${member.topGamer && "top-gamer"}`} />
            <div className="name">{member.nickname}</div>
          </Styled.TableGamer>
        ),
        country: (
          <Styled.TableCountry>
            <Flag code={member.country} />
            <span>{country ? country.label : ""}</span>
          </Styled.TableCountry>
        ),
        date: this.getDate(request.createdAt),
        status: request.status,
        controls: (
          <Styled.TableActions>
            {request.status === "pending" && (
              <>
                <span onClick={() => this.inviteAccept(request.uuid)}>
                  Accept
                </span>
                <span onClick={() => this.inviteCancel(request.uuid)}>
                  Cancel
                </span>
              </>
            )}
          </Styled.TableActions>
        ),
      };
    });
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const { limit, page } = this.state;
    const { team } = this.props;

    API.request(
      {
        ...API_ROUTER.teams.getTeamRequests,
        pathKeys: {
          teamUuid: team.uuid,
        },
        urlParams: {
          limit,
          page,
        },
      },
      true
    )
      .then((res) => {
        this.setState({
          page: res.page,
          pages: res.pages,
          requests: res.items,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  };

  renderPagination = (pages, page) => {
    if (!page || !pages) return false;

    const pagination = [];
    for (let i = 1; i < pages + 1; i++) {
      pagination.push(
        <button
          key={i}
          onClick={() => this.setState({ page: i }, () => this.getData())}
          className={i === page ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    const filterPagination = (page, pages) => {
      let leftLimit = page - 3;
      let rightLimit = page + 2;

      if (leftLimit < 0) leftLimit = 0;
      if (rightLimit > pages) rightLimit = pages;

      const res = pagination.slice(leftLimit, rightLimit);

      if (leftLimit > 0) {
        res.unshift(
          <button className="skipper" key="skip-left">
            ...
          </button>
        );
        res.unshift(pagination.slice(0, 1));
      }

      if (rightLimit < pages) {
        res.push(
          <button className="skipper" key="skip-right">
            ...
          </button>
        );
        res.push(pagination.slice(pages - 1, pages));
      }

      return res;
    };

    return filterPagination(page, pages);
  };

  getDate(inputDate) {
    const date = new Date(inputDate);
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();

    return (
      <Styled.TableDate>
        <span>{`${d < 10 ? `0${d}` : d}.${m < 10 ? `0${m}` : m}.${y}`}</span>
      </Styled.TableDate>
    );
  }

  inviteCancel = (requestUuid) => {
    API.request(
      {
        ...API_ROUTER.teams.requestCancel,
        pathKeys: {
          requestUuid,
        },
      },
      true
    )
      .then(() => this.getData())
      .catch((err) => console.error(err));
  };

  inviteAccept = (requestUuid) => {
    API.request(
      {
        ...API_ROUTER.teams.requestAccept,
        pathKeys: {
          requestUuid,
        },
      },
      true
    )
      .then(() => {
        this.props.updateHandler();
        this.props.switchTab();
      })
      .catch((err) => console.error(err));
  };

  render() {
    const { loading, requests, limit, page, pages } = this.state;

    if (loading) {
      return <LinearProgress />;
    }

    if (!requests.length) {
      return (
        <Styled.NoResults>
          <FormattedMessage id="teams.team.noRequests" />
        </Styled.NoResults>
      );
    }

    return (
      <>
        <Table
          tableModel={this.tableModel}
          tableData={this.tableData(requests).reverse()}
        />
        <Styled.TableFooter>
          <div className="pagination">{this.renderPagination(pages, page)}</div>
          <div className="show">
            <FormattedMessage id="table.pagination.show" tagName="span" />
            <div className="controls">
              <button
                onClick={() =>
                  this.setState({ limit: 20, page: 1 }, () => this.getData())
                }
                className={limit === 20 ? "active" : ""}
              >
                20
              </button>
              <button
                onClick={() =>
                  this.setState({ limit: 50, page: 1 }, () => this.getData())
                }
                className={limit === 50 ? "active" : ""}
              >
                50
              </button>
              <button
                onClick={() =>
                  this.setState({ limit: 100, page: 1 }, () => this.getData())
                }
                className={limit === 100 ? "active" : ""}
              >
                100
              </button>
            </div>
          </div>
        </Styled.TableFooter>
      </>
    );
  }
}

const ConfirmModal = ({ state, closeHandler, makeCaptain, kickPlayer }) => {
  if (!state.actionPlayer || !state.actionPlayer.member) {
    return <div />;
  }

  const { member, isCapitan } = state.actionPlayer;
  const isMakeCaptain = state.type === "makeCaptain";

  return (
    <Modal closeButton onClose={closeHandler} open={state.open}>
      <ModalTitle>
        <FormattedMessage id="teams.team.confirmModalTitle" />
      </ModalTitle>
      <ModalSubTitle>
        {isMakeCaptain ? (
          <FormattedMessage id="teams.team.makeCaptainModalSubTitle" />
        ) : (
          <FormattedMessage id="teams.team.kickPlayerModalSubTitle" />
        )}
      </ModalSubTitle>
      <Styled.Player inModal>
        <div className="nickname">{member.nickname}</div>
        <Styled.AvatarHolder>
          <Styled.Avatar
            className={member.topGamer ? "top-gamer" : ""}
            image={getAvatar(member.avatars)}
          />
          {member.online && <Styled.OnlineStatus />}
          <div className="flag">
            <Flag code={member.country} />
          </div>
        </Styled.AvatarHolder>
        <div className={`username ${isCapitan ? "captain" : ""}`}>
          {member.firstName || ""} {member.lastName || ""}
        </div>
      </Styled.Player>
      <ButtonRow direction="center">
        <Button
          variant="secondary"
          label={<FormattedMessage id="teams.team.cancel" />}
          action={closeHandler}
        />
        <Button
          variant="primary"
          label={<FormattedMessage id="notifications.confirm" />}
          action={() =>
            isMakeCaptain
              ? makeCaptain(state.actionPlayer)
              : kickPlayer(state.actionPlayer)
          }
        />
      </ButtonRow>
    </Modal>
  );
};

const LineUp = ({ team, isCaptain, intl, countriesList, updateHandler }) => {
  const history = useHistory();
  const { members } = team;

  const stages = ["current", "standins", "historic"];
  if (isCaptain) {
    stages.push("requests");
  }

  const [activeStage, setActiveStage] = useState("current");
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    type: "",
    actionPlayer: {},
  });

  const sortByCaptain = (x, y) => (y.isCapitan ? 0 : x ? -1 : 1);

  const currentPlayers = members
    .filter((item) => item.lineUp === "main" && item.active)
    .sort(sortByCaptain);
  const standins = members
    .filter((item) => item.lineUp === "additional" && item.active)
    .sort(sortByCaptain);
  const historyPlayers = members
    .filter((item) => !item.active)
    .sort(sortByCaptain);

  let lineUp = currentPlayers;
  if (activeStage === "standins") {
    lineUp = standins;
  }

  const movePlayer = (player, lineUp) => {
    API.request(
      {
        ...API_ROUTER.teams.movePlayer,
        pathKeys: {
          teamMember: player.uuid,
        },
        data: {
          lineUp: lineUp,
        },
      },
      true
    )
      .then(() => updateHandler())
      .catch((err) => toast.error(err.data && err.data.message));
  };

  const kickPlayer = (player) => {
    API.request(
      {
        ...API_ROUTER.teams.kickPlayer,
        pathKeys: {
          teamMember: player.uuid,
        },
      },
      true
    )
      .then(() => {
        updateHandler();
        setConfirmModal({
          open: false,
          type: "",
          actionPlayer: {},
        });
      })
      .catch((err) => toast.error(err.data && err.data.message));
  };

  const makeCaptain = (player) => {
    API.request(
      {
        ...API_ROUTER.teams.makeCaptain,
        pathKeys: {
          teamMember: player.uuid,
        },
      },
      true
    )
      .then(() => {
        updateHandler();
        setConfirmModal({
          open: false,
          type: "",
          actionPlayer: {},
        });
      })
      .catch((err) => toast.error(err.data && err.data.message));
  };

  return (
    <>
      <ConfirmModal
        closeHandler={() =>
          setConfirmModal({
            open: false,
            type: "",
            actionPlayer: {},
          })
        }
        kickPlayer={kickPlayer}
        makeCaptain={makeCaptain}
        state={confirmModal}
      />
      <Styled.LineUp>
        {stages.map((stage) => (
          <Styled.Stage
            key={stage}
            onClick={() => setActiveStage(stage)}
            active={stage === activeStage}
          >
            <FormattedMessage id={`teams.team.lineup.${stage}`} />
          </Styled.Stage>
        ))}
      </Styled.LineUp>
      {(activeStage === "current" || activeStage === "standins") && (
        <Styled.PlayersRow>
          {lineUp.length ? (
            lineUp.map((player) => {
              const { member } = player;

              return (
                <Styled.PlayerCol key={player.uuid}>
                  <Styled.Player
                    onClick={() => history.push(`/id/${player.member.url}`)}
                  >
                    {isCaptain && (
                      <div className="control-holder">
                        <Menu>
                          {!player.isCapitan && (
                            <MenuItem
                              callback={() =>
                                setConfirmModal({
                                  open: true,
                                  type: "makeCaptain",
                                  actionPlayer: player,
                                })
                              }
                            >
                              <FormattedMessage
                                id="teams.team.control.makeCaptain"
                                tagName="span"
                              />
                            </MenuItem>
                          )}
                          <MenuItem
                            callback={() =>
                              movePlayer(
                                player,
                                activeStage === "current"
                                  ? "additional"
                                  : "main"
                              )
                            }
                          >
                            <FormattedMessage
                              id={`teams.team.control.${
                                activeStage === "current" ? "reserve" : "main"
                              }`}
                              tagName="span"
                            />
                          </MenuItem>
                          {!player.isCapitan && (
                            <MenuItem
                              callback={() =>
                                setConfirmModal({
                                  open: true,
                                  type: "kickPlayer",
                                  actionPlayer: player,
                                })
                              }
                            >
                              <FormattedMessage
                                id="teams.team.control.kick"
                                tagName="span"
                              />
                            </MenuItem>
                          )}
                        </Menu>
                      </div>
                    )}
                    <div className="nickname">{member.nickname}</div>
                    <Styled.AvatarHolder>
                      <Styled.Avatar
                        className={member.topGamer ? "top-gamer" : ""}
                        image={getAvatar(member.avatars)}
                      />
                      {member.online && <Styled.OnlineStatus />}
                      <div className="flag">
                        <Flag code={member.country} />
                      </div>
                    </Styled.AvatarHolder>
                    <div
                      className={`username ${
                        player.isCapitan ? "captain" : ""
                      }`}
                    >
                      {member.firstName || ""} {member.lastName || ""}
                    </div>
                  </Styled.Player>
                </Styled.PlayerCol>
              );
            })
          ) : (
            <Styled.NoResults>
              <FormattedMessage id="teams.team.noPlayers" />
            </Styled.NoResults>
          )}
        </Styled.PlayersRow>
      )}
      {activeStage === "historic" && (
        <Styled.PlayersRow>
          {historyPlayers.length ? (
            historyPlayers.map((player) => {
              const { member } = player;

              return (
                <Styled.PlayerCol key={player.uuid}>
                  <Styled.Player
                    onClick={() => history.push(`/id/${player.member.url}`)}
                  >
                    <div className="nickname">{member.nickname}</div>
                    <Styled.AvatarHolder>
                      <Styled.Avatar
                        className={`historic ${
                          member.topGamer ? "top-gamer" : ""
                        }`}
                        image={getAvatar(member.avatars)}
                      />
                      {member.online && <Styled.OnlineStatus />}
                      <div className="flag">
                        <Flag code={member.country} />
                      </div>
                    </Styled.AvatarHolder>
                    <div
                      className={`username ${
                        player.isCapitan ? "captain" : ""
                      }`}
                    >
                      {member.firstName || ""} {member.lastName || ""}
                    </div>
                  </Styled.Player>
                </Styled.PlayerCol>
              );
            })
          ) : (
            <Styled.NoResults>
              <FormattedMessage id="teams.team.noPlayers" />
            </Styled.NoResults>
          )}
        </Styled.PlayersRow>
      )}
      {activeStage === "requests" && (
        <Request
          team={team}
          intl={intl}
          updateHandler={updateHandler}
          switchTab={() => setActiveStage("current")}
          countriesList={countriesList}
        />
      )}
    </>
  );
};

class TeamPage extends Component {
  state = {
    loading: true,
    error: false,
    team: null,
    requests: null,
    leaveModal: false,
    inviteModal: false,
    invitationSent: false,
  };

  checkInvite() {
    // check invite link
    const inviteCode = localStorage.getItem("team-invite");

    if (inviteCode) {
      localStorage.removeItem("team-invite");
      this.joinTeam();
    }
  }

  checkRequests = async (team) => {
    const { userData } = this.props;

    if (!userData) {
      setTimeout(() => {
        this.checkRequests(team);
      }, 100);
      return;
    }

    const isMember = this.isMember(team);

    if (!isMember) {
      let requests = [];
      let invitationSent = false;

      await API.request(
        {
          ...API_ROUTER.teams.getTeamRequests,
          pathKeys: {
            teamUuid: team.uuid,
          },
          urlParams: {
            limit: 100,
          },
        },
        true
      )
        .then((res) => (requests = res.items))
        .catch((err) => console.log(err));

      requests.forEach((req) => {
        if (userData.uuid === req.member.uuid && req.status === "pending") {
          invitationSent = req.uuid;
        }
      });

      this.setState({ invitationSent });
    }
  };

  getData = () => {
    const { team } = this.props.match.params;

    if (!team) {
      this.setState({ error: true });
      return;
    }

    API.request(
      {
        ...API_ROUTER.teams.getTeamDetails,
        pathKeys: {
          teamId: team,
        },
      },
      true
    )
      .then((team) =>
        this.setState({ team, loading: false }, () => {
          this.checkInvite();
          this.checkRequests(team);
        })
      )
      .catch((err) => {
        console.error(err);
        this.setState({ error: true, loading: false });
      });
  };

  toggleModal = (modal, state) => this.setState({ [modal]: state });

  componentDidMount() {
    this.getData();
  }

  getCountry(team) {
    const { countriesList } = this.props;

    const country = countriesList
      ? countriesList.find((item) => item.value === team.country?.toUpperCase())
      : null;

    return (
      <Styled.TableCountry>
        <Flag code={team.country} />
        <span>{country ? country.label : ""}</span>
      </Styled.TableCountry>
    );
  }

  getDate(team) {
    const date = new Date(team.founded || team.createdAt);
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();

    return (
      <Styled.TableDate>
        <span>{`${d < 10 ? `0${d}` : d}.${m < 10 ? `0${m}` : m}.${y}`}</span>
      </Styled.TableDate>
    );
  }

  isMember(team) {
    if (!team) {
      return false;
    }

    const { members } = team;
    const { userData } = this.props;

    if (!members || !userData) {
      return false;
    }

    return members.find(
      (item) => item.member.uuid === userData.uuid && item.active
    );
  }

  isCaptain() {
    const { team } = this.state;

    const current = this.isMember(team);
    return current ? current.isCapitan : false;
  }

  leaveTeam = () => {
    const { team } = this.state;
    const { history, showNotificationModal } = this.props;

    API.request(
      {
        ...API_ROUTER.teams.leaveTeam,
        pathKeys: {
          teamUuid: team.uuid,
        },
      },
      true
    )
      .then(() => {
        this.toggleModal("leaveModal", false);
        history.push(`/teams/find-team/${team.game}`);
        showNotificationModal(
          <FormattedMessage id="teams.team.leaveSuccess" />
        );
      })
      .catch((err) => console.error(err));
  };

  leaveModal = () => {
    const { leaveModal } = this.state;

    return (
      <Modal
        closeButton
        onClose={() => this.toggleModal("leaveModal", false)}
        open={leaveModal}
      >
        <ModalTitle>
          <FormattedMessage id="teams.team.leaveConfirm" />
        </ModalTitle>
        <ButtonRow direction="center">
          <Button
            variant="secondary"
            label={<FormattedMessage id="teams.team.cancel" />}
            action={() => this.toggleModal("leaveModal", false)}
          />
          <Button
            variant="primary"
            label={<FormattedMessage id="teams.team.leave" />}
            action={() => this.leaveTeam()}
          />
        </ButtonRow>
      </Modal>
    );
  };

  inviteModal = () => {
    const { inviteModal, team } = this.state;
    const { showNotificationModal } = this.props;

    return (
      <Modal
        closeButton
        onClose={() => this.toggleModal("inviteModal", false)}
        open={inviteModal}
      >
        <ModalTitle>
          <FormattedMessage id="teams.team.inviteModalTitle" />
        </ModalTitle>
        <ModalSubTitle>
          <FormattedMessage id="teams.team.inviteModalSubTitle" />
        </ModalSubTitle>
        <ButtonRow direction="center">
          <Button
            variant="secondary"
            label={<FormattedMessage id="teams.team.cancel" />}
            action={() => this.toggleModal("inviteModal", false)}
          />
          <CopyToClipboard
            text={`${window.location.origin}/teams/invite/${team.referral}`}
            onCopy={() =>
              showNotificationModal(
                <FormattedMessage id="teams.team.linkCopied" />
              )
            }
          >
            <Box ml={2}>
              <Button
                variant="primary"
                label={<FormattedMessage id="teams.team.invite" />}
                action={() => this.toggleModal("inviteModal", false)}
              />
            </Box>
          </CopyToClipboard>
        </ButtonRow>
      </Modal>
    );
  };

  rejectInvite = (requestUuid) => {
    API.request(
      {
        ...API_ROUTER.teams.requestCancel,
        pathKeys: {
          requestUuid,
        },
      },
      true
    )
      .then(() => this.getData())
      .catch((err) => console.error(err));
  };

  joinTeam = () => {
    const { team } = this.state;
    const { userData, showNotificationModal } = this.props;

    if (userData) {
      API.request(
        {
          ...API_ROUTER.teams.inviteUser,
          pathKeys: {
            teamUuid: team.uuid,
          },
          data: {
            users: [userData.uuid],
          },
        },
        true
      )
        .then(({ failed }) => {
          if (failed && failed[userData.uuid]) {
            showNotificationModal(failed[userData.uuid]);
          } else {
            showNotificationModal(
              <FormattedMessage id="teams.team.inviteSuccess" />
            );
            this.getData();
          }
        })
        .catch((err) => console.error(err));
    }
  };

  renderControls = () => {
    const { invitationSent, team } = this.state;
    const { history } = this.props;
    const isMember = this.isMember(team);
    const isCaptain = this.isCaptain();

    return (
      <Styled.Controls>
        {isMember && (
          <Button
            variant="secondary"
            label={<FormattedMessage id="teams.team.leave" />}
            action={() => this.toggleModal("leaveModal", true)}
          />
        )}
        {isCaptain && (
          <Button
            variant="primary"
            label={<FormattedMessage id="teams.team.edit" />}
            action={() => history.push(`/teams/edit/${team.id}`)}
          />
        )}
        {isCaptain && (
          <Button
            variant="primary"
            label={<FormattedMessage id="teams.team.invite" />}
            action={() => this.toggleModal("inviteModal", true)}
          />
        )}
        {!isMember && isAuthenticated() && (
          <>
            {invitationSent && (
              <Button
                variant="primary"
                label={<FormattedMessage id={`teams.team.reject`} />}
                action={() => this.rejectInvite(invitationSent)}
              />
            )}
            <Button
              variant="primary"
              disabled={invitationSent}
              label={
                <FormattedMessage
                  id={`teams.team.${invitationSent ? "sent" : "join"}`}
                />
              }
              action={() => this.joinTeam()}
            />
          </>
        )}
      </Styled.Controls>
    );
  };

  render() {
    const { loading, error, team } = this.state;
    const { intl, countriesList } = this.props;
    const isCaptain = this.isCaptain();

    if (loading) {
      return (
        <Container>
          <ContentBox>
            <LinearProgress />
          </ContentBox>
        </Container>
      );
    }

    if (error) {
      return (
        <Container>
          <ContentBox>
            <FormattedMessage id="teams.team.notFound" />
          </ContentBox>
        </Container>
      );
    }

    return (
      <>
        <Container>
          <ContentBox>
            <Styled.Title>
              <div className="name">{team.name}</div>
              <div className="game">{team.game}</div>
            </Styled.Title>
            <Styled.Row>
              <Styled.Col className="w-25">
                <Styled.Image>
                  <div className="holder">
                    <img src={team.image?.url || noImage} alt={team.name} />
                  </div>
                </Styled.Image>
              </Styled.Col>
              <Styled.Col className="w-75">
                <Styled.Description>
                  <FormattedMessage
                    id="teams.team.description"
                    tagName="strong"
                  />
                  <p>{team.description}</p>
                </Styled.Description>
              </Styled.Col>
            </Styled.Row>
            <Styled.Row>
              <Styled.Col className="w-25">
                <Styled.InnerBox>
                  <Styled.SectionTitle>
                    <FormattedMessage id="teams.team.foundationDate" />
                    {this.getDate(team)}
                  </Styled.SectionTitle>
                </Styled.InnerBox>
              </Styled.Col>
              <Styled.Col className="w-25">
                <Styled.InnerBox>
                  <Styled.SectionTitle>
                    <FormattedMessage id="teams.team.country" />
                  </Styled.SectionTitle>
                  {this.getCountry(team)}
                </Styled.InnerBox>
              </Styled.Col>
              <Styled.Col className="w-50 control-lg">
                {this.renderControls()}
              </Styled.Col>
            </Styled.Row>
            {!!team.links.length && (
              <Styled.Row>
                <Styled.Col className="w-50">
                  <Styled.InnerBox>
                    <SocialLinkHolder>
                      {team.links.map((item) => (
                        <SocialLink
                          key={item.type}
                          link={item.url}
                          type={item.type}
                        />
                      ))}
                    </SocialLinkHolder>
                  </Styled.InnerBox>
                </Styled.Col>
              </Styled.Row>
            )}
            <Styled.Col className="w-50 control-sm">
              {this.renderControls()}
            </Styled.Col>
            <LineUp
              team={team}
              isCaptain={isCaptain}
              countriesList={countriesList}
              updateHandler={this.getData}
              intl={intl}
            />
          </ContentBox>
        </Container>
        {this.leaveModal()}
        {this.inviteModal()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    countriesList: state.countriesList,
    userData: state.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showNotificationModal: (message) =>
      dispatch(showNotificationModal(message)),
  };
};

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(TeamPage)
);

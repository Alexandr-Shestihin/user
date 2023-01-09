import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {LinearProgress} from "@material-ui/core";
import {toast} from "react-toastify";
import {FormattedMessage} from "react-intl";
import {
    ContentBox,
    InnerBox,
    ButtonRow,
    Button,
    Modal,
    ModalTitle,
    ModalSubTitle, Select
} from "../../../components/UI";
import {API, API_ROUTER} from "../../../api";
import {STEAM_GAMES_CODES} from "../../../config";
import {Styled} from './style'
import {getUserData} from "../../../redux/actions";

// games
import steamIcon from '../../../assets/steam/steam.png';
import GameIcon from "../../../components/game-icon";

class Games extends Component {

    state = {
        selectedGame: [],
        availableGames: [],
        games: [],
        modalStatus: false,
        disconnectModalStatus: false,
        isDataLoaded: false,
        steamData: null
    };

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.userData && this.props.userData) {
            this.loadData();
        }

        if (prevProps.userData.steamId !== this.props.userData.steamId) {
            this.loadData();
        }
    }

    openModal = () => this.setState({modalStatus: true});

    closeModal = () => this.setState({modalStatus: false});

    openDisconnectModal = () => this.setState({disconnectModalStatus: true});

    closeDisconnectModal = () => this.setState({disconnectModalStatus: false});

    loadData = () => {
        const {userData} = this.props;

        // get user data
        this.props.getUserData()

        // get allowed
        API.request({...API_ROUTER.games.getAllowedGames}, true)
            .then(({games}) => {
                const values = Object.entries(games);
                const list = values.map(item => {
                    const [value, label] = item;
                    return ({label, value})
                });
                this.setState({availableGames: list})
            })
            .catch(err => toast.error(err.data && err.data.message));

        // get games
        API.request({...API_ROUTER.games.getConnectedGames, pathKeys: {user: userData.uuid}}, true)
            .then(({games}) => this.setState({isDataLoaded: true, games}))
            .catch(err => toast.error(err.data && err.data.message))

        // get steam info
        if (userData?.steamId) {
            API.request({...API_ROUTER.steam.getProfileDetails, pathKeys: {steamId: userData.steamId}}, true)
                .then(({response: {players}}) => this.setState({steamData: players[0]}))
                .catch(err => toast.error(err.data && err.data.message));
        }
    };

    onGameSelect = game => this.setState({selectedGame: game})

    createConnectionLink = gameCode => {
        const {history, userData} = this.props;

        // if steam game
        if (STEAM_GAMES_CODES[gameCode] && userData) {
            const steam_url = 'https://steamcommunity.com/openid/login';
            const base_url = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
            const params = {
                'openid.ns': 'http://specs.openid.net/auth/2.0',
                'openid.mode': 'checkid_setup',
                'openid.return_to': `${base_url}/steam/${STEAM_GAMES_CODES[gameCode]}`,
                'openid.realm': base_url,
                'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select',
                'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select'
            };

            if (!userData.steamId) {
                let link = steam_url;
                const keys = Object.keys(params);
                const values = Object.values(params);

                keys.forEach((key, index) => {
                    if (index === 0) {
                        link += `?${key}=${values[index]}`
                    } else {
                        link += `&${key}=${values[index]}`
                    }
                });

                return (
                    <a href={link}>
                        <img src={steamIcon} alt="connect steam"/>
                    </a>
                )
            }

            return <Button
                label={<FormattedMessage id="settings.games.connect" />}
                action={() => history.push(`/steam/${STEAM_GAMES_CODES[gameCode]}`)}/>
        }

        return <Button
            label={<FormattedMessage id="settings.games.connect" />}
            action={() => this.connectGame(gameCode)}/>
    }

    disconnectSteam = () => {
        API.request({...API_ROUTER.steam.disconnect}, true)
            .then(() => this.loadData())
            .catch(err => toast.error(err.data && err.data.message));
    }

    renderGamesEditor = () => {
        const {availableGames, selectedGame} = this.state;
        const selectedValue = selectedGame.length ? selectedGame : [availableGames[0]];
        const [gameOptions] = selectedValue;

        if (availableGames.length < 1) {
            return (
                <Styled.GameEditor>
                    <div className="no-games">
                        <FormattedMessage id="settings.games.noGames" />
                    </div>
                </Styled.GameEditor>
            )
        }

        return (
            <Styled.GameEditor>
                <label>
                    <FormattedMessage id="settings.games.chooseGame" />
                </label>
                <Select
                    values={selectedValue}
                    options={availableGames}
                    onChange={value => this.onGameSelect(value)}/>
                <Styled.Game>
                    {this.createConnectionLink(gameOptions.value)}
                </Styled.Game>
            </Styled.GameEditor>
        )
    };

    connectGame = gameCode => {
        API.request({...API_ROUTER.games.connect, pathKeys: {gameCode}}, true)
            .then(() => {
                this.setState({selectedGame: []})
                this.closeModal()
                this.loadData()
            })
            .catch(err => console.error(err))
    }

    render() {
        const {isDataLoaded} = this.state;

        return (
            <ContentBox>
                {isDataLoaded ? this.renderForm() : this.renderLoader()}
            </ContentBox>
        )
    }

    renderLoader = () => <LinearProgress />;

    renderList = () => {
        const {games} = this.state;

        if (!games.length) return false;

        return (
            <>
                <Styled.Status>
                    <FormattedMessage id="settings.games.status" />
                </Styled.Status>
                {games.map(game => {
                    return (
                        <Styled.GamesItem key={game.uuid}>
                            <div className="image">
                                <GameIcon gameKey={game.code} />
                            </div>
                            <div className="name">{game.name}</div>
                            <span className={game.status === 'connected' ? 'online' : ''}/>
                        </Styled.GamesItem>
                    )
                })}
            </>
        )
    };

    renderForm() {
        const {games, modalStatus, disconnectModalStatus, steamData} = this.state;
        const {userData} = this.props;

        return (
            <>
                {userData.steamId && steamData &&
                    <Styled.Group>
                        <InnerBox>
                            <Styled.GamesTitle>
                                <FormattedMessage id="settings.games.account" />
                            </Styled.GamesTitle>
                            <div>
                                <Styled.Status>
                                    <FormattedMessage id="settings.games.status" />
                                </Styled.Status>
                                <Styled.GamesItem>
                                    <div className="image">
                                        <img src={steamData.avatarmedium} alt={steamData.personaname} />
                                    </div>
                                    <div className="name">
                                        {steamData.personaname}
                                    </div>
                                    <span className="online"/>
                                </Styled.GamesItem>
                                <Styled.Disconnect>
                                    <div onClick={this.openDisconnectModal}>
                                        <FormattedMessage id="settings.games.disconnect" />
                                    </div>
                                </Styled.Disconnect>
                            </div>
                        </InnerBox>
                    </Styled.Group>
                }
                <Styled.Group>
                    <InnerBox>
                        <Styled.GamesTitle>
                            <FormattedMessage id="settings.games.title" />
                        </Styled.GamesTitle>
                        <div>
                            {this.renderList()}
                            <ButtonRow direction={games.length ? 'right' : 'left'}>
                                <Button
                                    action={this.openModal}
                                    variant="secondary"
                                    label={<FormattedMessage id="settings.games.addGame" />}/>
                            </ButtonRow>
                        </div>
                    </InnerBox>
                </Styled.Group>
                <Modal
                    closeButton
                    onClose={this.closeModal}
                    open={modalStatus}>
                    <ModalTitle>
                        <FormattedMessage id="settings.games.addGame" />
                    </ModalTitle>
                    <ModalSubTitle>
                        <FormattedMessage id="settings.games.selectGame" />
                    </ModalSubTitle>
                    {this.renderGamesEditor()}
                </Modal>
                <Modal
                    closeButton
                    onClose={this.closeDisconnectModal}
                    open={disconnectModalStatus}>
                    <ModalTitle>
                        <FormattedMessage id="settings.games.disconnectSteamTitle" />
                    </ModalTitle>
                    <ModalSubTitle>
                        <FormattedMessage id="settings.games.disconnectSteamSubtitle" />
                    </ModalSubTitle>
                    <ButtonRow direction="center">
                        <Button
                            variant="secondary"
                            label={<FormattedMessage id="global.buttons.cancel" />}
                            action={this.closeDisconnectModal} />
                        <Button
                            label={<FormattedMessage id="settings.games.disconnectSteamButton" />}
                            action={() => {
                                this.closeDisconnectModal()
                                this.disconnectSteam()
                            }} />
                    </ButtonRow>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        countriesList: state.countriesList,
        userData: state.userData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getUserData: () => dispatch(getUserData())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Games));
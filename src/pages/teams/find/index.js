import React, {Component} from "react";
import {
    ContentBox,
    Container,
    CheckBox,
    Input,
    Table,
    Menu,
    MenuItem,
    Select,
    ArrowButton,
    Button,
    RangePicker
} from "../../../components/UI";
import {API, API_ROUTER} from "../../../api";
import {Box, LinearProgress} from "@material-ui/core";
import {Styled} from "./style";
import {FormattedMessage, injectIntl} from "react-intl";
import {LANGUAGE_SPEAK_OPTIONS, TEAM_GAMES} from "../../../config";
import GameSwitcher from "../../../components/game-switcher";
import {withRouter} from "react-router-dom";
import {debounce} from 'lodash';
import Flag from 'react-world-flags';

import noImage from "../../../assets/justin-bober.svg";
import {connect} from "react-redux";
import {getAvatar, getValueFromSelect} from "../../../helpers";
import {showNotificationModal} from "../../../redux/actions";
import {toast} from "react-toastify";

class FindTeam extends Component {

    state = {
        page: 1,
        pages: 1,
        limit: 20,
        search: '',
        myTeams: null,
        selectedGame: TEAM_GAMES[0],
        recruitmentState: false,
        list: null,
        filterValues: this.initialFilterValues,
        filterOptions: this.initialFilterValues
    }

    componentDidMount() {
        const {history} = this.props;
        const {game} = this.props.match.params;

        // get my teams
        this.getMyTeams()

        // get list
        if (!game || !TEAM_GAMES.includes(game)) {
            history.push(`/teams/find-team/${TEAM_GAMES[0]}`)
            this.getList();
            return;
        }

        this.setState({
            selectedGame: game
        }, () => this.getList())
    }

    get initialFilterValues() {
        return {
            country: [],
            region: [],
            city: [],
            isOfficial: [],
            isPro: [],
            gender: [],
            ageMin: 0,
            ageMax: 100,
            language: []
        }
    }

    get tableModel() {
        const {intl} = this.props;

        return [
            {
                key: 'position',
                value: '#'
            },
            {
                key: 'team',
                value: intl.formatMessage({id: "teams.find.table.team"})
            },
            {
                key: 'country',
                value: intl.formatMessage({id: "teams.find.table.country"})
            },
            {
                key: 'captain',
                value: intl.formatMessage({id: "teams.find.table.captain"})
            },
            {
                key: 'players',
                value: intl.formatMessage({id: "teams.find.table.players"})
            }
        ]
    }

    get boolOptions() {
        const {intl} = this.props;

        return [
            {
                label: intl.formatMessage({ id: 'global.yes'}),
                value: true
            },
            {
                label: intl.formatMessage({ id: 'global.no'}),
                value: false
            }
        ]
    }

    get genderOptions() {
        const {intl} = this.props;

        return [
            {
                label: intl.formatMessage({ id: 'gender.male'}),
                value: 'Male'
            },
            {
                label: intl.formatMessage({ id: 'gender.female'}),
                value: 'Female'
            },
            {
                label: intl.formatMessage({ id: 'gender.other'}),
                value: 'Other'
            }
        ]
    }

    tableData = teams => {
        const {page, limit} = this.state;
        const {countriesList, userData} = this.props;

        return teams.map((team, index) => {
            const captain = team.members.find(item => item.isCapitan)
            const inTeam = team.members.find(item => item.member.uuid === userData?.uuid)
            const country = countriesList
                ? countriesList.find(item => item.value === (team.country ? team.country.toUpperCase() : ''))
                : null

            return ({
                position: (page * limit - limit) + index + 1,
                team: (
                    <Styled.TableTeamHolder>
                        <Styled.TableTeam href={`/teams/team/${team.url}`}>
                            <img src={team.image?.url || noImage} alt={team.name} />
                            <span>{team.name}</span>
                        </Styled.TableTeam>
                        {!inTeam &&
                            <Box ml={4}>
                                <Menu>
                                    <MenuItem callback={() => this.joinTeam(team.uuid)}>
                                        <FormattedMessage id="teams.find.table.requestJoin" tagName="span"/>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        }
                    </Styled.TableTeamHolder>
                ),
                country: (
                    <Styled.TableCountry>
                        <Flag code={team.country} />
                        <span>{country ? country.label : ''}</span>
                    </Styled.TableCountry>
                ),
                captain:
                    captain
                        ? (
                            <Styled.TableCaptain
                                href={'/id/' + captain.member.url}
                                image={getAvatar(captain.member.avatars)}>
                                <div className={`picture ${captain.member.topGamer && 'top-gamer'}`}/>
                                <div className="name">{captain.member.nickname}</div>
                            </Styled.TableCaptain>
                        ) : (
                            <div/>
                        ),
                players: team.members.length
            })
        })
    }

    getList() {
        const {selectedGame, recruitmentState, search, limit, page, filterValues} = this.state
        const country = filterValues.country.length ? getValueFromSelect(filterValues.country) : null
        const region = filterValues.region.length ? getValueFromSelect(filterValues.region) : null
        const city = filterValues.city.length ? getValueFromSelect(filterValues.city) : null
        const isPro = filterValues.isPro.length ? getValueFromSelect(filterValues.isPro) : null
        const isOfficial = filterValues.isOfficial.length ? getValueFromSelect(filterValues.isOfficial) : null
        const gender = filterValues.gender.length ? getValueFromSelect(filterValues.gender) : null
        const language = filterValues.language.length ? getValueFromSelect(filterValues.language) : null

        const params = {
            ...API_ROUTER.teams.find,
            urlParams: {
                limit,
                page,
                'filter[eq][game.code]': selectedGame,
                'filter[lte][user.age]': filterValues.ageMax
            }
        }

        if (filterValues.ageMin > 0) {
            params.urlParams['filter[gte][user.age]'] = filterValues.ageMin
        }

        if (search.length) {
            params.urlParams['filter[like][name]'] = search
        }

        if (recruitmentState) {
            params.urlParams['filter[eq][status]'] = 'recruiting'
        }

        if (country) {
            params.urlParams['filter[eq][user.country]'] = country
        }

        if (region) {
            params.urlParams['filter[eq][user.region]'] = region
        }

        if (city) {
            params.urlParams['filter[eq][user.city]'] = city
        }

        if (gender) {
            params.urlParams['filter[eq][user.gender]'] = gender
        }

        if (language) {
            params.urlParams['filter[like][user.languages]'] = language
        }

        if (isPro !== null) {
            params.urlParams['filter[eq][isPro]'] = isPro ? 1 : 0
        }

        if (isOfficial !== null) {
            params.urlParams['filter[eq][isOfficial]'] = isOfficial ? 1 : 0
        }

        API.request(params, true)
            .then(res => {
                this.setState({
                    list: res.items,
                    page: res.page,
                    pages: res.pages
                })
            })
            .catch(err => console.log(err))
    }

    getMyTeams() {
        const {userData} = this.props;

        if (userData) {
            return API.request({
                    ...API_ROUTER.teams.getMyTeams,
                    pathKeys: {
                        userUuid: userData.uuid
                    }
                }, true)
                .then(res => this.setState({myTeams: res.list}))
                .catch(err => console.log(err))
        }

        setTimeout(() => this.getMyTeams(), 100)
    }

    getRegions = countryOption => {
        const {filterOptions} = this.state
        const country = countryOption ? getValueFromSelect(countryOption) : null

        if (country) {
            const params = {
                ...API_ROUTER.public.getCountryRegions,
                pathKeys: {
                    country
                }
            }

            API.request(params, true)
                .then(({regions}) => {
                    this.setState({
                        filterOptions: {
                            ...filterOptions,
                            region: regions.sort().map(item => ({
                                label: item,
                                value: item
                            }))
                        }
                    })
                })
                .catch(err => toast.error(err.data && err.data.message));
        }
    }

    getCities = (countryOption, regionOption) => {
        const {filterOptions} = this.state
        const country = countryOption ? getValueFromSelect(countryOption) : null
        const region = regionOption ? getValueFromSelect(regionOption) : null

        if (country && region) {
            const params = {
                ...API_ROUTER.public.getCitiesByRegion,
                pathKeys: {
                    country,
                    region
                }
            }

            API.request(params, true)
                .then(({cities}) => {
                    this.setState({
                        filterOptions: {
                            ...filterOptions,
                            city: cities.sort().map(item => ({
                                label: item,
                                value: item
                            }))
                        }
                    })
                })
                .catch(err => toast.error(err.data && err.data.message));
        }
    }

    onGameChange = game => {
        const {history} = this.props;
        history.push(`/teams/find-team/${game}`)
        this.setState({
            selectedGame: game,
            list: null,
            page: 1
        }, () => this.getList())
    }

    onFilterOptions(value, name){
        const {filterValues} = this.state
        const newValues = {
            ...filterValues,
            [name]: value
        };

        if (name === 'country') {
            newValues.region = []
            newValues.city = []
            this.getRegions(value)
        }

        if (name === 'region') {
            newValues.city = []
            this.getCities(filterValues.country, value)
        }

        this.setState({filterValues: newValues}, () => this.getList())
    }

    clearFilters() {
        this.setState({filterValues: this.initialFilterValues})
    }

    debounceSearch = debounce(() => this.getList(), 300)

    joinTeam = teamUuid => {
        const {userData, showNotificationModal} = this.props;

        if (userData) {
            API.request({
                ...API_ROUTER.teams.inviteUser,
                pathKeys: {
                    teamUuid
                },
                data: {
                    users: [userData.uuid]
                }
            }, true)
                .then(({failed}) => {
                    if (failed && failed[userData.uuid]) {
                        showNotificationModal(failed[userData.uuid])
                    } else {
                        showNotificationModal(<FormattedMessage id="teams.team.inviteSuccess" />)
                    }
                })
                .catch(err => console.error(err))
        }
    }

    renderPagination = (pages, page) => {
        if (!page || !pages)
            return false

        const pagination = [];
        for (let i = 1; i < pages + 1; i++) {
            pagination.push(
                <button
                    key={i}
                    onClick={() => this.setState({page: i}, () => this.getList())}
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

    renderTable = () => {
        const {page, pages, limit, list} = this.state;

        return (
            <>
                <Table tableModel={this.tableModel} tableData={this.tableData(list).reverse()} />
                <Styled.TableFooter>
                    <div className="pagination">
                        {this.renderPagination(pages, page)}
                    </div>
                    <div className="show">
                        <FormattedMessage id="table.pagination.show" tagName="span" />
                        <div className="controls">
                            <button
                                onClick={() => this.setState({limit: 20, page: 1}, () => this.getList())}
                                className={limit === 20 ? 'active' : ''}>
                                20
                            </button>
                            <button
                                onClick={() => this.setState({limit: 50, page: 1}, () => this.getList())}
                                className={limit === 50 ? 'active' : ''}>
                                50
                            </button>
                            <button
                                onClick={() => this.setState({limit: 100, page: 1}, () => this.getList())}
                                className={limit === 100 ? 'active' : ''}>
                                100
                            </button>
                        </div>
                    </div>
                </Styled.TableFooter>
            </>
        )
    }

    isInTeam = () => {
        const {myTeams, selectedGame} = this.state;
        const {userData} = this.props;

        if (!myTeams || !userData) {
            return true;
        }

        const thisGameTeams = myTeams.filter(item => item.team.game === selectedGame)

        let isInTeam = false;
        thisGameTeams.forEach(item => {
            const members = item.team.members;
            const thisMember = members.find(item => item.member.uuid === userData.uuid)

            if (thisMember.active) {
                isInTeam = true;
            }
        })

        return isInTeam;
    }

    onAgeChange = value => {
        const {filterValues} = this.state

        this.setState({
            filterValues: {
                ...filterValues,
                ageMin: value[0],
                ageMax: value[1]
            }
        })
    }

    debounceOnRangeChange = debounce(() => this.getList(), 600)

    render() {
        const {list, selectedGame, recruitmentState, search, filterValues, filterOptions} = this.state;
        const {intl, countriesList ,history} = this.props;

        if (!list) {
            return (
                <Container>
                    <ContentBox>
                        <LinearProgress />
                    </ContentBox>
                </Container>
            )
        }

        return (
            <Container>
                <Styled.TeamsRow>
                    <Styled.TeamsCol>
                        <Styled.FilterContainer>
                            <Styled.FilterTitle>
                                <FormattedMessage id="ratings.addFilters" tagName="span"/>
                            </Styled.FilterTitle>
                            <Styled.FilterBox>
                                <div className="form-group">
                                    <FormattedMessage id="global.forms.labels.country" tagName="label"/>
                                    <Select
                                        clearable
                                        values={filterValues.country}
                                        onChange={e => this.onFilterOptions(e,'country')}
                                        options={countriesList}/>
                                </div>
                                <div className="form-group">
                                    <FormattedMessage id="global.forms.labels.region" tagName="label"/>
                                    <Select
                                        clearable
                                        disabled={!(filterValues.country[0] && filterValues.country[0].value)}
                                        values={filterValues.region}
                                        onChange={e => this.onFilterOptions(e,'region')}
                                        options={filterOptions.region}/>
                                </div>
                                <div className="form-group">
                                    <FormattedMessage id="global.forms.labels.city" tagName="label"/>
                                    <Select
                                        clearable
                                        disabled={!(filterValues.region[0] && filterValues.region[0].value)}
                                        values={filterValues.city}
                                        onChange={e => this.onFilterOptions(e,'city')}
                                        options={filterOptions.city}/>
                                </div>
                            </Styled.FilterBox>
                            <Styled.FilterBox>
                                <div className="title">
                                    <FormattedMessage id="ratings.demography" />
                                </div>
                                <div className="form-group">
                                    <label>
                                        <FormattedMessage id="global.forms.labels.age" />: {filterValues.ageMin} - {filterValues.ageMax}
                                    </label>
                                    <RangePicker
                                        min={0}
                                        max={100}
                                        step={1}
                                        value={[filterValues.ageMin, filterValues.ageMax]}
                                        onChange={value => {
                                            this.onAgeChange(value)
                                            this.debounceOnRangeChange()
                                        }}/>
                                </div>
                                <div className="form-group">
                                    <FormattedMessage id="global.forms.labels.language" tagName="label"/>
                                    <Select
                                        clearable
                                        values={filterValues.language}
                                        onChange={e => this.onFilterOptions(e,'language')}
                                        options={LANGUAGE_SPEAK_OPTIONS}/>
                                </div>
                                <div className="form-group">
                                    <FormattedMessage id="global.forms.labels.gender" tagName="label"/>
                                    <Select
                                        clearable
                                        values={filterValues.gender}
                                        onChange={e => this.onFilterOptions(e,'gender')}
                                        options={this.genderOptions}/>
                                </div>
                            </Styled.FilterBox>
                            <Styled.FilterBox>
                                <div className="title">
                                    <FormattedMessage id="ratings.type" />
                                </div>
                                <div className="form-group">
                                    <FormattedMessage id="teams.type.isPro" tagName="label"/>
                                    <Select
                                        clearable
                                        values={filterValues.isPro}
                                        onChange={e => this.onFilterOptions(e,'isPro')}
                                        options={this.boolOptions}/>
                                </div>
                                <div className="form-group">
                                    <FormattedMessage id="teams.type.isOfficial" tagName="label"/>
                                    <Select
                                        clearable
                                        values={filterValues.isOfficial}
                                        onChange={e => this.onFilterOptions(e,'isOfficial')}
                                        options={this.boolOptions}/>
                                </div>
                            </Styled.FilterBox>
                            <Styled.FilterBox>
                                <ArrowButton
                                    label={<FormattedMessage id="ratings.clearFilters" />}
                                    variant="secondary"
                                    action={() => this.clearFilters()} />
                            </Styled.FilterBox>
                        </Styled.FilterContainer>
                    </Styled.TeamsCol>
                    <Styled.TeamsCol>
                        <ContentBox>
                            <Styled.Title>
                                <div className="group">
                                    <div className="message">
                                        <FormattedMessage id="teams.find.title"/>
                                    </div>
                                    <GameSwitcher
                                        selectedGame={selectedGame}
                                        gamesAvailable={TEAM_GAMES}
                                        setSelectedGame={this.onGameChange}/>
                                </div>
                                <Button
                                    disabled={this.isInTeam()}
                                    variant="primary"
                                    label={<FormattedMessage id="id.teams.createTeam"/>}
                                    action={() => history.push('/teams/create-team')} />
                            </Styled.Title>
                            <Styled.Params>
                                <div className="title">
                                    <FormattedMessage id="teams.find.params" tagName="p"/>
                                    <CheckBox
                                        checked={recruitmentState}
                                        onChange={() => this.setState({recruitmentState: !recruitmentState}, () => this.getList())}>
                                        <FormattedMessage id="teams.find.recruitment" />
                                    </CheckBox>
                                </div>
                                <div className="search">
                                    <Input
                                        value={search}
                                        placeholder={intl.formatMessage({id: "teams.find.search"})}
                                        onChange={e => {
                                            this.setState({search: e.target.value})
                                            this.debounceSearch()
                                        }}/>
                                </div>
                            </Styled.Params>
                            {!list.length
                                ? (
                                    <Styled.NoResult>
                                        <FormattedMessage id="teams.find.noResults" />
                                    </Styled.NoResult>
                                ) : this.renderTable()
                            }
                        </ContentBox>
                    </Styled.TeamsCol>
                </Styled.TeamsRow>
            </Container>
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
        showNotificationModal: message => dispatch(showNotificationModal(message)),
    };
};

export default injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(FindTeam)))
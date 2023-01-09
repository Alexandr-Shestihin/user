import React, {Component} from "react";
import {LinearProgress} from "@material-ui/core";
import {toast} from "react-toastify";
import {connect} from "react-redux";
import {debounce} from 'lodash';
import {FormattedMessage, injectIntl} from "react-intl";
import {withRouter} from "react-router-dom";
import classNames from 'classnames';
import {API, API_ROUTER} from "../../api";
import {ArrowButton, CheckBox, RangePicker} from "../../components/UI";
import {ContentBox, Container, Select} from "../../components/UI";
import ChangeColumn from "./change-column";
import {getAvatar, getValueFromSelect} from "../../helpers";
import plusIcon from './icons/plusIcon';
import arrowIcon from "./icons/arrowIcon";
import Styled from "./style";
import {models} from "./models";
import GameSwitcher from "../../components/game-switcher";
import {LANGUAGE_SPEAK_OPTIONS} from "../../config";

class Ratings extends Component {

    state = this.initialState;

    get initialState() {
        return {
            selectedGame: 'dota2',
            gamesAllowed: ['cs-go', 'dota2', 'fifa-20'], // TODO: get data from somewhere
            data: null,
            filterValues: this.initialFilterValues,
            filterOptions: this.initialFilterValues,
            selectedTableCols: [],
            sortBy: 'rating',
            order: 'DESC',
            limit: 20,
            page: 1,
            pages: null,
            compare: []
        }
    }

    get initialFilterValues() {
        return {
            country: [],
            region: [],
            city: [],
            distance: 100,
            gender: [],
            ageMin: 0,
            ageMax: 100,
            language: [],
            streamer: [],
            progamer: []
        }
    }

    get initialTableModel() {
        return [
            {
                key: 'select',
                value: (
                    <div className="is-new">
                        <FormattedMessage id="ratings.select" />
                    </div>
                )
            },
            {
                key: 'index',
                value: '#'
            },
            {
                key: 'rating',
                value: <FormattedMessage id="ratings.playersByRank" />
            }
        ]
    }

    get streamOptions() {
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

    get progamerOptions() {
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

    componentDidMount() {
        const {game} = this.props.match.params;
        const {selectedGame} = this.state;

        // filter gamesAllowed based on user event
        this.eventsChecker()

        // clear compare list
        sessionStorage.removeItem('compare')

        if (game) {
            this.setState({
                selectedGame: game,
                selectedTableCols: models[game].slice(0,5)
            }, () => this.getData())
        } else {
            this.setState({
                selectedTableCols: models[selectedGame].slice(0,5)
            })
            this.getData()
        }
    }

    eventsChecker = () => {
        const {userData} = this.props;

        if (!userData) {
            setTimeout(() => {
                this.eventsChecker()
            }, 100)
        } else {
            // ban CS for bud users
            if (userData.event === 'bud_en' || userData.event === 'bud_ru') {
                this.setState({gamesAllowed: ['dota2']})
            }
        }
    }

    getData = () => {
        const {selectedGame, filterValues, limit, sortBy, order, page} = this.state
        const country = filterValues.country.length ? getValueFromSelect(filterValues.country) : null
        const region = filterValues.region.length ? getValueFromSelect(filterValues.region) : null
        const city = filterValues.city.length ? getValueFromSelect(filterValues.city) : null
        const gender = filterValues.gender.length ? getValueFromSelect(filterValues.gender) : null
        const language = filterValues.language.length ? getValueFromSelect(filterValues.language) : null
        const streamer = filterValues.streamer.length ? getValueFromSelect(filterValues.streamer) : null
        const progamer = filterValues.progamer.length ? getValueFromSelect(filterValues.progamer) : null
        const params = {
            ...API_ROUTER.rating.getPlayersListByGame,
            pathKeys: {
                game: selectedGame
            },
            urlParams: {
                limit,
                sortBy,
                order,
                page,
                'filter[lte][u.distance]': filterValues.distance,
                'filter[lte][u.age]': filterValues.ageMax
            }
        }

        // min age
        if (filterValues.ageMin > 0) {
            params.urlParams['filter[gte][u.age]'] = filterValues.ageMin
        }

        // add country filter
        if (country) {
            params.urlParams['filter[eq][u.country]'] = country
        }

        // add region filter
        if (region) {
            params.urlParams['filter[eq][u.region]'] = region
        }

        // add city filter
        if (city) {
            params.urlParams['filter[eq][u.city]'] = city
        }

        // add gender filter
        if (gender) {
            params.urlParams['filter[eq][u.gender]'] = gender
        }

        // add language filter
        if (language) {
            params.urlParams['filter[like][u.languages]'] = language
        }

        // pro-gamer
        if (progamer !== null) {
            params.urlParams['filter[eq][u.topGamer]'] = progamer ? 1 : 0
        }

        // streamer
        if (streamer !== null) {
            params.urlParams['filter[eq][u.streaming]'] = streamer ? 1 : 0
        }

        API.request(params, true)
            .then(res => {
                this.setState({
                    data: res.items,
                    page: res.page,
                    pages: res.pages
                })
            })
            .catch(err => toast.error(err.data && err.data.message));
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

    onSelectChange(value, name){
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

        this.setState({filterValues: newValues}, () => this.getData())
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

    onDistanceChange = value => {
        const {filterValues} = this.state

        this.setState({
            filterValues: {
                ...filterValues,
                distance: value[1]
            }
        })
    }

    onCheckboxChange = gameUuid => {
        const {compare} = this.state;
        let newState = [...compare];

        if (compare.indexOf(gameUuid) === -1) {
            newState.push(gameUuid)
        } else {
            newState = newState.filter(item => item !== gameUuid)
        }

        this.setState({compare: newState})
    }

    debounceOnRangeChange = debounce(() => this.getData(), 600)

    onGameChange = game => {
        const {history} = this.props;

        // change url
        history.push('/ratings/' + game)

        this.setState({
            ...this.initialState,
            selectedGame: game,
            selectedTableCols: models[game].slice(0,5)
        }, () => this.getData())
    }

    setOrder = isCurrent => {
        const {order} = this.state;

        if (isCurrent) {
            return order === 'ASC' ? 'DESC' : 'ASC'
        }

        return 'DESC'
    }

    clearFilters() {
        this.setState({filterValues: this.initialFilterValues})
    }

    goToCompare = () => {
        const {compare, selectedGame} = this.state;
        const {history} = this.props;

        if (compare.length < 2) {
            toast.success(<FormattedMessage id="compare.atLeastTwoGamer"/>)
        } else {
            sessionStorage.setItem('compare', JSON.stringify(compare))
            sessionStorage.setItem('compareGame', selectedGame)
            history.push('/comparison')
        }
    }

    removeTableRow(optionToRemove) {
        const {selectedTableCols, sortBy} = this.state;
        const newTabs = selectedTableCols.filter(item => item.key !== optionToRemove);

        this.setState({
            selectedTableCols: newTabs,
            sortBy: newTabs.indexOf(sortBy) === -1 ? 'rating' : sortBy
        })
    }

    renderPagination = (pages, page) => {
        if (!page || !pages)
            return false

        const pagination = [];
        for (let i = 1; i < pages + 1; i++) {
            pagination.push(
                <button
                    key={i}
                    onClick={() => this.setState({page: i}, () => this.getData())}
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

    renderFilters() {
        const {filterOptions, filterValues} = this.state;
        const {countriesList, userData} = this.props;

        return (
            <Styled.RatingCol>
                <Styled.StyledContentBox>
                    <Styled.FilterTitle>
                        <FormattedMessage id="ratings.addFilters" tagName="span"/>
                    </Styled.FilterTitle>
                    <Styled.FilterBox>
                        <div className="title">
                            <FormattedMessage id="ratings.geo" />
                        </div>
                        <div className="form-group">
                            <FormattedMessage id="global.forms.labels.country" tagName="label"/>
                            <Select
                                clearable
                                values={filterValues.country}
                                onChange={e => this.onSelectChange(e,'country')}
                                options={countriesList}/>
                        </div>
                        <div className="form-group">
                            <FormattedMessage id="global.forms.labels.region" tagName="label"/>
                            <Select
                                clearable
                                disabled={!(filterValues.country[0] && filterValues.country[0].value)}
                                values={filterValues.region}
                                onChange={e => this.onSelectChange(e,'region')}
                                options={filterOptions.region}/>
                        </div>
                        <div className="form-group">
                            <FormattedMessage id="global.forms.labels.city" tagName="label"/>
                            <Select
                                clearable
                                disabled={!(filterValues.region[0] && filterValues.region[0].value)}
                                values={filterValues.city}
                                onChange={e => this.onSelectChange(e,'city')}
                                options={filterOptions.city}/>
                        </div>
                        {userData &&
                            <div className="form-group">
                                <label>
                                    <FormattedMessage id="global.forms.labels.distance"/>: {filterValues.distance} (km)
                                </label>
                                <RangePicker
                                    hideLeftHandler
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={[0, filterValues.distance]}
                                    onChange={value => {
                                        this.onDistanceChange(value)
                                        this.debounceOnRangeChange()
                                    }}/>
                            </div>
                        }
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
                                onChange={e => this.onSelectChange(e,'language')}
                                options={LANGUAGE_SPEAK_OPTIONS}/>
                        </div>
                        <div className="form-group">
                            <FormattedMessage id="global.forms.labels.gender" tagName="label"/>
                            <Select
                                clearable
                                values={filterValues.gender}
                                onChange={e => this.onSelectChange(e,'gender')}
                                options={this.genderOptions}/>
                        </div>
                    </Styled.FilterBox>
                    <Styled.FilterBox>
                        <div className="title">
                            <FormattedMessage id="ratings.type" />
                        </div>
                        <div className="form-group">
                            <FormattedMessage id="global.forms.labels.progamer" tagName="label"/>
                            <Select
                                clearable
                                values={filterValues.progamer}
                                onChange={e => this.onSelectChange(e,'progamer')}
                                options={this.progamerOptions}/>
                        </div>
                        <div className="form-group">
                            <FormattedMessage id="global.forms.labels.streaming" tagName="label"/>
                            <Select
                                clearable
                                values={filterValues.streamer}
                                onChange={e => this.onSelectChange(e,'streamer')}
                                options={this.streamOptions}/>
                        </div>
                    </Styled.FilterBox>
                    <Styled.FilterBox>
                        <ArrowButton
                            label={<FormattedMessage id="ratings.clearFilters" />}
                            variant="secondary"
                            action={() => this.clearFilters()} />
                    </Styled.FilterBox>
                </Styled.StyledContentBox>
            </Styled.RatingCol>
        )
    }

    renderTable() {
        const {data, selectedTableCols, sortBy, order, limit, page, pages, compare} = this.state;
        const {userData, history} = this.props;

        return (
            <>
                <Styled.TableHolder>
                    <Styled.Table>
                        <thead>
                            <tr>
                            {this.initialTableModel.map(item => {
                                return (
                                    <th
                                        key={item.key}
                                        onClick={() => this.setState(
                                            {
                                                page: 1,
                                                sortBy: 'rating',
                                                order: this.setOrder(item.key === sortBy)
                                            },
                                            () => this.getData())
                                        }
                                        className={classNames('sortable', {
                                            'sort-this': item.key === sortBy,
                                            'sort-ask': order === 'ASC'
                                        })}>
                                        <FormattedMessage id={item.value} />
                                        {item.key === sortBy && arrowIcon()}
                                    </th>
                                )
                            })}
                            {selectedTableCols.map(item => {
                                return (
                                    <th
                                        key={item.key}
                                        className={classNames('optional', 'sortable', {
                                            'sort-this': item.key === sortBy,
                                            'sort-ask': order === 'ASC'
                                        })}>
                                        {item.key === sortBy && arrowIcon()}
                                        <div className="flexed">
                                            <div onClick={() => this.setState(
                                                {
                                                    page: 1,
                                                    sortBy: item.key,
                                                    order: this.setOrder(item.key === sortBy)
                                                },
                                                () => this.getData())}>
                                                <FormattedMessage id={item.value} />
                                            </div>
                                            <button
                                                onClick={() => this.removeTableRow(item.key)}
                                                className="removeRow">
                                                {plusIcon()}
                                            </button>
                                        </div>
                                    </th>
                                )
                            })}
                        </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => {
                            const player = item?.game?.user || {}
                            const gameId = item?.game?.uuid
                            const isChecked = compare.indexOf(gameId) !== -1
                            const isMuted = compare.length === 5

                            return (
                                <tr
                                    className={classNames({me: userData && userData.uuid === player.uuid})}
                                    key={player.uuid}>
                                    <td>
                                        <Styled.Checkbox className={isMuted && !isChecked ? 'is-muted' : ''}>
                                            <CheckBox
                                                checked={isChecked}
                                                onChange={() => this.onCheckboxChange(gameId)}/>
                                        </Styled.Checkbox>
                                    </td>
                                    <td>{(page * limit - limit) + index + 1}</td>
                                    <td>
                                        <Styled.Player
                                            href={'/id/' + player.url}
                                            onClick={e => {
                                                e.preventDefault()
                                                history.push('/id/' + player.url)
                                            }}
                                            image={getAvatar(player.avatars)}>
                                            <div className={`picture ${player.topGamer && 'top-gamer'}`}/>
                                            <div className="name">{player.nickname}</div>
                                        </Styled.Player>
                                    </td>
                                    {selectedTableCols.map((rowData, index) => {
                                        return <td key={item[rowData.key] + '-' + index} className="optional">{item[rowData.key]}</td>
                                    })}
                                </tr>
                            )
                        })}
                        </tbody>
                    </Styled.Table>
                </Styled.TableHolder>
                <Styled.TableFooter>
                    <div className="compare">
                        <ArrowButton
                            label={<FormattedMessage id="global.buttons.compare"/>}
                            action={this.goToCompare} />
                    </div>
                    <div className="show">
                        <FormattedMessage id="table.pagination.show" tagName="span" />
                        <div className="controls">
                            <button
                                onClick={() => this.setState({limit: 20, page: 1}, () => this.getData())}
                                className={limit === 20 ? 'active' : ''}>
                                20
                            </button>
                            <button
                                onClick={() => this.setState({limit: 50, page: 1}, () => this.getData())}
                                className={limit === 50 ? 'active' : ''}>
                                50
                            </button>
                            <button
                                onClick={() => this.setState({limit: 100, page: 1}, () => this.getData())}
                                className={limit === 100 ? 'active' : ''}>
                                100
                            </button>
                        </div>
                    </div>
                </Styled.TableFooter>
                {page && pages > 1 &&
                    <Styled.TableFooter>
                        <div className="pagination">
                            {this.renderPagination(pages, page)}
                        </div>
                    </Styled.TableFooter>
                }
            </>
        )
    }

    renderTableHeader() {
        const {selectedTableCols, selectedGame} = this.state;
        const onOptionsChange = item => {
            if (selectedTableCols.findIndex(option => option.key === item.key) === -1) {
                if (selectedTableCols.length < 5)
                    selectedTableCols.push(item)
            } else {
                selectedTableCols.splice(selectedTableCols.findIndex(option => option.key === item.key), 1)
            }

            this.setState({
                selectedTableCols
            })
        }

        return (
            <Styled.TableFilters>
                <div className="title">
                    <FormattedMessage id="ratings.parameters" />
                </div>
                <div className="row">
                    <div className="timers">
                        <div className="isActive">
                            <FormattedMessage id="global.timers.allTime" />
                        </div>
                    </div>
                    <ChangeColumn
                        selectedGame={selectedGame}
                        onChange={onOptionsChange}
                        selectedOptions={selectedTableCols}/>
                </div>
            </Styled.TableFilters>
        )
    }

    renderLoader() {
        return (
            <Container>
                <ContentBox>
                    <LinearProgress />
                </ContentBox>
            </Container>
        )
    }

    renderMain() {
        const {selectedGame, gamesAllowed} = this.state;
        const {userData} = this.props;

        return (
            <Container>
                <Styled.RatingRow>
                    {this.renderFilters()}
                    <Styled.RatingCol>
                        <Styled.StyledContentBox>
                            <Styled.TableTitle>
                                <div className="game">
                                    <div>
                                        <FormattedMessage id="ratings.rating" />:&nbsp;
                                    </div>
                                    <GameSwitcher
                                        selectedGame={selectedGame}
                                        gamesAvailable={gamesAllowed}
                                        setSelectedGame={this.onGameChange}/>
                                </div>
                                <div className="name">{userData && userData.nickname}</div>
                            </Styled.TableTitle>
                            {this.renderTableHeader()}
                            {this.renderTable()}
                        </Styled.StyledContentBox>
                    </Styled.RatingCol>
                </Styled.RatingRow>
            </Container>
        )
    }

    render() {
        const {data} = this.state;

        return data ? this.renderMain() : this.renderLoader();
    }
}

const mapStateToProps = state => {
    return {
        countriesList: state.countriesList,
        userData: state.userData
    }
};

export default withRouter(injectIntl(connect(mapStateToProps)(Ratings)))
import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {FormattedMessage, injectIntl} from "react-intl";
import {connect} from "react-redux";
import {ArrowButton, Container, ContentBox, RangePicker, Select} from "../../../components/UI";
import {LinearProgress} from "@material-ui/core";
import {getAvatar, getValueFromSelect} from "../../../helpers";
import {API, API_ROUTER} from "../../../api";
import {toast} from "react-toastify";
import Styled from "../../ratings/style";
import {LANGUAGE_SPEAK_OPTIONS} from "../../../config";
import ChangeColumn from "../../ratings/change-column";
import {models} from "../../ratings/models";
import classNames from "classnames";
import arrowIcon from "../../ratings/icons/arrowIcon";
import plusIcon from "../../ratings/icons/plusIcon";
import {debounce} from "lodash";

// TODO: extend rating table
class ParticipantDetailsTable extends Component {

    state = this.initialState;

    get initialState() {
        const {battle} = this.props

        return {
            selectedGame: battle.game,
            requestBattleUuid: battle.uuid,
            data: null,
            filterValues: this.initialFilterValues,
            filterOptions: this.initialFilterValues,
            selectedTableCols: [],
            sortBy: 'rating',
            order: 'DESC',
            limit: 20,
            page: 1,
            pages: null
        }
    }

    get initialFilterValues() {
        return {
            city: [],
            gender: [],
            ageMin: 0,
            ageMax: 100,
            language: [],
            streamer: [],
            progamer: []
        }
    }

    get initialTableModel() {
        const {intl} = this.props;

        return ([
            {
                key: 'index',
                value: '#'
            },
            {
                key: 'rating',
                value: intl.formatMessage({ id: 'ratings.playersByRank'})
            }
        ])
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

    componentDidMount() {
        const {selectedGame, filterValues, filterOptions} = this.state
        const {battle: {participants}, city} = this.props
        const [left, right] = participants;

        this.setState({
                selectedTableCols: models[selectedGame].slice(0,5),
                filterValues: {
                    ...filterValues,
                    city: [
                        {
                            label: city,
                            value: city
                        }
                    ]
                },
                filterOptions: {
                    ...filterOptions,
                    city: [
                        {
                            label: left.participant.name,
                            value: left.participant.name
                        },
                        {
                            label: right.participant.name,
                            value: right.participant.name
                        }
                    ]
                }
            },
            () => this.getData()
        )
    }

    getData = () => {
        const {filterValues, limit, sortBy, order, page, requestBattleUuid} = this.state
        const gender = filterValues.gender.length ? getValueFromSelect(filterValues.gender) : null
        const language = filterValues.language.length ? getValueFromSelect(filterValues.language) : null
        const streamer = filterValues.streamer.length ? getValueFromSelect(filterValues.streamer) : null
        const progamer = filterValues.progamer.length ? getValueFromSelect(filterValues.progamer) : null
        const params = {
            ...API_ROUTER.battles.getParticipantBoard,
            pathKeys: {
                battle: requestBattleUuid
            },
            urlParams: {
                limit,
                sortBy: sortBy === 'rating' ? 'rating' : 's.' + sortBy,
                order,
                page,
                'filter[eq][u.city]': getValueFromSelect(filterValues.city),
                'filter[lte][u.age]': filterValues.ageMax
            }
        }

        // min age
        if (filterValues.ageMin > 0) {
            params.urlParams['filter[gte][u.age]'] = filterValues.ageMin
        }

        // add gender filter
        if (gender) {
            params.urlParams['filter[eq][u.gender]'] = gender
        }

        // add language filter
        if (language) {
            params.urlParams['filter[eq][u.language]'] = language
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

    onSelectChange(value, name){
        const {filterValues} = this.state
        const newValues = {
            ...filterValues,
            [name]: value
        };

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

    debounceOnRangeChange = debounce(() => this.getData(), 600)

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

    renderLoader() {
        return (
            <Container>
                <ContentBox>
                    <LinearProgress />
                </ContentBox>
            </Container>
        )
    }

    renderTable() {
        const {data, selectedTableCols, sortBy, order, limit, page, pages} = this.state;
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
                            const player = item?.user || {}

                            return (
                                <tr
                                    className={classNames({me: userData && userData.uuid === player.uuid})}
                                    key={player.uuid}>
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
                                        const {statistics} = item;
                                        return <td key={statistics[rowData.key] + '-' + index} className="optional">{statistics[rowData.key]}</td>
                                    })}
                                </tr>
                            )
                        })}
                        </tbody>
                    </Styled.Table>
                </Styled.TableHolder>
                <Styled.TableFooter>
                    <div/>
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

            this.setState({selectedTableCols})
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

    renderFilters() {
        const {filterValues, filterOptions} = this.state

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
                            <FormattedMessage id="global.forms.labels.city" tagName="label"/>
                            <Select
                                clearable
                                values={filterValues.city}
                                onChange={e => this.onSelectChange(e,'city')}
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

    renderMain() {
        const {filterValues} = this.state;
        const {battle} = this.props;

        return (
            <Container>
                <Styled.RatingRow>
                    {this.renderFilters()}
                    <Styled.RatingCol>
                        <Styled.StyledContentBox>
                            <Styled.TableTitle>
                                <div className="game">
                                    <div>
                                        {battle.name}
                                    </div>
                                </div>
                                <div className="name">{getValueFromSelect(filterValues.city)}</div>
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
        userData: state.userData
    }
};

export default withRouter(injectIntl(connect(mapStateToProps)(ParticipantDetailsTable)))
import React, {PureComponent} from "react";
import {
    ContentBox,
    Container,
    Table,
    Select,
    ArrowButton
} from "../../../components/UI";
import {API, API_ROUTER} from "../../../api";
import {LinearProgress} from "@material-ui/core";
import {Styled} from "./style";
import {FormattedMessage, injectIntl} from "react-intl";
import {withRouter} from "react-router-dom";

import noImage from "../../../assets/no-image.png";
import {connect} from "react-redux";
import {getRandomInt, getValueFromSelect} from "../../../helpers";

// backgrounds
import bgDOTA1 from "../../../assets/tournaments/bg-dota-1.png";
import bgDOTA2 from "../../../assets/tournaments/bg-dota-2.png";
import bgCS1 from "../../../assets/tournaments/bg-cs-1.png";
import bgCS2 from "../../../assets/tournaments/bg-cs-2.png";
import bgCOD1 from "../../../assets/tournaments/bg-cod-1.png";
import bgCOD2 from "../../../assets/tournaments/bg-cod-2.png";
import bgFIFA1 from "../../../assets/tournaments/bg-fifa-1.png";
import bgFIFA2 from "../../../assets/tournaments/bg-fifa-2.png";
import bgPES1 from "../../../assets/tournaments/bg-pes-1.png";
import bgPES2 from "../../../assets/tournaments/bg-pes-2.png";
import bgPUBG1 from "../../../assets/tournaments/bg-pubg-1.png";
import bgPUBG2 from "../../../assets/tournaments/bg-pubg-2.png";
import LangDecoder from "../../../components/lang-decoder";

const getBG = game => {
    const map = {
        dota2: [bgDOTA1, bgDOTA2],
        'cs-go': [bgCS1, bgCS2],
        cod: [bgCOD1, bgCOD2],
        fifa: [bgFIFA1, bgFIFA2],
        pes: [bgPES1, bgPES2],
        pubg: [bgPUBG1, bgPUBG2]
    }

    return map[game][getRandomInt(0, 1)]
}

class Tournaments extends PureComponent {

    state = {
        page: 1,
        pages: 1,
        limit: 20,
        list: null,
        specialList: [],
        filterValues: this.initialFilterValues
    }

    componentDidMount() {
        this.getList()
        this.getSpecialTournaments()
    }

    get initialFilterValues() {
        return {
            country: []
        }
    }

    get tableModel() {
        const {intl} = this.props;

        return [
            {
                key: 'title',
                value: intl.formatMessage({id: "tournaments.table.title"})
            },
            {
                key: 'game',
                value: intl.formatMessage({id: "tournaments.table.game"})
            },
            {
                key: 'players',
                value: intl.formatMessage({id: "tournaments.table.players"})
            },
            {
                key: 'starts',
                value: intl.formatMessage({id: "tournaments.table.starts"})
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

    tableData = tournaments => {
        return tournaments.map(tournament => {
            return ({
                team: (
                    <Styled.TableTournament href={`/tournaments/tournament/${tournament.url}`}>
                        <img src={tournament.image?.url || noImage} alt={tournament.name} />
                        <span>{tournament.name}</span>
                    </Styled.TableTournament>
                ),
                game: tournament._game.name,
                players: `${tournament.players_count} / ${tournament.limits || '∞'}`,
                date: this.getDate(tournament.date_start)
            })
        })
    }

    getDate(inputDate) {
        const date = new Date(inputDate)
        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();

        return `${d < 10 ? `0${d}` : d}.${m < 10 ? `0${m}` : m}.${y}`
    }

    getList() {
        const {limit, page, filterValues} = this.state
        const country = filterValues.country.length ? getValueFromSelect(filterValues.country) : null

        const params = {
            ...API_ROUTER.tournaments.getTournaments,
            urlParams: {
                limit,
                page
            }
        }

        if (country) {
            params.urlParams['filter[eq][country]'] = country
        }

        API.request(params, true)
            .then(res => {
                console.log(res.items)
                this.setState({
                    list: res.items,
                    page: res.page,
                    pages: res.pages
                })
            })
            .catch(err => console.log(err))
    }

    getSpecialTournaments() {
        API.request({...API_ROUTER.tournaments.getPrimaryTournaments}, true)
            .then(res => this.setState({specialList: res}))
            .catch(err => console.error(err))
    }

    onFilterOptions(value, name){
        const {filterValues} = this.state
        const newValues = {
            ...filterValues,
            [name]: value
        };

        this.setState({filterValues: newValues}, () => this.getList())
    }

    clearFilters() {
        this.setState({filterValues: this.initialFilterValues})
    }

    renderSpecial() {
        const {specialList} = this.state;
        // console.log(specialList)

        if (!specialList.length) {
            return null;
        }

        return (
            <Styled.SpecialRow>
                {
                    specialList.map((item, index) => {
                        return (
                            <Styled.SpecialCol key={item.uuid}>
                                <Styled.SpecialItem
                                    className={!index ? 'main' : ''}
                                    href={`/tournaments/tournament/${item.uuid}`}
                                    bg={getBG('cs-go')}>
                                    <div className="title">
                                        {item.title}
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="image">
                                                <img src={item.image || noImage} alt={item.name} />
                                            </div>
                                            <div className="org">
                                                <FormattedMessage id="tournaments.table.organizer" tagName="span"/>
                                                <LangDecoder data={{i18n: item._organizer.name}} target="name"/>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="text game">no-data...</div>
                                            <div className="text">no-data...</div>
                                            <div className="text">no-data...</div>
                                            <div className="text">no-data...</div>
                                        </div>
                                    </div>
                                </Styled.SpecialItem>
                            </Styled.SpecialCol>
                        )
                    })
                }
            </Styled.SpecialRow>
        )
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

    render() {
        const {list, filterValues} = this.state;
        const {countriesList} = this.props;

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
                <Styled.Row>
                    <Styled.Col>
                        <Styled.FilterContainer>
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
                                        onChange={e => this.onFilterOptions(e, 'country')}
                                        options={countriesList}/>
                                </div>
                            </Styled.FilterBox>
                            <Styled.FilterBox>
                                <ArrowButton
                                    label={<FormattedMessage id="ratings.clearFilters" />}
                                    variant="secondary"
                                    action={() => this.clearFilters()} />
                            </Styled.FilterBox>
                        </Styled.FilterContainer>
                    </Styled.Col>
                    <Styled.Col>
                        <ContentBox>
                            <Styled.Title>
                                <div className="message">
                                    <FormattedMessage id="tournaments.title"/>
                                </div>
                            </Styled.Title>
                            {/*{this.renderSpecial()}*/}
                            {this.renderTable()}
                        </ContentBox>
                    </Styled.Col>
                </Styled.Row>
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

export default injectIntl(withRouter(connect(mapStateToProps)(Tournaments)))
import React, {useEffect, useState, useCallback} from "react";
import {API, API_ROUTER} from "../../../../api";
import {Styled} from "./style";
import {FormattedMessage, useIntl} from "react-intl";
import {LinearProgress} from "@material-ui/core";
import {Button, CheckBox, Select} from "../../../../components/UI";
import {getValueFromSelect, isAuthenticated} from "../../../../helpers";
import {debounce} from 'lodash';
import {useSelector} from "react-redux";
import {ListItem} from "../list-item";
import {useHistory} from "react-router-dom"
import {searchIcon} from "../../icons";

const RenderList = ({list, leave, join}) => {
    if (!list.length) {
        return (
            <Styled.NoResults>
                <FormattedMessage id="community.list.noResults" />
            </Styled.NoResults>
        )
    }

    return list.map(item => <ListItem item={item} key={item.community.uuid} leave={leave} join={join} />)
}

export default function CommunityList() {
    const intl = useIntl()
    const history = useHistory()
    const countriesList = useSelector(state => state.countriesList)

    const [ready, setReady] = useState(false)
    const [search, handleSearch] = useState('')
    const [list, setList] = useState([])
    const [gameOptions, setGameOptions] = useState([])
    const [filters, setFilters] = useState({
        joined: false,
        type: [],
        country: [],
        game: []
    })

    const debounceSearch = useCallback(debounce((search, filters) => getList(search, filters), 600), [])

    const getList = (search, filters) => {
        const params = {
            ...API_ROUTER.community.getCommunityList,
            urlParams: {
                my: filters.joined ? 1 : 0
            }
        }

        if (filters.type.length) {
            params.urlParams.type = getValueFromSelect(filters.type)
        }

        if (filters.country.length) {
            params.urlParams.country = getValueFromSelect(filters.country)
        }

        if (filters.game.length) {
            params.urlParams.game = getValueFromSelect(filters.game)
        }

        if (search) {
            params.urlParams.search = search
        }

        API.request(params, true)
            .then(({items}) => {
                setReady(true)
                setList(items)
            })
            .catch(err => console.error(err))
    }

    const getTypeOptions = () => {
        return [
            {
                label: intl.formatMessage({id: "battle.types.community"}),
                value: 'community',
            },
            {
                label: intl.formatMessage({id: "battle.types.work"}),
                value: 'work'
            },
            {
                label: intl.formatMessage({id: "battle.types.club"}),
                value: 'club'
            },
            {
                label: intl.formatMessage({id: "battle.types.federation"}),
                value: 'federation'
            }
        ]
    }

    const handleCheckbox = () => {
        setFilters({
            ...filters,
            joined: !filters.joined
        })
    }

    const handleSelect = (value, name) => {
        setFilters({
            ...filters,
            [name]: value
        })
    }

    const onSearchSubmit = (e, value) => {
        e.preventDefault()

        if (value.length) {
           getList(search, filters)
        }
    }

    const join = uuid => {
        const params = {
            ...API_ROUTER.community.join,
            pathKeys: {
                uuid
            }
        }

        API.request(params, true)
            .then(() => getList(search, filters))
            .catch(err => console.error(err))
    }

    const leave = uuid => {
        const params = {
            ...API_ROUTER.community.leave,
            pathKeys: {
                uuid
            }
        }

        API.request(params, true)
            .then(() => getList(search, filters))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        API.request({...API_ROUTER.games.getAvailable}, true)
            .then(({games}) => {
                setGameOptions(Object.entries(games).map(game => {
                    const [value, label] = game;

                    return {value, label}
                }))
            })
            .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        debounceSearch(search, filters);
    }, [debounceSearch, search, filters]);

    return (
        <>
            <Styled.Title>
                <FormattedMessage id="community.list.title" />
                {isAuthenticated() &&
                    <Button
                        label={<FormattedMessage id="community.create" />}
                        action={() => history.push('/create-community')} />
                }
            </Styled.Title>
            <Styled.Intro>
                <FormattedMessage id="community.list.intro.title" tagName="h2"/>
                <FormattedMessage id="community.list.intro.description" tagName="p"/>
            </Styled.Intro>
            <Styled.Filters>
                <Styled.FiltersGroup>
                    <div>
                        <CheckBox onChange={handleCheckbox} checked={filters.joined}>
                            <FormattedMessage id="community.list.filters.joined" />
                        </CheckBox>
                    </div>
                    <div className="select">
                        <Select
                            clearable
                            fullDropdownWidth
                            values={filters.type}
                            placeholder={intl.formatMessage({id: "community.list.filters.type"})}
                            onChange={e => handleSelect(e, 'type')}
                            options={getTypeOptions()} />
                    </div>
                    <div className="select">
                        <Select
                            clearable
                            fullDropdownWidth
                            values={filters.game}
                            placeholder={intl.formatMessage({id: "community.list.filters.game"})}
                            onChange={e => handleSelect(e, 'game')}
                            options={gameOptions} />
                    </div>
                    <div className="select">
                        <Select
                            clearable
                            fullDropdownWidth
                            values={filters.country}
                            placeholder={intl.formatMessage({id: "community.list.filters.country"})}
                            onChange={e => handleSelect(e, 'country')}
                            options={countriesList} />
                    </div>
                </Styled.FiltersGroup>
                <Styled.SearchForm onSubmit={e => onSearchSubmit(e, search)}>
                    <Styled.SearchInput
                        onChange={e => handleSearch(e.target.value)}
                        value={search}
                        placeholder={intl.formatMessage({id: "community.list.filters.search"})}/>
                    <Styled.SearchButton type="submit">
                        {searchIcon()}
                    </Styled.SearchButton>
                </Styled.SearchForm>
            </Styled.Filters>
            {!ready ? <LinearProgress /> : <RenderList list={list} leave={leave} join={join} />}
        </>
    )
}
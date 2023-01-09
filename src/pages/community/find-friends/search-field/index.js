import React, {useState, useEffect} from "react";
import {useIntl} from "react-intl";
import {API, API_ROUTER} from "../../../../api";
import {SearchForm} from "./style";
import {searchIcon} from "../../icons";
import {getUrlParams} from "../../../../helpers";

export const SearchFiled = ({searchHandler, firstRequestHandler}) => {
    const [value, setValue] = useState('')
    const {search} = getUrlParams()
    const intl = useIntl();
    const startSearch = query => {
        if (query && !query.length) {
            searchHandler([])
            return
        }

        const params = {
            ...API_ROUTER.user.search,
            urlParams: {
                q: query
            }
        }

        API.request(params, true)
            .then(({users}) => {
                searchHandler(users)
                firstRequestHandler(true)
            })
            .catch(err => {
                console.error(err)
                firstRequestHandler(true)
            })
    }

    const onSubmit = (e, value) => {
        e.preventDefault()
        startSearch(value)
    }

    useEffect(() => {
        if (search) {
            const decoded = decodeURI(search);
            startSearch(decoded)
            setValue(decoded)
        }
    }, [search])

    return (
        <SearchForm.Form onSubmit={e => onSubmit(e, value)}>
            <SearchForm.Input
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={intl.formatMessage({id: "community.findFriend"})}/>
            <SearchForm.Button type="submit">
                {searchIcon()}
            </SearchForm.Button>
        </SearchForm.Form>
    )
}
import React, {useEffect, useState} from "react";
import {LinearProgress, IconButton} from "@material-ui/core";
import {API, API_ROUTER} from "../../../../api";
import {Styled} from "./style";
import About from "./about";
import Leaderboard from "./leaderboard";
import {useHistory} from 'react-router-dom';
import {FormattedMessage} from "react-intl";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LangDecoder from "../../../../components/lang-decoder";

const RenderContent = ({activeTab, details, leave, join}) => {
    switch (activeTab) {
        case 'about':
            return <About details={details} leave={leave} join={join}/>;
        case 'leaderboard':
            return <Leaderboard />
        default:
            return <div/>;
    }
}

const CommunityDetails = ({communityUuid}) => {
    const history = useHistory()
    const [details, setDetails] = useState(null)
    const [activeTab, setActiveTab] = useState('about')
    const options = [
        {
            label: 'community.about.tabs.about',
            value: 'about'
        },
        // {
        //     label: 'community.about.tabs.leaderboard',
        //     value: 'leaderboard'
        // }
    ]

    const getData = () => {
        const params = {
            ...API_ROUTER.community.getCommunityDetails,
            pathKeys: {
                communityUuid
            }
        }

        API.request(params, true)
            .then(res => setDetails(res))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getData()
    }, [])

    const join = uuid => {
        const params = {
            ...API_ROUTER.community.join,
            pathKeys: {
                uuid
            }
        }

        API.request(params, true)
            .then(() => getData())
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
            .then(() => getData())
            .catch(err => console.error(err))
    }

    if (!details) {
        return <LinearProgress />
    }

    const {community} = details

    return (
        <>
            <Styled.Title>
                <div className="go-back">
                    <IconButton
                        size="small"
                        onClick={() => history.push('/communities')}>
                        <ArrowBackIcon fontSize="inherit" color="secondary"/>
                    </IconButton>
                </div>
                <div className="title">
                    <LangDecoder data={{i18n: community.name}} target="name"/>
                </div>
            </Styled.Title>
            <Styled.Tabs>
                {options.map(option => (
                    <Styled.Tab key={option.value} onClick={() => setActiveTab(option.value)}>
                        <span className={activeTab === option.value ? 'active' : ''}>
                            <FormattedMessage id={option.label} />
                        </span>
                    </Styled.Tab>
                ))}
            </Styled.Tabs>
            <RenderContent
                activeTab={activeTab}
                leave={leave}
                join={join}
                details={details}/>
        </>
    )
}

export default CommunityDetails
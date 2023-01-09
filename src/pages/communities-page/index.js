import React, { useEffect, useState } from "react";
import "./CommunitiesPage.css"
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import loadAllTournaments from "../../helpers/userTournaments/loadAllTournaments";
import getUserCommunityList from "../../helpers/communities/getUserCommunityList";
import getAllCommunities from "../../helpers/userCommunities/getAllCommunities";
import getCommunityDetails from "../../helpers/userCommunities/getCommunityDetailsHelper";
import CommunityItem from './community-item'
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { addCommunityData } from "../../redux/actions/communityData/addCommunityData";

const CommunitiesPage = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const [events, setEvents] = useState("community")
    const [tournaments, setTournaments] = useState(null)

    const [userCommunities, setUserCommunities] = useState(null)

    useEffect(() => {
        getUserCommunityList()
            .then(res => {
                console.log('communities list', res)
            })
            .catch(e => {
                console.log('e in getUserCommunityList', e)
            })

        //all communities
        getAllCommunities()
            .then(res => {
                console.log('all communities', res)
                setUserCommunities(() => res.communities)
            })
            .catch(e => {
                console.log('error in getting all communities', e)
            })
    }, [])

    const checkEvents = () => {
        setTournaments(null);
        setEvents("want to see");
    };

    const checkTournaments = () => {
        setEvents(null);
        loadAllTournaments()
            .then(res => {
                console.log('res tournaments', res.items)
                setTournaments(() => res.items)
            })
            .catch(e => {
                console.log(e)
            })
    };

    const getDetails = (id) => {
        console.log("id", id);
        // TODO got to new route history.push(`/community/${id}`);
        // TODO load this data on a new route
        getCommunityDetails(id)
            .then(res => {
                console.log('community detail', res)
                dispatch(addCommunityData(res))
                history.push(`/community/${id}`)
            })
            .catch(e => {
                toast.error(e.statusText)
            })
    }

    return (
        <section className="communities-page">
            <section className="communities-page__communities">
                <article className="communties-page__wrapper">
                {/*TODO move this h1 to general header where back button and notifications icon*/}

                <ul className="communities-page__community-list community-list">
                    {
                        userCommunities ?
                            userCommunities.map(el => {
                                return (
                                    <li onClick={() => getDetails(el.id)} className="community-list__item-wrapper">
                                        <CommunityItem
                                            id={el.id}
                                            name={el.name}
                                            
                                        />
                                    </li>
                                )
                            }) :
                            <h1>List of communities</h1>
                    }
                </ul>
                </article>
            </section>
        </section>
    )
}


export default CommunitiesPage

import React, {useEffect, useState} from "react";
import {LinearProgress} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import {Button, ButtonRow, Container, ContentBox} from "../../../components/UI";
import {API, API_ROUTER} from "../../../api";
import {StyledRequest} from './style'
import {offerToPlay} from "../../../helpers";
import {setActiveChat} from "../../../redux/actions/messenger";
import {ROUTER} from "../../../config";
import {useDispatch} from "react-redux";
import {FormattedMessage} from "react-intl";

const FriendItem = ({user}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    // offer to play
    const runOfferToPlay = userUuid => {
        offerToPlay(userUuid)
            .then(({chat}) => {
                dispatch(setActiveChat(chat.uuid))
                history.push(ROUTER.messenger)
            })
            .catch(err => toast.error(err.data && err.data.message))
    };

    return (
        <StyledRequest.Item>
            <div className="nickname">
                {user.fullName}
            </div>
            <div className="controls">
                <Button
                    label={<FormattedMessage id="friends.sendMessage"/>}
                    action={() => runOfferToPlay(user.uuid)}/>
            </div>
        </StyledRequest.Item>
    )
}

const FriendsList = ({friends, successHandler}) => {
    const history = useHistory()

    if (!friends.length) {
        return (
            <>
                <FormattedMessage id="friends.noFriends" tagName="div"/>
                <ButtonRow>
                    <Button
                        label={<FormattedMessage id="friends.findFriends"/>}
                        action={() => history.push('/find-friends')}/>
                </ButtonRow>
            </>
        )
    }

    return (
        <>
            <StyledRequest.Title>
                <FormattedMessage id="friends.myFriends"/>
            </StyledRequest.Title>
            {friends.map(user => <FriendItem user={user} key={user.uuid} successHandler={successHandler}/>)}
        </>
    )
}

const RequestItem = ({request, successHandler}) => {
    const {user} = request;

    const approve = friendshipUuid => {
        const params = {
            ...API_ROUTER.friendship.approveRequest,
            pathKeys: {
                friendshipUuid
            }
        }

        API.request(params, true)
            .then(() => successHandler())
            .catch(err => toast.error(err.data && err.data.message))
    }

    const decline = friendshipUuid => {
        const params = {
            ...API_ROUTER.friendship.declineRequest,
            pathKeys: {
                friendshipUuid
            }
        }

        API.request(params, true)
            .then(() => successHandler())
            .catch(err => toast.error(err.data && err.data.message))
    }

    return (
        <StyledRequest.Item>
            <div className="nickname">
                {user.fullName}
            </div>
            <div className="controls">
                <Button
                    action={() => decline(request.uuid)}
                    size="sm"
                    variant="secondary"
                    label={<FormattedMessage id="friends.decline"/>}/>
                <Button
                    action={() => approve(request.uuid)}
                    size="sm"
                    label={<FormattedMessage id="friends.addFriend"/>}/>
            </div>
        </StyledRequest.Item>
    )
}

const RequestList = ({requests, successHandler}) => {
    if (!requests.length)
        return false

    return (
        <>
            <StyledRequest.Title>New Requests</StyledRequest.Title>
            <StyledRequest.Container>
                {requests.map(request => <RequestItem key={request.uuid} request={request} successHandler={successHandler}/>)}
            </StyledRequest.Container>
        </>
    )
}

export default function MyFriends() {
    const [friendsList, setFriendsList] = useState([])
    const [newRequests, setNewRequests] = useState([])
    const [requestState, setRequestState] = useState(false)
    const [newRequestState, setNewRequestState] = useState(false)

    const getData = () => {
        API.request({...API_ROUTER.friendship.getRequestsList}, true)
            .then(({items}) => {
                setNewRequestState(true)
                setNewRequests(items)
            })
            .catch(err => console.log(err))

        API.request({...API_ROUTER.friendship.getFriendsList}, true)
            .then(({items}) => {
                setRequestState(true)
                setFriendsList(items)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Container>
            <ContentBox>
                {!requestState || !newRequestState
                    ? <LinearProgress />
                    : (
                        <>
                            <RequestList requests={newRequests} successHandler={getData}/>
                            <FriendsList friends={friendsList} />
                        </>
                    )
                }
            </ContentBox>
        </Container>
    )
}
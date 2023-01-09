import React, {useState} from "react";
import {useIntl} from "react-intl";
import {Container, SideBarRowLeft} from "../../../components/UI";
import NewUsers from "../../../components/widgets-new-users";
import {Results, Wrapper} from "./style";
import {SearchFiled} from "./search-field";
import {FriendCard} from "../friend-card";
import {useSelector} from "react-redux";

export const Finder = () => {
    const [searchResults, setSearchResults] = useState([])
    const [wasResults, setWasResults] = useState(false)
    const intl = useIntl()
    const userData = useSelector(store => store.userData)

    return (
        <Wrapper>
            <SearchFiled searchHandler={setSearchResults} firstRequestHandler={setWasResults}/>
            {!searchResults.length
                ? <Results.Empty>{wasResults ? intl.formatMessage({id: "community.noSearchResults"}) : ''}</Results.Empty>
                : (
                    <>
                        {searchResults
                            .filter(user => user.uuid !== userData?.uuid)
                            .map(user => <FriendCard user={user} key={user.uuid}/>)
                        }
                    </>
                )
            }
        </Wrapper>
    )
}

export default function FindFriends() {
    return (
        <Container>
            <SideBarRowLeft className="change-order-on-mobile">
                <div>
                    <NewUsers />
                </div>
                <div>
                    <Finder />
                </div>
            </SideBarRowLeft>
        </Container>
    )
}
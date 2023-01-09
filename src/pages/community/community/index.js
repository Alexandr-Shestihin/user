import React from "react";
import {useParams} from 'react-router-dom';
import {Container, ContentBox, SideBarRowLeft} from "../../../components/UI";
import NewUsers from "../../../components/widgets-new-users";
import CommunityList from "./list";
import CommunityDetails from "./details";

export default function Community() {
    const {communityUuid} = useParams()

    return (
        <Container>
            <SideBarRowLeft className="change-order-on-mobile">
                <div>
                    <NewUsers />
                </div>
                <div>
                    <ContentBox>
                        {communityUuid
                            ? <CommunityDetails communityUuid={communityUuid}/>
                            : <CommunityList />
                        }
                    </ContentBox>
                </div>
            </SideBarRowLeft>
        </Container>
    )
}
import React from "react";
import {Container, SideBarRowLeft} from "../../UI";
import UserCard from "../user-card";
import ProfileNav from "../profile-nav";

export default function ProfileTemplate(props) {
    return (
        <Container>
            <SideBarRowLeft>
                <div>
                    <UserCard />
                    <ProfileNav />
                </div>
                <div>
                    {props.children}
                </div>
            </SideBarRowLeft>
        </Container>
    )
}
import React from "react";
import {Container, SideBarRowRight} from "../../components/UI";
import NewUsers from "../../components/widgets-new-users";
import Goals from "../../components/widgets-goals";
import Rewards from "./Rewards";
import Ratings from "./Ratings";

export default function Launcher() {
    return (
        <Container>
            <SideBarRowRight>
                <div>
                    <Goals hideOnMobile={false}/>
                    <Ratings/>
                    <Rewards/>
                </div>
                <div>
                    <Goals hideOnMobile={true}/>
                    <NewUsers/>
                </div>
            </SideBarRowRight>
        </Container>
    )
}
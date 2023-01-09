import React from "react";
import {ContentBox, Container} from "../../components/UI";

export default function NeedAuth(props) {

    const loginRoute = () => {
        props.history.push("/login");
    }

    return (
        <Container>
            <ContentBox>
                Please log in...
            </ContentBox>
            <a className="form__submit" href="/login">To login page</a>
        </Container>
    )
}
import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {Container, ContentBox} from "../../components/UI";
import {API, API_ROUTER} from "../../api";
import {getUrlParams} from "../../helpers";
import {LinearProgress} from "@material-ui/core";
import {userOnline, getUserData, setSteamData, showRegisterModal, showAuthModal} from "../../redux/actions";
import WarningNotification from "../../components/warning-notification";

class SteamRegistration extends Component {

    state = {
        loading: true,
        error: false
    };

    componentDidMount() {
        const {history} = this.props;
        const URLParams = getUrlParams();
        const keys = Object.keys(URLParams);
        const values = Object.values(URLParams);
        const data = {};

        keys.forEach((key, index) => {
            data[key] = decodeURIComponent(values[index])
        });

        API.request({...API_ROUTER.steam.signIn, data}, true)
            .then(({token }) => {
                sessionStorage.setItem("token", token);
                this.props.getUserData();
                this.props.userOnline();
                history.push('/ratings')
            })
            .catch(err => {
                this.setState({loading: false})
                if (err.status === 403) {
                    API.request({...API_ROUTER.steam.getProfile, data}, true)
                        .then(({response: {players}}) => {
                            const [steamData] = players;
                            this.props.setSteamData(steamData)
                            this.props.showRegisterModal()
                            this.props.showAuthModal()
                        })
                        .catch(err => {
                            console.error(err)
                            this.setState({error: true})
                        })
                } else {
                    console.error(err)
                    this.setState({error: true})
                }
            })
    }

    render() {
        const {loading, error} = this.state;
        const errorMessage = () => (
            <>
                <p>Oooops... Something went wrong...</p>
                <p><a href="mailto:support@passport.gg">support@passport.gg</a></p>
            </>
        )

        if (loading) {
            return (
                <Container>
                    <ContentBox>
                        <LinearProgress />
                    </ContentBox>
                </Container>
            )
        }



        if (error) {
            return (
                <Container>
                    <WarningNotification message={errorMessage()} />
                </Container>
            )
        }

        return <Container/>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserData: () => dispatch(getUserData()),
        userOnline: () => dispatch(userOnline()),
        setSteamData: steamData => dispatch(setSteamData(steamData)),
        showRegisterModal: () => dispatch(showRegisterModal()),
        showAuthModal: () => dispatch(showAuthModal())
    };
};

export default withRouter(connect(null, mapDispatchToProps)(SteamRegistration))

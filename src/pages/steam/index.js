import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Container} from "../../components/UI";
import {API, API_ROUTER} from "../../api";
import {ROUTER} from "../../config";
import {getUrlParams} from "../../helpers";
import WarningNotification from "../../components/warning-notification";
import {FormattedMessage} from "react-intl";

class ConnectSteamGame extends Component {

    state = {
        error: false
    }

    componentDidMount() {
        const {history} = this.props;
        const {gameCode} = this.props.match.params
        const URLParams = getUrlParams();
        const keys = Object.keys(URLParams);
        const values = Object.values(URLParams);
        const data = {};

        if (gameCode) {
            keys.forEach((key, index) => {
                data[key] = decodeURIComponent(values[index])
            });

            const params = {
                ...API_ROUTER.steam.connect,
                pathKeys: {
                    code: gameCode
                },
                data
            };

            API.request(params, true)
                .then(() => history.push(ROUTER.profile.settings))
                .catch(() => this.setState({error: true}))
        }
    }

    render() {
        const {error} = this.state;

        const errorMessage = () => (
            <>
                <FormattedMessage id="steam.connectionFail.line1" tagName="p" />
                <FormattedMessage
                    id="steam.connectionFail.line2"
                    tagName="p"
                    values={{
                        link: <a href="mailto:support@passport.gg">support@passport.gg</a>
                    }}
                />
            </>
        )

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

export default withRouter(ConnectSteamGame);
import React, {Component} from "react";
import {withRouter} from "react-router";
import {API, API_ROUTER} from "../../../../../api";
import {LinearProgress} from "@material-ui/core";

class Leaderboard extends Component {

    componentDidMount() {
        const communityUuid = this.props.match.params.communityUuid;
        const params = {
            ...API_ROUTER.community.leaderboard,
            pathKeys: {
                communityUuid,
                gameCode: 'cs-go'
            }
        }

        API.request(params, true)
            .then(res => console.log(res))
            .catch(err => console.error(err))
    }

    render() {
        return (
            <LinearProgress />
        )
    }
}

export default withRouter(Leaderboard)
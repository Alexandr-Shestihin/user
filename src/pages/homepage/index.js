import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {FormattedMessage, injectIntl} from "react-intl";
import {ButtonRow, CheckBox, Container, Input, Select} from "../../components/UI";
import store from "../../redux/store";
import {
    hideAuthModal,
    showAuthBlockedModal,
    showAuthModal,
    showRegisterModal,
    userOnline
} from "../../redux/actions/auth";
// import {ROUTER} from "../../config";
import {API, API_ROUTER} from "../../api";
import {toast} from "react-toastify";
import Flag from 'react-world-flags'
import {getUserData} from "../../redux/actions/user";
import {Box, LinearProgress} from "@material-ui/core";
import {
    getCookiesPolicyLink,
    getPrivacyPolicyLink,
    getTermsLink, getUrlParams,
    getValueFromSelect,
    isEmailValid,
    isFieldEmpty,
    isPasswordValid,
    isSelectEmpty
} from "../../helpers";
import PublicHeader from "../../components/header-public";
import {Styled} from "./style";

// images
import picBeInvolved from './img/be-involved.png';
import decorationDots from './img/dots';
import rotatedDots from './img/dotsRotated';
import titleArrows from "./img/titleArrows";
import trImage01 from './img/triple-01.png';
import trImage02 from './img/triple-02.png';
import trImage03 from './img/triple-03.png';
import schoolImage from './img/school.png';
import communityImage from './img/community.jpg';
import allianceLogo from '../../assets/esport-alliance.png';

// games pics
import gFortnite from './img/games/game-fortnite.png';
import gDota from './img/games/game-dota.png';
import gCs from './img/games/game-csgo.png';
import gOverwatch from './img/games/game-overwatch.png';
import gFifa from './img/games/games-fifa.png'
import gLeague from './img/games/games-league-legends.png';
import gCOD from './img/games/games-call-of-duty.png';
import gValor from './img/games/games-arenavalor.png';
import gRBS from './img/games/games-rainbowsix.png';
import gHS from './img/games/games-heartstone.png';
import gSC2 from './img/games/games-startcraft.png';
import gRocket from './img/games/games-rocket-league.png';
import gApex from './img/games/games-apex-legend.png';
import gPubg from './img/games/game-battleground.png';
import gMTG from './img/games/games-mtg-arena-1.png'

class Homepage extends Component {

    state = {
        googleMapsLoaded: false,
        userLocation: null,
        values: {
            firstName: '',
            username: '',
            password: '',
            country: []
        },
        errors: {
            firstName: '',
            username: '',
            password: '',
            country: '',
            gdpr: ''
        },
        gdprChecked: false,
        marketingChecked: false
    };

    static getDerivedStateFromProps(props, state) {
        const {userOnline, history} = props;

        if (userOnline) {
            history.push('/ratings');
            return null;
        }

        return state;
    }

    componentDidMount() {
        this.onScriptLoad();
        this.getLocation().catch(err => console.log(err));
        this.mapLauncher()
    }

    mapLauncher() {
        const {googleMapsLoaded, userLocation} = this.state;
        if (!googleMapsLoaded || !userLocation) {
            setTimeout(() => {
                this.mapLauncher()
            }, 100)
        } else {
            this.initMap()
        }
    }

    getLocation = async () => {
        let userIP = '';

        await API.request({
                ...API_ROUTER.external.getIpAddress,
                externalRequest: true
            })
            .then(ip => userIP = ip)
            .catch(err => console.log(err))

        API.request({
                ...API_ROUTER.public.getLocationByIp,
                pathKeys: {ip: userIP}
            })
            .then(res => this.setState({userLocation: res}))
            .catch(err => console.log(err))
    };

    onScriptLoad = () => {
        const {google} = window;
        if (!google) {
            setTimeout(() => {
                this.onScriptLoad();
            }, 100)
        } else {
            this.setState({googleMapsLoaded: !this.state.googleMapsLoaded})
        }
    };

    onInputChange = e => {
        const {values} = this.state;
        values[e.target.name] = e.target.value;

        this.setState({values})
    };

    onSelectChange = value => {
        const {values} = this.state;
        values.country = value;

        this.setState({values})
    };

    onCheckboxChange = e => {
        if (e.target.name === 'gdpr')
            this.setState({gdprChecked: !this.state.gdprChecked});

        if (e.target.name === 'marketing')
            this.setState({marketingChecked: !this.state.marketingChecked})
    };

    signUp = e => {
        e.preventDefault();

        const URLParams = getUrlParams();
        const {values, errors, gdprChecked, marketingChecked} = this.state;
        // const {history} = this.props;

        // validate
        errors.firstName = isFieldEmpty(values.firstName);
        errors.username = isEmailValid(values.username);
        errors.password = isPasswordValid(values.password);
        errors.country = isSelectEmpty(values.country);
        gdprChecked ? errors.gdpr = '' : errors.gdpr = 'This field is required';
        this.setState({errors});

        // send request if valid
        if (!Object.values(errors).some(value => value.length)) {
            const params = {
                ...API_ROUTER.auth.registerEvent,
                pathKeys: {
                    eventName: 'platform-beta'
                },
                data: {
                    ...values,
                    country: getValueFromSelect(values.country),
                    gdpr: gdprChecked,
                    marketing: marketingChecked,
                    token: 'fake'
                }
            };

            // get referral
            if (URLParams.ref) {
                params.data.referral = URLParams.ref
            }

            API.request(params, true)
                .then(({token}) => {
                    // sessionStorage.setItem("token", token);
                    // sessionStorage.setItem("refreshToken", refreshToken);
                    // this.props.runGetUserData();
                    // this.props.runUserOnline();
                    // this.props.runDispatchHideAuthModal();
                    // history.push(ROUTER.profile.settings);
                    store.dispatch(showAuthBlockedModal())
                    store.dispatch(showAuthModal())
                })
                .catch(err => {
                    let errorMessage = null;
                    const {errors} = this.state;

                    if (err.data && err.data.errors) {
                        if (err.data.errors.username) {
                            errorMessage = `The username ${this.state.values.username} already exists. Please sign in!`;
                            errors.username = 'User already exists'
                            store.dispatch(showAuthModal())
                        }
                    }

                    this.setState({errors});
                    if (errorMessage) {
                        toast.error(errorMessage)
                    }
                })
        }
    };

    initMap() {
        const {userLocation} = this.state;
        const cords = {lat: userLocation.lat, lng: userLocation.lon};

        const map = new window.google.maps.Map(document.getElementById('map'),{
            center: cords,
            zoom: 9,
            streetViewControl:false,
            mapTypeControl:false
        });

        new window.google.maps.Marker({
            position: cords,
            map: map
        });

        window.map = map
    };

    renderMap = () => {
        const {googleMapsLoaded, userLocation} = this.state;

        if (!googleMapsLoaded && !userLocation)
            return <LinearProgress/>;

        return (
            <Styled.MapContainer>
                <div id='map'/>
            </Styled.MapContainer>
        )
    };

    render() {
        const {userLocation, values, errors} = this.state;
        const {countriesList, intl} = this.props;

        return (
            <>
                <PublicHeader/>
                <Styled.BeInvolved>
                    <div className="dots-decorator">
                        <div className="dots dots-t1">{rotatedDots()}</div>
                        <div className="dots dots-t2">{decorationDots()}</div>
                        <div className="dots dots-t3">{decorationDots()}</div>
                        <Container>
                            <div className="row">
                                <div className="col">
                                    <h2>
                                        <FormattedMessage id="homepage.beInvolved.title" />
                                        <br />
                                        <FormattedMessage id="homepage.beInvolved.titleHero" tagName="span" />
                                        <div className="arrows">
                                            {titleArrows()}
                                        </div>
                                    </h2>
                                    <FormattedMessage id="homepage.beInvolved.p1" tagName="p" />
                                </div>
                                <div className="col">
                                    <img src={picBeInvolved} alt="be involved"/>
                                </div>
                            </div>
                            <Box mt={4}>
                                <ButtonRow direction="center">
                                    <Styled.Button onClick={() => {
                                        store.dispatch(showRegisterModal());
                                        store.dispatch(showAuthModal())
                                    }}>
                                        <FormattedMessage id="global.buttons.signUp" />
                                    </Styled.Button>
                                </ButtonRow>
                            </Box>
                        </Container>
                    </div>
                </Styled.BeInvolved>
                <Styled.Line>
                    <Container>
                        <FormattedMessage id="homepage.blueLine1" tagName="div" />
                    </Container>
                </Styled.Line>
                <Styled.MapArea>
                    <div className="dots-decorator">
                        <div className="dots dots-t1">{decorationDots()}</div>
                        <div className="dots dots-t2">{decorationDots()}</div>
                        <Container>
                            <div className="row">
                                <div className="col">
                                    {this.renderMap()}
                                </div>
                                <div className="col">
                                    <FormattedMessage id="homepage.rockArea.title" tagName="h2" />
                                    <FormattedMessage id="homepage.rockArea.p1" tagName="p" />
                                    <FormattedMessage id="homepage.rockArea.p2" tagName="p" />
                                    <Styled.Button onClick={() => {
                                        store.dispatch(showRegisterModal());
                                        store.dispatch(showAuthModal())
                                    }}>
                                        <FormattedMessage id="global.buttons.signUp" />
                                    </Styled.Button>
                                </div>
                            </div>
                        </Container>
                    </div>
                </Styled.MapArea>
                <Styled.Triple>
                    <Container>
                        <div className="row">
                            <div className="col">
                                <div className="flagHolder">
                                    <img src={trImage01} className="hidden" alt="Countries Rating"/>
                                    <div className="flag">
                                        {userLocation && <Flag code={userLocation.countryCode} />}
                                    </div>
                                </div>
                                <div className="title">
                                    <FormattedMessage id="homepage.tripleRow1.block1.title" />
                                </div>
                                <FormattedMessage id="homepage.tripleRow1.block1.description" tagName="p"/>
                            </div>
                            <div className="col">
                                <img src={trImage02} alt="City battles"/>
                                <div className="title">
                                    <FormattedMessage id="homepage.tripleRow1.block2.title" />
                                </div>
                                <FormattedMessage id="homepage.tripleRow1.block2.description" tagName="p"/>
                            </div>
                            <div className="col">
                                <img src={trImage03} alt="The coolest in the area"/>
                                <div className="title">
                                    <FormattedMessage id="homepage.tripleRow1.block3.title" />
                                </div>
                                <FormattedMessage id="homepage.tripleRow1.block3.description" tagName="p"/>
                            </div>
                        </div>
                    </Container>
                </Styled.Triple>
                <Styled.Line>
                    <Container>
                        <FormattedMessage id="homepage.blueLine2" tagName="div"/>
                    </Container>
                </Styled.Line>
                <Styled.School>
                    <div className="dots-decorator">
                        <div className="dots dots-t1">{rotatedDots()}</div>
                        <div className="dots dots-t2">{decorationDots()}</div>
                        <Container>
                            <div className="row">
                                <div className="col">
                                    <h2>
                                        <FormattedMessage
                                            id="homepage.dedicatedRatings.title"
                                            values={{
                                                br: <br />
                                            }}/>
                                        <div className="arrows">
                                            {titleArrows()}
                                        </div>
                                    </h2>
                                    <FormattedMessage id="homepage.dedicatedRatings.p1" tagName="p" />
                                    <ul>
                                        <FormattedMessage id="homepage.dedicatedRatings.p2" tagName="li"/>
                                        <FormattedMessage id="homepage.dedicatedRatings.p3" tagName="li"/>
                                        <FormattedMessage id="homepage.dedicatedRatings.p4" tagName="li"/>
                                        <FormattedMessage id="homepage.dedicatedRatings.p5" tagName="li"/>
                                    </ul>
                                </div>
                                <div className="col">
                                    <img src={communityImage} alt="Special ratings: be the best in your community!"/>
                                </div>
                            </div>
                        </Container>
                    </div>
                </Styled.School>
                <Styled.WorldLine>
                    <div className="map">
                        <Container>
                            <div className="title">
                                <FormattedMessage id="homepage.blueLine3.title" />
                            </div>
                            <div className="txt">
                                <FormattedMessage id="homepage.blueLine3.message" />
                            </div>
                            <div className="btn-row">
                                <Styled.Button onClick={() => console.log('becomePartner')}>
                                    <FormattedMessage id="homepage.button.becomePartner" />
                                </Styled.Button>
                            </div>
                        </Container>
                    </div>
                </Styled.WorldLine>
                {/*<Styled.Line>*/}
                {/*    <Container>*/}
                {/*        <FormattedMessage id="homepage.blueLine3" tagName="div"/>*/}
                {/*    </Container>*/}
                {/*</Styled.Line>*/}
                <Styled.BeInvolved>
                    <div className="dots-decorator">
                        <div className="dots dots-t1">{rotatedDots()}</div>
                        <div className="dots dots-t2">{decorationDots()}</div>
                        <div className="dots dots-t3">{decorationDots()}</div>
                        <Container>
                            <div className="row">
                                <div className="col">
                                    <h2>
                                        <FormattedMessage id="homepage.allGamersMatter" />
                                        <div className="arrows">
                                            {titleArrows()}
                                        </div>
                                    </h2>
                                    <FormattedMessage id="homepage.allGamersMatter.p1" tagName="p" />
                                    <FormattedMessage id="homepage.allGamersMatter.p2" tagName="p" />
                                    <FormattedMessage id="homepage.allGamersMatter.p3" tagName="p" />
                                </div>
                                <div className="col">
                                    <img src={schoolImage} alt="Special ratings: be the best in your community!"/>
                                </div>
                            </div>
                        </Container>
                    </div>
                </Styled.BeInvolved>
                <Styled.WorldLine>
                    <div className="map">
                        <Container>
                            <div className="alliance-logo">
                                <img src={allianceLogo} alt="e-sport" />
                            </div>
                            <div className="title">
                                <FormattedMessage id="homepage.blueLine4.title" />
                            </div>
                            <div className="txt">
                                <FormattedMessage id="homepage.blueLine4.message" />
                            </div>
                            <div className="btn-row">
                                <Styled.Button onClick={() => window.location.href = "mailto:info@passport.gg"}>
                                    <FormattedMessage id="homepage.blueLine4.button" />
                                </Styled.Button>
                            </div>
                        </Container>
                    </div>
                </Styled.WorldLine>
                <Styled.Games>
                    <Container>
                        <FormattedMessage id="homepage.topGames" tagName="h2" />
                        <div className="row">
                            <div className="col">
                                <img src={gCs} alt="CS:GO" className="active"/>
                            </div>
                            <div className="col">
                                <img src={gDota} alt="Dota 2" className="active"/>
                            </div>
                            <div className="col">
                                <img src={gFortnite} alt="Fortnite"/>
                            </div>
                            <div className="col">
                                <img src={gFifa} alt="FIFA"/>
                            </div>
                            <div className="col">
                                <img src={gOverwatch} alt="Overwatch"/>
                            </div>
                            <div className="col">
                                <img src={gLeague} alt="League of Legends"/>
                            </div>
                            <div className="col">
                                <img src={gCOD} alt="COD"/>
                            </div>
                            <div className="col">
                                <img src={gValor} alt="Valor"/>
                            </div>
                            <div className="col">
                                <img src={gRBS} alt="RBS"/>
                            </div>
                            <div className="col">
                                <img src={gHS} alt="HS"/>
                            </div>
                            <div className="col">
                                <img src={gSC2} alt="Start Craft 2"/>
                            </div>
                            <div className="col">
                                <img src={gRocket} alt="Rocket league"/>
                            </div>
                            <div className="col">
                                <img src={gApex} alt="Apex"/>
                            </div>
                            <div className="col">
                                <img src={gPubg} alt="PUBG"/>
                            </div>
                            <div className="col">
                                <img src={gMTG} alt="MTG"/>
                            </div>
                        </div>
                    </Container>
                </Styled.Games>
                {/*<Styled.WorldLine noPicture>*/}
                {/*    <div className="map">*/}
                {/*        <Container>*/}
                {/*            <div className="title">*/}
                {/*                <FormattedMessage id="homepage.blueLine5.title" />*/}
                {/*            </div>*/}
                {/*            <div className="txt">*/}
                {/*                <FormattedMessage id="homepage.blueLine5.message" />*/}
                {/*            </div>*/}
                {/*            <div className="btn-row">*/}
                {/*                <Styled.Button onClick={() => window.location.href = "mailto:info@passport.gg"}>*/}
                {/*                    <FormattedMessage id="homepage.button.becomePartner" />*/}
                {/*                </Styled.Button>*/}
                {/*            </div>*/}
                {/*        </Container>*/}
                {/*    </div>*/}
                {/*</Styled.WorldLine>*/}
                <Styled.WorldLine>
                    <div className="map">
                        <Container>
                            <div className="title">
                                <FormattedMessage id="homepage.register.title" />
                            </div>
                            <div className="txt">
                                <FormattedMessage id="homepage.register.description" />
                            </div>
                            <form onSubmit={e => this.signUp(e)}>
                                <div className="form-group">
                                    <div className="col">
                                        <Input
                                            onChange={this.onInputChange}
                                            name="firstName"
                                            variant="homepage"
                                            placeholder={intl.formatMessage({id: "global.forms.placeholders.firstName"})}
                                            error={errors.firstName}
                                            value={values.firstName}/>
                                    </div>
                                    <div className="col">
                                        <Input
                                            onChange={this.onInputChange}
                                            name="username"
                                            variant="homepage"
                                            type="email"
                                            placeholder={intl.formatMessage({id: "global.forms.placeholders.email"})}
                                            error={errors.username}
                                            value={values.username}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col">
                                        <Select
                                            options={countriesList}
                                            variant="homepage"
                                            values={values.country}
                                            error={errors.country}
                                            placeholder={intl.formatMessage({id: "global.forms.placeholders.select"})}
                                            onChange={value => this.onSelectChange(value)}/>
                                    </div>
                                    <div className="col">
                                        <Input
                                            onChange={this.onInputChange}
                                            variant="homepage"
                                            name="password"
                                            type="password"
                                            placeholder={intl.formatMessage({id: "global.forms.placeholders.password"})}
                                            error={errors.password}
                                            value={values.password}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="checkbox">
                                        <CheckBox
                                            name="gdpr"
                                            error={errors.gdpr}
                                            onChange={this.onCheckboxChange}
                                            checked={this.state.gdprChecked}>
                                            <FormattedMessage
                                                id="authModal.signUp.check1.full"
                                                values={{
                                                    linkTerms: (
                                                        <a href={getTermsLink(this.props.interfaceLang)} target="_blank" rel="noopener noreferrer">
                                                            <FormattedMessage id="authModal.signUp.check1.linkTerms" />
                                                        </a>
                                                    ),
                                                    linkPrivacy: (
                                                        <a href={getPrivacyPolicyLink(this.props.interfaceLang)} target="_blank" rel="noopener noreferrer">
                                                            <FormattedMessage id="authModal.signUp.check1.linkPrivacy" />
                                                        </a>
                                                    ),
                                                    linkCookie: (
                                                        <a href={getCookiesPolicyLink(this.props.interfaceLang)} target="_blank" rel="noopener noreferrer">
                                                            <FormattedMessage id="authModal.signUp.check1.linkCookie" />
                                                        </a>
                                                    )
                                                }}
                                            />
                                        </CheckBox>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="checkbox">
                                        <CheckBox
                                            name="marketing"
                                            onChange={this.onCheckboxChange}
                                            checked={this.state.marketingChecked}>
                                            <FormattedMessage id="authModal.signUp.check2" />
                                        </CheckBox>
                                    </div>
                                </div>
                                <div className="btn-row">
                                    <Styled.Button
                                        type="submit"
                                        onClick={e => this.signUp(e)}>
                                        <FormattedMessage id="global.buttons.signUp" />
                                    </Styled.Button>
                                </div>
                            </form>
                        </Container>
                    </div>
                </Styled.WorldLine>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        userOnline: state.userOnline,
        countriesList: state.countriesList
    }
};

const mapDispatchToProps = dispatch => {
    return {
        runGetUserData: () => dispatch(getUserData()),
        runUserOnline: () => dispatch(userOnline()),
        runDispatchHideAuthModal: () => dispatch(hideAuthModal())
    };
};

export default injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(Homepage)));

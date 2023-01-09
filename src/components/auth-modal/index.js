import React, {Component} from "react";
import {connect} from 'react-redux';
import {toast} from 'react-toastify';
import {withRouter} from "react-router-dom";
import {FormattedMessage, injectIntl} from "react-intl";

import {API, API_ROUTER} from "../../api";
// import {ROUTER} from "../../config";
import {
    getUserData,
    hideAuthModal,
    userOnline,
    hideRegisterModal,
    setSteamData,
    hideAuthBlockedModal
} from "../../redux/actions";
import {
    getCookiesPolicyLink,
    getPrivacyPolicyLink,
    getTermsLink,
    getUrlParams,
    getValueFromSelect,
    isEmailValid,
    isFieldEmpty,
    isPasswordValid,
    isSelectEmpty
} from "../../helpers";
import {Input, Modal, Button, CheckBox, ModalTitle, ModalSubTitle, Select} from "../UI";
import {Styled} from './style';
import steamIcon from "../../assets/steam/steam.png";

class AuthModal extends Component {

    state = {
        stage: 'sign-in',
        values: this.getDefaultValues,
        errors: this.getDefaultErrors,
        gdprChecked: false,
        marketingChecked: false,
        rememberMeChecked: false
    };

    static getDerivedStateFromProps(props, state) {
        const {steamData, countriesList} = props;

        if (steamData) {
            const country = countriesList.find(item => item.value === steamData.loccountrycode) || null;
            state.values.firstName = steamData.personaname || '';

            if (country) {
                state.values.country = [country];
            }
        }

        return state
    }

    get getDefaultValues() {
        return {
            firstName: '',
            username: '',
            password: '',
            country: []
        }
    }

    get getDefaultErrors() {
        return {
            firstName: '',
            username: '',
            password: '',
            gdpr: '',
            country: ''
        }
    }

    onModalOpen = () => {
        const {showRegisterModal, showAuthBlockedModal} = this.props;

        if (showRegisterModal) {
            this.switchStage('sign-up')
            this.props.dispatchHideRegister()
        } else if (showAuthBlockedModal) {
            this.switchStage('user-blocked')
            this.props.dispatchHideAuthBlockedModal()
        } else {
            this.switchStage('sign-in')
        }
    };

    switchStage = stage => {
        this.setState({
            stage,
            values: this.getDefaultValues,
            errors: this.getDefaultErrors,
            gdprChecked: false,
            marketingChecked: false,
            rememberMeChecked: false
        });
    };

    actionSignIn = e => {
        e.preventDefault();
        const {values, errors} = this.state;
        const {history} = this.props;

        // validate
        errors.username = isEmailValid(values.username);
        errors.password = isFieldEmpty(values.password);
        this.setState({errors});

        // send request if valid
        if (!Object.values(errors).some(value => value.length)) {
            const params = {
                ...API_ROUTER.auth.logIn,
                data: {
                    username: values.username,
                    password: values.password,
                    token: 'fake'
                }
            };

            API.request(params, true)
                .then((res) => {
                    const {token} = res;
                    const isInvite = localStorage.getItem('team-invite');

                    if (token) {

                        localStorage.setItem("token", token);

                        this.props.getUserData();
                        this.props.userOnline();
                        this.props.dispatchHideAuthModal();

                        isInvite ? document.location.reload() : history.push('/ratings');
                    }
                })
                .catch(err => {
                    if (err?.status === 405) {
                        this.switchStage('user-blocked')
                    } else {
                        toast.error(err?.data && err?.data?.message)
                    }
                })
        }
    };

    actionSignUp = () => {
        const {values, errors, gdprChecked, marketingChecked} = this.state;
        const isInvite = localStorage.getItem('team-invite');
        const URLParams = getUrlParams();
        const {steamData} = this.props;

        // validate
        errors.firstName = isFieldEmpty(values.firstName);
        errors.username = isEmailValid(values.username);
        errors.password = isPasswordValid(values.password);
        errors.country = isSelectEmpty(values.country);
        gdprChecked ? errors.gdpr = '' : errors.gdpr = 'This field is required';
        this.setState({errors});

        // send request if valid
        if (!Object.values(errors).some(value => value.length)) {
            const registerMethod = isInvite
                ? API_ROUTER.auth.register
                : API_ROUTER.auth.registerEvent

            let params = {
                ...registerMethod,
                pathKeys: {
                   eventName: isInvite ? 'team-invite' : 'platform-beta'
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

            // get steam data
            if (steamData) {
                const keys = Object.keys(URLParams);
                const values = Object.values(URLParams);
                const data = {};

                keys.forEach((key, index) => {
                    data[key] = decodeURIComponent(values[index])
                });

                params = {
                    ...API_ROUTER.steam.signUp,
                    ...params,
                    data: {
                        ...params.data,
                        ...data
                    }
                }
            }

            API.request(params, true)
                .then(({token}) => {
                    // this.props.getUserData();
                    // this.props.userOnline();
                    // this.props.setSteamData(null);
                    // this.props.dispatchHideAuthModal();
                    // history.push(ROUTER.profile.settings);
                    window.dataLayer.push({'event': "registrationSuccess"});

                    if (!isInvite) {
                        this.switchStage('user-blocked')
                    } else {
                        localStorage.setItem("token", token);
                        window.location.reload();
                    }
                })
                .catch(err => {
                    let errorMessage = null;
                    const {errors} = this.state;

                    if (err && err.data && err.data.errors) {
                        if (err.data.errors.username) {
                            errorMessage = `The username ${this.state.values.username} already exists. Please sign in!`;
                            errors.username = 'User already exists'
                        }
                    }

                    this.setState({errors});
                    if (errorMessage) {
                        toast.error(errorMessage)
                    }
                })
        }
    };

    actionForgotPassword = () => {
        const {values, errors} = this.state;

        // validate
        errors.username = isEmailValid(values.username);
        this.setState({errors});

        // send request if valid
        if (!Object.values(errors).some(value => value.length)) {
            const params = {
                ...API_ROUTER.auth.forgotPassword,
                data: {
                    email: values.username
                }
            };

            API.request(params, true)
                .then(({message}) => {
                    toast.success(message)
                    this.props.dispatchHideAuthModal();
                })
                .catch(err => toast.error(err.data && err.data.message))
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

        if (e.target.name === 'remember')
            this.setState({rememberMeChecked: !this.state.rememberMeChecked})

        if (e.target.name === 'marketing')
            this.setState({marketingChecked: !this.state.marketingChecked})
    };

    createSteamLink = () => {
        const {ref}= getUrlParams()
        const steam_url = 'https://steamcommunity.com/openid/login';
        const base_url = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
        const params = {
            'openid.ns': 'http://specs.openid.net/auth/2.0',
            'openid.mode': 'checkid_setup',
            'openid.return_to': `${base_url}/steam/registration`,
            'openid.realm': base_url,
            'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select',
            'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select'
        };

        if (ref) {
            params.ref = ref
        }

        let link = steam_url;
        const keys = Object.keys(params);
        const values = Object.values(params);

        keys.forEach((key, index) => {
            if (index === 0) {
                link += `?${key}=${values[index]}`
            } else {
                link += `&${key}=${values[index]}`
            }
        });

        return (
            <a href={link}>
                <img src={steamIcon} alt="connect steam"/>
            </a>
        )
    }

    renderResetPassword() {
        const {values, errors} = this.state;

        return (
            <>
                <ModalTitle>
                    <FormattedMessage id="authModal.reset.title" />
                </ModalTitle>
                <ModalSubTitle>
                    <FormattedMessage id="authModal.reset.subtitle" />
                </ModalSubTitle>
                <div>
                    <Styled.FormGroup>
                        <FormattedMessage id="global.forms.labels.email" tagName="label"/>
                        <Input
                            onChange={this.onInputChange}
                            name="username"
                            type="email"
                            error={errors.username}
                            value={values.username}/>
                    </Styled.FormGroup>
                    <Styled.FormGroup className="switch-form">
                        <FormattedMessage id="authModal.signIn.noAccount" tagName="div"/>
                        <a href="/" onClick={e => {
                            e.preventDefault();
                            this.switchStage('sign-up');
                        }}>
                            <FormattedMessage id="authModal.signIn.registration" />
                        </a>
                    </Styled.FormGroup>
                </div>
                <Styled.ButtonHolder>
                    <Button
                        label={<FormattedMessage id="global.buttons.send" />}
                        action={this.actionForgotPassword}
                    />
                </Styled.ButtonHolder>
            </>
        )
    }

    renderSignUp() {
        const {values, errors} = this.state;
        const {countriesList, intl, steamData} = this.props;
        const isInvite = localStorage.getItem('team-invite');

        return (
            <>
                <ModalTitle>
                    <FormattedMessage id="authModal.signUp.title" />
                </ModalTitle>
                <ModalSubTitle>
                    <FormattedMessage id="authModal.signUp.subtitle" />
                </ModalSubTitle>
                <div>
                    {steamData &&
                        <Styled.FormGroup>
                            <Styled.Steam>
                                <img src={steamData.avatarmedium} alt={steamData.personaname}/>
                                <div className="name">{steamData.personaname}</div>
                            </Styled.Steam>
                        </Styled.FormGroup>
                    }
                    <Styled.FormGroup>
                        <FormattedMessage id="global.forms.labels.firstName" tagName="label"/>
                        <Input
                            onChange={this.onInputChange}
                            name="firstName"
                            error={errors.firstName}
                            value={values.firstName}/>
                    </Styled.FormGroup>
                    <Styled.FormGroup>
                        <FormattedMessage id="global.forms.labels.email" tagName="label"/>
                        <Input
                            onChange={this.onInputChange}
                            name="username"
                            type="email"
                            error={errors.username}
                            value={values.username}/>
                    </Styled.FormGroup>
                    <Styled.FormGroup>
                        <FormattedMessage id="global.forms.labels.country" tagName="label"/>
                        <Select
                            clearable
                            options={countriesList}
                            values={values.country}
                            error={errors.country}
                            placeholder={intl.formatMessage({id: "global.forms.placeholders.select"})}
                            onChange={value => this.onSelectChange(value)}/>
                    </Styled.FormGroup>
                    <Styled.FormGroup>
                        <FormattedMessage id="global.forms.labels.password" tagName="label"/>
                        <Input
                            onChange={this.onInputChange}
                            name="password"
                            type="password"
                            error={errors.password}
                            value={values.password}/>
                    </Styled.FormGroup>
                    <Styled.FormGroup>
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
                    </Styled.FormGroup>
                    <Styled.FormGroup>
                        <CheckBox
                            name="marketing"
                            onChange={this.onCheckboxChange}
                            checked={this.state.marketingChecked}>
                            <FormattedMessage id="authModal.signUp.check2" />
                        </CheckBox>
                    </Styled.FormGroup>
                    {!steamData &&
                        <Styled.FormGroup className="switch-form">
                            <FormattedMessage id="authModal.signUp.haveAccount" tagName="div"/>
                            <a href="/" onClick={e => {
                                e.preventDefault();
                                this.switchStage('sign-in');
                            }}>
                                <FormattedMessage id="global.buttons.login" />
                            </a>
                        </Styled.FormGroup>
                    }
                    <Styled.ButtonHolder>
                        <Button
                            action={this.actionSignUp}
                            label={<FormattedMessage id="global.buttons.signUp" />}
                        />
                    </Styled.ButtonHolder>
                    {!steamData && !isInvite &&
                        <Styled.ButtonHolder>
                            {this.createSteamLink()}
                        </Styled.ButtonHolder>
                    }
                </div>
            </>
        )
    }

    renderSignIn() {
        const {values, errors} = this.state;
        const isInvite = localStorage.getItem('team-invite');

        return (
            <>
                <ModalTitle>
                    <FormattedMessage id="authModal.signIn.title" />
                </ModalTitle>
                <ModalSubTitle>
                    <FormattedMessage id="authModal.signIn.subtitle" />
                </ModalSubTitle>
                <form onSubmit={this.actionSignIn}>
                    <Styled.FormGroup>
                        <FormattedMessage id="global.forms.labels.email" tagName="label"/>
                        <Input
                            onChange={this.onInputChange}
                            name="username"
                            type="email"
                            error={errors.username}
                            value={values.username}/>
                    </Styled.FormGroup>
                    <Styled.FormGroup>
                        <FormattedMessage id="global.forms.labels.password" tagName="label"/>
                        <Input
                            onChange={this.onInputChange}
                            name="password"
                            type="password"
                            error={errors.password}
                            value={values.password}/>
                    </Styled.FormGroup>
                    <Styled.FormGroup className="reset-password">
                        <CheckBox
                            name="remember"
                            onChange={this.onCheckboxChange}
                            checked={this.state.rememberMeChecked}>
                            <FormattedMessage id="authModal.signIn.rememberMe" />
                        </CheckBox>
                        <a href="/" onClick={e => {
                            e.preventDefault();
                            this.switchStage('reset-password');
                        }}>
                            <FormattedMessage id="authModal.signIn.forgotPassword" />
                        </a>
                    </Styled.FormGroup>
                    <Styled.FormGroup className="switch-form">
                        <FormattedMessage id="authModal.signIn.noAccount" tagName="div"/>
                        <a href="/" onClick={e => {
                            e.preventDefault();
                            this.switchStage('sign-up');
                        }}>
                            <FormattedMessage id="authModal.signIn.registration" />
                        </a>
                    </Styled.FormGroup>
                    <Styled.ButtonHolder>
                        <Button
                            action={this.actionSignIn}
                            type="submit"
                            label={<FormattedMessage id="global.buttons.login" />}
                        />
                    </Styled.ButtonHolder>
                    {!isInvite &&
                        <Styled.ButtonHolder>
                            {this.createSteamLink()}
                        </Styled.ButtonHolder>
                    }
                </form>
            </>
        )
    }

    renderBlockedUser() {
        return (
            <>
                <ModalTitle>
                    <FormattedMessage id="authModal.blocked.title" />
                </ModalTitle>
                <Styled.UserBlocked>
                    <FormattedMessage id="authModal.blocked.description" tagName="p"/>
                </Styled.UserBlocked>
            </>
        )
    }

    render() {
        const {stage} = this.state;
        const {showAuthModal, dispatchHideAuthModal, steamData} = this.props;
        const closeModal = () => dispatchHideAuthModal();

        return (
            <Modal
                closeButton={!steamData}
                disableEscapeKeyDown={!!steamData}
                disableBackdropClick={!!steamData}
                open={showAuthModal}
                onEntering={this.onModalOpen}
                onClose={closeModal}>
                {stage === 'sign-in' && this.renderSignIn()}
                {stage === 'sign-up' && this.renderSignUp()}
                {stage === 'reset-password' && this.renderResetPassword()}
                {stage === 'user-blocked' && this.renderBlockedUser()}
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        showAuthModal: state.showAuthModal,
        showAuthBlockedModal: state.showAuthBlockedModal,
        showRegisterModal: state.showRegisterModal,
        countriesList: state.countriesList,
        interfaceLang: state.interfaceLang,
        steamData: state.steamData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getUserData: () => dispatch(getUserData()),
        userOnline: () => dispatch(userOnline()),
        dispatchHideAuthModal: () => dispatch(hideAuthModal()),
        dispatchHideRegister: () => dispatch(hideRegisterModal()),
        dispatchHideAuthBlockedModal: () => dispatch(hideAuthBlockedModal()),
        setSteamData: steamData => dispatch(setSteamData(steamData))
    };
};

export default injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthModal)));

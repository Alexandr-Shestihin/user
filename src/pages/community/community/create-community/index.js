import React, {Component} from "react";
import {
    Button, ButtonRow, CheckBox,
    Container,
    ContentBox,
    Input, Modal, ModalSubTitle, ModalTitle,
    PhoneNumber, SearchLocation,
    Select,
    SideBarRowLeft,
    TextArea
} from "../../../../components/UI";
import NewUsers from "../../../../components/widgets-new-users";
import {FormattedMessage, injectIntl} from "react-intl";
import {Styled} from "./style";
import {connect} from "react-redux";
import AvatarLoader from "../../../../components/avatar-loader";
import {INTERFACE_LANGUAGES} from "../../../../config";
import {Box, Grid} from "@material-ui/core";
import {getValueFromSelect, isEmailValid, isPhoneValid, numbersOnly, dataUriToBlob} from "../../../../helpers";
import {API, API_ROUTER} from "../../../../api";
import {withRouter} from "react-router-dom";
import {showNotificationModal} from "../../../../redux/actions";

class CreateCommunity extends Component {

    profilePictureInput = React.createRef()

    state = this.initialState

    get initialState() {
        return {
            lang: INTERFACE_LANGUAGES[0],
            image: '',
            pictureMode: false,
            type: [this.typeOptions[0]],
            title: this.langObject,
            description: this.langObject,
            games: [],
            gamesOptions: [],
            country: [],
            city: '',
            foundedAt: '',
            requirements: this.langObject,
            fee: '',
            invite: '',
            email: '',
            phone: '',
            hq: '',
            website: '',
            facebook: '',
            twitch: '',
            insta: '',
            reddit: '',
            vk: '',
            twitter: '',
            youtube: '',
            imAdmin: false,
            dataCorrect: false,
            errors: this.initialErrors,
            locationModalState: false,
            comprise: [],
            compriseOptions: [],
            level: [this.levelOptions[0]],
            levelOptions: this.levelOptions
        }
    }

    get levelOptions() {
        return [
            {
                label: 'Global',
                value: 'global'
            },
            {
                label: 'Regional',
                value: 'regional'
            },
            {
                label: 'Counties',
                value: 'counties'
            },
            {
                label: 'Cities',
                value: 'cities'
            }
        ]
    }

    get langObject() {
        const obj = {}

        INTERFACE_LANGUAGES.forEach(lang => {obj[lang] = ''})

        return obj
    }

    get typeOptions() {
        const {intl} = this.props;

        return [
            {
                label: intl.formatMessage({id: "battle.types.community"}),
                value: 'community',
            },
            {
                label: intl.formatMessage({id: "battle.types.work"}),
                value: 'work'
            },
            {
                label: intl.formatMessage({id: "battle.types.club"}),
                value: 'club'
            },
            {
                label: intl.formatMessage({id: "battle.types.federation"}),
                value: 'federation'
            }
        ]
    }

    get initialErrors() {
        return {
            title: '',
            description: '',
            requirements: '',
            country: '',
            foundedAt: '',
            email: '',
            invite: ''
        }
    }

    componentDidMount() {
        API.request({...API_ROUTER.games.getAvailable}, true)
            .then(({games}) => {
                this.setState({
                    gamesOptions: Object.entries(games).map(game => {
                        const [value, label] = game;

                        return {value, label}
                    })
                })
            })
            .catch(err => console.error(err))

        this.getComprise()
    }

    getComprise() {
        API.request({...API_ROUTER.community.getCommunityList}, true)
            .then(({items}) => {
                this.setState({compriseOptions: items
                        .filter(item => {
                            const myLevel = this.state.level[0].value
                            const itemLevel = item.community.subtype

                            if (!itemLevel || myLevel === 'global') {
                                return false
                            }

                            if (myLevel === 'regional' && (itemLevel !== 'regional' || itemLevel !== 'counties' || itemLevel !== 'cities')) {
                                return true
                            }

                            if (myLevel === 'counties' && (itemLevel !== 'counties' || itemLevel !== 'cities')) {
                                return true
                            }

                            return myLevel === 'cities' && (itemLevel !== 'cities')
                        })
                        .map(item => {
                            const {community} = item

                            return {
                                label: this.decodeOrgName(community.name),
                                value: community.uuid
                            }
                        })})
            })
            .catch(err => console.error(err))
    }

    onPhoneChange = phone => {
        this.setState({phone: numbersOnly(phone)});
    };

    decodeOrgName = data => {
        const target = 'name'
        const {interfaceLang} = this.props

        if (!data || !interfaceLang) {
            return ''
        }

        try {
            const dataObject = JSON.parse(data)

            if (dataObject) {
                const targetObject = dataObject[target];

                if (targetObject) {
                    let targetData = targetObject[interfaceLang]

                    if (!targetData) {
                        Object.values(targetObject).forEach(value => {
                            if (value) {

                                targetData = value
                            }
                        })
                    }

                    return targetData || ''
                }
            }
        } catch (err) {
            return data
        }
    }

    onSubmit = e => {
        e.preventDefault()
        const {showNotificationModal} = this.props;
        const {
            type, title, description, games, country, city,
            foundedAt, imAdmin, requirements, dataCorrect,
            fee, email, invite, website, phone, hq,
            facebook, twitch, insta, reddit, vk, twitter, youtube,
            comprise, level, image
        } = this.state;

        // set countries
        let setCountries = country.map(item => item.value)
        if (getValueFromSelect(level) === 'global') {
            setCountries = this.props.countriesList.map(item => item.value)
        }

        // validate
        const errors = this.initialErrors;
        errors.title = Object.values(title).every(item => !item) ? 'This field is required' : ''
        errors.description = Object.values(title).every(item => !item) ? 'This field is required' : ''
        errors.requirements = Object.values(title).every(item => !item) ? 'This field is required' : ''
        errors.email = isEmailValid(email)
        errors.invite = invite ? isEmailValid(invite) : ''
        errors.foundedAt = this.isDateValid(foundedAt)
        errors.phone = phone ? isPhoneValid(phone) : ''
        this.setState({errors})

        if (Object.values(errors).every(item => !item)) {
            const data = {
                type: getValueFromSelect(type),
                name: JSON.stringify({name: title}),
                description: JSON.stringify({description: description}),
                games: games.map(item => item.value),
                country: setCountries,
                comprise: comprise.map(item => item.label),
                city,
                foundedAt: `01-01-${foundedAt}`.split('-').reverse().join('-'),
                requirements: JSON.stringify({requirements: requirements}),
                fee,
                imAdmin: imAdmin ? 1 : 0,
                dataCorrect: dataCorrect ? 1 : 0,
                email,
                invite,
                website,
                phone,
                hq,
                facebook,
                twitch,
                insta,
                reddit,
                vk,
                twitter,
                youtube,
                subtype: getValueFromSelect(level)
            }

            let COMMUNITY_ID;

            API.request({...API_ROUTER.community.createNewCommunity, data}, true)
                .then(({community}) => {
                    COMMUNITY_ID = community.uuid

                    if (image) {
                        const blob = dataUriToBlob(image);
                        const formData = new FormData();
                        formData.append('file', blob);

                        return API.request({
                            ...API_ROUTER.community.uploadImage,
                            pathKeys: {
                                communityUuid: community.uuid
                            },
                            data: formData
                        }, true)
                    }

                    return true
                })
                .then(() => this.props.history.push(`/communities/${COMMUNITY_ID}`))
                .catch(err => showNotificationModal(err?.data?.message))
        }
    }

    inputHandler = e => {
        const {lang, title, description, requirements} = this.state
        const {name, value} = e.target

        if (name === 'title') {
            this.setState({
                title: {
                    ...title,
                    [lang]: value
                }
            })
        }

        else if (name === 'description') {
            this.setState({
                description: {
                    ...description,
                    [lang]: value
                }
            })
        }

        else if (name === 'requirements') {
            this.setState({
                requirements: {
                    ...requirements,
                    [lang]: value
                }
            })
        }

        else {
            this.setState({
                [name]: value
            })
        }
    }

    selectHandler = (value, selectName) => {
        if (selectName === 'level') {
            this.setState({
                city: '',
                country: []
            })

            this.getComprise()
        }

        this.setState({[selectName]: value})
    };

    isDateValid = date => {

        const isDateCorrect = d => !isNaN(d.getTime()),
            reverseDate = date => `01-01-${date}`.split('-').reverse().join('-')

        // if empty
        if (!date.length)
            return 'This field is required'

        // is field set?
        if (date.split('').indexOf('_') !== -1) {
            return 'Please set correct date'
        }

        // is date correct?
        const dateToCheck = new Date(reverseDate(date));

        if (!isDateCorrect(dateToCheck)) {
            return 'Date is invalid'
        }

        return ''
    }

    onImageCrop = base64 => {
        this.setState({
            image: base64,
            pictureMode: false
        })
    };

    onImageSelect = event => {
        const file = event.target.files[0];

        if (file) {
            this.handleLoadAvatar(file);
            this.setState({pictureMode: true})
            this.profilePictureInput.current.value = null;
        }
    };

    handleLoadAvatar = file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement("img");
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                const MAX_WIDTH = 400;
                const MAX_HEIGHT = 400;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                const dataUrl = canvas.toDataURL("image/png");
                this.setState({image: dataUrl})
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    openLocationModal = () => this.setState({locationModalState: true});

    closeLocationModal = () => this.setState({locationModalState: false});

    onLocationSelect = (addressObject) => {
        const values = {}
        const {address_components} = addressObject;

        // get settings
        const componentForm = {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            political: 'long_name',
            administrative_area_level_1: 'short_name',
            administrative_area_level_2: 'short_name',
            country: 'short_name',
            postal_code: 'short_name'
        };

        // get data
        const addressData = {};
        for (let i = 0; i < address_components.length; i++) {
            const addressType = address_components[i].types[0];
            if (componentForm[addressType]) {
                addressData[addressType] = address_components[i][componentForm[addressType]]
            }
        }


        // set data
        if (addressData.country) {
            values.country = addressData.country;
        }

        if (addressData.locality || addressData.political) {
            values.city = addressData.locality || addressData.political
        }

        this.setState({city: `${values.city ? values.city + ', ' : ''}${values.country}`})
    };

    renderForm = () => {
        const {
            lang, title, type, description, games, gamesOptions, country, city, email, invite,
            foundedAt, requirements, fee, errors, pictureMode, image, phone,
            website, hq, facebook, twitch, insta, reddit, vk, twitter, youtube,
            dataCorrect, imAdmin, comprise, compriseOptions, level, levelOptions
        } = this.state;

        const {history} = this.props;

        if (pictureMode) {
            return <AvatarLoader
                settings={{
                    aspect: 0,
                    width: 200,
                    height: 200
                }}
                image={image}
                onImageCrop={this.onImageCrop}
                cancel={() => this.setState({pictureMode: false})}/>
        }

        return (
            <form onSubmit={e => this.onSubmit(e)}>
                <Styled.LangSwitcher>
                    <div className="label">
                        <FormattedMessage id="community.langSwitcher" />
                    </div>
                    <div className="buttons">
                        {INTERFACE_LANGUAGES.map(option => (
                            <button
                                key={option}
                                type="button"
                                className={option === lang ? 'is-active' : ''}
                                onClick={() => this.setState({lang: option})}>
                                {option}
                            </button>
                        ))}
                    </div>
                </Styled.LangSwitcher>
                <Grid container spacing={4}>
                    <Grid container item md={8}>
                        <Box width={1}>
                            <Select
                                clearable
                                values={type}
                                label={<FormattedMessage id="community.form.type" tagName="label"/>}
                                options={this.typeOptions}
                                onChange={value => this.selectHandler(value, 'type')}/>
                        </Box>
                        <Box mt={3} width={1}>
                            <Select
                                values={level}
                                label={<FormattedMessage id="community.form.level" tagName="label"/>}
                                options={levelOptions}
                                onChange={value => this.selectHandler(value, 'level')}/>
                        </Box>
                        <Box mt={3} width={1}>
                            <Input
                                value={title[lang]}
                                error={errors.title}
                                label={<><FormattedMessage id="community.form.title" tagName="label"/> ({lang})</>}
                                onChange={this.inputHandler}
                                name="title"/>
                        </Box>
                        <Box mt={3} width={1}>
                            <TextArea
                                value={description[lang]}
                                error={errors.description}
                                label={<><FormattedMessage id="community.form.description" tagName="label"/> ({lang})</>}
                                onChange={this.inputHandler}
                                name="description"
                            />
                        </Box>
                        <Box mt={3} width={1}>
                            <Select
                                multiple
                                multiline
                                clearable
                                values={games}
                                label={<FormattedMessage id="community.form.games" tagName="label"/>}
                                options={gamesOptions}
                                onChange={value => this.selectHandler(value, 'games')}/>
                        </Box>
                        {getValueFromSelect(level) !== 'global' &&
                            <Box mt={3} width={1}>
                                <Select
                                    multiple
                                    multiline
                                    clearable
                                    values={country}
                                    error={errors.country}
                                    label={<FormattedMessage id="community.form.countries" tagName="label"/>}
                                    options={this.props.countriesList}
                                    onChange={value => this.selectHandler(value, 'country')}/>
                            </Box>
                        }
                        {getValueFromSelect(level) === 'cities' &&
                            <Box mt={3} width={1}>
                                <Input
                                    readOnly
                                    label={<FormattedMessage id="community.form.city" />}
                                    value={city}
                                    onClick={this.openLocationModal}/>
                            </Box>
                        }
                        <Box mt={3} width={1}>
                            <Input
                                value={foundedAt}
                                error={errors.foundedAt}
                                label={<FormattedMessage id="community.form.founded" tagName="label"/>}
                                onChange={this.inputHandler}
                                placeholder="YYYY"
                                mask="9999"
                                name="foundedAt"/>
                        </Box>
                        <Box mt={3} width={1}>
                            <Select
                                multiple
                                clearable
                                values={comprise}
                                label={<FormattedMessage id="community.form.comprise" tagName="label"/>}
                                options={compriseOptions}
                                onChange={value => this.selectHandler(value, 'comprise')}/>
                        </Box>
                        <Box mt={3} width={1}>
                            <TextArea
                                value={requirements[lang]}
                                error={errors.requirements}
                                label={<><FormattedMessage id="community.form.requirements" tagName="label"/> ({lang})</>}
                                onChange={this.inputHandler}
                                name="requirements"
                            />
                        </Box>
                        <Box mt={3} width={1}>
                            <Input
                                value={fee}
                                label={<FormattedMessage id="community.form.fee" tagName="label"/>}
                                onChange={this.inputHandler}
                                name="fee"/>
                        </Box>
                    </Grid>
                    <Grid container item md={4}>
                        <Box width={1}>
                            <input
                                hidden
                                ref={this.profilePictureInput}
                                type="file"
                                onInput={this.onImageSelect}
                                accept="image/x-png,image/png,image/gif,image/jpeg"
                            />
                            <Styled.Logo onClick={() => this.profilePictureInput.current.click()}>
                                <div className="image">
                                    {image && <img src={image} alt={title}/>}
                                </div>
                                <div className="copy">
                                    <FormattedMessage id="community.form.addLogo" />
                                </div>
                            </Styled.Logo>
                        </Box>
                    </Grid>
                </Grid>
                <Box mt={3}>
                    <Styled.ContactInfo>
                        <FormattedMessage id="community.form.contactInfo"/>
                    </Styled.ContactInfo>
                </Box>
                <Grid container spacing={4}>
                    <Grid container item md={6}>
                        <Box mt={3} width={1}>
                            <Input
                                required
                                value={email}
                                error={errors.email}
                                label={<FormattedMessage id="community.form.email" tagName="label"/>}
                                onChange={this.inputHandler}
                                name="email"/>
                        </Box>
                        <Box mt={3} width={1}>
                            <PhoneNumber
                                error={errors.phone}
                                country={this.props.userData && this.props.userData.country.toLowerCase()}
                                value={phone}
                                label={<FormattedMessage id="community.form.phone" tagName="label"/>}
                                onChange={this.onPhoneChange}
                                name="phone"/>
                        </Box>
                        <Box mt={3} width={1}>
                            <Input
                                value={hq}
                                label={<FormattedMessage id="community.form.hq" tagName="label"/>}
                                onChange={this.inputHandler}
                                name="hq"/>
                        </Box>
                        <Box mt={3} width={1}>
                            <Input
                                value={twitch}
                                label={<FormattedMessage id="community.form.twitch" tagName="label"/>}
                                onChange={this.inputHandler}
                                name="twitch"/>
                        </Box>
                        <Box mt={3} width={1}>
                            <Input
                                value={reddit}
                                label={<FormattedMessage id="community.form.reddit" tagName="label"/>}
                                onChange={this.inputHandler}
                                name="reddit"/>
                        </Box>
                        <Box mt={3} width={1}>
                            <Input
                                value={twitter}
                                label={<FormattedMessage id="community.form.twitter" tagName="label"/>}
                                onChange={this.inputHandler}
                                name="twitter"/>
                        </Box>
                    </Grid>
                    <Grid container item md={6}>
                        <Box mt={3} width={1}>
                            <Input
                                value={invite}
                                error={errors.invite}
                                label={<FormattedMessage id="community.form.inviteAdmin" tagName="label"/>}
                                onChange={this.inputHandler}
                                name="invite"/>
                        </Box>
                        <Box mt={3} width={1}>
                            <Input
                                value={website}
                                error={errors.website}
                                label={<FormattedMessage id="community.form.website" tagName="label"/>}
                                onChange={this.inputHandler}
                                name="website"/>
                        </Box>
                        <Box mt={3} width={1}>
                            <Input
                                value={facebook}
                                label={<FormattedMessage id="community.form.facebook" tagName="label"/>}
                                onChange={this.inputHandler}
                                name="facebook"/>
                        </Box>
                        <Box mt={3} width={1}>
                            <Input
                                value={insta}
                                label={<FormattedMessage id="community.form.instagram" tagName="label"/>}
                                onChange={this.inputHandler}
                                name="insta"/>
                        </Box>
                        <Box mt={3} width={1}>
                            <Input
                                value={vk}
                                label={<FormattedMessage id="community.form.vk" tagName="label"/>}
                                onChange={this.inputHandler}
                                name="vk"/>
                        </Box>
                        <Box mt={3} width={1}>
                            <Input
                                value={youtube}
                                label={<FormattedMessage id="community.form.youtube" tagName="label"/>}
                                onChange={this.inputHandler}
                                name="youtube"/>
                        </Box>
                    </Grid>
                </Grid>
                <Box mt={3}>
                    <CheckBox
                        onChange={() => this.setState({dataCorrect: !dataCorrect})}
                        checked={dataCorrect}>
                        <FormattedMessage id="community.form.confirm"/>
                    </CheckBox>
                </Box>
                <Box mt={2}>
                    <CheckBox
                        onChange={() => this.setState({imAdmin: !imAdmin})}
                        checked={imAdmin}>
                        <FormattedMessage id="community.form.admin"/>
                    </CheckBox>
                </Box>
                <Box mt={8}>
                    <ButtonRow direction="right">
                        <Button
                            variant="secondary"
                            label={<FormattedMessage id="community.close"/>}
                            action={() => history.push('/communities')} />
                        <Button
                            label={<FormattedMessage id={`community.create`}/>}
                            action={e => this.onSubmit(e)} />
                    </ButtonRow>
                </Box>
            </form>
        )
    }

    render() {
        const {locationModalState} = this.state;

        return (
            <>
                <Container>
                    <SideBarRowLeft className="change-order-on-mobile">
                        <div>
                            <NewUsers />
                        </div>
                        <div>
                            <ContentBox>
                                <Styled.Title>
                                    <FormattedMessage id="community.createNew" />
                                </Styled.Title>
                                {this.renderForm()}
                            </ContentBox>
                        </div>
                    </SideBarRowLeft>
                </Container>
                <Modal
                    closeButton
                    open={locationModalState}
                    onClose={this.closeLocationModal}>
                    <ModalTitle>
                        <FormattedMessage id="settings.address.title" />
                    </ModalTitle>
                    <ModalSubTitle>
                        <FormattedMessage id="settings.address.subtitle" />
                    </ModalSubTitle>
                    <SearchLocation
                        includeCords
                        onLocationSelect={this.onLocationSelect}
                        closeAction={this.closeLocationModal}/>
                    <Styled.AddressDisclaimer>
                        <FormattedMessage id="settings.address.disclaimer" />
                    </Styled.AddressDisclaimer>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        userData: state.userData,
        countriesList: state.countriesList,
        interfaceLang: state.interfaceLang
    }
};

const mapDispatchToProps = dispatch => {
    return {
        showNotificationModal: message => dispatch(showNotificationModal(message)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(CreateCommunity)));
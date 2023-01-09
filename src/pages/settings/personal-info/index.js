import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { LinearProgress } from "@material-ui/core";
import { FormattedMessage, injectIntl } from "react-intl";
import { API, API_ROUTER } from "../../../api";
import {
  ContentBox,
  InnerBox,
  SectionTitle,
  ModalTitle,
  Input,
  PhoneNumber,
  Select,
  TextArea,
  Button,
  ButtonRow,
  Modal,
  SearchLocation,
  ModalSubTitle,
} from "../../../components/UI";
import {
  isFieldEmpty,
  numbersOnly,
  getValueFromSelect,
  setValueToSelect,
  getLabelFromSelect,
  getArrayFromSelect,
  setArrayToSelect,
} from "../../../helpers";
import { getUserData, setInterfaceLang } from "../../../redux/actions";
import {
  INTERFACE_LANGUAGES_OPTIONS,
  LANGUAGE_SPEAK_OPTIONS,
} from "../../../config";
import Styled from "./styles";
import { translations } from "../../../i18n";

class PersonalInfo extends Component {
  state = {
    dataLoaded: false,
    locationModalState: false,
    values: {},
    referrals: {
      total: 0,
      steam: 0,
    },
    errors: {
      firstName: "",
      nickname: "",
      phone: "",
      birthDate: "",
      username: "",
    },
  };

  get streamOptions() {
    const { intl } = this.props;

    return [
      {
        label: intl.formatMessage({ id: "global.yes" }),
        value: true,
      },
      {
        label: intl.formatMessage({ id: "global.no" }),
        value: false,
      },
    ];
  }

  get genderOptions() {
    const { intl } = this.props;

    return [
      {
        label: intl.formatMessage({ id: "gender.male" }),
        value: "Male",
      },
      {
        label: intl.formatMessage({ id: "gender.female" }),
        value: "Female",
      },
      {
        label: intl.formatMessage({ id: "gender.other" }),
        value: "Other",
      },
    ];
  }

  static getDerivedStateFromProps(props, state) {
    const { userData, devicesList } = props;
    const { dataLoaded } = state;
    const reverseDate = (date) => date.split("-").reverse().join("-");
    const streamOptions = [
      {
        label: props.intl.formatMessage({ id: "global.yes" }),
        value: true,
      },
      {
        label: props.intl.formatMessage({ id: "global.no" }),
        value: false,
      },
    ];
    const streamer = streamOptions.find(
      (item) => userData.streaming === item.value
    );

    if (userData && !dataLoaded) {
      state.dataLoaded = true;
      state.values.psnId = userData.psnId || "";
      state.values.firstName = userData.firstName || "";
      state.values.lastName = userData.lastName || "";
      state.values.nickname = userData.nickname || "";
      state.values.phone = userData.phone || "";
      state.values.birthDate =
        (userData.birthDate && reverseDate(userData.birthDate)) || "";
      state.values.gender = setValueToSelect(userData.gender);
      state.values.username = userData.username || "";
      state.values.language =
        Object.keys(translations).indexOf(
          userData.languages ? userData.languages.toLowerCase() : "en"
        ) === -1
          ? "en"
          : userData.languages.toLowerCase();
      state.values.languages = setArrayToSelect(
        userData.languages.map((item) => item.toLowerCase()),
        LANGUAGE_SPEAK_OPTIONS
      );
      state.values.devices = setArrayToSelect(
        userData.devices.map((item) => item.uuid),
        devicesList
      );
      state.values.citizenship = setValueToSelect(userData.citizenship);
      state.values.nationality = setValueToSelect(userData.nationality);
      state.values.country = userData.country || "";
      // state.values.region = userData.region || "";
      state.values.city = userData.city || "";
      state.values.street = userData.street || "";
      state.values.zipCode = userData.zipCode || "";
      state.values.house = userData.house || "";
      state.values.about = userData.about || "";
      state.values.nickname = userData.nickname || "";
      state.values.geo = "";
      state.values.passport = userData.passport || "";
      state.values.streaming = streamer ? [streamer] : [];

      return state;
    }

    return null;
  }

  getCountryFullName(countryCode) {
    const { countriesList } = this.props;

    if (!countriesList) return "";

    const object = countriesList.find((item) => item.value === countryCode);

    return object ? object.label : "";
  }

  componentDidMount() {
    API.request({ ...API_ROUTER.user.getUserReferrals }, true)
      .then(({ total, steam }) =>
        this.setState({
          referrals: {
            total,
            steam,
          },
        })
      )
      .catch((err) => console.error(err));
  }

  getPassportAddress(nickname) {
    return window.location.origin + "/id/" + nickname;
  }

  getReferralLink(ref) {
    return window.location.origin + "?ref=" + ref;
  }

  openLocationModal = () => this.setState({ locationModalState: true });

  closeLocationModal = () => this.setState({ locationModalState: false });

  getMinDate = () => {
    const now = new Date();
    const diff = now.setTime(now.setFullYear(now.getFullYear() - 100));
    return new Date(diff);
  };

  onInput = (e) => {
    const { values } = this.state;
    let { name, value } = e.target;

    // if url
    if (name === "url") {
      value = value.replace(/[^0-9A-Za-z-]/g, "");
    }

    values[name] = value;

    this.setState({ values });
  };

  onPhoneChange = (phone) => {
    const { values } = this.state;
    values.phone = numbersOnly(phone);

    this.setState({ values });
  };

  onSelectChange = (value, selectName) => {
    const { values } = this.state;
    values[selectName] = value;

    this.setState({ values });
  };

  isDateValid = (date) => {
    const isDateCorrect = (d) => !isNaN(d.getTime()),
      reverseDate = (date) => date.split("-").reverse().join("-"),
      isDateInPast = (d) => {
        const now = new Date();

        return d.getTime() < now.getTime();
      };

    // if empty
    if (!date.length) return "";

    // is field set?
    if (date.split("").indexOf("_") !== -1) {
      return "Please set correct date";
    }

    // is date correct?
    const dateToCheck = new Date(reverseDate(date));

    if (!isDateCorrect(dateToCheck)) {
      return "Date is invalid";
    }

    // date in past?
    if (!isDateInPast(dateToCheck)) {
      return "Should be in past";
    }

    // min year 1910
    if (dateToCheck.getFullYear() < 1910) {
      return "You are to old for this bro";
    }

    return "";
  };

  // onLocationSelect = (addressObject, cords) => {
  //   const { values } = this.state;
  //   const { address_components } = addressObject;

  //   // get settings
  //   const componentForm = {
  //     street_number: "short_name",
  //     route: "long_name",
  //     locality: "long_name",
  //     political: "long_name",
  //     administrative_area_level_1: "short_name",
  //     administrative_area_level_2: "short_name",
  //     country: "short_name",
  //     postal_code: "short_name",
  //   };

  //   // get data
  //   const addressData = {};
  //   for (let i = 0; i < address_components.length; i++) {
  //     const addressType = address_components[i].types[0];
  //     if (componentForm[addressType]) {
  //       addressData[addressType] =
  //         address_components[i][componentForm[addressType]];
  //     }
  //   }

  //   // clear data
  //   values.country = "";
  //   values.zipCode = "";
  //   values.city = "";
  //   values.region = "";
  //   values.street = "";
  //   values.house = "";

  //   // set data
  //   if (addressData.country) {
  //     values.country = addressData.country;
  //   }

  //   if (addressData.postal_code) {
  //     values.zipCode = addressData.postal_code;
  //   }

  //   if (addressData.locality || addressData.political) {
  //     values.city = addressData.locality || addressData.political;
  //   }

  //   if (
  //     addressData.administrative_area_level_1 ||
  //     addressData.administrative_area_level_2
  //   ) {
  //     values.region =
  //       addressData.administrative_area_level_1 ||
  //       addressData.administrative_area_level_2;
  //   }

  //   if (addressData.route) {
  //     values.street = addressData.route;
  //   }

  //   if (addressData.street_number) {
  //     values.house = addressData.street_number;
  //   }

  //   // addCords
  //   values.lat = cords.lat;
  //   values.lng = cords.lng;

  //   this.setState({ values });
  // };

  saveChanges = (setLang) => {
    const { values, errors } = this.state;
    const interfaceLang =
      Object.keys(translations).indexOf(
        this.props.interfaceLang ? this.props.interfaceLang.toLowerCase() : "en"
      ) === -1
        ? "en"
        : this.props.interfaceLang;
    const reverseDate = (date) => date.split("-").reverse().join("-");

    // validate
    errors.firstName = isFieldEmpty(values.firstName);
    errors.nickname = isFieldEmpty(values.nickname);
    errors.username = isFieldEmpty(values.username);
    errors.url = isFieldEmpty(values.url);
    errors.birthDate = this.isDateValid(values.birthDate);
    this.setState({ values });

    if (!Object.values(errors).some((value) => value.length)) {
      let bod = null;
      if (values.birthDate) {
        bod = new Date(reverseDate(values.birthDate));
        bod = bod.toISOString().split("T")[0];
      }

      const params = {
        ...API_ROUTER.user.setUserData,
        data: {
          psnId: values.psnId,
          firstName: values.firstName,
          lastName: values.lastName,
          nickname: values.nickname,
          phone: values.phone,
          birthDate: bod,
          gender: getValueFromSelect(values.gender),
          language: setLang || interfaceLang,
          languages: getArrayFromSelect(values.languages),
          devices: getArrayFromSelect(values.devices),
          username: values.username,
          citizenship: getLabelFromSelect(values.citizenship),
          nationality: getLabelFromSelect(values.nationality),
          country: values.country,
          // region: values.region,
          city: values.city,
          street: values.street,
          house: values.house,
          zipCode: values.zipCode,
          url: values.url,
          about: values.about,
          lat: values.lat,
          lng: values.lng,
          streaming: getValueFromSelect(values.streaming),
        },
      };

      API.request(params, true)
        .then(() => this.props.getUserData())
        .catch((err) => toast.error(err.data && err.data.message));
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // saveAddress = () => {
  //   const { values } = this.state;

  //   const params = {
  //     ...API_ROUTER.user.saveAddress,
  //     data: {
  //       country: values.country,
  //       region: values.region,
  //       city: values.city,
  //       street: values.street,
  //       house: values.house,
  //       zipCode: values.zipCode,
  //       lat: values.lat,
  //       lng: values.lng,
  //     },
  //   };

  //   API.request(params, true)
  //     .then(() => {
  //       this.props.getUserData();
  //       toast.success(<FormattedMessage id="settings.addressSaved" />);
  //     })
  //     .catch((err) => toast.error(err.data && err.data.message));
  // };

  // onLanguageChange = (value) => {
  //   const [langObject] = value;
  //   localStorage.setItem("interfaceLang", langObject.value);
  //   this.saveChanges(langObject.value);
  // };

  renderLoader = () => <LinearProgress />;

  renderForm() {
    const { values, errors } = this.state;
    const { countriesList } = this.props;

    return (
      <>
        <Styled.Row>
          <Styled.Col className="full-width">
            <SectionTitle>
              <FormattedMessage id="settings.personalInfo" />
            </SectionTitle>
          </Styled.Col>
          <Styled.Col>
            <Styled.InnerBox>
              <Styled.FormGroup className="inline">
                <label>
                  <FormattedMessage id="global.forms.labels.firstName" /> *
                </label>
                <Input
                  error={errors.firstName}
                  value={values.firstName}
                  onChange={this.onInput}
                  name="firstName"
                />
              </Styled.FormGroup>
              <Styled.FormGroup className="inline">
                <label>
                  <FormattedMessage id="global.forms.labels.lastName" />
                </label>
                <Input
                  value={values.lastName}
                  onChange={this.onInput}
                  name="lastName"
                />
              </Styled.FormGroup>
              <Styled.FormGroup className="inline">
                <label>
                  <FormattedMessage id="global.forms.labels.nickname" /> *
                </label>
                <Input
                  error={errors.nickname}
                  value={values.nickname}
                  onChange={this.onInput}
                  name="nickname"
                />
              </Styled.FormGroup>
              <Styled.FormGroup className="inline">
                <label>
                  <FormattedMessage id="global.forms.labels.gender" />
                </label>
                <Select
                  clearable
                  values={values.gender}
                  options={this.genderOptions}
                  onChange={(value) => this.onSelectChange(value, "gender")}
                />
              </Styled.FormGroup>
              <Styled.FormGroup className="inline">
                <label>
                  <FormattedMessage id="global.forms.labels.citizenship" />
                </label>
                <Select
                  clearable
                  options={countriesList}
                  values={values.citizenship}
                  onChange={(value) =>
                    this.onSelectChange(value, "citizenship")
                  }
                />
              </Styled.FormGroup>
              <Styled.FormGroup className="inline">
                <label>PSN ID</label>
                <Input
                  value={values.psnId}
                  onChange={this.onInput}
                  name="psnId"
                />
              </Styled.FormGroup>
              <Styled.FormGroup className="inline">
                <label>
                  <FormattedMessage id="settings.passportAddress" />
                </label>
                <Input
                  error={errors.url}
                  value={values.url}
                  onChange={this.onInput}
                  name="url"
                />
              </Styled.FormGroup>
            </Styled.InnerBox>
          </Styled.Col>
          <Styled.Col>
            <Styled.InnerBox>
              <Styled.FormGroup className="inline">
                <label>
                  <FormattedMessage id="global.forms.labels.phone" />
                </label>
                <PhoneNumber
                  country={values.country.toLowerCase()}
                  error={errors.phone}
                  value={values.phone}
                  onChange={this.onPhoneChange}
                  name="phone"
                />
              </Styled.FormGroup>
              <Styled.FormGroup className="inline">
                <label>
                  <FormattedMessage id="global.forms.labels.email" /> *
                </label>
                <Input
                  readOnly
                  error={errors.username}
                  value={values.username}
                  onChange={this.onInput}
                  name="username"
                />
              </Styled.FormGroup>
              <Styled.FormGroup className="inline">
                <label>
                  <FormattedMessage id="global.forms.labels.birthday" />
                </label>
                <Input
                  error={errors.birthDate}
                  value={values.birthDate}
                  onChange={this.onInput}
                  placeholder="DD-MM-YYYY"
                  mask="99-99-9999"
                  name="birthDate"
                />
              </Styled.FormGroup>
              <Styled.FormGroup className="inline">
                <label>
                  <FormattedMessage id="global.forms.labels.languages" />
                </label>
                <Select
                  clearable
                  multiple
                  values={values.languages}
                  options={LANGUAGE_SPEAK_OPTIONS}
                  onChange={(value) => this.onSelectChange(value, "languages")}
                />
              </Styled.FormGroup>
              <Styled.FormGroup className="inline">
                <label>
                  <FormattedMessage id="global.forms.labels.streaming" />
                </label>
                <Select
                  clearable
                  values={values.streaming}
                  options={this.streamOptions}
                  onChange={(value) => this.onSelectChange(value, "streaming")}
                />
              </Styled.FormGroup>
              <Styled.FormGroup className="inline">
                <label>Devices</label>
                <Select
                  clearable
                  multiple
                  values={values.devices}
                  options={this.props.devicesList || []}
                  onChange={(value) => this.onSelectChange(value, "devices")}
                />
              </Styled.FormGroup>
              <Styled.FormGroup>
                <Input
                  readOnly
                  value={this.getPassportAddress(values.url)}
                  onChange={this.onInput}
                  name="passportAddress"
                />
              </Styled.FormGroup>
            </Styled.InnerBox>
          </Styled.Col>
          <Styled.Col className="full-width">
            <SectionTitle>
              <FormattedMessage id="settings.about" />
            </SectionTitle>
            <Styled.InnerBox className="no-margin">
              <TextArea
                value={values.about}
                onChange={this.onInput}
                name="about"
              />
            </Styled.InnerBox>
          </Styled.Col>
        </Styled.Row>
        <ButtonRow direction="right">
          <Button
            action={() => this.saveChanges(null)}
            label={<FormattedMessage id="global.buttons.save" />}
          />
        </ButtonRow>
      </>
    );
  }

  // renderSettings() {
  //   const { referrals } = this.state;
  //   const { userData } = this.props;
  //   const interfaceLang =
  //     Object.keys(translations).indexOf(
  //       this.props.interfaceLang ? this.props.interfaceLang.toLowerCase() : "en"
  //     ) === -1
  //       ? "en"
  //       : userData.language.toLowerCase();
  //   const selectedLang = [
  //     INTERFACE_LANGUAGES_OPTIONS.find(
  //       (item) => item.value === (interfaceLang && interfaceLang.toLowerCase())
  //     ) || { label: "", value: "" },
  //   ];

  //   return (
  //     <Styled.Row className="tiny">
  //       <Styled.Col className="tiny">
  //         <InnerBox fullHeight>
  //           <SectionTitle>
  //             <FormattedMessage id="settings.myReferral.link" />
  //           </SectionTitle>
  //           <Styled.PassportHelper>
  //             <FormattedMessage id="settings.myReferrals.description" />
  //           </Styled.PassportHelper>
  //           <Styled.PassportHelper className="link">
  //             <div>{this.getReferralLink(userData.passport)}</div>
  //           </Styled.PassportHelper>
  //         </InnerBox>
  //       </Styled.Col>
  //       <Styled.Col className="tiny">
  //         <InnerBox fullHeight>
  //           <SectionTitle>
  //             <FormattedMessage id="settings.myReferrals" />
  //           </SectionTitle>
  //           <Styled.PassportHelper>
  //             <FormattedMessage id="settings.myReferrals.total" />:{" "}
  //             {referrals.total}
  //           </Styled.PassportHelper>
  //           <Styled.PassportHelper>
  //             <FormattedMessage id="settings.myReferrals.steamConnected" />:{" "}
  //             {referrals.steam}
  //           </Styled.PassportHelper>
  //         </InnerBox>
  //       </Styled.Col>
  //       <Styled.Col className="full-width tiny">
  //         <InnerBox>
  //           <SectionTitle>
  //             <FormattedMessage id="settings.interface" />
  //           </SectionTitle>
  //           <Styled.FormGroup>
  //             <Select
  //               values={selectedLang}
  //               options={INTERFACE_LANGUAGES_OPTIONS}
  //               onChange={this.onLanguageChange}
  //             />
  //           </Styled.FormGroup>
  //         </InnerBox>
  //       </Styled.Col>
  //     </Styled.Row>
  //   );
  // }

  // renderAddress() {
  //   const { values } = this.state;

  //   return (
  //     <>
  //       <SectionTitle>
  //         <FormattedMessage id="settings.advancedRating" />
  //       </SectionTitle>
  //       <Styled.Description>
  //         <FormattedMessage id="settings.advancedRatingDescription" />
  //       </Styled.Description>
  //       <Styled.Row>
  //         <Styled.Col>
  //           <Styled.InnerBox>
  //             <Styled.FormGroup>
  //               <Input
  //                 readOnly
  //                 label={<FormattedMessage id="global.forms.labels.address" />}
  //                 value={`${values.street}${
  //                   values.house ? ", " + values.house : ""
  //                 }`}
  //                 onClick={this.openLocationModal}
  //               />
  //             </Styled.FormGroup>
  //           </Styled.InnerBox>
  //           <Styled.FormGroup>
  //             <Input
  //               readOnly
  //               label={<FormattedMessage id="global.forms.labels.city" />}
  //               value={values.city}
  //               onClick={this.openLocationModal}
  //             />
  //           </Styled.FormGroup>
  //         </Styled.Col>
  //         <Styled.Col>
  //           <Styled.FormGroup>
  //             <Input
  //               readOnly
  //               label={<FormattedMessage id="global.forms.labels.region" />}
  //               value={values.region}
  //               onClick={this.openLocationModal}
  //             />
  //           </Styled.FormGroup>
  //           <Styled.FormGroup>
  //             <Input
  //               readOnly
  //               label={<FormattedMessage id="global.forms.labels.country" />}
  //               value={this.getCountryFullName(values.country)}
  //               onClick={this.openLocationModal}
  //             />
  //           </Styled.FormGroup>
  //         </Styled.Col>
  //       </Styled.Row>
  //       <ButtonRow direction="right">
  //         <Button
  //           action={this.saveAddress}
  //           label={<FormattedMessage id="global.buttons.save" />}
  //         />
  //       </ButtonRow>
  //     </>
  //   );
  // }

  render() {
    const { dataLoaded, locationModalState } = this.state;

    return (
      <>
        <ContentBox>
          {dataLoaded ? this.renderForm() : this.renderLoader()}
        </ContentBox>
        {/* {dataLoaded && <ContentBox>{this.renderAddress()}</ContentBox>} */}
        {/* {dataLoaded && <ContentBox>{this.renderSettings()}</ContentBox>} */}
        {/* <Modal
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
                </Modal> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    countriesList: state.countriesList,
    devicesList: state.devicesList,
    userData: state.userData,
    interfaceLang: state.interfaceLang,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserData: () => dispatch(getUserData()),
    setInterfaceLang: (lang) => dispatch(setInterfaceLang(lang)),
  };
};

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(PersonalInfo)
);

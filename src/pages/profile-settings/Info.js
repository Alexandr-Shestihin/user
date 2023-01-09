import React, { useState, useEffect, Component } from "react";
import styled, { css } from "styled-components";
import store from "../../redux/store";
import {
  getUserData,
  setInterfaceLang,
  showQrModal,
} from "../../redux/actions";
import { API, API_ROUTER } from "../../api";
import { toast } from "react-toastify";

//
import TitleRow from "../../components/title-row";
import InfoInput from "../../components/info-input";
//
import { connect } from "react-redux";
import { LinearProgress } from "@material-ui/core";
import { FormattedMessage, injectIntl } from "react-intl";
import { Input, PhoneNumber, Select, Button } from "../../components/UI";
import {
  isFieldEmpty,
  numbersOnly,
  getValueFromSelect,
  setValueToSelect,
  getLabelFromSelect,
  getArrayFromSelect,
  setArrayToSelect,
  dataUriToBlob,
  isSelectEmpty,
  isFieldEmptyAndLength,
} from "../../helpers";
import { LANGUAGE_SPEAK_OPTIONS } from "../../config";
import { translations } from "../../i18n";
import UploadAvatar from "../../components/upload-avatar";
import userData from "../../redux/reducers/particles/userData";

import {
  handleLoadAvatar,
  isDateValid,
  reverseDate,
  getDate,
} from "../team-settings/const";
//
class PersonalInfo extends Component {
  fileRef = React.createRef();

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
      // phone: "",
      dateOfBirth: "",
      username: "",
      citizenship: "",
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

  get socialLinkOptions() {
    const { intl } = this.props;

    return [
      {
        label: intl.formatMessage({ id: "social.facebook" }),
        value: "facebook",
      },
      {
        label: intl.formatMessage({ id: "social.instagram" }),
        value: "instagram",
      },
      {
        label: intl.formatMessage({ id: "social.twitter" }),
        value: "twitter",
      },
    ];
  }

  static getDerivedStateFromProps(props, state) {
    const { userData, devicesList } = props;
    const { dataLoaded } = state;
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
      // state.values.psnId = userData.psnId || "";
      state.values.firstName = userData.firstName || "";
      // state.values.email = userData.email || "";
      state.values.lastName = userData.lastName || "";
      state.values.nickname = userData.nickname || "";
      // state.values.phone = userData.phone || "";
      state.values.dateOfBirth =
        (userData.dateOfBirth && reverseDate(userData.dateOfBirth)) || "";
      state.values.gender = setValueToSelect(userData.gender) || "";
      // state.values.username = userData.username || "";
      /* TODO change */

      // state.values.languages =
      //   Object.keys(translations).indexOf(
      //     userData.languages ? userData.languages.toLowerCase() : "en"
      //   ) === -1
      //     ? "en"
      //     : userData.languages.toLowerCase();
      // state.values.languages = setArrayToSelect(
      //   userData.languages.map((item) => item.toLowerCase()),
      //   LANGUAGE_SPEAK_OPTIONS
      // );
      // state.values.devices = setArrayToSelect(
      //   userData.devices.map((item) => item.uuid),
      //   devicesList
      // );
      state.values.citizenship = setValueToSelect(userData.citizenship);
      // state.values.nationality = setValueToSelect(userData.nationality);
      // state.values.country = userData.country || "";
      // state.values.region = userData.region || "";
      // state.values.city = userData.city || "";
      // state.values.street = userData.street || "";
      // state.values.zipCode = userData.zipCode || "";
      // state.values.house = userData.house || "";
      state.values.about = userData.about || "";
      state.values.facebookLink = userData.sites[0].url || "";

      // state.values.facebookLink = userData.facebookLink || "";
      // state.values.url = userData.url || "";
      // state.values.geo = "";
      // state.values.passport = userData.passport || "";
      // state.values.streaming = streamer ? [streamer] : [];

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

  // componentDidMount() {
  //   API.request({ ...API_ROUTER.user.getUserReferrals }, true)
  //     .then(({ total, steam }) =>
  //       this.setState({
  //         referrals: {
  //           total,
  //           steam,
  //         },
  //       })
  //     )
  //     .catch((err) => console.error(err));
  // }

  setImage = (file) => {
    this.setState({ image: file });
  };

  changeImg = (e) => {
    e = e.target.files[0];
    this.setState({ bannerImage: URL.createObjectURL(e) });
  };

  onImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleLoadAvatar(file, this.setImage);
    }
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

  // onPhoneChange = (phone) => {
  //   const { values } = this.state;
  //   values.phone = numbersOnly(phone);

  //   this.setState({ values });
  // };

  onSelectChange = (value, selectName) => {
    const { values } = this.state;
    values[selectName] = value;

    this.setState({ values });
  };
  saveChanges = () => {
    const { values, errors } = this.state;
    const { history } = this.props;
    const interfaceLang =
      Object.keys(translations).indexOf(
        this.props.interfaceLang ? this.props.interfaceLang.toLowerCase() : "en"
      ) === -1
        ? "en"
        : this.props.interfaceLang;
    console.log(values);
    // validate
    errors.firstName = isFieldEmpty(values.firstName);
    errors.lastName = isFieldEmpty(values.lastName);
    errors.nickname = isFieldEmpty(values.nickname);
    errors.nickname = isFieldEmptyAndLength(values.nickname);
    errors.citizenship = isSelectEmpty(values.citizenship);
    errors.gender = isSelectEmpty(values.gender);
    errors.facebookLink = isFieldEmpty(values.facebookLink);

    // errors.username = isFieldEmpty(values.username);
    // errors.url = isFieldEmpty(values.url);
    errors.dateOfBirth = isDateValid(values.dateOfBirth, true);
    this.setState({ values });

    if (!Object.values(errors).some((value) => value.length)) {
      let bod = null;
      if (values.dateOfBirth) {
        bod = new Date(reverseDate(values.dateOfBirth));
        bod = bod.toISOString().split("T")[0];
      }
      // API.request({
      //   ...API_ROUTER.user.changeUserNickname,
      //   data: {},
      // })
      //   .then((data) => {})
      //   .catch((err) => {
      //     toast.error(err.data && err.data.message);
      //   });

      const params = {
        ...API_ROUTER.user.setUserData,
        data: {
          // psnId: values.psnId,
          languages: ["RU"],
          firstName: values.firstName,
          lastName: values.lastName,
          nickname: values.nickname,
          // email: values.email,
          // phone: values.phone,
          dateOfBirth: bod,
          gender: values.gender[0].value.toLowerCase(),
          // language: setLang || interfaceLang,
          // languages: getArrayFromSelect(values.languages),
          // devices: getArrayFromSelect(values.devices),
          // username: values.username,
          citizenship: values.citizenship[0].value,
          // nationality: getLabelFromSelect(values.nationality),
          // country: values.country,
          // region: values.region,
          // city: values.city,
          // street: values.street,
          // house: values.house,
          // zipCode: values.zipCode,
          // url: values.url,
          about: values.about,

          // facebookLink: values.facebookLink,
          // lat: values.lat,
          // lng: values.lng,
          // streaming: getValueFromSelect(values.streaming),

          phone: "+7 900 505 55 55",
          sites: [
            {
              site: "facebook",
              url: values.facebookLink,
            },
          ],
        },
      };

      API.request(params, true)
        .then((resp) => {
          console.log(resp);
          // if (!this.state.image) {
          //   return;
          // }
          if (this.state.image) {
            const blob = dataUriToBlob(this.state.image);
            const formData = new FormData();
            formData.append("media", blob);
            formData.append("mediaType", "userAvatar");
            formData.append("mediaOwnerId", resp.id);

            return API.request(
              {
                ...API_ROUTER.media.create,
                headers: {
                  "Content-type": "multipart/form-data",
                },
                data: formData,
              },
              true
            );
          }
        })
        .then(
          (res) =>
            // this.props.history.push(`/id/${this.props.userData?.url}`)
            (window.location.href = `/id/${this.props.userData?.id}`)
        )
        .catch((err) => toast.error(err.data && err.data.message));
      // this.props.history.push(`/id/${this.props.userData?.url}`);
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  renderLoader = () => <LinearProgress />;
  renderForm() {
    const { values, errors } = this.state;
    const { countriesList } = this.props;
    console.log(this.state);

    return (
      <StyledInfo img={this.state.bannerImage}>
        <header>
          <section></section>
          <section>
            <div>
              <div>
                <i
                  className="icon icon-pencil"
                  style={{ width: "12px", height: "12px" }}
                />
              </div>
              <input
                className="banner-input"
                type="file"
                ref={this.fileRef}
                accept="image/*"
                multiple={false}
                onChange={this.changeImg}
              />
              <p onClick={() => this.fileRef.current.click()}>EDIT BANNER</p>
            </div>
            <div>
              <UploadAvatar
                user={values}
                image={this.props.userData?.avatar}
                conditionRendering={(node) => node}
                onImageSelect={this.onImageSelect}
              />
            </div>
            <div onClick={this.props.dispatchShowQrModal}>
              {/* <i
                className="icon icon-qr"
                style={{
                  background: "#9a9ca6",
                  width: "38px",
                  height: "38px",
                }}
              /> */}
              <p style={{ color: "gold" }}>Classification:</p>
              <p style={{ color: "gold" }}>Professional</p>
            </div>
          </section>
          <section>
            {this.state.isEditName && (
              <div>
                <InfoInput
                  error={errors.nickname}
                  onChange={this.onInput}
                  value={values.nickname}
                  name="nickname"
                  icon="pencil"
                  required
                />
              </div>
            )}
            {!this.state.isEditName && (
              <div>
                <p>
                  {values.nickname} <span>*</span>
                </p>
                <i
                  className="icon icon-pencil"
                  style={{ width: "12px", height: "12px" }}
                  onClick={() => {
                    this.setState({ isEditName: true });
                  }}
                />
              </div>
            )}
            <p className="under-construction">0 Followers [COMING SOON]</p>
          </section>
        </header>
        <main>
          <section>
            <TitleRow
              title="NAME"
              required
              color="white"
              padding="9px 38px 7px"
              boxshadow
            />
            <InfoInput
              error={errors.firstName}
              value={values.firstName}
              onChange={this.onInput}
              name="firstName"
              icon="pencil"
              placeholder="First Name"
              borderBottom
              required
            />
            <InfoInput
              error={errors.lastName}
              value={values.lastName}
              onChange={this.onInput}
              name="lastName"
              icon="pencil"
              placeholder="Last Name"
              required
            />
          </section>
          {/* TODO change */}
          {/* <section>
            <TitleRow
              title="Phone"
              color="white"
              padding="9px 38px 7px"
              boxshadow
            />
            <PhoneNumber
              country={values.country.toLowerCase()}
              error={errors.phone}
              value={values.phone}
              onChange={this.onPhoneChange}
              name="phone"
              icon="pencil"
              placeholder="+221"
            />
          </section> */}
          {/* <section>
            <TitleRow
              title="Email"
              color="white"
              padding="9px 38px 7px"
              boxshadow
              required
            />
            <InfoInput
              error={errors.email}
              value={values.email}
              onChange={this.onInput}
              type="email"
              icon="email"
              placeholder="your@mail"
              required
            />
          </section> */}
          <section>
            <TitleRow
              title="dateOfBirth"
              color="white"
              padding="9px 38px 7px"
              boxshadow
              required
            />
            <InfoInput
              error={errors.dateOfBirth}
              value={values.dateOfBirth}
              onChange={this.onInput}
              name="dateOfBirth"
              icon="pencil"
              placeholder="YYYY-MM-DD"
              required
            />
          </section>
          {/* TODO change */}
          {/* <section> 
            <TitleRow
              title="I SPEAK"
              color="white"
              padding="9px 60px 7px 38px"
              boxshadow
              // flags={getFlags()}
            />
            <Select
              clearable
              multiple
              values={values.languages}
              options={LANGUAGE_SPEAK_OPTIONS}
              onChange={(value) => this.onSelectChange(value, "languages")}
            />
          </section> */}
          <section>
            <TitleRow
              title="Gender"
              color="white"
              padding="9px 38px 7px"
              boxshadow
            />
            <Select
              clearable
              values={values.gender}
              options={this.genderOptions}
              onChange={(value) => this.onSelectChange(value, "gender")}
              type="text"
              icon="pencil"
              placeholder="Other"
              error={errors.gender}
            />
          </section>
          <section>
            <TitleRow
              title="Citizenship"
              color="white"
              padding="9px 60px 7px 38px"
              boxshadow
              // flags={[country]}
            />
            <Select
              clearable
              options={countriesList}
              values={values.citizenship}
              onChange={(value) => this.onSelectChange(value, "citizenship")}
              error={errors.citizenship}
            />
          </section>
          <section>
            <TitleRow
              title="ADD SOCIAL LINKS facebook"
              color="white"
              padding="9px 38px 7px"
              boxshadow
            />
            <InfoInput
              error={errors.facebookLink}
              value={values.facebookLink}
              onChange={this.onInput}
              name="facebookLink"
              type="text"
              icon="pencil"
              placeholder="link in format http://facebook.com"
            />
          </section>
          <section>
            <TitleRow
              title="About"
              color="white"
              padding="9px 38px 7px"
              boxshadow
            />

            <InfoInput
              value={values.about}
              onChange={this.onInput}
              name="about"
              type="text"
              icon="pencil"
              placeholder="Like to play"
              borderBottom
            />
          </section>
        </main>
        <footer>
          <Button
            label={<FormattedMessage id="profile.cancelButton" />}
            type="button"
            color="white"
            active
            size="md"
            variant="secondary"
            action={() =>
              this.props.history.push(`/id/${this.props.userData?.id}`)
            }
          />
          <Button
            label={<FormattedMessage id="profile.editButton" />}
            active
            color="yellow"
            size="md"
            action={() => this.saveChanges()}
          />
        </footer>
      </StyledInfo>
    );
  }
  render() {
    const { dataLoaded } = this.state;

    return <>{dataLoaded ? this.renderForm() : this.renderLoader()}</>;
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
    dispatchShowQrModal: () => dispatch(showQrModal()),
  };
};

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(PersonalInfo)
);

const StyledInfo = styled.div`
  & > header {
    padding: 25px 30px;
    background-color: #343435;

    ${({ img }) =>
      img &&
      css`
        background: url(${img}) no-repeat center;
        background-size: cover;
      `}

    & > section {
      &:first-of-type {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end;
        padding: 0 20px;

        & > div {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          position: relative;

          & > .red-circle {
            position: absolute;
            width: 5px;
            height: 5px;
            background-color: var(--red);
            border-radius: 50%;
            top: 1px;
            right: 0px;
          }
        }
      }

      &:nth-child(2) {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-around;

        & > div {
          &:first-of-type {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            cursor: pointer;

            & > p {
              font-size: 12px;
              font-weight: 300;
              font-style: normal;
              letter-spacing: normal;
              line-height: 17.99px;
              text-align: left;
              text-decoration: underline;
            }
          }
        }
      }

      &:last-of-type {
        width: max-content;
        margin: 20px auto 0;
        padding-left: 20px;

        & > div {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;

          & > p {
            font-size: 12px;
            font-weight: 400;
            font-style: normal;
            letter-spacing: normal;
            line-height: normal;
            text-align: center;
            text-transform: uppercase;
            margin-right: 5px;

            & > span {
              font-weight: 700;
              color: #ce8926;
            }
          }
        }

        & > p {
          color: #f6a020;
          font-size: 12px;
          font-weight: 400;
          font-style: normal;
          letter-spacing: normal;
          line-height: 17.99px;
          text-align: center;
          text-transform: uppercase;
        }
      }
    }
  }

  & > footer {
    padding: 20px 38px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: center;
    gap: 30px;
  }
`;

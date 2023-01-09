import React, { useState, Component, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
//
import {
  ContentBox,
  Container,
  SideBarRowLeft,
  ButtonRow,
  Button,
  Input,
  TextArea,
  Select,
  SocialLinkHolder,
  SocialLink,
} from "../../components/UI";
import NewUsers from "../../components/widgets-new-users";
// import { Styled } from "./style";
import { FormattedMessage, injectIntl } from "react-intl";
import { Box, Grid, LinearProgress } from "@material-ui/core";
import AvatarLoader from "../../components/avatar-loader";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { API, API_ROUTER } from "../../api";
import { dataUriToBlob, getValueFromSelect, isFieldEmpty } from "../../helpers";
import ErrorMessage from "../../components/UI/blocks/ErrorMessage";
import { toast } from "react-toastify";
import { TEAM_GAMES } from "../../config";
//
import AvatarUpload from "../../components/avatar-upload";
import UploadAvatar from "../../components/upload-avatar";

import TitleRow from "../../components/title-row";
import SelectCountry from "../../components/select-country";
import InfoInput from "../../components/info-input";
// import Button from "../../components/UI/buttons/buttons-login_register";
import { countries } from "../add-roster/static";
import SocialLinks from "../../components/social-links";

import {
  socials,
  socialState,
  initialErrors,
  initialFormFields,
  handleLoadAvatar,
  isDateValid,
  reverseDate,
  getDate,
} from "./const";
import { Styled } from "../teams/team/style";

const Settings = (props) => {
  const { history, match, userData, countriesList = [] } = props;

  const fileRef = useRef();

  const [errors, setErrors] = useState(initialErrors);
  const [formFields, setFormFields] = useState({});
  const [team, setTeam] = useState(null);
  const [loadedImg, setLoadedImg] = useState(null);
  const [gameOptions, setGameOptions] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [editMode, setEditMode] = useState(!!match.params.teamId);
  const [isEditName, setIsEditName] = useState(false);
  useEffect(() => {
    // get team info on edit
    if (editMode) {
      getData();
    }
  }, []);

  useEffect(() => {
    if (team) setEditState();
  }, [team]);

  function getData() {
    const { teamId } = match.params;
    if (!teamId) {
      setFormFields({ ...formFields, error: true });
      return;
    }

    API.request(
      {
        ...API_ROUTER.teams.getTeamDetails,
        pathKeys: {
          teamId: teamId,
        },
      },
      true
    )
      .then((data) => {
        setTeam(data);
      })
      .catch((err) => {
        console.error(err);
        setFormFields({ ...formFields, error: true });
      });
  }

  function getCountry(code) {
    return countriesList.find((item) => item?.value === code);
  }

  function selectHandler(value, selectName) {
    setFormFields({ ...formFields, [selectName]: value });
  }

  function inputHandler(e) {
    const { name, value } = e.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  }

  function onImageCrop(base64) {
    setFormFields({
      ...formFields,
      image: base64,
    });
  }

  function onImageSelect(event) {
    const file = event.target.files[0];
    if (file) {
      handleLoadAvatar(file, setLoadedImg);
    }
  }

  function setEditState() {
    const { links } = team;
    const socialStateNew = [];

    // links.forEach((link) => {
    //   const selected = socials.find((item) => item?.value === link?.type);
    //   const newOptions = [];
    //
    //   socials.forEach((item) => {
    //     let shouldAdd = true;
    //     socialStateNew.forEach((socItem) => {
    //       let selectedOptionObj;
    //       const { selectedOption } = socItem;
    //
    //       if(selectedOption) [ selectedOptionObj ] = selectedOption;
    //
    //       if (selectedOptionObj.value === item.value) {
    //         shouldAdd = false;
    //       }
    //     });
    //
    //     if (shouldAdd) {
    //       newOptions.push(item);
    //     }
    //   });
    //
    //   socialStateNew.push({
    //     options: newOptions,
    //     selectedOption: [selected],
    //     url: link.url,
    //     error: "",
    //   });
    // });

    // if (!socialStateNew.length) {
    //   socialStateNew.push(socialStateNew[0]);
    // }

    setFormFields({
      ...team,
      image: team.image?.url || "",
      founded: getDate(team.founded),
      country: team.country ? [getCountry(team.country)] : [],
      game: [formFields?.gameOptions?.find((item) => item.value === team.game)],
      // socialState: socialStateNew,
    });
  }

  function onSubmit(e) {
    e.preventDefault();

    const endpoint = editMode
      ? API_ROUTER.teams.updateTeam
      : API_ROUTER.teams.createTeam;

    if (editMode) {
      endpoint.pathKeys = {
        team: team.id,
      };
    }

    const socialData = [];
    let socError = false;

    // validate
    const newErrors = initialErrors;
    newErrors.name = isFieldEmpty(formFields.name);
    if (editMode) {
      // newErrors.game = formFields.game.length ? "" : "This field is required";
      newErrors.email = isFieldEmpty(formFields.email);
      newErrors.tag = isFieldEmpty(formFields.tag);
      newErrors.description = isFieldEmpty(formFields.description);
      newErrors.country = formFields.country.length
        ? ""
        : "This field is required";
      newErrors.founded = isDateValid(formFields.founded);
      // newErrors.social = socError ? "error" : "";
    }

    // socialValidator();

    setErrors({ ...errors, ...newErrors });

    console.log("newErrors", newErrors);

    let TEAM_URL;

    if (!Object.values(newErrors).some((value) => value.length)) {
      const data = {
        name: formFields.name,
        description: formFields.description || "The recruitment is open",
        links: formFields.links,
        founded: formFields.founded
          ? reverseDate(formFields.founded)
          : new Date(),
        email: formFields.email,
        tag: formFields.tag,
        country: getValueFromSelect(formFields.country || ""),
      };

      API.request({ ...endpoint, data }, true)
        .then((resp) => {
          console.log("resp", resp);
          TEAM_URL = resp.id;

          if (!loadedImg) {
            return;
          }

          const blob = dataUriToBlob(loadedImg);
          const formData = new FormData();
          formData.append("media", blob);
          formData.append("mediaType", "teamLogo");
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
        })
        .then((resp) => history.push(`/teams/team/${TEAM_URL}`))
        .catch((err) => toast.error(err.data && err.data.message));
    }
  }

  function addMore() {
    const updateState = [...formFields.socialState];
    const newOptions = [];

    socials.forEach((item) => {
      let shouldAdd = true;
      updateState.forEach((socItem) => {
        const { selectedOption } = socItem;
        const [selectedOptionObj] = selectedOption;

        if (selectedOptionObj.value === item.value) {
          shouldAdd = false;
        }
      });

      if (shouldAdd) {
        newOptions.push(item);
      }
    });

    updateState.push({
      error: "",
      url: "",
      options: newOptions,
      selectedOption: [newOptions[0]],
    });

    setFormFields({ ...formFields, socialState: updateState });
  }

  function socialTypeHandler(value, index) {
    const updateState = [...formFields.socialState];

    updateState.forEach((item, innerIndex) => {
      if (index === innerIndex) {
        item.url = "";
        item.error = "";
        item.selectedOption = value;
      }
    });

    setFormFields({ ...formFields, socialState: updateState });
  }

  function socialUrlHandler(e, index) {
    const { value } = e.target;
    const updateState = [...formFields.socialState];

    updateState.forEach((item, innerIndex) => {
      if (index === innerIndex) {
        item.url = value;
      }
    });

    setFormFields({ ...formFields, socialState: updateState });
  }

  function socialValidator() {
    const updateState = [...formFields.socialState];

    updateState.forEach((item) => {
      const [selectedOption] = item.selectedOption;

      if (
        selectedOption.value !== "whatsapp" &&
        selectedOption.value !== "teamspeak"
      ) {
        if (item.url && !item.url.includes("https://")) {
          item.error = "Link not valid...";
        } else {
          item.error = "";
        }
      } else {
        item.error = "";
      }
    });

    setFormFields({ ...formFields, socialState: updateState });
  }

  function changeImg(e) {
    e = e.target.files[0];
    setBannerImage(URL.createObjectURL(e));
  }
  function renderForm() {
    return (
      <StyledSettings img={bannerImage}>
        <header>
          <section></section>
          <section>
            <div>
              {/* <div>
                <i
                  className="icon icon-pencil"
                  style={{ width: "12px", height: "12px" }}
                />
              </div>
              <input
                className="banner-input"
                type="file"
                ref={fileRef}
                accept="image/*"
                multiple={false}
                onChange={changeImg}
              />
              <p onClick={() => fileRef.current.click()}>EDIT BANNER</p> */}
            </div>
            <div>
              <UploadAvatar
                user={team}
                conditionRendering={(node) => node}
                onImageSelect={onImageSelect}
              />
            </div>
            <div>
              {/* <i
                className="icon icon-qr"
                style={{
                  background: "#9a9ca6",
                  width: "38px",
                  height: "38px",
                }}
              /> */}
            </div>
          </section>
          {editMode ? (
            <section>
              {isEditName && (
                <div>
                  <InfoInput
                    onChange={inputHandler}
                    error={errors.name}
                    value={formFields.name}
                    icon="pencil"
                    name="name"
                    type="name"
                    required
                  />
                </div>
              )}
              {!isEditName && (
                <div>
                  <p>
                    {team.name} <span>*</span>
                  </p>
                  <i
                    className="icon icon-pencil"
                    style={{ width: "12px", height: "12px" }}
                    onClick={() => {
                      setIsEditName(true);
                    }}
                  />
                </div>
              )}
              <p className="under-construction">0 Followers [COMING SOON]</p>
            </section>
          ) : (
            <section>
              <div style={{ paddingLeft: "10px" }}>
                <InfoInput
                  placeholder="Enter name of the team here"
                  onChange={inputHandler}
                  error={errors.name}
                  value={formFields.name}
                  icon="pencil"
                  name="name"
                  type="name"
                  required
                />
              </div>
            </section>
          )}
        </header>
        <main>
          <form onSubmit={(e) => onSubmit(e)}>
            <section>
              <TitleRow // TODO wait back
                title="SELECT THE COUNTRY *"
                required={editMode}
                color="white"
                boxshadow
                padding="9px 60px 7px 38px"
              />

              <Select
                clearable
                error={errors.country}
                values={formFields.country}
                value={formFields.country}
                options={countriesList || []}
                onChange={(value) => selectHandler(value, "country")}
                padding
                required={editMode}
              />
            </section>
            <section>
              <TitleRow // TODO wait back
                title="CONTACT E-MAIL"
                color="white"
                padding="9px 38px 7px"
                boxshadow
                required={editMode}
              />
              <InfoInput
                // onChange={inputHandler}
                // error={errors.email}
                // value={formFields.email}
                name="email"
                type="email"
                // icon="email"
                icon="password"
                placeholder="Enter your e-mail"
                required={editMode}
              />
            </section>
            <section>
              <TitleRow // TODO wait back
                title="TEAM TAG"
                color="white"
                padding="9px 38px 7px"
                boxshadow
                required={editMode}
              />
              <InfoInput
                // value={formFields.tag}
                // error={errors.tag}
                // onChange={inputHandler}
                // name="tag"
                // icon="pencil"
                icon="password"
                placeholder="Enter team tag"
                required={editMode}
              />
            </section>
            <section>
              <TitleRow // TODO wait back
                title="DESCRIPTION"
                color="white"
                padding="9px 38px 7px"
                boxshadow
                required={editMode}
              />
              <InfoInput
                // value={formFields.description}
                // error={errors.description}
                // onChange={inputHandler}
                // name="description"
                // icon="pencil"
                icon="password"
                placeholder="about"
                textarea
                required={editMode}
              />
            </section>
            <section>
              <TitleRow // TODO wait back
                // title="FOUNDED"
                title=" "
                color="white"
                padding="9px 38px 7px"
                boxshadow
              />
              {/* <Input
                error={errors.founded}
                value={formFields.founded}  
                onChange={inputHandler}
                icon="pencil"
                placeholder="12-12-2000"
                birthdate
                mask="99-99-9999"
                name="founded"
                required={editMode}
              /> */}
            </section>
            {/*<section>*/}
            {/*  <TitleRow*/}
            {/*      title="ADD SOCIAL LINKS"*/}
            {/*      color="white"*/}
            {/*      padding="9px 38px 7px"*/}
            {/*      boxshadow*/}
            {/*  />*/}
            {/*  <SocialLinks setter={setFormFields} info={formFields}/>*/}
            {/*</section>*/}
          </form>
        </main>
        <footer>
          <Button
            label={<FormattedMessage id="teams.createCloseButton" />}
            action={() => history.push(`/teams/team/${team.uuid}`)}
            type="button"
            color="white"
            active
            size="md"
            variant="secondary"
          />
          <Button
            action={(e) => onSubmit(e)}
            type="button"
            color="yellow"
            active
            size="md"
            label={
              <FormattedMessage
                id={`teams.${
                  editMode ? "editTeamButton" : "createNewTeamButton"
                }`}
              />
            }
          />
        </footer>
      </StyledSettings>
    );
  }

  if (editMode && !team) {
    return (
      <Container>
        <ContentBox>
          <LinearProgress />
        </ContentBox>
      </Container>
    );
  }

  if (formFields.error) {
    return (
      <Container>
        <ContentBox>
          <FormattedMessage id="teams.team.notFound" />
        </ContentBox>
      </Container>
    );
  }

  return <div>{renderForm()}</div>;
};

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    countriesList: state.countriesList,
  };
};

export default withRouter(connect(mapStateToProps)(injectIntl(Settings)));

const StyledSettings = styled.div`
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
              font-size: 8px;
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
          font-size: 8px;
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

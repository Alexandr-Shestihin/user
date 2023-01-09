import React, { Component } from "react";
import {
  ContentBox,
  Container,
  SideBarRowLeft,
  ButtonRow,
  Button,
  Input,
  TextArea,
  Select,
} from "../../../components/UI";
import NewUsers from "../../../components/widgets-new-users";
import { Styled } from "./style";
import { FormattedMessage, injectIntl } from "react-intl";
import { Box, Grid, LinearProgress } from "@material-ui/core";
import AvatarLoader from "../../../components/avatar-loader";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { API, API_ROUTER } from "../../../api";
import {
  dataUriToBlob,
  getValueFromSelect,
  isFieldEmpty,
} from "../../../helpers";
import ErrorMessage from "../../../components/UI/blocks/ErrorMessage";
import { toast } from "react-toastify";
import { TEAM_GAMES } from "../../../config";

class CreateTeam extends Component {
  profilePictureInput = React.createRef();

  state = this.initialState;

  get social() {
    return [
      {
        label: "Facebook",
        value: "facebook",
      },
      {
        label: "Instagram",
        value: "instagram",
      },
      {
        label: "Twitch",
        value: "twitch",
      },
      {
        label: "Youtube",
        value: "youtube",
      },
      {
        label: "Reddit",
        value: "reddit",
      },
      {
        label: "VK",
        value: "vk",
      },
      {
        label: "Twitter",
        value: "twitter",
      },
      {
        label: "Discord",
        value: "discord",
      },
      {
        label: "Whatsapp",
        value: "whatsapp",
      },
      {
        label: "Teamspeak",
        value: "teamspeak",
      },
    ];
  }

  get socialState() {
    let initial = [];

    initial.push({
      options: this.social,
      selectedOption: [this.social[0]],
      url: "",
      error: "",
    });

    return initial;
  }

  get initialState() {
    return {
      pictureMode: false,
      gameOptions: [],
      name: "",
      founded: "",
      description: "",
      game: [],
      country: [],
      image: "",
      socialState: this.socialState,
      errors: this.initialErrors,
      team: null,
      error: false,
    };
  }

  get initialErrors() {
    return {
      name: "",
      description: "",
      founded: "",
      game: "",
      image: "",
      country: "",
    };
  }

  componentDidMount() {
    const { editMode } = this.props;

    // get available teams
    API.request({ ...API_ROUTER.games.getAvailable }, true)
      .then(({ games }) => {
        this.setState({
          gameOptions: TEAM_GAMES.map((item) => ({
            label: games[item],
            value: item,
          })),
        });
      })
      .catch((err) => console.error(err));

    // get team info on edit
    if (editMode) {
      this.getData();
    }
  }

  setEditState = (team) => {
    const { gameOptions } = this.state;
    const { countriesList } = this.props;

    if (!countriesList || !gameOptions.length) {
      return setTimeout(() => {
        this.setEditState(team);
      }, 100);
    }

    const { links } = team;
    const socialState = [];

    links.forEach((link) => {
      const selected = this.social.find((item) => item.value === link.type);
      const newOptions = [];

      this.social.forEach((item) => {
        let shouldAdd = true;
        socialState.forEach((socItem) => {
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

      socialState.push({
        options: newOptions,
        selectedOption: [selected],
        url: link.url,
        error: "",
      });
    });

    if (!socialState.length) {
      socialState.push(this.socialState[0]);
    }

    this.setState({
      team,
      name: team.name,
      description: team.description,
      image: team.image?.url || "",
      founded: this.getDate(team.founded),
      country: [this.getCountry(team.country)],
      game: [gameOptions.find((item) => item.value === team.game)],
      socialState,
    });
  };

  getData = () => {
    const { team } = this.props.match.params;

    if (!team) {
      this.setState({ error: true });
      return;
    }

    API.request(
      {
        ...API_ROUTER.teams.getTeamDetails,
        pathKeys: {
          teamId: team,
        },
      },
      true
    )
      .then((team) => this.setEditState(team))
      .catch((err) => {
        console.error(err);
        this.setState({ error: true });
      });
  };

  selectHandler = (value, selectName) => {
    this.setState({ [selectName]: value });
  };

  inputHandler = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  onImageCrop = (base64) => {
    this.setState({
      image: base64,
      pictureMode: false,
    });
  };

  onImageSelect = (event) => {
    const file = event.target.files[0];

    if (file) {
      this.handleLoadAvatar(file);
      this.setState({ pictureMode: true });
      this.profilePictureInput.current.value = null;
    }
  };

  handleLoadAvatar = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement("img");
      img.onload = () => {
        const canvas = document.createElement("canvas");
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
        this.setState({ image: dataUrl });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  isDateValid = (date) => {
    const isDateCorrect = (d) => !isNaN(d.getTime()),
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
    const dateToCheck = new Date(this.reverseDate(date));

    if (!isDateCorrect(dateToCheck)) {
      return "Date is invalid";
    }

    // date in past?
    if (!isDateInPast(dateToCheck)) {
      return "Should be in past";
    }

    return "";
  };

  reverseDate = (date) => date.split("-").reverse().join("-");

  getDate(inputDate) {
    const date = inputDate ? new Date(inputDate) : new Date();
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();

    return `${d < 10 ? `0${d}` : d}-${m < 10 ? `0${m}` : m}-${y}`;
  }

  getCountry(code) {
    const { countriesList } = this.props;
    return countriesList.find((item) => item.value === code);
  }

  onSubmit(e) {
    e.preventDefault();

    const {
      name,
      team,
      description,
      game,
      country,
      image,
      founded,
      socialState,
    } = this.state;
    const { history, editMode } = this.props;
    const endpoint = editMode
      ? API_ROUTER.teams.updateTeam
      : API_ROUTER.teams.createTeam;

    if (editMode) {
      endpoint.pathKeys = {
        team: team.uuid,
      };
    }

    const socialData = [];
    let socError = false;

    socialState.forEach((item) => {
      const selectedOption = item.selectedOption[0];
      if (item.url) {
        if (
          !item.url.includes("https://") &&
          selectedOption.value !== "whatsapp" &&
          selectedOption.value !== "teamspeak"
        ) {
          socError = true;
        }

        socialData.push({
          type: selectedOption.value,
          url: item.url,
        });
      }
    });

    // validate
    const errors = this.initialErrors;
    errors.name = isFieldEmpty(name);
    errors.country = country.length ? "" : "This field is required";
    errors.founded = founded ? this.isDateValid(founded) : null;
    errors.social = socError ? "error" : "";

    if (!editMode) {
      errors.game = game.length ? "" : "This field is required";
    }

    this.socialValidator();

    this.setState({ errors });

    let TEAM_URL;

    if (Object.values(errors).every((item) => !item)) {
      const data = {
        name,
        description: description || "The recruitment is open",
        links: socialData,
        founded: founded ? this.reverseDate(founded) : new Date(),
        game: getValueFromSelect(game),
        country: getValueFromSelect(country),
      };

      API.request({ ...endpoint, data }, true)
        .then(({ item }) => {
          TEAM_URL = item.url;

          if (!image || image.includes("https://passport")) {
            return;
          }

          const blob = dataUriToBlob(image);
          const formData = new FormData();
          formData.append("file", blob);

          return API.request(
            {
              ...API_ROUTER.teams.addTeamImage,
              pathKeys: {
                teamUuid: item.uuid,
              },
              data: formData,
            },
            true
          );
        })
        .then(() => history.push(`/teams/team/${TEAM_URL}`))
        .catch((err) => toast.error(err.data && err.data.message));
    }
  }

  addMore = () => {
    const { socialState } = this.state;
    const updateState = [...socialState];
    const newOptions = [];

    this.social.forEach((item) => {
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

    this.setState({ socialState: updateState });
  };

  socialTypeHandler = (value, index) => {
    const { socialState } = this.state;
    const updateState = [...socialState];

    updateState.forEach((item, innerIndex) => {
      if (index === innerIndex) {
        item.url = "";
        item.error = "";
        item.selectedOption = value;
      }
    });

    this.setState({ socialState: updateState });
  };

  socialUrlHandler = (e, index) => {
    const { value } = e.target;
    const { socialState } = this.state;
    const updateState = [...socialState];

    updateState.forEach((item, innerIndex) => {
      if (index === innerIndex) {
        item.url = value;
      }
    });

    this.setState({ socialState: updateState });
  };

  socialValidator = () => {
    const { socialState } = this.state;
    const updateState = [...socialState];

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

    this.setState({ socialState: updateState });
  };

  renderForm() {
    const {
      team,
      pictureMode,
      image,
      name,
      description,
      game,
      gameOptions,
      country,
      founded,
      errors,
      socialState,
    } = this.state;
    const { history, userData, countriesList, editMode } = this.props;

    if (pictureMode) {
      return (
        <AvatarLoader
          settings={{
            aspect: 0,
            width: 200,
            height: 200,
          }}
          image={image}
          onImageCrop={this.onImageCrop}
          cancel={() => this.setState({ pictureMode: false })}
        />
      );
    }

    return (
      <Styled.Row>
        <Styled.Col>
          <form onSubmit={(e) => this.onSubmit(e)} style={{ width: "100%" }}>
            <Box width={1}>
              <Input
                value={name}
                error={errors.name}
                label={
                  <FormattedMessage id="teams.form.name" tagName="label" />
                }
                onChange={this.inputHandler}
                name="name"
              />
            </Box>
            <Box mt={3} width={1}>
              <TextArea
                value={description}
                error={errors.description}
                label={
                  <FormattedMessage
                    id="teams.form.description"
                    tagName="label"
                  />
                }
                onChange={this.inputHandler}
                name="description"
              />
            </Box>
            <Box mt={3} width={1}>
              <Select
                clearable
                disabled={editMode}
                error={errors.game}
                values={game}
                label={
                  <FormattedMessage id="teams.form.game" tagName="label" />
                }
                options={gameOptions}
                onChange={(value) => this.selectHandler(value, "game")}
              />
            </Box>
            <Box mt={3} width={1}>
              <Select
                clearable
                error={errors.country}
                values={country}
                label={
                  <FormattedMessage id="teams.form.country" tagName="label" />
                }
                options={countriesList}
                onChange={(value) => this.selectHandler(value, "country")}
              />
            </Box>
            <Box mt={3} width={1}>
              <Input
                error={errors.founded}
                label={
                  <FormattedMessage id="teams.form.founded" tagName="label" />
                }
                value={founded}
                onChange={this.inputHandler}
                placeholder="DD-MM-YYYY"
                mask="99-99-9999"
                name="founded"
              />
            </Box>
            <Styled.Social>
              <FormattedMessage id="teams.create.social" />
            </Styled.Social>
            {socialState.map((item, index) => {
              const { options, selectedOption, error, url } = item;
              const [selectedObject] = selectedOption;

              return (
                <Box key={selectedObject.value} mt={2}>
                  <Grid container spacing={2}>
                    <Grid container item xs={4}>
                      <Select
                        values={selectedOption}
                        options={options}
                        disabled={
                          index !== socialState.length - 1 ||
                          options.length === 1
                        }
                        onChange={(value) =>
                          this.socialTypeHandler(value, index)
                        }
                      />
                    </Grid>
                    <Grid container item xs={8}>
                      <Input
                        value={url}
                        error={error}
                        placeholder="https://example.com/team-profile"
                        onChange={(e) => this.socialUrlHandler(e, index)}
                        name={selectedObject.value}
                      />
                    </Grid>
                  </Grid>
                </Box>
              );
            })}
            {socialState.length !== this.social.length && (
              <Styled.AddMore>
                <span onClick={() => this.addMore()}>
                  <FormattedMessage id="teams.form.addMore" />
                </span>
              </Styled.AddMore>
            )}
            <Box mt={4}>
              <ButtonRow direction="left">
                <Button
                  variant="secondary"
                  label={<FormattedMessage id="teams.createCloseButton" />}
                  action={() =>
                    editMode
                      ? history.push(`/teams/team/${team.id}`)
                      : history.push(`/id/${userData?.id}`)
                  }
                />
                <Button
                  label={
                    <FormattedMessage
                      id={`teams.${
                        editMode ? "editTeamButton" : "createNewTeamButton"
                      }`}
                    />
                  }
                  action={(e) => this.onSubmit(e)}
                />
              </ButtonRow>
            </Box>
          </form>
        </Styled.Col>
        <Styled.Col>
          <Box width={1}>
            <input
              hidden
              ref={this.profilePictureInput}
              type="file"
              onInput={this.onImageSelect}
              accept="image/x-png,image/png,image/gif,image/jpeg"
            />
            <Styled.Logo
              onClick={() => this.profilePictureInput.current.click()}
            >
              <div className="image">
                {image && <img src={image} alt={name} />}
              </div>
              <div className="copy">
                <FormattedMessage id="teams.addLogo" />
              </div>
            </Styled.Logo>
            {errors.image && <ErrorMessage static>{errors.image}</ErrorMessage>}
          </Box>
        </Styled.Col>
      </Styled.Row>
    );
  }

  render() {
    const { team, error } = this.state;
    const { editMode } = this.props;

    if (editMode && !team) {
      return (
        <Container>
          <ContentBox>
            <LinearProgress />
          </ContentBox>
        </Container>
      );
    }

    if (error) {
      return (
        <Container>
          <ContentBox>
            <FormattedMessage id="teams.team.notFound" />
          </ContentBox>
        </Container>
      );
    }

    return (
      <Container>
        <SideBarRowLeft className="change-order-on-mobile">
          <div>
            <NewUsers />
          </div>
          <div>
            <ContentBox>
              <Styled.Title>
                <FormattedMessage
                  id={`teams.${editMode ? "edit" : "create"}`}
                />
              </Styled.Title>
              {this.renderForm()}
            </ContentBox>
          </div>
        </SideBarRowLeft>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    countriesList: state.countriesList,
  };
};

export default withRouter(connect(mapStateToProps)(injectIntl(CreateTeam)));

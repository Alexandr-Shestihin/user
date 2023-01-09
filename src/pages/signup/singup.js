import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
//
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import { GOOGLE_AUTH_CLIENT_ID, FACEBOOK_AUTH_CLIENT_ID } from "../../config";
//
import { getUserData, userOnline } from "../../redux/actions";
import { API, API_ROUTER } from "../../api";
import store from "../../redux/store";
//
import {
  getUrlParams,
  isPasswordValid,
  isCheckboxChecked,
  isEmailValid,
} from "../../helpers";
import { CheckBox } from "../../components/UI";
//
import Logo from "../../components/logo";
import InputLogin from "../../components/UI/forms/input-logo_register";
import ButtonLogin from "../../components/UI/buttons/buttons-login_register";
import authBg from "../../assets/images/fon.png";
////////////////////////////////////////////////////////////////
import "../../assets/styles/index.css";
const SignUpForm = (props) => {
  const history = useHistory();
  const routeChange = () => {
    let path = `/login`;
    history.push(path);
  };

  const getDefaultErrors = () => {
    return {
      username: "",
      password: "",
      gdpr: "",
    };
  };
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [gdprChecked, setGdprChecked] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);
  const [errors, setErrors] = useState(getDefaultErrors);

  useEffect(() => {
    const { userOnline, history } = props;

    if (userOnline) {
      props.runGetUserData();

      if (props?.userData) {
        console.log("props?.userData", props?.userData);

        history.push(`/id/${props?.userData?.id}`);
      }
    }
  }, [props.userOnline, props.userData]);

  const onInputChange = (type) => {
    return (e) => {
      const setter = type === "username" ? setUserName : setPassword;

      setter(e.target.value);
    };
  };
  const onCheckboxChange = (e) => {
    if (e.target.name === "gdpr") setGdprChecked(!gdprChecked);

    if (e.target.name === "marketing") setMarketingChecked(!marketingChecked);
  };

  // SIGNUP
  const actionSignUp = (e) => {
    e.preventDefault();
    const { history } = props;
    const isInvite = localStorage.getItem("team-invite");
    const URLParams = getUrlParams();

    // validate
    errors.username = isEmailValid(username);
    errors.password = isPasswordValid(password);
    errors.gdpr = isCheckboxChecked(gdprChecked);

    setErrors({ ...errors });
    console.log(errors);
    // send request if valid
    if (!Object.values(errors).some((value) => value.length)) {
      const registerMethod = API_ROUTER.auth.register;

      let params = {
        ...registerMethod,
        pathKeys: {
          eventName: "registration",
        },
        data: {
          username,
          password,
          gdpr: gdprChecked,
          marketing: marketingChecked,
          token: "fake",
        },
      };

      // get referral
      if (URLParams.ref) {
        params.data.referral = URLParams.ref;
      }

      API.request(params, true)
        .then(({ token }) => {
          localStorage.setItem("token", token);

          props.runGetUserData();
          props.runUserOnline();

          const userData = store.getState().userData;

          toast.success("Successfully logged in");
          history.push(`/id/${userData.id}`);
        })
        .catch((err) => {
          let errorMessage = null;

          if (err?.data?.errors) {
            if (err?.data?.errors?.username) {
              errorMessage = `The username ${username} already exists. Please sign in!`;
              errors.username = "User already exists";
            }
          }

          setErrors({ ...errors });

          if (errorMessage) {
            toast.error(errorMessage);
          }
        });
    }
  };

  const responseThirdAuth = (api, response) => {
    const { history } = props;

    const params = {
      ...api,
      data: {
        ...response,
      },
    };

    API.request(params, true)
      .then(({ token }) => {
        if (token) {
          localStorage.setItem("token", token);

          props.runGetUserData();
          props.runUserOnline();

          const userData = store.getState().userData;

          toast.success("Successfully logged in");
          history.push(`/id/${userData.id}`);
        }
      })
      .catch((err) => {
        console.error(err);
        if (err?.data && err?.data?.message) {
          toast.error(err?.data && err?.data?.message);
        }
      });
  };

  return (
    <StyledAuth>
      <Logo />
      <p
        className="auth__text"
        dangerouslySetInnerHTML={{
          __html: `Become the local gaming hero or start your esports career!`,
        }}
      />
      <form className="auth__form" noValidate autoComplete="off">
        <div className="input__group">
          <InputLogin
            type="text"
            placeholder={"Enter your email"}
            icon={"email"}
            name="username"
            className="login__input"
            onChange={onInputChange("username")}
            value={username}
            error={errors.username}
          />
          <div className="input__group__border" />
          <InputLogin
            type="password"
            placeholder="Password"
            icon="password"
            name="password"
            className="password__input"
            onChange={onInputChange("password")}
            value={password}
            error={errors.password}
          />
        </div>
        <div className="access__wrapper">
          <div>
            <CheckBox
              required
              name="gdpr"
              onChange={onCheckboxChange}
              checked={gdprChecked}
              error={errors.gdpr}
            >
              <p>
                <FormattedMessage id="signup.check.agree" />
                <br />{" "}
                <Link to={"/terms-of-use"}>
                  {" "}
                  <FormattedMessage id="signup.check.termsOfUse" />
                </Link>{" "}
                <Link to={"/privacy-policy"}>
                  {" "}
                  <FormattedMessage id="signup.check.privacyPolicy" />
                </Link>{" "}
                <FormattedMessage id="signup.check.and" />{" "}
                <Link to={"/cookie-policy"}>
                  {" "}
                  <FormattedMessage id="signup.check.cookiePolicy" />
                </Link>
              </p>
            </CheckBox>
          </div>
          <div>
            <CheckBox
              name="marketing"
              onChange={onCheckboxChange}
              checked={marketingChecked}
            >
              <p>
                <FormattedMessage id="signup.check" />
              </p>
            </CheckBox>
          </div>
        </div>

        <div className="btn__group">
          <ButtonLogin
            type="submit"
            name="signup"
            active={true}
            onClick={actionSignUp}
          >
            <FormattedMessage id="signup.signup" />
          </ButtonLogin>
          <ButtonLogin
            onClick={routeChange} // link to log
            type="submit"
            active={false}
          >
            <FormattedMessage id="signup.login" />
          </ButtonLogin>
        </div>
      </form>

      <div className="social__auth">
        <p className="social__label">
          {" "}
          <FormattedMessage id="signup.createWith" />
        </p>
        <div className="social__wrapper">
          <div className="google">
            <GoogleLogin
              className="login-with__google"
              clientId={GOOGLE_AUTH_CLIENT_ID}
              buttonText={<i className="icon icon-google" />}
              onSuccess={(resp) =>
                responseThirdAuth(API_ROUTER.auth.googleAuthCheck, resp)
              }
              onFailure={(e) => {
                console.error(e);
              }}
              cookiePolicy={"single_host_origin"}
              icon={false}
            />
          </div>
          <div className="facebook">
            <FacebookLogin
              appId={FACEBOOK_AUTH_CLIENT_ID}
              cssClass="login-with__facebook"
              fields="name,email"
              scope="public_profile"
              callback={(resp) =>
                responseThirdAuth(API_ROUTER.auth.facebookAuthCheck, resp)
              }
              textButton={<i className="icon icon-facebook" />}
            />
          </div>
        </div>
      </div>
    </StyledAuth>
  );
};

const mapStateToProps = (state) => {
  return {
    userOnline: state.userOnline,
    userData: state.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    runGetUserData: () => dispatch(getUserData()),
    runUserOnline: () => dispatch(userOnline()),
  };
};

export default injectIntl(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpForm))
);
const StyledAuth = styled.div`
  background: url(${authBg}) no-repeat center;
  background-size: cover;
  min-height: 100vh;
  padding: 85px 28px;

  & > .auth__text {
    text-align: center;
    margin: 42px 0;
    font-size: 16px;
    font-weight: bold;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
  }

  & > .auth__form {
    border: 1px solid #999999;
    padding: 16px 12px;
    border-radius: 16px;

    & > .sign__up {
      text-align: center;
      color: #999999;
      font-size: 14px;
      font-weight: bold;
      font-style: normal;
      letter-spacing: normal;
      line-height: normal;
      margin-bottom: 16px;

      & > span {
        color: #f7a01d;
        font-size: 14px;
        font-weight: bold;
        font-style: normal;
        letter-spacing: -0.56px;
        line-height: normal;
        cursor: pointer;
        margin-left: 16px;
      }
    }

    & > .access__wrapper {
      margin-bottom: 30px;

      & > div {
        display: flex;
        align-items: flex-start;

        &:first-of-type {
          margin-bottom: 30px;
        }
      }
    }

    & > .input__group {
      border-radius: 16px;
      overflow: hidden;
      margin-bottom: 25px;

      & > .input__group__border {
        border-top: 1px solid #999999;
      }
    }

    & > .btn__group {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    & > .forgot__password {
      font-size: 14px;
      font-weight: bold;
      font-style: normal;
      letter-spacing: -0.56px;
      line-height: normal;
      text-align: center;
      text-decoration: underline;
      margin-top: 28px;
      cursor: pointer;
    }
  }

  & > .social__auth {
    margin-top: 25px;

    & > .social__label {
      font-size: 16px;
      font-weight: bold;
      font-style: normal;
      letter-spacing: -0.61px;
      line-height: normal;
    }

    & > .social__wrapper {
      margin-left: 30px;
      display: flex;
      align-items: center;

      & > .google,
      & > .facebook {
        padding: 13px 25px 10px;
        border-radius: 20px;
        background-color: #f26052;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        & > i {
          width: 23px;
          height: 23px;
        }
      }

      & > .google {
        padding: 14px 15px 10px;
      }

      & > .facebook {
        background-color: #3669a5;
        margin-left: 10px;
      }
    }
  }

  @media (max-width: 400px) {
    padding: 50px 1rem;

    & > .auth__form {
      & > .btn__group {
        flex-direction: column;
        gap: 10px;

        & > button {
          width: 100%;
        }
      }
    }

    & > .social__auth {
      //flex-direction: column;

      & > .social__wrapper {
        margin-left: 0;
        margin-top: 10px;
      }
    }
  }
`;

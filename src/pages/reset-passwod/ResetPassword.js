import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { isEmailValid } from "../../helpers";
import { toast } from "react-toastify";
import { API, API_ROUTER } from "../../api";
import { FormattedMessage, injectIntl } from "react-intl";

//
import Logo from "../../components/logo";
import authBg from "../../assets/images/fon.png";
import InputLogin from "../../components/UI/forms/input-logo_register";
import ButtonLogin from "../../components/UI/buttons/buttons-login_register";

export default function ResetPassword() {
  const getDefaultErrors = () => {
    return {
      username: "",
      password: "",
    };
  };
  const [errors, setErrors] = useState(getDefaultErrors);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onInputChange = (type) => {
    return (e) => {
      const setter = type === "username" ? setUserName : setPassword;

      setter(e.target.value);
    };
  };
  const actionForgotPassword = (event) => {
    event.preventDefault();
    // validate
    errors.username = isEmailValid(username);
    setErrors({ ...errors });

    // send request if valid
    if (!Object.values(errors).some((value) => value.length)) {
      const params = {
        ...API_ROUTER.auth.forgotPassword,
        data: {
          email: username,
        },
      };

      API.request(params, true)
        .then(({ message }) => {
          toast.success(message);
        })
        .catch((err) => {
          console.error(err);
          if (err?.data && err?.data?.message) {
            toast.error(err?.data && err?.data?.message);
          }
        });
    }
  };
  return (
    <StyledAuth>
      <Logo />

      <p className="auth__text">
        {" "}
        <FormattedMessage id="password.reset.resetPassword" />
      </p>

      <div className="back__login">
        <Link to="/login">
          <ButtonLogin type="button" active size="sm">
            <FormattedMessage id="password.reset.goBack" />
          </ButtonLogin>
        </Link>
      </div>

      <form className="auth__form" noValidate autoComplete="off">
        <div className="input__group">
          <InputLogin
            type="text"
            placeholder={"Enter your email"}
            icon={"email"}
            name="email"
            onChange={onInputChange("username")}
            value={username}
            error={errors.username}
          />
        </div>

        <div className="btn__group">
          <ButtonLogin active size="sm" onClick={actionForgotPassword}>
            <FormattedMessage id="password.reset.sendLink" />
          </ButtonLogin>
        </div>
      </form>

      <div className="dont__acc">
        <Link to={"#"}>
          {" "}
          <FormattedMessage id="password.reset.dontAcc" />
        </Link>
      </div>

      <div className="back__login">
        <Link to="/login">
          <ButtonLogin type="button" active size="sm">
            <FormattedMessage id="password.reset.signup" />
          </ButtonLogin>
        </Link>
      </div>
    </StyledAuth>
  );
}

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

  & > .back__login {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 42px;
  }

  & > .auth__form {
    border: 1px solid #999999;
    padding: 48px 12px;
    border-radius: 16px;

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
      justify-content: center;
    }
  }

  & > .dont__acc {
    text-align: center;
    margin: 32px 0;

    a {
      font-size: 12px;
      font-weight: 400;
      font-style: normal;
      letter-spacing: normal;
      line-height: 17.99px;
      text-align: center;
    }
  }

  @media (max-width: 400px) {
    padding: 50px 1rem;
  }
`;

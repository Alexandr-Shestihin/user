import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { API, API_ROUTER } from "../../api";
import { toast } from "react-toastify";
import { FormattedMessage, injectIntl } from "react-intl";
import { isConfirmPasswordCorrect, isPasswordValid } from "../../helpers";
import store from "../../redux/store";
import { getUserData, userOnline } from "../../redux/actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//
import Logo from "../../components/logo";
import authBg from "../../assets/images/fon.png";
import InputLogin from "../../components/UI/forms/input-logo_register";
import ButtonLogin from "../../components/UI/buttons/buttons-login_register";

const NewPassword = (props) => {
  const getDefaultErrors = () => ({
    newPassword: "",
    confirmPassword: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(getDefaultErrors);

  const onSubmit = (e) => {
    const { history } = props;
    e.preventDefault();

    // validation
    errors.newPassword = isPasswordValid(newPassword);
    errors.confirmPassword = isConfirmPasswordCorrect(
      newPassword,
      confirmPassword
    );
    setErrors({ ...errors });

    if (!Object.values(errors).some((value) => value.length)) {
      const params = {
        ...API_ROUTER.auth.changePassword,
        data: {
          newPassword: newPassword,
        },
      };

      API.request(params, true)
        .then(() => {
          toast.success(
            <FormattedMessage id="changePassword.passwordChanged" />
          );
          props.getUserData();
          props.userOnline();

          // const userData = store.getState().userData;
          history.push(`/password/confirm`);
        })
        .catch((err) => {
          toast.error((err?.data && err?.data?.message) || "ERROR");
        });
    }
  };

  const onInputChange = (type) => {
    return (e) => {
      const setter =
        type === "newPassword" ? setNewPassword : setConfirmPassword;

      setter(e.target.value);
    };
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
          <div className="input__group__border" />
          <InputLogin
            type="password"
            placeholder="Password"
            icon="password"
            name="password"
            className="password__input"
            onChange={onInputChange("newPassword")}
            error={errors.newPassword}
            value={newPassword}
          />
          <InputLogin
            type="password"
            placeholder="Password"
            icon="password"
            name="password"
            className="password__input"
            onChange={onInputChange("confirmPassword")}
            error={errors.confirmPassword}
            value={confirmPassword}
          />
        </div>
      </form>

      <div className="back__login" style={{ marginTop: "42px" }}>
        <ButtonLogin type="button" active size="sm" onClick={onSubmit}>
          <FormattedMessage id="password.reset.change" />
        </ButtonLogin>
      </div>
    </StyledAuth>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUserData: () => dispatch(getUserData()),
    userOnline: () => dispatch(userOnline()),
  };
};

export default injectIntl(
  withRouter(connect(() => {}, mapDispatchToProps)(NewPassword))
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

  @media (max-width: 400px) {
    padding: 50px 1rem;
  }
`;

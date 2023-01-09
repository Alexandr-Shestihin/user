import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
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
import ButtonLogin from "../../components/UI/buttons/buttons-login_register";

const NewPassword = (props) => {
  const onSubmit = (e) => {
    const { history } = props;
    e.preventDefault();

    props.getUserData();
    props.userOnline();

    const userData = store.getState().userData;

    history.push(`/id/${userData.id}`);
  };

  const userData = store.getState().userData;

  const history = useHistory();
  setTimeout(() => {
    history.push(`/id/${userData.id}`);
  }, 10000);

  return (
    <StyledAuth>
      <Logo />

      <p className="auth__text">
        {" "}
        <FormattedMessage id="password.confirm.success" />
      </p>
      <p className="auth__text">
        <FormattedMessage id="password.confirm.title" />
      </p>

      <div className="back__login" style={{ marginTop: "42px" }}>
        <ButtonLogin
          type="button"
          style={{ fontSize: "20px" }}
          active
          size="sm"
          onClick={onSubmit}
        >
          OK
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

import React, { Component, useState } from "react";
import { ContentBox, Input, ButtonRow, Button } from "../../components/UI";
import { API, API_ROUTER } from "../../api";
import { toast } from "react-toastify";
import { FormattedMessage, injectIntl } from "react-intl";
import { isConfirmPasswordCorrect, isPasswordValid } from "../../helpers";
import PassIcon from "../../assets/images/02.svg";
import { Styled } from "../../components/auth-modal/style";
import store from "../../redux/store";
import { getUserData, userOnline } from "../../redux/actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const ChangePassword = (props) => {
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

          const userData = store.getState().userData;
          history.push(`/id/${userData.id}`);
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
    <section className="change-password">
      <h2 className="change-password__title">
        <FormattedMessage id="changePassword.changePassword" />
      </h2>
      <form className="login__form change-password__form">
        <div className="form__password form__password--change-password">
          <Input
            className="password__input change-password__password-1"
            onChange={onInputChange("newPassword")}
            name="newPassword"
            type="password"
            placeholder="Type new password"
            error={errors.newPassword}
            value={newPassword}
          />
          <img src={PassIcon} alt="" />
        </div>
        <div className="form__password form__password--change-password">
          <Input
            className="password__input change-password__password-2"
            onChange={onInputChange("confirmPassword")}
            name="confirmPassword"
            type="password"
            placeholder="Repeat new password"
            error={errors.confirmPassword}
            value={confirmPassword}
          />
          <img src={PassIcon} alt="" />
        </div>
        <Styled.ButtonHolder>
          <button
            className="form__submit change-password__submit"
            name="changePass"
            type="submit"
            onClick={onSubmit}
          >
            <FormattedMessage id="changePassword.changePassword" />
          </button>
        </Styled.ButtonHolder>
      </form>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserData: () => dispatch(getUserData()),
    userOnline: () => dispatch(userOnline()),
  };
};

export default injectIntl(
  withRouter(connect(() => {}, mapDispatchToProps)(ChangePassword))
);

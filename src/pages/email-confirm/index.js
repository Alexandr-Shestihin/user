import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUrlParams } from "../../helpers";
import styled from "styled-components";
import { API, API_ROUTER } from "../../api";
import { Styled } from "./style";
import { showAuthModal } from "../../redux/actions";
import { LinearProgress } from "@material-ui/core";
import { Container, ContentBox, Button } from "../../components/UI";
import Logo from "../../components/logo";
import authBg from "../../assets/images/fon.png";
import ButtonLogin from "../../components/UI/buttons/button";
class EmailConfirm extends Component {
  state = {
    confirmed: false,
    error: false,
    emailSent: false,
  };

  componentDidMount() {
    const { history } = this.props;
    const { secret } = getUrlParams();

    !secret ? history.push("/") : this.confirmPassword(secret);
  }

  confirmPassword(secret) {
    const params = {
      ...API_ROUTER.auth.confirmEmail,
      data: {
        secret: secret,
      },
    };

    API.request(params, true)
      .then(() => this.setState({ confirmed: true, error: false }))
      .catch(() => this.setState({ confirmed: false, error: true }));
  }

  render() {
    const { confirmed, error, emailSent } = this.state;

    return (
      // <Container>
      //     <ContentBox>
      //         {confirmed &&
      //             <Styled.Message>
      //                 <div>Email confirmed!</div>
      //                 <Button
      //                     action={() => this.props.history.push('/login')}
      //                     label="Login"/>
      //             </Styled.Message>
      //         }

      //         {error &&
      //             <Styled.Message>
      //                 <div>Token has expired... Please try to send new Email.</div>
      //                 <Button
      //                     action={() => this.setState({emailSent: true})}
      //                     disabled={emailSent}
      //                     label={emailSent ? 'Email sent' : 'Send New Email'}/>
      //             </Styled.Message>
      //         }

      //         {!confirmed && !error && <LinearProgress />}
      //     </ContentBox>
      // </Container>
      <StyledAuth>
        <Logo />

        {/* {confirmed && ( */}
        <Styled.Message>
          <div>Email confirmed!</div>
          <div></div>

          <ButtonLogin
            action={() => this.props.history.push("/login")}
            label="Login"
          />
        </Styled.Message>
        {/* )} */}

        {error && (
          <Styled.Message>
            <div>Token has expired... Please try to send new Email.</div>
            <ButtonLogin
              action={() => this.setState({ emailSent: true })}
              disabled={emailSent}
              label={emailSent ? "Email sent" : "Send New Email"}
            />
          </Styled.Message>
        )}

        {!confirmed && !error && <LinearProgress />}
      </StyledAuth>
    );
  }
}

const mapDispatch = {
  showAuthModal: () => showAuthModal(),
};

export default connect(null, mapDispatch)(withRouter(EmailConfirm));
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

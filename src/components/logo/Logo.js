import React from "react";
import styled from "styled-components";

//
import logo from "../../assets/images/img-login_register_profile_rodster/logo.png";

export default function Logo() {
  return (
    <StyledLogo>
      <img src={logo} alt="logo" />
    </StyledLogo>
  );
}

const StyledLogo = styled.div`
  width: max-content;
  margin: 0 auto;

  @media (max-width: 350px) {
    width: 60%;

    & > img {
      width: 60%;
    }
  }
`;

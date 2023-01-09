import React from "react";
import Wrapper from "../../components/wrapper";
import GlobalStyles from "../../assets/styles/global";
//
import ConfirmPassword from "./ConfirmPassword";

export default function ConfirmPasswordHOC() {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <ConfirmPassword />
      </Wrapper>
    </>
  );
}

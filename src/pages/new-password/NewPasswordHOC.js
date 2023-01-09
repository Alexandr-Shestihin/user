import React from "react";
import Wrapper from "../../components/wrapper";
import GlobalStyles from "../../assets/styles/global";
//
import NewPassword from "./NewPassword";

export default function NewPasswordHOC() {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <NewPassword />
      </Wrapper>
    </>
  );
}

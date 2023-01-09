import React from "react";
import Wrapper from "../../components/wrapper";
import GlobalStyles from "../../assets/styles/global";
//
import Login from "./login";

export default function LoginHOC({ ...props }) {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Login {...props} />
      </Wrapper>
    </>
  );
}
